import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import CardCandidatura from '../../components/CardCandidatura';
import Modal from '../../components/Modal';
import Input from '../../components/Form/Input';
import { Plus } from 'lucide-react';
import { getApplications, saveApplication, deleteApplication } from '../../services/storage';

const Dashboard = () => {
    const [applications, setApplications] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentApp, setCurrentApp] = useState(null);

    useEffect(() => {
        loadApps();
    }, []);

    const loadApps = () => {
        setApplications(getApplications());
    };

    const handleAddNew = () => {
        setCurrentApp({
            company: '',
            role: '',
            link: '',
            date: new Date().toISOString().split('T')[0],
            status: 'Pendente',
            notes: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (app) => {
        setCurrentApp(app);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Excluir esta candidatura?')) {
            deleteApplication(id);
            loadApps();
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        saveApplication(currentApp);
        setIsModalOpen(false);
        loadApps();
    };

    const handleChange = (e) => {
        setCurrentApp({ ...currentApp, [e.target.id]: e.target.value });
    };

    // Resumo de status
    const statusList = [
      'Pendente',
      'Entrevista RH',
      'Segunda Entrevista',
      'Aprovado',
      'Rejeitado'
    ];
    const total = applications.length;
    const statusCount = statusList.reduce((acc, status) => {
      acc[status] = applications.filter(app => app.status === status).length;
      return acc;
    }, {});

    return (
        <>
            <Navbar />
            <div className="container" style={{ paddingBottom: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 className="page-title">Minhas Candidaturas</h1>
                    <button className="btn-primary" onClick={handleAddNew} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Plus size={20} />
                        Nova Candidatura
                    </button>
                </div>

                {/* Resumo de candidaturas */}
                <div style={{ background: '#f5f7fa', borderRadius: 12, padding: '1.2rem 1.5rem', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                  <div><b>Total:</b> {total}</div>
                  {statusList.map(status => (
                    <div key={status}><b>{status}:</b> {statusCount[status]}</div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {applications.map(app => (
                        <CardCandidatura
                            key={app.id}
                            application={app}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>

                {applications.length === 0 && (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '4rem' }}>
                        <p>Nenhuma candidatura ainda. Comece adicionando uma!</p>
                    </div>
                )}

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={currentApp?.id ? 'Editar Candidatura' : 'Nova Candidatura'}
                >
                    <form onSubmit={handleSave}>
                        <Input id="company" label="Empresa" value={currentApp?.company || ''} onChange={handleChange} required />
                        <Input id="role" label="Cargo" value={currentApp?.role || ''} onChange={handleChange} required />
                        <Input id="link" label="Link da Vaga" value={currentApp?.link || ''} onChange={handleChange} />
                        <Input id="date" type="date" label="Data de Envio" value={currentApp?.date || ''} onChange={handleChange} required />

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>Status</label>
                            <select
                                id="status"
                                value={currentApp?.status || 'Pendente'}
                                onChange={handleChange}
                                className="input-field"
                            >
                                <option value="Pendente">Pendente</option>
                                <option value="Entrevista RH">Entrevista RH</option>
                                <option value="Segunda Entrevista">Segunda Entrevista</option>
                                <option value="Aprovado">Aprovado</option>
                                <option value="Rejeitado">Rejeitado</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>Observações</label>
                            <textarea
                                id="notes"
                                className="input-field"
                                rows="3"
                                value={currentApp?.notes || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                            <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                            <button type="submit" className="btn-primary">Salvar</button>
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    );
};

export default Dashboard;
