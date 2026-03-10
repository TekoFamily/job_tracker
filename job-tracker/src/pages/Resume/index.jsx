
import React, { useState, useEffect } from 'react';
import './Resume.css';
import ResumeHistoryModal from '../../components/ResumeHistory/ResumeHistoryModal';









const INITIAL_RESUME_DATA = {
  lang: "pt", // pt or en
 
 
  "name": "José Vinícius Lourenço",
  "role": "Junior ABAP Developer | Backend & Database Specialist",
  "contact": {
    "email": "vviniciuslourenco@gmail.com",
    "phone": "+55 81 995126839",
    "location": "Recife - PE, Brazil",
    "linkedin": "https://www.linkedin.com/in/jose-vinicius-louren%C3%A7o-1a6b9014a/",
    "github": "https://github.com/ViniScooper"
  },

  "summary": "Software Engineer with a strong background in Backend and Databases, currently focused on a specialized career in SAP ABAP. Possesses 1 year and 2 months of practical experience in ABAP development (MM Module focus) and robust knowledge of modern development workflows (Git, SVN, Docker) gained at international consultancy Vanaci. Currently working as a Junior DBA/Backend Engineer, providing a solid foundation in SQL performance tuning and logic. Eager to join EY's collaborative team in Recife.",

  "skills": [
    "SAP ABAP (Reports, ALV, Dictionary)",
    "SAP MM Module (Functional & Technical knowledge)",
    "ABAP Debugging & Troubleshooting",
    "Version Control (Git, GitHub, SVN/Tortoise)",
    "Infrastructure Tools (Docker, MobaXterm, Putty)",
    "SQL (OpenSQL, Native SQL, Oracle, PL/SQL)",
    "Regex in ABAP",
    "Performance Tuning (Database & Code)",
    "Python", "Restful APIs",
    "ERP Logic (Experience with SAP & TOTVS Protheus)"
  ],

  "experience": [
    {
      "role": "Junior DBA / Backend Developer",
      "company": "Informa Software",
      "location": "Recife - PE, Brazil",
      "period": "2024 – Present",
      "bullets": [
        "Developing complex SQL queries and PL/SQL procedures (transferable logic to SAP HANA/OpenSQL).",
        "Performance tuning of database queries to reduce latency.",
        "Backend support using Python and ensuring data integrity in production environments.",
        "Creating technical documentation and managing access control."
      ]
    },
    {
      "role": "IT Systems Analyst (Intern)",
      "company": "Vanaci",
      "location": "Portugal (Remote Collaboration)",
      "period": "2024 (6 months)",
      "bullets": [
        "Managed code versioning and repositories using Git, GitHub, and SVN (Tortoise), ensuring code integrity across teams.",
        "Handled server connections and remote environment management using MobaXterm and Putty.",
        "Utilized Docker for containerization to standardize development environments.",
        "Supported system management routines and technical documentation for international projects."
      ]
    },
    {
      "role": "SAP ABAP Developer (Internship)",
      "company": "KarneKeijo Logística",
      "location": "Recife - PE, Brazil",
      "period": "Aug 2022 – Oct 2023 (1 year, 2 months)",
      "bullets": [
        "14 months of hands-on experience supporting the SAP MM (Materials Management) module.",
        "Development and maintenance of ABAP reports, ALV, and internal tables.",
        "Debugging standard and Z programs to identify root causes of issues.",
        "Performing SQL operations and data manipulation within SAP.",
        "Collaborating with functional consultants to implement business requirements."
      ]
    },
    {
      "role": "Junior Software Engineer (ERP / Backend)",
      "company": "Cod.ERP Tecnologia LTDA",
      "location": "Recife - PE, Brazil",
      "period": "May 2023 – May 2024",
      "bullets": [
        "Development in AdvPL (TOTVS Protheus), applying ERP logic similar to SAP.",
        "Implementation of backend business rules and database integrations.",
        "Support for ERP system modules and user assistance."
      ]
    }
  ],

  "education": [
    {
      "course": "Curso SAP ABAP para desenvolvedores",
      "institution": "Aline Sebrian Damasceno (Udemy)",
      "status": "Completed (97%)"
    },
    {
      "course": "SAP ABAP Training - in Plain English",
      "institution": "Siva Prasad (Udemy)",
      "status": "Completed"
    },
    {
      "course": "ABAP SAP - Regex!",
      "institution": "AbapFox Bertani",
      "status": "Completed"
    },
    {
      "course": "Technology Degree (Systems Analysis and Development)",
      "institution": "DESCOMPLICA",
      "status": "Graduation: July 2026"
    },
    {
      "course": "Oracle Database SQL & PL/SQL",
      "institution": "Oracle University",
      "status": "Completed"
    }
  ],

  "languages": [
    "Portuguese – Native",
    "English – Professional / Technical"
  ]
}





