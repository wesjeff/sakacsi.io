import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from '../components/ProjectCard';
import { terminalCommands } from '../components/terminalCommands';
import './Projects.css';

// Terminal-style scrolling text component
const TerminalScrolling = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Improve text rendering quality
    ctx.textRenderingOptimization = 'optimizeQuality';
    ctx.imageSmoothingEnabled = true;
    
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      // Set actual size in pixels
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Set display size
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      // Scale context for high DPI displays
      ctx.scale(dpr, dpr);
      
      // Initialize lines with random positions and properties
      linesRef.current = [];
      
      const columnCount = Math.floor(rect.width / 300); // Commands every 300px horizontally
      
      for (let col = 0; col < columnCount; col++) {
        for (let i = 0; i < 20; i++) { // 20 lines per column
          linesRef.current.push({
            text: terminalCommands[Math.floor(Math.random() * terminalCommands.length)],
            x: col * 300 + Math.random() * 200,
            y: -Math.random() * 1000, // Start above screen
            speed: Math.random() * 0.8 + 0.4, // Vertical movement speed
            opacity: Math.random() * 0.4 + 0.15,
            age: Math.random() * 1000,
            fontSize: Math.random() > 0.7 ? 16 : 14, // Mix of font sizes
            color: Math.random() > 0.6 ? 'orange' : Math.random() > 0.3 ? 'green' : 'blue'
          });
        }
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      
      // Clear canvas completely for crisp text
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      linesRef.current.forEach((line) => {
        // Move line from top to bottom
        line.y += line.speed;
        line.age++;

        // Set font with proper rendering
        ctx.font = `${line.fontSize}px 'Courier New', 'Monaco', monospace`;
        
        // Calculate opacity with fade zones
        let currentOpacity = line.opacity;
        if (line.y < 100) {
          // Fade in from top
          currentOpacity *= Math.max(0, line.y / 100);
        } else if (line.y > rect.height - 150) {
          // Fade out at bottom
          currentOpacity *= Math.max(0, (rect.height - line.y) / 150);
        }

        // Set color based on line type with better visibility
        if (line.color === 'orange') {
          ctx.fillStyle = `rgba(234, 88, 12, ${Math.min(0.7, currentOpacity)})`;
          ctx.shadowColor = `rgba(234, 88, 12, ${currentOpacity * 0.5})`;
        } else if (line.color === 'green') {
          ctx.fillStyle = `rgba(34, 197, 94, ${Math.min(0.6, currentOpacity)})`;
          ctx.shadowColor = `rgba(34, 197, 94, ${currentOpacity * 0.5})`;
        } else {
          ctx.fillStyle = `rgba(59, 130, 246, ${Math.min(0.5, currentOpacity)})`;
          ctx.shadowColor = `rgba(59, 130, 246, ${currentOpacity * 0.5})`;
        }
        
        ctx.shadowBlur = 1;
        
        // Draw the text with crisp rendering
        if (currentOpacity > 0.05) {
          ctx.fillText(line.text, line.x, line.y);
        }
        ctx.shadowBlur = 0;

        // Reset line if it's completely off screen
        if (line.y > rect.height + 100) {
          line.text = terminalCommands[Math.floor(Math.random() * terminalCommands.length)];
          line.y = -Math.random() * 200 - 50;
          line.x = Math.random() * rect.width;
          line.speed = Math.random() * 0.8 + 0.4;
          line.opacity = Math.random() * 0.4 + 0.15;
          line.fontSize = Math.random() > 0.7 ? 16 : 14;
          line.color = Math.random() > 0.6 ? 'orange' : Math.random() > 0.3 ? 'green' : 'blue';
          line.age = 0;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="terminal-scrolling-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

const projects = [
  {
    title: 'CTF Write-ups',
    description: 'Detailed write-ups on various Capture The Flag challenges I solved, including forensics, cryptography, and web exploitation techniques.',
    link: 'https://github.com/yourusername/ctf-writeups',
    tech: ['Python', 'Bash', 'Forensics', 'Crypto']
  },
  {
    title: 'Vulnerability Scanner',
    description: 'A comprehensive Python tool that scans for common vulnerabilities in web applications, featuring automated OWASP Top 10 detection.',
    link: 'https://github.com/yourusername/vuln-scanner',
    tech: ['Python', 'Security', 'OWASP', 'Automation']
  },
  {
    title: 'Network Monitoring Dashboard',
    description: 'React-based dashboard displaying real-time network security metrics with threat detection and alert systems.',
    link: 'https://github.com/yourusername/network-dashboard',
    tech: ['React', 'Node.js', 'Security', 'Real-time']
  },
  {
    title: 'Malware Analysis Toolkit',
    description: 'Collection of tools and scripts for static and dynamic malware analysis, including sandbox automation and reporting.',
    link: 'https://github.com/yourusername/malware-toolkit',
    tech: ['Python', 'Malware', 'Analysis', 'Automation']
  },
  {
    title: 'Penetration Testing Suite',
    description: 'Comprehensive penetration testing framework with automated reconnaissance, vulnerability assessment, and exploitation modules.',
    link: 'https://github.com/yourusername/pentest-suite',
    tech: ['Python', 'Pentesting', 'Automation', 'Security']
  },
  {
    title: 'Incident Response Platform',
    description: 'Web-based platform for managing cybersecurity incidents with workflow automation, evidence tracking, and team collaboration.',
    link: 'https://github.com/yourusername/incident-response',
    tech: ['React', 'Python', 'Security', 'Workflow']
  }
];

export default function Projects() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsLoaded(true);
  }, []);

  return (
    <div className={`projects-container ${isLoaded ? 'loaded' : ''}`}>
      <TerminalScrolling />
      
      <div className="projects-header-section">
        <div className="projects-header-content">
          <h1 className="projects-main-title">Projects</h1>
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
                tech={project.tech}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}