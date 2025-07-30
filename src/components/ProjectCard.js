import React from 'react';
import './ProjectCard.css';

export default function ProjectCard({ title, description, link, tech = [] }) {
  return (
    <div className="project-card">
      <h3 className="project-title">{title}</h3>
      
      {tech.length > 0 && (
        <div className="tech-stack">
          {tech.map((technology, index) => (
            <span key={index} className="tech-tag">
              {technology}
            </span>
          ))}
        </div>
      )}
      
      <p className="project-description">{description}</p>
      
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="project-link"
      >
        View on GitHub
      </a>
    </div>
  );
}