
import React from 'react';


const Resume = () => {
  // Função para voltar à página anterior
  const handleBack = () => {
    window.history.back();
  };

  // Função para imprimir/salvar PDF
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: 600, margin: '3rem auto', fontFamily: 'Arial, sans-serif', color: '#222', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2.5rem 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button
          onClick={handleBack}
          style={{
            padding: '0.7rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: 8,
            border: 'none',
            background: '#1976d2',
            color: '#fff',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
            transition: 'background 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.background = '#1565c0'}
          onMouseOut={e => e.currentTarget.style.background = '#1976d2'}
        >Voltar</button>
        <button
          onClick={handlePrint}
          style={{
            padding: '0.7rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: 8,
            border: 'none',
            background: '#43a047',
            color: '#fff',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(67, 160, 71, 0.08)',
            transition: 'background 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.background = '#388e3c'}
          onMouseOut={e => e.currentTarget.style.background = '#43a047'}
        >Salvar PDF</button>
      </div>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontWeight: 700 }}>João da Silva</h1>
      <p style={{ margin: '0.5rem 0' }}><b>Email:</b> joao.silva@email.com</p>
      <p style={{ margin: '0.5rem 0' }}><b>Idade:</b> 28 anos</p>
      <p style={{ margin: '0.5rem 0 1.2rem 0' }}><b>Cargo pretendido:</b> Desenvolvedor Front-End</p>
      <hr style={{ margin: '1.2rem 0' }} />
      <p style={{ margin: '0.5rem 0' }}><b>Resumo:</b> Profissional dedicado com experiência em desenvolvimento web, focado em criar interfaces intuitivas e responsivas.</p>
      <hr style={{ margin: '1.2rem 0' }} />
      <p style={{ margin: '0.5rem 0' }}><b>Experiência:</b><br />
        Empresa ABC (2022-2024) - Desenvolvedor Front-End<br />
        - Desenvolvimento de aplicações React<br />
        - Colaboração com equipes de UI/UX
      </p>
      <hr style={{ margin: '1.2rem 0' }} />
      <p style={{ margin: '0.5rem 0' }}><b>Formação:</b><br />
        Bacharel em Ciência da Computação - Universidade XYZ (2018-2022)
      </p>
      <hr style={{ margin: '1.2rem 0' }} />
      <p style={{ margin: '0.5rem 0' }}><b>Habilidades:</b><br />
        JavaScript, React, HTML, CSS, Git
      </p>
    </div>
  );
};

export default Resume;
