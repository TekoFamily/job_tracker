
import React from 'react';
import './Resume.css';








const Resume = () => {
  // Dados do currículo - ESTRUTURADO PARA ATS / WORD CLÁSSICO
  const resumeData = {
    name: "Jose Vinicius Lourenço",
    role: "Python Developer | Data & Cloud Engineer (AWS)",

    contact: {
      location: "Brazil (Open to Remote)",
      linkedin: "linkedin.com/in/jose-vinicius-lourenço-1a6b9014a",
      github: "github.com/ViniScooper",
    },

    summary: `Python Developer with experience in data-oriented solutions, database systems, and automation. Strong background in SQL, data manipulation, and backend development, with growing hands-on experience in Python scripting, cloud-based data pipelines, and AWS services. Experienced in collaborating with cross-functional teams to deliver scalable, well-documented, and reliable data solutions.`,

    skills: [
      "Python Development",
      "Data Processing & Automation",
      "SQL Development",
      "ETL / ELT Concepts",
      "PySpark Fundamentals",
      "AWS Glue (Fundamentals)",
      "AWS S3, Lambda, IAM (Conceptual & Hands-on)",
      "Cloud Data Pipelines",
      "Relational & Non-Relational Databases",
      "API Integration (REST)",
      "Git Version Control",
      "Data Modeling",
      "Monitoring & Troubleshooting",
      "Documentation & Best Practices"
    ],

    experience: [
      {
        role: "Junior Oracle Database Administrator / Software Developer",
        period: "2024 – Present",
        bullets: [
          "Develop Python scripts to support data extraction, transformation, and automation tasks",
          "Write and optimize SQL queries for data analysis, validation, and reporting",
          "Support data pipelines and database processes in production and preproduction environments",
          "Collaborate with teams to translate business requirements into technical data solutions",
          "Monitor data processes, troubleshoot failures, and ensure data reliability",
          "Work with cloud and on-premise data sources following security and access control practices",
          "Document data flows, scripts, and operational procedures",
          "Prepare datasets for analytics and visualization using Power BI"
        ],
      },
      {
        role: "Software Development Intern",
        period: "2020 – 2022",
        bullets: [
          "Developed and maintained scripts and small applications using Python and SQL",
          "Assisted in data validation, transformation, and reporting processes",
          "Collaborated with technical teams on system integration and data consistency",
          "Used Git for version control and followed coding best practices"
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
