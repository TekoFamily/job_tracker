import React from 'react';
import PropTypes from 'prop-types';
import { ExternalLink, Calendar, Edit2, Trash2 } from 'lucide-react';
import './CardCandidatura.css';

const statusColors = {
    'Pendente': 'var(--status-pending)',
    'Aprovado': 'var(--status-approved)',
    'Rejeitado': 'var(--status-rejected)',
    'Entrevista RH': 'var(--status-interview)',
    'Segunda Entrevista': 'var(--status-interview)',
};

const CardCandidatura = ({ application, onEdit, onDelete }) => {
    const { id, company, role, link, date, status, notes } = application;

    const statusStyle = {
        backgroundColor: `${statusColors[status] || '#94a3b8'}20`, // 20% opacity
        color: statusColors[status] || '#94a3b8',
        borderColor: `${statusColors[status] || '#94a3b8'}40`,
    };

    return (
        <div className="glass-panel card-application animate-fade-in">
            <div className="card-header">
                <div>
                    <h3 className="company-name">{company}</h3>
                    <p className="role-name">{role}</p>
                </div>
                <div className="status-badge" style={statusStyle}>
                    {status}
                </div>
            </div>

            <div className="card-body">
                <div className="card-meta">
                    <div className="meta-item">
                        <Calendar size={16} />
                        <span>{new Date(date).toLocaleDateString()}</span>
                    </div>
                    {link && (
                        <a href={link} target="_blank" rel="noopener noreferrer" className="meta-item link">
                            <ExternalLink size={16} />
                            <span>Link da Vaga</span>
                        </a>
                    )}
                </div>

                {notes && <p className="card-notes">{notes}</p>}
            </div>

            <div className="card-footer">
                <button className="icon-btn edit-btn" onClick={() => onEdit(application)}>
                    <Edit2 size={18} />
                </button>
                <button className="icon-btn delete-btn" onClick={() => onDelete(id)}>
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

CardCandidatura.propTypes = {
    application: PropTypes.shape({
        id: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        role: PropTypes.string,
        link: PropTypes.string,
        date: PropTypes.string,
        status: PropTypes.string,
        notes: PropTypes.string,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default CardCandidatura;
