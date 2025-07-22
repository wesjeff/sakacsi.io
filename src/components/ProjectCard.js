import React from 'react';
import './ProjectCard.css';

export default function ProjectCard({ title, description, link }) {
  return (
    <div style={{
      border: '1px solid #2978b5',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      backgroundColor: 'white',
      boxShadow: '0 2px 5px rgba(41, 120, 181, 0.2)'
    }}>
      <h3 style={{ marginBottom: '10px', color: '#0a1f44' }}>{title}</h3>
      <p style={{ marginBottom: '15px', fontSize: '1.1rem', color: '#444' }}>{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#2978b5', fontWeight: 600, textDecoration: 'none' }}
      >
        View on GitHub
      </a>
    </div>
  );
}
