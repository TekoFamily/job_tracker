
import React, { useState, useEffect } from 'react';
import './Resume.css';

const INITIAL_RESUME_DATA = {
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

const Resume = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [resumeData, setResumeData] = useState(INITIAL_RESUME_DATA);

  // Persist changes to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem('resumeData', JSON.stringify(data));
  };

  const handleReset = () => {
    if (window.confirm("Deseja resetar o currículo para os dados padrão do código? Isso apagará suas edições locais.")) {
      setResumeData(INITIAL_RESUME_DATA);
      saveToLocalStorage(INITIAL_RESUME_DATA);
      setIsEditing(false);
    }
  };

  const handleUpdateField = (path, value) => {
    const newData = { ...resumeData };
    const keys = path.split('.');
    let current = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    setResumeData(newData);
    saveToLocalStorage(newData);
  };

  const handleUpdateArrayItem = (path, index, value) => {
    const newData = { ...resumeData };
    const keys = path.split('.');
    let current = newData;

    for (let i = 0; i < keys.length; i++) {
      current = current[keys[i]];
    }
    current[index] = value;

    setResumeData(newData);
    saveToLocalStorage(newData);
  };

  const handleBack = () => window.history.back();
  const handlePrint = () => window.print();

  return (
    <div className="resume-container">
      <div className="actions-bar no-print">
        <div className="left-actions">
          <button onClick={handleBack} className="btn-secondary">
            Voltar
          </button>
        </div>

        <div className="right-actions">
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
          <div className="section-title">Resumo Profissional</div>
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
          <div className="section-title">Habilidades & Competências</div>
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
                      setResumeData({ ...resumeData, skills: newSkills });
                      saveToLocalStorage({ ...resumeData, skills: newSkills });
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
                  setResumeData({ ...resumeData, skills: newSkills });
                  saveToLocalStorage({ ...resumeData, skills: newSkills });
                }}
              >
                + Adicionar Habilidade
              </button>
            )}
          </ul>
        </section>

        {/* EXPERIENCE */}
        <section className="resume-section">
          <div className="section-title">Experiência Profissional</div>

          {resumeData.experience.map((job, i) => (
            <div key={i} className="job-entry">
              <div className="job-header">
                <div>
                  <span
                    contentEditable={isEditing}
                    onBlur={(e) => {
                      const newExp = [...resumeData.experience];
                      newExp[i].role = e.target.innerText;
                      setResumeData({ ...resumeData, experience: newExp });
                      saveToLocalStorage({ ...resumeData, experience: newExp });
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
                      setResumeData({ ...resumeData, experience: newExp });
                      saveToLocalStorage({ ...resumeData, experience: newExp });
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
                      setResumeData({ ...resumeData, experience: newExp });
                      saveToLocalStorage({ ...resumeData, experience: newExp });
                    }}
                    suppressContentEditableWarning={true}
                  >{job.period}</span>
                  {isEditing && (
                    <button
                      className="btn-delete-small no-print"
                      onClick={() => {
                        const newExp = resumeData.experience.filter((_, index) => index !== i);
                        setResumeData({ ...resumeData, experience: newExp });
                        saveToLocalStorage({ ...resumeData, experience: newExp });
                      }}
                    >
                      ×
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
                        setResumeData({ ...resumeData, experience: newExp });
                        saveToLocalStorage({ ...resumeData, experience: newExp });
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
                          setResumeData({ ...resumeData, experience: newExp });
                          saveToLocalStorage({ ...resumeData, experience: newExp });
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
                      setResumeData({ ...resumeData, experience: newExp });
                      saveToLocalStorage({ ...resumeData, experience: newExp });
                    }}
                  >
                    + Adicionar Bullet
                  </button>
                )}
              </ul>
            </div>
          ))}
          {isEditing && (
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
                setResumeData({ ...resumeData, experience: newExp });
                saveToLocalStorage({ ...resumeData, experience: newExp });
              }}
            >
              + Adicionar Nova Experiência
            </button>
          )}
        </section>

        {/* PROJECTS */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <section className="resume-section">
            <div className="section-title">Projetos & Destaques</div>
            {resumeData.projects.map((project, i) => (
              <div key={i} className="job-entry" style={{ marginBottom: 10 }}>
                <div className="job-header">
                  <span
                    contentEditable={isEditing}
                    onBlur={(e) => {
                      const newProjects = [...resumeData.projects];
                      newProjects[i].name = e.target.innerText;
                      setResumeData({ ...resumeData, projects: newProjects });
                      saveToLocalStorage({ ...resumeData, projects: newProjects });
                    }}
                    suppressContentEditableWarning={true}
                    style={{ fontWeight: 'bold' }}
                  >{project.name}</span>
                  {isEditing && (
                    <button
                      className="btn-delete-small no-print"
                      onClick={() => {
                        const newProjects = resumeData.projects.filter((_, index) => index !== i);
                        setResumeData({ ...resumeData, projects: newProjects });
                        saveToLocalStorage({ ...resumeData, projects: newProjects });
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
                <div
                  contentEditable={isEditing}
                  onBlur={(e) => {
                    const newProjects = [...resumeData.projects];
                    newProjects[i].description = e.target.innerText;
                    setResumeData({ ...resumeData, projects: newProjects });
                    saveToLocalStorage({ ...resumeData, projects: newProjects });
                  }}
                  suppressContentEditableWarning={true}
                  className="section-content"
                >
                  {project.description}
                </div>
                <div style={{ fontSize: '9pt', fontStyle: 'italic', marginTop: 2 }}>
                  Tecnologias: {project.technologies.join(', ')}
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
                  const newProjects = [...resumeData.projects, newProj];
                  setResumeData({ ...resumeData, projects: newProjects });
                  saveToLocalStorage({ ...resumeData, projects: newProjects });
                }}
              >
                + Adicionar Projeto
              </button>
            )}
          </section>
        )}

        {/* EDUCATION */}
        <section className="resume-section">
          <div className="section-title">Educação</div>
          <div className="section-content">
            {resumeData.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <strong
                  contentEditable={isEditing}
                  onBlur={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[i].course = e.target.innerText;
                    setResumeData({ ...resumeData, education: newEdu });
                    saveToLocalStorage({ ...resumeData, education: newEdu });
                  }}
                  suppressContentEditableWarning={true}
                >{edu.course}</strong><br />
                <span
                  contentEditable={isEditing}
                  onBlur={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[i].institution = e.target.innerText;
                    setResumeData({ ...resumeData, education: newEdu });
                    saveToLocalStorage({ ...resumeData, education: newEdu });
                  }}
                  suppressContentEditableWarning={true}
                >{edu.institution}</span><br />
                <em
                  contentEditable={isEditing}
                  onBlur={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[i].status = e.target.innerText;
                    setResumeData({ ...resumeData, education: newEdu });
                    saveToLocalStorage({ ...resumeData, education: newEdu });
                  }}
                  suppressContentEditableWarning={true}
                >{edu.status}</em>
              </div>
            ))}
          </div>
        </section>

        {/* LANGUAGES */}
        <section className="resume-section">
          <div className="section-title">Idiomas</div>
          <div className="section-content">
            {resumeData.languages.map((lang, i) => (
              <span key={i}>
                <span
                  contentEditable={isEditing}
                  onBlur={(e) => {
                    const newLangs = [...resumeData.languages];
                    newLangs[i] = e.target.innerText;
                    setResumeData({ ...resumeData, languages: newLangs });
                    saveToLocalStorage({ ...resumeData, languages: newLangs });
                  }}
                  suppressContentEditableWarning={true}
                >{lang}</span>
                {i < resumeData.languages.length - 1 && " • "}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
