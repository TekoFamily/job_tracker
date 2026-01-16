
import React from 'react';
import './Resume.css';














const Resume = () => {
  const resumeData = {
    name: "Eliane Maia Bispo",
    role: "Administrativo – Saúde e Educação",

    contact: {
      email: "elianemaiabispo@gmail.com",
      phone: "(81) 99542-5342",
      location: "Recife – PE, Brasil",
      address: "Rua Genvásio Fioravante, 92 – Bairro Graças",
      linkedin: "",
      github: "",
      maritalStatus: "Casada"
    },

    summary: `
Sou uma pessoa responsável e dedicada, com experiência na área administrativa, especialmente nos setores de educação e apoio social. Trabalhei em escola estadual, associação cultural e com consultoria na área de restaurante, atuando com organização de documentos, controle de almoxarifado, atendimento ao público e apoio às rotinas administrativas.

Busco uma oportunidade no setor administrativo, preferencialmente nas áreas da saúde e educação, onde possa contribuir com organização, compromisso e responsabilidade. Atualmente estou finalizando o curso de Serviço Social e curso Nutrição, com interesse em crescer profissionalmente e aprender continuamente.
    `,

    skills: [
      "Organização de documentos",
      "Atendimento ao público e telefônico",
      "Controle de agenda e compromissos",
      "Apoio em rotinas administrativas",
      "Arquivo físico e digital",
      "Almoxarifado e controle de materiais",
      "Digitação e elaboração de textos simples",
      "Uso básico de computador",
      "Microsoft Word (básico)",
      "Microsoft Excel (básico)",
      "E-mail profissional",
      "Pontualidade e responsabilidade",
      "Trabalho em equipe"
    ],

    experience: [
      {
        role: "Auxiliar Administrativa / Almoxarifado",
        company: "E.E.E. Augusto dos Anjos – Escola Estadual de Ensino Fundamental",
        location: "Campina Grande – Paraíba",
        period: "2 anos",
        bullets: [
          "Controle e organização de materiais e estoque no almoxarifado escolar",
          "Apoio direto às rotinas administrativas da escola",
          "Organização de documentos e arquivos",
          "Atendimento interno e suporte aos processos da unidade de ensino"
        ],
      },
      {
        role: "Auxiliar Administrativa",
        company: "Consultoria de Restaurante – Seu Pêo",
        period: "1 ano",
        bullets: [
          "Apoio na organização administrativa",
          "Controle de materiais e insumos",
          "Auxílio na rotina operacional",
          "Organização de processos internos"
        ],
      },
      {
        role: "Auxiliar Administrativa",
        company: "Associação Cultural Madre Agatha",
        period: "6 meses",
        bullets: [
          "Atendimento ao público",
          "Suporte administrativo às atividades culturais",
          "Organização de documentos",
          "Auxílio na rotina interna da associação"
        ],
      }
    ],

    education: [
      {
        course: "Serviço Social",
        institution: "Faculdade Metropolitana de Franca",
        status: "Cursando – fase final do curso"
      },
      {
        course: "Nutrição",
        institution: "Unigrande Recife",
        status: "Cursando – 1º período"
      }
    ],

    languages: [
      "Português – Nativo"
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
            {resumeData.contact.email} | {resumeData.contact.phone} | {resumeData.contact.location}<br />
            {resumeData.contact.address}<br />
            {resumeData.contact.linkedin && (
              <span>LinkedIn: {resumeData.contact.linkedin} | </span>
            )}
            {resumeData.contact.github && (
              <span>GitHub: {resumeData.contact.github} | </span>
            )}
            {resumeData.contact.maritalStatus && (
              <span>{resumeData.contact.maritalStatus}</span>
            )}
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
            {resumeData.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <strong>{edu.course}</strong><br />
                {edu.institution}<br />
                <em>{edu.status}</em>
              </div>
            ))}
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
