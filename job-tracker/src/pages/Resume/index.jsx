
import React, { useState, useEffect } from 'react';
import './Resume.css';






















const Resume = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Initial data (could be loaded from localStorage)
  const [resumeData, setResumeData] = useState({
    name: "José Vinícius",
    role: "Python Developer | Backend & Database Engineer",
    contact: {
      email: "seuemail@email.com",
      phone: "+55 81 99542-5342",
      location: "Brazil (Remote)",
      linkedin: "linkedin.com/in/josevinicius",
      github: "github.com/josevinicius",
      address: "",
      maritalStatus: ""
    },
    summary: `Python Developer and Junior DBA with hands-on experience in backend development, RESTful APIs, database design, and production data environments. I work daily with Python, SQL, and backend systems, handling real-world data manipulation, migrations, and performance optimization in production and staging databases.\n\nI have experience building APIs with Flask, validating data, handling errors, and working with relational databases such as MySQL, MariaDB, and Oracle. Comfortable working remotely, documenting technical issues, and collaborating asynchronously with technical teams.`,
    skills: [
      "Python", "Flask", "RESTful APIs", "Basic GraphQL concepts",
      "Backend validation and error handling", "SQL (MySQL, MariaDB, Oracle)",
      "Database schema design", "Database migrations", "Performance tuning",
      "Production & staging environments", "API testing (Postman / Insomnia)",
      "Git & GitHub", "Linux / Terminal", "Technical documentation",
      "Remote collaboration (Slack)"
    ],
    experience: [
      {
        role: "Junior DBA / Backend Developer",
        company: "Current Company",
        location: "Brazil (Remote/Hybrid)",
        period: "2024 – Present",
        bullets: [
          "Development and maintenance of backend APIs using Python and Flask",
          "Handling data manipulation in production and staging databases",
          "Writing and optimizing SQL queries for business-critical systems",
          "Managing database schema changes and migrations safely",
          "Implementing backend validation and error handling",
          "Supporting internal systems and automations using Python scripts",
          "Documenting incidents, bugs, and database changes"
        ],
      },
      {
        role: "Backend Developer (Projects & Automations)",
        company: "Personal & Freelance Projects",
        period: "2023 – Present",
        bullets: [
          "Built REST APIs for CRUD operations and integrations",
          "Developed automation scripts using Python and APIs",
          "Worked with authentication, data validation, and error handling",
          "Integrated backend systems with external services",
          "Version control using Git and GitHub"
        ],
      }
    ],

    education: [
      {
        course: "Technology Degree (In Progress)",
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
    ],
  });



























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
            <span
              contentEditable={isEditing}
              onBlur={(e) => handleUpdateField('contact.email', e.target.innerText)}
              suppressContentEditableWarning={true}
            >{resumeData.contact.email}</span>
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
                LinkedIn: <span
                  contentEditable={isEditing}
                  onBlur={(e) => handleUpdateField('contact.linkedin', e.target.innerText)}
                  suppressContentEditableWarning={true}
                >{resumeData.contact.linkedin}</span> |
              </span>
            )}
            {resumeData.contact.github && (
              <span>
                GitHub: <span
                  contentEditable={isEditing}
                  onBlur={(e) => handleUpdateField('contact.github', e.target.innerText)}
                  suppressContentEditableWarning={true}
                >{resumeData.contact.github}</span>
              </span>
            )}
          </div>
        </header>

        {/* SUMMARY */}
        <section className="resume-section">
          <div className="section-title">Professional Summary</div>
          <div
            className="section-content editable-area"
            contentEditable={isEditing}
            onBlur={(e) => handleUpdateField('summary', e.target.innerText)}
            suppressContentEditableWarning={true}
          >
            {resumeData.summary}
          </div>
        </section>

        {/* SKILLS */}
        <section className="resume-section">
          <div className="section-title">Skills & Keywords</div>
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
          <div className="section-title">Professional Experience</div>

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
                      Remover Experiência
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

        {/* EDUCATION */}
        <section className="resume-section">
          <div className="section-title">Education</div>
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
          <div className="section-title">Languages</div>
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
