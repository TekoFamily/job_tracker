
import React, { useState, useEffect } from 'react';
import './Resume.css';
import ResumeHistoryModal from '../../components/ResumeHistory/ResumeHistoryModal';

const INITIAL_RESUME_DATA = {
  lang: "pt", // pt or en
  name: "José Vinícius Lourenço",
  role: "Backend Engineer | Junior DBA (Oracle & SQL)",
  contact: {
    email: "vviniciuslourenco@gmail.com",
    phone: "+55 81 995126839",
    location: "Recife - PE, Brazil (Remote / Hybrid)",
    linkedin: "https://www.linkedin.com/in/jose-vinicius-louren%C3%A7o-1a6b9014a/",
    github: "https://github.com/ViniScooper",
    address: "Recife - PE, Brazil",
    maritalStatus: ""
  },

  summary: `
Backend-focused Python Developer and Junior DBA with solid experience working in real production environments.
Daily hands-on experience with Python, Flask, RESTful APIs, SQL, and Oracle databases, supporting business-critical systems in production and staging.

Strong background in database operations, including query optimization, PL/SQL routines, data manipulation, and incident resolution.
Experienced in backend development, ERP systems (TOTVS Protheus, SAP), automations, and technical documentation.
Comfortable working remotely, collaborating asynchronously, and handling sensitive production data with responsibility.
`,

  skills: [
    "Python", "Flask", "RESTful APIs", "Backend validation & error handling",
    "API design (CRUD, integrations)", "Automation with Python scripts",
    "SQL (Oracle, MySQL, MariaDB)", "Oracle Database administration (Junior DBA)",
    "PL/SQL (procedures, functions, packages, triggers)", "Query optimization & performance tuning",
    "Database schema design", "Production & staging environments", "Backup & restore routines",
    "Access control & data security", "Git & GitHub", "TORTOISE SVN", "Linux / Terminal",
    "API testing (Postman, Insomnia)", "Technical documentation", "Remote collaboration (Slack, async teams)",
    "TOTVS Protheus (AdvPL)", "SAP ABAP (development)", "EQM"
  ],

  experience: [
    {
      role: "Junior DBA / Backend Developer",
      company: "Informa Software",
      location: "Recife - PE, Brazil",
      period: "2024 – Present",
      bullets: [
        "Administration and support of Oracle databases in production and staging environments",
        "Development and maintenance of PL/SQL procedures, functions, packages, and triggers",
        "Analysis, troubleshooting, and resolution of production database incidents",
        "Writing, optimizing, and maintaining complex SQL queries for business systems",
        "Supporting backend systems with Python scripts and internal APIs",
        "Managing database schema changes and controlled data migrations",
        "Monitoring performance and assisting in query and process optimization",
        "Handling access control, permissions, and data integrity",
        "Documenting database changes, incidents, and technical procedures",
        "Working closely with developers and analysts to support system evolution"
      ]
    },
    {
      role: "Junior Software Engineer (AdvPL / ERP)",
      company: "Cod.ERP Tecnologia LTDA",
      location: "Recife - PE, Brazil",
      period: "May 2023 – May 2024",
      bullets: [
        "Development and maintenance of ERP solutions using AdvPL (TOTVS Protheus)",
        "Customization and extension of Protheus modules according to business needs",
        "Backend development focused on business rules and data processing",
        "Database interaction using SQL for reports and integrations",
        "Bug fixing, system improvements, and technical documentation",
        "Support for ERP implementations and internal users"
      ]
    },
    {
      role: "SAP ABAP Developer (Internship)",
      company: "KarneKeijo Logística",
      location: "Recife - PE, Brazil",
      period: "Aug 2022 – Mar 2023",
      bullets: [
        "Development using SAP ABAP language",
        "Creation and manipulation of internal tables",
        "Support for SAP modules and backend processes",
        "Database interaction and basic SQL operations",
        "Code contribution, testing, and documentation"
      ]
    },
    {
      role: "Backend Developer & Automation (Projects / Freelance)",
      company: "Personal & Freelance Projects",
      period: "2023 – Present",
      bullets: [
        "Built RESTful APIs using Python and Flask",
        "Developed CRUD systems connected to relational databases",
        "Created backend validation and structured error handling",
        "Worked with database modeling and migrations",
        "Developed automation scripts integrating APIs and databases",
        "Version control and collaboration using Git and GitHub"
      ]
    }
  ],

  projects: [
    {
      name: "Flask REST API – Backend System",
      description: "RESTful API built with Flask for CRUD operations, database integration, validation, and error handling.",
      technologies: ["Python", "Flask", "SQL", "MySQL/MariaDB"],
    },
    {
      name: "Database Management & Automations",
      description: "Python scripts for database manipulation, reporting, and internal automations in production environments.",
      technologies: ["Python", "SQL", "Oracle"],
    },
    {
      name: "ERP Customizations (TOTVS Protheus)",
      description: "Custom backend routines and business rules using AdvPL for ERP systems.",
      technologies: ["AdvPL", "TOTVS Protheus", "SQL"],
    }
  ],

  education: [
    {
      course: "Technology Degree",
      institution: "College",
      status: "In progress"
    },
    {
      course: "Python, Backend & Databases",
      institution: "Online Courses (Udemy)",
      status: "Completed / Ongoing"
    }
  ],

  languages: [
    "Portuguese – Native",
    "English – Technical / Intermediate"
  ]
};

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
