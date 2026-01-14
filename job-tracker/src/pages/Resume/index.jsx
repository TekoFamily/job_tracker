
import React from 'react';
import './Resume.css';







const Resume = () => {
  // DBA-focused resume — ATS / Word friendly
  const resumeData = {
    name: "Jose Vinicius Lourenço",
    role: "Junior Database Administrator | SQL & Oracle",

    contact: {
      location: "Brazil (Open to Remote)",
      linkedin: "linkedin.com/in/jose-vinicius-lourenço-1a6b9014a",
      github: "github.com/ViniScooper",
    },

    summary: `
Junior Database Administrator with hands-on experience in Oracle databases,
SQL development, and enterprise ERP environments. Strong background in data
manipulation, database support, and production environments. Experience working
with Oracle, SAP ERP, and TOTVS systems, supporting business-critical data
operations, troubleshooting issues, and ensuring data reliability and security.
Comfortable collaborating with development and business teams.
    `,

    skills: [
      "Oracle Database Administration (Junior)",
      "SQL Query Development & Optimization",
      "Database Monitoring & Troubleshooting",
      "PL/SQL (Basic)",
      "Data Validation & Integrity",
      "Backup & Recovery Concepts",
      "ERP Systems (TOTVS / SAP)",
      "ADVPL (TOTVS)",
      "SAP ABAP (Basic)",
      "Production & Pre-production Environments",
      "Linux Fundamentals",
      "Git Version Control",
      "Documentation & Best Practices"
    ],

    experience: [
      {
        role: "Junior Oracle Database Administrator",
        company: "informa software",
        period: "2024 – Present",
        bullets: [
          "Support Oracle database operations in production and pre-production environments",
          "Write and optimize SQL queries for data analysis, validation, and reporting",
          "Assist with database monitoring, troubleshooting, and incident resolution",
          "Support data consistency and integrity across enterprise systems",
          "Collaborate with development and business teams to understand data requirements",
          "Follow security and access control best practices for database environments",
          "Document database procedures, queries, and operational processes"
        ],
      },
      {
        role: "Software Developer",
        company: "Coderp",
        period: "2022 – 2023",
        bullets: [
          "Worked on enterprise software solutions using TOTVS systems",
          "Developed and maintained business logic using ADVPL",
          "Assisted in database-related tasks, including SQL queries and data validation",
          "Supported system integrations and data consistency across modules",
          "Collaborated with analysts and senior developers on maintenance and enhancements"
        ],
      },
      {
        role: "Software Development Intern",
        company: "KARNE&KEIJO",
        period: "2021 – 2022",
        bullets: [
          "Worked with SAP ERP systems during internship period",
          "Developed and maintained simple programs using ABAP",
          "Assisted with data extraction, validation, and reporting tasks",
          "Supported functional teams with technical and data-related activities",
          "Learned enterprise system workflows and database concepts"
        ],
      }
    ],

    education: "Bachelor’s Degree in Computer Science",

    languages: [
      "Portuguese – Native",
      "English – Professional Working Proficiency",
      "Spanish – Basic"
    ],
  };














  








  const handleBack = () => window.history.back();
  const handlePrint = () => window.print();

  return (
    <div className="resume-container">
      <div className="actions-bar no-print">
        <button onClick={handleBack} className="btn">
          Back
        </button>
        <button onClick={handlePrint} className="btn">
          Save/Print PDF
        </button>
      </div>

      <div className="resume-paper">
        {/* HEADER - CENTERED */}
        <header className="resume-header">
          <h1 className="resume-name">{resumeData.name}</h1>
          <div className="resume-role">{resumeData.role}</div>

          <div className="resume-contact">
            {resumeData.contact.location} | {resumeData.contact.linkedin} | {resumeData.contact.github}
          </div>
        </header>

        {/* SUMMARY */}
        <section className="resume-section">
          <div className="section-title">Professional Summary</div>
          <div className="section-content">
            {resumeData.summary}
          </div>
        </section>

        {/* SKILLS - TWO COLUMNS */}
        <section className="resume-section">
          <div className="section-title">Skills & Keywords</div>
          <ul className="skills-grid">
            {resumeData.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>

        {/* EXPERIENCE */}
        <section className="resume-section">
          <div className="section-title">Professional Experience</div>

          {resumeData.experience.map((job, i) => (
            <div key={i} className="job-entry">
              <div className="job-header">
                <span>{job.role}</span>
                <span className="job-period">{job.period}</span>
              </div>
              <ul className="job-bullets">
                {job.bullets.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* EDUCATION */}
        <section className="resume-section">
          <div className="section-title">Education</div>
          <div className="section-content">
            {resumeData.education}
          </div>
        </section>

        {/* LANGUAGES */}
        <section className="resume-section">
          <div className="section-title">Languages</div>
          <div className="section-content">
            {resumeData.languages.join(" • ")}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
