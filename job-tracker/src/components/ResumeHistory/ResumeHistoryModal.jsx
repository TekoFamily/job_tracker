import React, { useState } from 'react';
import './ResumeHistory.css';

const EXAMPLE_JSON = `{
  "name": "Seu Nome Completo",
  "role": "Seu Cargo (Ex: Desenvolvedor Backend)",
  "contact": {
    "email": "seu.email@exemplo.com",
    "phone": "+55 11 99999-9999",
    "location": "Sua Cidade - UF",
    "linkedin": "https://linkedin.com/in/seu-perfil",
    "github": "https://github.com/seu-usuario"
  },
  "summary": "Resumo profissional focado em suas principais competências...",
  "skills": [
    "Skill 1",
    "Skill 2",
    "Skill 3"
  ],
  "experience": [
    {
      "role": "Cargo Ocupado",
      "company": "Nome da Empresa",
      "period": "Jan 2023 - Atual",
      "bullets": [
        "Responsabilidade ou conquista relevante 1",
        "Responsabilidade ou conquista relevante 2"
      ]
    }
  ],
  "projects": [
    {
      "name": "Nome do Projeto",
      "description": "O que o projeto faz e qual problema resolve.",
      "technologies": ["Tech A", "Tech B"]
    }
  ],
  "education": [
    {
      "course": "Nome do Curso",
      "institution": "Instituição de Ensino",
      "status": "Concluído"
    }
  ],
  "languages": [
    "Português – Nativo",
    "Inglês – Intermediário"
  ]
}`;

const ResumeHistoryModal = ({
    isOpen,
    onClose,
    resumes,
    activeResumeId,
    onSelect,
    onCreate,
    onDuplicate,
    onDelete
}) => {
    if (!isOpen) return null;

    const [mode, setMode] = useState('list'); // 'list', 'create', 'import'
    const [newResumeName, setNewResumeName] = useState('');
    const [jsonContent, setJsonContent] = useState('');
    const [error, setError] = useState(null);

    const handleCreate = () => {
        if (newResumeName.trim()) {
            onCreate(newResumeName);
            resetState();
        }
    };

    const handleImport = () => {
        setError(null);
        if (!newResumeName.trim()) {
            setError("Por favor, dê um nome para o currículo.");
            return;
        }

        try {
            const parsed = JSON.parse(jsonContent);
            // Basic validation
            if (!parsed.name || !parsed.experience) {
                throw new Error("JSON parece inválido ou incompleto (falta name ou experience).");
            }

            onCreate(newResumeName, parsed);
            resetState();
        } catch (e) {
            setError("Erro ao processar JSON: " + e.message);
        }
    };

    const loadExample = () => {
        setJsonContent(EXAMPLE_JSON);
        setError(null);
    };

    const resetState = () => {
        setNewResumeName('');
        setJsonContent('');
        setError(null);
        setMode('list');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (mode === 'create') handleCreate();
        }
    }

    return (
        <div className="resume-history-overlay" onClick={onClose}>
            <div className="resume-history-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Histórico de Currículos</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    {mode === 'list' && (
                        <div className="resume-list">
                            {resumes.map(resume => (
                                <div
                                    key={resume.id}
                                    className={`resume-item ${resume.id === activeResumeId ? 'active' : ''}`}
                                    onClick={() => onSelect(resume.id)}
                                >
                                    <div className="resume-info">
                                        <span className="resume-title">{resume.title}</span>
                                        <span className="resume-date">
                                            Ativo: {new Date(resume.lastModified).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="resume-actions">
                                        <button
                                            title="Duplicar este currículo"
                                            onClick={(e) => { e.stopPropagation(); onDuplicate(resume.id); }}
                                            className="action-btn duplicate"
                                        >
                                            📄 Duplicar
                                        </button>
                                        {resumes.length > 1 && (
                                            <button
                                                title="Excluir este currículo"
                                                onClick={(e) => { e.stopPropagation(); onDelete(resume.id); }}
                                                className="action-btn delete"
                                            >
                                                🗑️
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {mode === 'create' && (
                        <div className="create-form">
                            <input
                                type="text"
                                placeholder="Nome do perfil (ex: Backend PL)"
                                value={newResumeName}
                                onChange={(e) => setNewResumeName(e.target.value)}
                                onKeyDown={handleKeyPress}
                                autoFocus
                            />
                            <button onClick={handleCreate} className="confirm-create">Criar</button>
                            <button onClick={resetState} className="cancel-create">Cancelar</button>
                        </div>
                    )}

                    {mode === 'import' && (
                        <div className="import-area">
                            <input
                                type="text"
                                placeholder="Nome do Perfil para este JSON"
                                value={newResumeName}
                                onChange={(e) => setNewResumeName(e.target.value)}
                                style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
                            />

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2px' }}>
                                <button
                                    onClick={loadExample}
                                    style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    Usar modelo de exemplo
                                </button>
                            </div>

                            <textarea
                                className="import-textarea"
                                placeholder="Cole o JSON do currículo aqui..."
                                value={jsonContent}
                                onChange={(e) => setJsonContent(e.target.value)}
                            />
                            {error && <div className="error-msg">{error}</div>}
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={handleImport} className="confirm-create" style={{ flex: 1 }}>Importar JSON</button>
                                <button onClick={resetState} className="cancel-create">Cancelar</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    {mode === 'list' && (
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8px' }}>
                            <button className="btn-new-resume" onClick={() => setMode('create')}>
                                + Novo Perfil (Do Zero)
                            </button>
                            <button className="btn-secondary" style={{ width: '100%' }} onClick={() => setMode('import')}>
                                ⬇️ Importar de JSON/Código
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeHistoryModal;
