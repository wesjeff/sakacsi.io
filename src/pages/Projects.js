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
      
      const columnCount = Math.floor(rect.width / 350); // Commands every 350px horizontally
      
      for (let col = 0; col < columnCount; col++) {
        for (let i = 0; i < 15; i++) { // 15 lines per column (reduced from 20)
          linesRef.current.push({
            text: terminalCommands[Math.floor(Math.random() * terminalCommands.length)],
            x: col * 350 + Math.random() * 250,
            y: -Math.random() * 1500, // Start higher above screen
            speed: Math.random() * 0.4 + 0.2, // Slower speed (reduced from 0.8 + 0.4)
            opacity: Math.random() * 0.3 + 0.1, // Slightly reduced opacity
            age: Math.random() * 1000,
            fontSize: Math.random() > 0.7 ? 15 : 13, // Slightly smaller fonts
            color: getRandomColor()
          });
        }
      }
    };

    // Enhanced color palette matching the page theme
    const getRandomColor = () => {
      const colors = [
        'primary-blue',    // Main blue theme
        'secondary-blue',  // Lighter blue
        'accent-cyan',     // Cyan accent
        'highlight',       // Orange/amber highlight
        'success',         // Green success color
        'purple',          // Purple accent
        'teal',           // Teal variation
        'pink'            // Pink accent
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const getColorValue = (colorName, opacity) => {
      const colors = {
        'primary-blue': `rgba(100, 181, 255, ${opacity})`,
        'secondary-blue': `rgba(59, 130, 246, ${opacity})`,
        'accent-cyan': `rgba(34, 211, 238, ${opacity})`,
        'highlight': `rgba(251, 191, 36, ${opacity})`,
        'success': `rgba(34, 197, 94, ${opacity})`,
        'purple': `rgba(168, 85, 247, ${opacity})`,
        'teal': `rgba(20, 184, 166, ${opacity})`,
        'pink': `rgba(236, 72, 153, ${opacity})`
      };
      return colors[colorName] || colors['primary-blue'];
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      
      // Clear canvas completely to prevent trails
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Add darker background overlay
      ctx.fillStyle = 'rgba(5, 15, 35, 0.95)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      linesRef.current.forEach((line) => {
        // Simple, smooth movement - just like the original
        line.y += line.speed;
        line.age++;

        // Set font with proper rendering
        ctx.font = `${line.fontSize}px 'Courier New', 'Monaco', monospace`;
        
        // Calculate opacity with fade zones
        let currentOpacity = line.opacity;
        if (line.y < 150) {
          currentOpacity *= Math.max(0, line.y / 150);
        } else if (line.y > rect.height - 200) {
          currentOpacity *= Math.max(0, (rect.height - line.y) / 200);
        }

        // Enhanced glow effect for terminal commands
        ctx.shadowColor = getColorValue(line.color, currentOpacity * 0.8);
        ctx.shadowBlur = 8;
        
        ctx.fillStyle = getColorValue(line.color, Math.min(0.8, currentOpacity));
        
        // Draw the text with enhanced glow
        if (currentOpacity > 0.03) {
          // Draw with glow effect
          ctx.fillText(line.text, line.x, line.y);
          ctx.shadowBlur = 15;
          ctx.fillText(line.text, line.x, line.y);
        }
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';

        // Reset line if it's completely off screen
        if (line.y > rect.height + 150) {
          line.text = terminalCommands[Math.floor(Math.random() * terminalCommands.length)];
          line.y = -Math.random() * 300 - 100;
          line.x = Math.random() * rect.width;
          line.speed = Math.random() * 0.4 + 0.2;
          line.opacity = Math.random() * 0.3 + 0.1;
          line.fontSize = Math.random() > 0.7 ? 15 : 13;
          line.color = getRandomColor();
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
  return (
    <div className="projects-container loaded">
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