const LABELS = {
  pt: {
    summary: "Resumo Profissional",
    skills: "Habilidades & Competências",
    experience: "Experiência Profissional",
    projects: "Projetos & Destaques",
    education: "Educação",
    languages: "Idiomas",
    technologies: "Tecnologias",
    toggleLang: "Switch to English",
    langIcon: "🇺🇸"
  },
  en: {
    summary: "Professional Summary",
    skills: "Skills & Competencies",
    experience: "Professional Experience",
    projects: "Projects & Highlights",
    education: "Education",
    languages: "Languages",
    technologies: "Technologies",
    toggleLang: "Mudar para Português",
    langIcon: "🇧🇷"
  }
};








// Gera ID único
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const Resume = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [activeResumeId, setActiveResumeId] = useState(null);
  const [resumeData, setResumeData] = useState(INITIAL_RESUME_DATA);
  const [showHistory, setShowHistory] = useState(false);

  // Helper to safely get label
  const t = (key) => {
    const lang = resumeData.lang || 'pt';
    return LABELS[lang][key] || LABELS['pt'][key];
  };

  // Toggle Language
  const handleToggleLanguage = () => {
    const currentLang = resumeData.lang || 'pt';
    const newLang = currentLang === 'pt' ? 'en' : 'pt';
    handleUpdateField('lang', newLang);
  };

  // Load Resumes & Migration
  useEffect(() => {
    const savedResumes = localStorage.getItem('jobTracker_resumes');
    const savedActiveId = localStorage.getItem('jobTracker_activeResumeId');
    const legacyData = localStorage.getItem('resumeData');

    if (savedResumes) {
      const parsedResumes = JSON.parse(savedResumes);
      setResumes(parsedResumes);

      // Determine active resume
      if (savedActiveId && parsedResumes.find(r => r.id === savedActiveId)) {
        setActiveResumeId(savedActiveId);
        setResumeData(parsedResumes.find(r => r.id === savedActiveId).data);
      } else if (parsedResumes.length > 0) {
        // Fallback to first
        setActiveResumeId(parsedResumes[0].id);
        setResumeData(parsedResumes[0].data);
      }
    } else if (legacyData) {
      // Migration from single Resume
      const legacyResume = {
        id: generateId(),
        title: "Meu Currículo Principal",
        lastModified: new Date().toISOString(),
        data: { ...JSON.parse(legacyData), lang: 'pt' }
      };
      setResumes([legacyResume]);
      setActiveResumeId(legacyResume.id);
      setResumeData(legacyResume.data);
      localStorage.setItem('jobTracker_resumes', JSON.stringify([legacyResume]));
      localStorage.setItem('jobTracker_activeResumeId', legacyResume.id);
    } else {
      // Fresh Init
      const initialResume = {
        id: generateId(),
        title: "Currículo Padrão",
        lastModified: new Date().toISOString(),
        data: INITIAL_RESUME_DATA
      };
      setResumes([initialResume]);
      setActiveResumeId(initialResume.id);
      setResumeData(initialResume.data);
      localStorage.setItem('jobTracker_resumes', JSON.stringify([initialResume]));
      localStorage.setItem('jobTracker_activeResumeId', initialResume.id);
    }
  }, []);

  // Update logic: Updates current resume in local state + triggers persistent save
  const updateActiveResume = (newData) => {
    setResumeData(newData);

    // Update the list
    const updatedResumes = resumes.map(r =>
      r.id === activeResumeId
        ? { ...r, data: newData, lastModified: new Date().toISOString() }
        : r
    );

    setResumes(updatedResumes);
    localStorage.setItem('jobTracker_resumes', JSON.stringify(updatedResumes));
  };

  // Switch Resume
  const handleSwitchResume = (id) => {
    const target = resumes.find(r => r.id === id);
    if (target) {
      setActiveResumeId(id);
      setResumeData(target.data);
      localStorage.setItem('jobTracker_activeResumeId', id);
      setShowHistory(false);
      setIsEditing(false);
    }
  };

  // Create New Resume
  const handleCreateResume = (name, initialData = null) => {
    const newResume = {
      id: generateId(),
      title: name,
      lastModified: new Date().toISOString(),
      data: initialData || INITIAL_RESUME_DATA // Clone base template or use provided data
    };

    const newResumes = [...resumes, newResume];
    setResumes(newResumes);
    localStorage.setItem('jobTracker_resumes', JSON.stringify(newResumes));

    // Switch to it
    handleSwitchResume(newResume.id);
  };

  // Duplicate Resume
  const handleDuplicateResume = (id) => {
    const original = resumes.find(r => r.id === id);
    if (!original) return;

    const copy = {
      id: generateId(),
      title: `${original.title} (Cópia)`,
      lastModified: new Date().toISOString(),
      data: JSON.parse(JSON.stringify(original.data)) // Deep copy
    };

    const newResumes = [...resumes, copy];
    setResumes(newResumes);
    localStorage.setItem('jobTracker_resumes', JSON.stringify(newResumes));
  };

  // Delete Resume
  const handleDeleteResume = (id) => {
    if (resumes.length <= 1) {
      alert("Você precisa ter pelo menos um currículo.");
      return;
    }

    if (!window.confirm("Tem certeza que deseja excluir este currículo?")) return;

    const newResumes = resumes.filter(r => r.id !== id);
    setResumes(newResumes);
    localStorage.setItem('jobTracker_resumes', JSON.stringify(newResumes));

    // If we deleted the active one, switch to the first one available
    if (activeResumeId === id) {
      handleSwitchResume(newResumes[0].id);
    }
  };

  const handleReset = () => {
    if (window.confirm("Deseja resetar o currículo para os dados padrão do código? Isso apagará suas edições locais para este perfil.")) {
      updateActiveResume(INITIAL_RESUME_DATA);
      setIsEditing(false);
    }
  };

  // Field Updates (Generalized)
  const handleUpdateField = (path, value) => {
    const newData = { ...resumeData };
    const keys = path.split('.');
    let current = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    updateActiveResume(newData);
  };

  const handleUpdateArrayItem = (path, index, value) => {
    const newData = { ...resumeData };
    const keys = path.split('.');
    let current = newData;

    for (let i = 0; i < keys.length; i++) {
      current = current[keys[i]];
    }
    current[index] = value;

    updateActiveResume(newData);
  };

  const handleBack = () => window.history.back();
  const handlePrint = () => window.print();

  // Find active title for display
  const activeTitle = resumes.find(r => r.id === activeResumeId)?.title || "Meu Currículo";

  return (
    <div className="resume-container">
      <ResumeHistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        resumes={resumes}
        activeResumeId={activeResumeId}
        onSelect={handleSwitchResume}
        onCreate={handleCreateResume}
        onDuplicate={handleDuplicateResume}
        onDelete={handleDeleteResume}
      />

      <div className="actions-bar no-print">
        <div className="left-actions">
          <button onClick={handleBack} className="btn-secondary">
            Voltar
          </button>
        </div>

        <div className="center-actions">
          <button
            className="btn-history"
            onClick={() => setShowHistory(true)}
          >
            📂 {activeTitle} (Trocar)
          </button>
        </div>

        <div className="right-actions">
          {/* LANGUAGE TOGGLE */}
          <button
            className="btn-secondary"
            onClick={handleToggleLanguage}
            title={t('toggleLang')}
          >
            {t('langIcon')} {resumeData.lang === 'pt' ? 'PT' : 'EN'}
          </button>

          {isEditing && (
            <button onClick={handleReset} className="btn-secondary" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
              Resetar Padrão
            </button>
          )}

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`btn-edit ${isEditing ? 'active' : ''}`}
          >
            {isEditing ? '💎 Visualizar' : '📝 Editar Currículo'}
          </button>

          <button onClick={handlePrint} className="btn-primary">
            Salvar PDF
          </button>
        </div>
      </div>

      <div className={`resume-paper ${isEditing ? 'editing-mode' : ''}`}>
        {/* HEADER */}
        <header className="resume-header">
          <h1
            contentEditable={isEditing}
            onBlur={(e) => handleUpdateField('name', e.target.innerText)}
            suppressContentEditableWarning={true}
            className="resume-name"
          >
            {resumeData.name}
          </h1>
          <div
            contentEditable={isEditing}
            onBlur={(e) => handleUpdateField('role', e.target.innerText)}
            suppressContentEditableWarning={true}
            className="resume-role"
          >
            {resumeData.role}
          </div>

          <div className="resume-contact">
            {isEditing ? (
              <span
                contentEditable={true}
                onBlur={(e) => handleUpdateField('contact.email', e.target.innerText)}
                suppressContentEditableWarning={true}
              >{resumeData.contact.email}</span>
            ) : (
              <a href={`mailto:${resumeData.contact.email}`}>{resumeData.contact.email}</a>
            )}
            {" | "}
            <span
              contentEditable={isEditing}
              onBlur={(e) => handleUpdateField('contact.phone', e.target.innerText)}
              suppressContentEditableWarning={true}
            >{resumeData.contact.phone}</span>
            {" | "}
            <span
              contentEditable={isEditing}
              onBlur={(e) => handleUpdateField('contact.location', e.target.innerText)}
              suppressContentEditableWarning={true}
            >{resumeData.contact.location}</span>
            <br />
            {resumeData.contact.linkedin && (
              <span>
                LinkedIn: {isEditing ? (
                  <span
                    contentEditable={true}
                    onBlur={(e) => handleUpdateField('contact.linkedin', e.target.innerText)}
                    suppressContentEditableWarning={true}
                  >{resumeData.contact.linkedin}</span>
                ) : (
                  <a href={resumeData.contact.linkedin.startsWith('http') ? resumeData.contact.linkedin : `https://${resumeData.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                    {resumeData.contact.linkedin.replace('https://', '').replace('www.', '')}
                  </a>
                )} |
              </span>
            )}
            {resumeData.contact.github && (
              <span>
                GitHub: {isEditing ? (
                  <span
                    contentEditable={true}
                    onBlur={(e) => handleUpdateField('contact.github', e.target.innerText)}
                    suppressContentEditableWarning={true}
                  >{resumeData.contact.github}</span>
                ) : (
                  <a href={resumeData.contact.github.startsWith('http') ? resumeData.contact.github : `https://${resumeData.contact.github}`} target="_blank" rel="noopener noreferrer">
                    {resumeData.contact.github.replace('https://', '').replace('www.', '')}
                  </a>
                )}
              </span>
            )}
          </div>
        </header>

        {/* SUMMARY */}
        <section className="resume-section">
          <div className="section-title">{t('summary')}</div>
          <div
            className="section-content editable-area"
            contentEditable={isEditing}
            onBlur={(e) => handleUpdateField('summary', e.target.innerText)}
            suppressContentEditableWarning={true}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {resumeData.summary}
          </div>
        </section>

        {/* SKILLS */}
        <section className="resume-section">
          <div className="section-title">{t('skills')}</div>
          <ul className="skills-grid">
            {resumeData.skills.map((skill, i) => (
              <li key={i} className="skill-item">
                <span
                  contentEditable={isEditing}
                  onBlur={(e) => handleUpdateArrayItem('skills', i, e.target.innerText)}
                  suppressContentEditableWarning={true}
                >
                  {skill}
                </span>
                {isEditing && (
                  <button
                    className="btn-delete-small no-print"
                    onClick={() => {
                      const newSkills = resumeData.skills.filter((_, index) => index !== i);
                      updateActiveResume({ ...resumeData, skills: newSkills });
                    }}
                  >
                    ×
                  </button>
                )}
              </li>
            ))}
            {isEditing && (
              <button
                className="btn-add-small no-print"
                onClick={() => {
                  const newSkills = [...resumeData.skills, "Nova Habilidade"];
                  updateActiveResume({ ...resumeData, skills: newSkills });
                }}
              >
                + Adicionar Habilidade
              </button>
            )}
          </ul>
        </section>

        {/* EXPERIENCE */}
        <section className="resume-section">
          <div className="section-title">{t('experience')}</div>

          {resumeData.experience.map((job, i) => (
            <div key={i} className={`job-entry ${job.forcePageBreak ? 'force-page-break' : ''}`}>
              <div className="job-header">
                <div>
                  <span
                    contentEditable={isEditing}
                    onBlur={(e) => {
                      const newExp = [...resumeData.experience];
                      newExp[i].role = e.target.innerText;
                      updateActiveResume({ ...resumeData, experience: newExp });
                    }}
                    suppressContentEditableWarning={true}
                    style={{ fontWeight: 'bold' }}
                  >{job.role}</span>
                  {" - "}
                  <span
                    contentEditable={isEditing}
                    onBlur={(e) => {
                      const newExp = [...resumeData.experience];
                      newExp[i].company = e.target.innerText;
                      updateActiveResume({ ...resumeData, experience: newExp });
                    }}
                    suppressContentEditableWarning={true}
                  >{job.company}</span>
                </div>
                <div className="job-period-container">
                  <span
                    className="job-period"
                    contentEditable={isEditing}
                    onBlur={(e) => {
                      const newExp = [...resumeData.experience];
                      newExp[i].period = e.target.innerText;
                      updateActiveResume({ ...resumeData, experience: newExp });
                    }}
                    suppressContentEditableWarning={true}
                  >{job.period}</span>
                  {isEditing && (
                    <button
                      className="btn-delete-small no-print"
                      onClick={() => {
                        const newExp = resumeData.experience.filter((_, index) => index !== i);
                        updateActiveResume({ ...resumeData, experience: newExp });
                      }}
                    >
                    </button>
                  )}
                </div>
              </div>
              <ul className="job-bullets">
                {job.bullets.map((item, j) => (
                  <li key={j} className="bullet-item">
                    <span
                      contentEditable={isEditing}
                      onBlur={(e) => {
                        const newExp = [...resumeData.experience];
                        newExp[i].bullets[j] = e.target.innerText;
                        updateActiveResume({ ...resumeData, experience: newExp });
                      }}
                      suppressContentEditableWarning={true}
                    >
                      {item}
                    </span>
                    {isEditing && (
                      <button
                        className="btn-delete-small no-print"
                        onClick={() => {
                          const newExp = [...resumeData.experience];
                          newExp[i].bullets = newExp[i].bullets.filter((_, index) => index !== j);
                          updateActiveResume({ ...resumeData, experience: newExp });
                        }}
                      >
                        ×
                      </button>
                    )}
                  </li>
                ))}
                {isEditing && (
                  <button
                    className="btn-add-small no-print"
                    onClick={() => {
                      const newExp = [...resumeData.experience];
                      newExp[i].bullets = [...newExp[i].bullets, "Nova responsabilidade/conquista"];
                      updateActiveResume({ ...resumeData, experience: newExp });
                    }}
                  >
                    + Adicionar Bullet
                  </button>
                )}
              </ul>
              {isEditing && (
                <div className="no-print" style={{ marginTop: 5 }}>
                  <label style={{ fontSize: '11px', color: '#666', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={job.forcePageBreak || false}
                      onChange={(e) => {
                        const newExp = [...resumeData.experience];
                        newExp[i].forcePageBreak = e.target.checked;
                        updateActiveResume({ ...resumeData, experience: newExp });
                      }}
                      style={{ marginRight: 5 }}
                    />
                    Pular página após este item 📄
                  </label>
                </div>
              )}
            </div>
          ))
          }
          {
            isEditing && (
              <button
                className="btn-add-experience no-print"
                onClick={() => {
                  const newJob = {
                    role: "Cargo",
                    company: "Empresa",
                    period: "20XX - 20XX",
                    bullets: ["Nova atividade"]
                  };
                  const newExp = [...resumeData.experience, newJob];
                  updateActiveResume({ ...resumeData, experience: newExp });
                }}
              >
                + Adicionar Nova Experiência
              </button>
            )
          }
        </section >

        {/* PROJECTS */}
        {
          (isEditing || (resumeData.projects && resumeData.projects.length > 0)) && (
            <section className="resume-section">
              <div className="section-title">{t('projects')}</div>
              {resumeData.projects?.map((project, i) => (
                <div key={i} className="job-entry" style={{ marginBottom: 10 }}>
                  <div className="job-header">
                    <span
                      contentEditable={isEditing}
                      onBlur={(e) => {
                        const newProjects = [...(resumeData.projects || [])];
                        newProjects[i].name = e.target.innerText;
                        updateActiveResume({ ...resumeData, projects: newProjects });
                      }}
                      suppressContentEditableWarning={true}
                      style={{ fontWeight: 'bold' }}
                    >{project.name}</span>
                    {isEditing && (
                      <button
                        className="btn-delete-small no-print"
                        onClick={() => {
                          const newProjects = resumeData.projects.filter((_, index) => index !== i);
                          updateActiveResume({ ...resumeData, projects: newProjects });
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <div
                    contentEditable={isEditing}
                    onBlur={(e) => {
                      const newProjects = [...(resumeData.projects || [])];
                      newProjects[i].description = e.target.innerText;
                      updateActiveResume({ ...resumeData, projects: newProjects });
                    }}
                    suppressContentEditableWarning={true}
                    className="section-content"
                  >
                    {project.description}
                  </div>
                  <div style={{ fontSize: '9pt', fontStyle: 'italic', marginTop: 2 }}>
                    {t('technologies')}: <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        const newProjects = [...(resumeData.projects || [])];
                        // Split text by comma to recreate the array
                        newProjects[i].technologies = e.target.innerText.split(',').map(t => t.trim()).filter(t => t.length > 0);
                        updateActiveResume({ ...resumeData, projects: newProjects });
                      }}
                    >
                      {project.technologies.join(', ')}
                    </span>
                  </div>
                </div>
              ))}
              {isEditing && (
                <button
                  className="btn-add-small no-print"
                  onClick={() => {
                    const newProj = {
                      name: "Nome do Projeto",
                      description: "Descrição curta do projeto.",
                      technologies: ["Tech 1", "Tech 2"]
                    };
                    const newProjects = [...(resumeData.projects || []), newProj];
                    updateActiveResume({ ...resumeData, projects: newProjects });
                  }}
                >
                  + Adicionar Projeto
                </button>
              )}
            </section>
          )
        }

        {/* EDUCATION */}
        <section className="resume-section">
          <div className="section-title">{t('education')}</div>
          <div className="section-content">
            {resumeData.education.map((edu, i) => (
              <div key={i} className="education-item" style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <strong
                    contentEditable={isEditing}
                    onBlur={(e) => {
                      const newEdu = [...resumeData.education];
                      newEdu[i].course = e.target.innerText;
                      updateActiveResume({ ...resumeData, education: newEdu });
                    }}
                    suppressContentEditableWarning={true}
                  >{edu.course}</strong><br />
                  <span
                    contentEditable={isEditing}
                    onBlur={(e) => {
                      const newEdu = [...resumeData.education];
                      newEdu[i].institution = e.target.innerText;
                      updateActiveResume({ ...resumeData, education: newEdu });
                    }}
                    suppressContentEditableWarning={true}
                  >{edu.institution}</span><br />
                  <em
                    contentEditable={isEditing}
                    onBlur={(e) => {
                      const newEdu = [...resumeData.education];
                      newEdu[i].status = e.target.innerText;
                      updateActiveResume({ ...resumeData, education: newEdu });
                    }}
                    suppressContentEditableWarning={true}
                  >{edu.status}</em>
                </div>
                {isEditing && (
                  <button
                    className="btn-delete-small no-print"
                    onClick={() => {
                      const newEdu = resumeData.education.filter((_, index) => index !== i);
                      updateActiveResume({ ...resumeData, education: newEdu });
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                className="btn-add-small no-print"
                onClick={() => {
                  const newEdu = {
                    course: "Nome do Curso",
                    institution: "Instituição de Ensino",
                    status: "Concluído / Em andamento"
                  };
                  const newEducation = [...resumeData.education, newEdu];
                  updateActiveResume({ ...resumeData, education: newEducation });
                }}
              >
                + Adicionar Educação
              </button>
            )}
          </div>
        </section>

        {/* LANGUAGES */}
        <section className="resume-section">
          <div className="section-title">{t('languages')}</div>
          <div className="section-content">
            {resumeData.languages.map((lang, i) => (
              <span key={i}>
                <span
                  contentEditable={isEditing}
                  onBlur={(e) => {
                    const newLangs = [...resumeData.languages];
                    newLangs[i] = e.target.innerText;
                    updateActiveResume({ ...resumeData, languages: newLangs });
                  }}
                  suppressContentEditableWarning={true}
                >{lang}</span>
                {i < resumeData.languages.length - 1 && " • "}
              </span>
            ))}
          </div>
        </section>
      </div >
    </div >
  );
};

export default Resume;
