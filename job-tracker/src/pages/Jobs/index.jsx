
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { fetchRecommendedJobs } from '../../services/jobService';
import { calculateJobMatch } from '../../services/matcherService';
import { Briefcase, CheckCircle, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';
import './Jobs.css';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resumeData, setResumeData] = useState(null);

    useEffect(() => {
        // Load resume data from localStorage
        const savedResume = localStorage.getItem('resumeData');
        if (savedResume) {
            setResumeData(JSON.parse(savedResume));
        }

        loadJobs();
    }, []);

    const loadJobs = async () => {
        setLoading(true);
        const data = await fetchRecommendedJobs();
        setJobs(data);
        setLoading(false);
    };

    const getMatchedJobs = () => {
        if (!resumeData) return jobs.map(j => ({ ...j, match: { score: 0 } }));

        return jobs.map(job => {
            const match = calculateJobMatch(resumeData, job);
            return { ...job, match };
        }).sort((a, b) => b.match.score - a.match.score);
    };

    const matchedJobs = getMatchedJobs();

    return (
        <>
            <Navbar />
            <div className="container jobs-page">
                <header className="jobs-header">
                    <div>
                        <h1 className="page-title">Vagas Recomendadas</h1>
                        <p className="page-subtitle">Com base no seu currículo atual e experiências.</p>
                    </div>
                    {!loading && (
                        <button onClick={loadJobs} className="btn-secondary">Atualizar Vagas</button>
                    )}
                </header>

                {!resumeData && (
                    <div className="alert-banner">
                        <AlertCircle size={20} />
                        <span>Preencha seu <b>Currículo</b> para ver o nível de compatibilidade com as vagas.</span>
                    </div>
                )}

                {loading ? (
                    <div className="loading-state">
                        <Loader2 className="spinner" size={40} />
                        <p>Buscando as melhores oportunidades para você...</p>
                    </div>
                ) : (
                    <div className="jobs-grid">
                        {matchedJobs.map(job => (
                            <div key={job.id} className="job-card glass-panel">
                                <div className="job-card-header">
                                    <div className="company-info">
                                        <div className="company-logo">
                                            {job.company.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="job-title">{job.title}</h3>
                                            <p className="company-name">{job.company} • {job.location}</p>
                                        </div>
                                    </div>
                                    {resumeData && (
                                        <div className={`match-badge ${job.match.score > 70 ? 'high' : job.match.score > 40 ? 'medium' : 'low'}`}>
                                            {job.match.score}% Match
                                        </div>
                                    )}
                                </div>

                                <div className="job-tags">
                                    {job.tags.slice(0, 5).map(tag => (
                                        <span key={tag} className="job-tag">{tag}</span>
                                    ))}
                                    {job.level !== 'not_specified' && (
                                        <span className="job-tag level-tag">{job.level}</span>
                                    )}
                                </div>

                                {resumeData && job.match.matchingSkills.length > 0 && (
                                    <div className="match-details">
                                        <p className="match-label">Seu perfil atende:</p>
                                        <div className="matching-skills">
                                            {job.match.matchingSkills.slice(0, 4).map(skill => (
                                                <span key={skill} className="skill-match">
                                                    <CheckCircle size={12} /> {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="job-card-footer">
                                    <span className="job-posted">Postado em {new Date(job.postedAt).toLocaleDateString()}</span>
                                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="btn-view-job">
                                        Ver Vaga <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && matchedJobs.length === 0 && (
                    <div className="empty-state">
                        <Briefcase size={60} />
                        <h3>Nenhuma vaga encontrada</h3>
                        <p>Tente atualizar a página ou verificar sua conexão.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Jobs;
