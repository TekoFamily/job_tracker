import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import CardCandidatura from '../../components/CardCandidatura';
import Modal from '../../components/Modal';
import Input from '../../components/Form/Input';
import { Plus, LayoutTemplate, PieChart as PieChartIcon } from 'lucide-react';
import { getApplications, saveApplication, deleteApplication, extractJobMetadata } from '../../services/storage';
import { toast } from 'sonner';

// Drag and Drop
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Recharts
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

import './Dashboard.css';

const STATUS_COLUMNS = [
    { id: 'Pendente', title: 'Pendente', color: '#f59e0b' }, // Amber
    { id: 'Entrevista RH', title: 'Entrevista RH', color: '#3b82f6' }, // Blue
    { id: 'Segunda Entrevista', title: '2ª Entrevista', color: '#8b5cf6' }, // Purple
    { id: 'Aprovado', title: 'Aprovado', color: '#10b981' }, // Emerald
    { id: 'Rejeitado', title: 'Rejeitado', color: '#ef4444' } // Red
];

const Dashboard = () => {
    const [applications, setApplications] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentApp, setCurrentApp] = useState(null);
    const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
    const [isExtracting, setIsExtracting] = useState(false);

    useEffect(() => {
        loadApps();
    }, []);

    const loadApps = async () => {
        const data = await getApplications();
        setApplications(data);
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

    const handleDelete = async (id) => {
        if (window.confirm('Excluir esta candidatura?')) {
            await deleteApplication(id);
            toast.success('Candidatura excluída!');
            loadApps();
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        await saveApplication(currentApp);
        toast.success(currentApp.id ? 'Candidatura atualizada!' : 'Candidatura criada!');
        setIsModalOpen(false);
        loadApps();
    };

    const handleChange = (e) => {
        setCurrentApp({ ...currentApp, [e.target.id]: e.target.value });
    };

    const handleAutoFill = async () => {
        if (!currentApp?.link) {
            toast.error('Cole o link da vaga primeiro!');
            return;
        }
        setIsExtracting(true);
        toast.info('Buscando dados da vaga...');
        
        try {
            const data = await extractJobMetadata(currentApp.link);
            setCurrentApp({
                ...currentApp,
                company: data.company || currentApp.company,
                role: data.title || currentApp.role
            });
            if (data.company || data.title) {
                toast.success('Extração concluída!');
            } else {
                 toast.warning('Não foi possível identificar dados automaticamente.');
            }
        } catch (error) {
            toast.error('Erro na extração de dados.');
        } finally {
            setIsExtracting(false);
        }
    };

    // --- DRAG AND DROP LOGIC ---
    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;

        // Dropped outside a valid droppable
        if (!destination) return;

        // Didn't move
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const newStatus = destination.droppableId;
        const appToMove = applications.find(app => app.id === draggableId);

        if (!appToMove || appToMove.status === newStatus) return;

        // Optimistic UI Update
        const updatedApps = applications.map(app => {
            if (app.id === draggableId) {
                return { ...app, status: newStatus };
            }
            return app;
        });

        setApplications(updatedApps);

        // API Call
        try {
            await saveApplication({ ...appToMove, status: newStatus });
            toast.success(`Candidatura movida para ${newStatus}`);
        } catch (error) {
            // Revert on error
            loadApps();
            toast.error('Erro ao mover candidatura. Tente novamente.');
        }
    };

    // --- CHART DATA PREPARATION ---
    const statusCount = STATUS_COLUMNS.reduce((acc, col) => {
        acc[col.id] = applications.filter(app => app.status === col.id).length;
        return acc;
    }, {});

    const chartData = STATUS_COLUMNS.map(col => ({
        name: col.title,
        value: statusCount[col.id],
        color: col.color
    })).filter(item => item.value > 0);

    return (
        <>
            <Navbar />
            <div className="container dashboard-container" style={{ paddingBottom: '3rem' }}>
                
                {/* HEADERS & ACTIONS */}
                <div className="dashboard-header">
                    <h1 className="page-title">Minhas Candidaturas</h1>
                    
                    <div className="dashboard-actions">
                        <button 
                            className={`icon-btn ${viewMode === 'kanban' ? 'active-view' : ''}`}
                            onClick={() => setViewMode('kanban')}
                            title="Visão Kanban"
                        >
                            <LayoutTemplate size={20} />
                        </button>
                        <button className="btn-primary" onClick={handleAddNew} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plus size={20} />
                            Nova Candidatura
                        </button>
                    </div>
                </div>

                {/* ANALYTICS SECTION */}
                <div className="analytics-section glass-panel">
                    <div className="analytics-text">
                        <h2>Visão Geral</h2>
                        <p className="analytics-total">
                            <span className="number">{applications.length}</span> candidaturas registradas
                        </p>
                        <div className="status-pills">
                            {STATUS_COLUMNS.map(col => (
                                statusCount[col.id] > 0 && (
                                    <span key={col.id} className="status-pill" style={{ borderColor: col.color, color: col.color, backgroundColor: `${col.color}15` }}>
                                        {col.title}: <strong>{statusCount[col.id]}</strong>
                                    </span>
                                )
                            ))}
                        </div>
                    </div>
                    
                    {chartData.length > 0 && (
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={160}>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={70}
                                        paddingAngle={5}
                                        dataKey="value"
                                        animationDuration={800}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip 
                                        formatter={(value) => [`${value} vagas`, '']}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                    />
                                    <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                {/* EMPTY STATE */}
                {applications.length === 0 && (
                    <div className="empty-state glass-panel">
                        <PieChartIcon size={48} className="empty-icon" />
                        <h3>Nenhuma candidatura ainda.</h3>
                        <p>Comece organizando sua busca adicionando sua primeira vaga!</p>
                        <button className="btn-primary" onClick={handleAddNew} style={{ marginTop: '1rem' }}>
                            Começar
                        </button>
                    </div>
                )}

                {/* KANBAN BOARD */}
                {applications.length > 0 && viewMode === 'kanban' && (
                    <div className="kanban-board">
                        <DragDropContext onDragEnd={onDragEnd}>
                            {STATUS_COLUMNS.map(column => {
                                const columnApps = applications.filter(app => app.status === column.id);
                                return (
                                    <div key={column.id} className="kanban-column">
                                        <div className="kanban-column-header">
                                            <div className="kanban-column-title" style={{ borderBottomColor: column.color }}>
                                                {column.title}
                                                <span className="kanban-column-count">{columnApps.length}</span>
                                            </div>
                                        </div>

                                        <Droppable droppableId={column.id}>
                                            {(provided, snapshot) => (
                                                <div 
                                                    className={`kanban-droppable ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                >
                                                    {columnApps.map((app, index) => (
                                                        <Draggable key={app.id} draggableId={app.id} index={index}>
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={`kanban-card-wrapper ${snapshot.isDragging ? 'is-dragging' : ''}`}
                                                                    style={{ ...provided.draggableProps.style }}
                                                                >
                                                                    <CardCandidatura
                                                                        application={app}
                                                                        onEdit={handleEdit}
                                                                        onDelete={handleDelete}
                                                                        isCompact={true}
                                                                    />
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                );
                            })}
                        </DragDropContext>
                    </div>
                )}

                {/* LIST VIEW (Fallback/Alternative) */}
                {applications.length > 0 && viewMode === 'list' && (
                    <div className="dashboard-grid">
                        {applications.map(app => (
                            <CardCandidatura
                                key={app.id}
                                application={app}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}

                {/* ADD / EDIT MODAL */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={currentApp?.id ? 'Editar Candidatura' : 'Nova Candidatura'}
                >
                    <form onSubmit={handleSave} className="modal-form">
                        <Input id="company" label="Empresa" value={currentApp?.company || ''} onChange={handleChange} required />
                        <Input id="role" label="Cargo" value={currentApp?.role || ''} onChange={handleChange} required />
                        
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', width: '100%' }}>
                            <div style={{ flex: 1 }}>
                                <Input id="link" label="Link da Vaga" value={currentApp?.link || ''} onChange={handleChange} />
                            </div>
                            <button 
                                type="button" 
                                onClick={handleAutoFill} 
                                disabled={isExtracting}
                                className="btn-secondary" 
                                style={{ height: '42px', padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                title="Preencher Emprego e Cargo Automaticamente"
                            >
                                {isExtracting ? '⏳' : '🪄 Extrair'}
                            </button>
                        </div>
                        <Input id="date" type="date" label="Data de Envio" value={currentApp?.date || ''} onChange={handleChange} required />

                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <select
                                id="status"
                                value={currentApp?.status || 'Pendente'}
                                onChange={handleChange}
                                className="input-field"
                            >
                                {STATUS_COLUMNS.map(col => (
                                    <option key={col.id} value={col.id}>{col.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Observações</label>
                            <textarea
                                id="notes"
                                className="input-field"
                                rows="3"
                                value={currentApp?.notes || ''}
                                onChange={handleChange}
                                placeholder="Anotações sobre a entrevista, salários, etc..."
                            />
                        </div>

                        <div className="modal-footer">
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
