import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

// Binary Rain Component for projects page background animation
// Disabled for performance, look at later.
/*
const BinaryRain = () => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const initializeColumns = () => {
      const columnCount = Math.floor(window.innerWidth / 25);
      const newColumns = [];
      
      for (let i = 0; i < columnCount; i++) {
        newColumns.push({
          id: i,
          x: i * 25,
          characters: [],
          speed: Math.random() * 1.5 + 0.8,
          lastUpdate: 0,
          spawnDelay: Math.random() * 2000
        });
      }
      
      setColumns(newColumns);
    };

    initializeColumns();
    window.addEventListener('resize', initializeColumns);
    
    return () => window.removeEventListener('resize', initializeColumns);
  }, []);

  useEffect(() => {
    let animationId;
    let lastTime = 0;
    
    const animationFrame = (currentTime) => {
      // Target 60fps - update every ~16.67ms
      if (currentTime - lastTime >= 16.67) {
        setColumns(prevColumns => 
          prevColumns.map(column => {
            const newCharacters = column.characters
              .map(char => ({
                ...char,
                y: char.y + column.speed
              }))
              .filter(char => char.y < window.innerHeight + 100); // Remove characters that fall off screen
            
            // Randomly spawn new characters (lower probability for better performance)
            if (Math.random() < 0.12 && currentTime > column.spawnDelay) {
              newCharacters.push({
                id: Math.random(),
                y: -20,
                char: Math.random() > 0.5 ? '1' : '0',
                opacity: Math.random() * 0.3 + 0.15
              });
            }
            
            return {
              ...column,
              characters: newCharacters,
              lastUpdate: currentTime
            };
          })
        );
        
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(animationFrame);
    };
    
    if (columns.length > 0) {
      animationId = requestAnimationFrame(animationFrame);
    }
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [columns.length]);

  return (
    <div className="binary-rain-fullscreen">
      {columns.map(column => (
        <div
          key={column.id}
          className="binary-column"
          style={{ left: column.x }}
        >
          {column.characters.map(char => (
            <div
              key={char.id}
              className="binary-character"
              style={{
                top: char.y,
                color: `rgba(100, 181, 255, ${char.opacity})`,
                textShadow: `0 0 8px rgba(100, 181, 255, ${char.opacity * 0.8})`
              }}
            >
              {char.char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
*/

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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsLoaded(true);
  }, []);

  // ON LINE 144, PUT <BinaryRain /> TO REINSTATE THE BINARY RAIN
  return (
    <div className={`projects-container ${isLoaded ? 'loaded' : ''}`}>

      
      <div className="projects-header-section">
        <div className="projects-header-content">
          <h1 className="projects-main-title">My Projects</h1>
          <p className="projects-subtitle">Cybersecurity & Development Portfolio</p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-content">
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={project.title} className="project-card-wrapper">
              <ProjectCard 
                title={project.title} 
                description={project.description} 
                link={project.link} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
