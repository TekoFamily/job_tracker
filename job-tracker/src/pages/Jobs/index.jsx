
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { fetchRecommendedJobs } from '../../services/jobService';
import { calculateJobMatch } from '../../services/matcherService';
import { Briefcase, CheckCircle, AlertCircle, ExternalLink, Loader2, Globe, Server, Building2, Code2 } from 'lucide-react';
import './Jobs.css';

const JOB_BOARDS = [
    {
        category: "Tech & Remote-First",
        icon: <Globe size={20} />,
        sites: [
            { name: "Remote OK", url: "https://remoteok.com", desc: "Startups e empresas globais" },
            { name: "We Work Remotely", url: "https://weworkremotely.com", desc: "Backend, dev, infra, SQL/DBA" },
            { name: "Remotive", url: "https://remotive.com", desc: "Newsletter + vagas remotas" },
            { name: "FlexJobs", url: "https://flexjobs.com", desc: "Remotas/Híbrido (Curadoria)" }
        ]
    },
    {
        category: "Tech Focus",
        icon: <Server size={20} />,
        sites: [
            { name: "Stack Overflow Jobs", url: "https://stackoverflow.com/jobs", desc: "Muitas vagas de dev" },
            { name: "GitHub Jobs", url: "https://jobs.github.com", desc: "Dev roles, APIs, backend" }
        ]
    },
    {
        category: "Enterprise & Startups",
        icon: <Building2 size={20} />,
        sites: [
            { name: "Indeed (Global)", url: "https://indeed.com", desc: "Filtros por idioma e remote" },
            { name: "Glassdoor", url: "https://glassdoor.com", desc: "Vagas + Reviews" },
            { name: "Wellfound (AngelList)", url: "https://wellfound.com", desc: "Startups reais, 100% gratuita. Backend/DB/SAP." }
        ]
    },
    {
        category: "Coding Challenges & Roles",
        icon: <Code2 size={20} />,
        sites: [
            { name: "HackerRank Jobs", url: "https://www.hackerrank.com/jobs", desc: "Code challenges + vagas" },
            { name: "LeetCode Jobs", url: "https://leetcode.com/jobs", desc: "Vagas para devs e SRE" }
        ]
    }
];

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

                <section className="international-boards-section">
                    <h2 className="section-header">🌍 Melhores Sites para Vagas Internacionais</h2>
                    <div className="boards-grid">
                        {JOB_BOARDS.map((category, i) => (
                            <div key={i} className="board-card glass-panel">
                                <div className="board-header">
                                    {category.icon}
                                    <h3>{category.category}</h3>
                                </div>
                                <ul className="site-list">
                                    {category.sites.map((site, j) => (
                                        <li key={j}>
                                            <a href={site.url} target="_blank" rel="noopener noreferrer" className="site-link">
                                                <strong>{site.name}</strong>
                                                <ExternalLink size={12} className="link-icon" />
                                            </a>
                                            <span className="site-desc">{site.desc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Jobs;
