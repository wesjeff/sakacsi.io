import React from 'react';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

const projects = [
  {
    title: 'CTF Write-ups',
    description: 'Detailed write-ups on various Capture The Flag challenges I solved.',
    link: 'https://github.com/yourusername/ctf-writeups',
  },
  {
    title: 'Vulnerability Scanner',
    description: 'A Python tool that scans for common vulnerabilities in web applications.',
    link: 'https://github.com/yourusername/vuln-scanner',
  },
  {
    title: 'Network Monitoring Dashboard',
    description: 'React-based dashboard displaying real-time network security metrics.',
    link: 'https://github.com/yourusername/network-dashboard',
  },
];

export default function Projects() {
  return (
    <div className="projects-container">
      <h2 className="projects-header">My Projects</h2>
      <div className="projects-list">
        {projects.map(({ title, description, link }) => (
          <ProjectCard key={title} title={title} description={description} link={link} />
        ))}
      </div>
    </div>
  );
}
