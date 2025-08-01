import React, { useEffect, useRef } from 'react';
import './Landing.css';

const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Network nodes
    const nodes = [];
    const nodeCount = 25; // Fewer nodes for subtlety
    const maxDistance = 150; // Connection distance

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5, // Slow movement
        vy: (Math.random() - 0.5) * 0.5,
        pulse: Math.random() * Math.PI * 2, // For pulsing effect
        size: Math.random() * 3 + 1
      });
    }

    let animationId;

    const animate = () => {
      // Clear canvas with slight transparency for trail effect
      ctx.fillStyle = 'rgba(10, 31, 68, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, index) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.02;

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;

        // Draw node with pulsing effect
        const pulseSize = node.size + Math.sin(node.pulse) * 0.5;
        const alpha = 0.3 + Math.sin(node.pulse) * 0.2;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(41, 120, 181, ${alpha})`;
        ctx.fill();

        // Draw connections to nearby nodes
        for (let i = index + 1; i < nodes.length; i++) {
          const other = nodes[i];
          const distance = Math.sqrt(
            Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
          );

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2;
            ctx.strokeStyle = `rgba(41, 120, 181, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();

            // Add data flow effect on some connections
            if (Math.random() < 0.01) {
              const midX = (node.x + other.x) / 2;
              const midY = (node.y + other.y) / 2;
              ctx.beginPath();
              ctx.arc(midX, midY, 1, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(100, 200, 255, 0.8)';
              ctx.fill();
            }
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="network-background"
    />
  );
};

const SpecializationCard = ({ icon, title, brief, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, []);

  return (
    <div ref={cardRef} className="specialization-card">
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-brief">{brief}</p>
    </div>
  );
};

const CurrentProject = ({ status, title, description, tech, index }) => {
  const projectRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentProject = projectRef.current;
    if (currentProject) {
      observer.observe(currentProject);
    }

    return () => {
      if (currentProject) {
        observer.unobserve(currentProject);
      }
    };
  }, []);

  return (
    <div ref={projectRef} className="project-item">
      <div className="project-status">
        <div className="status-dot"></div>
        {status}
      </div>
      <h4 className="project-title">{title}</h4>
      <p className="project-description">{description}</p>
      <div className="tech-tags">
        {tech.map((technology, index) => (
          <span key={index} className="tech-tag">{technology}</span>
        ))}
      </div>
    </div>
  );
};

const QuickWin = ({ metric, label, context, index }) => {
  const winRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentWin = winRef.current;
    if (currentWin) {
      observer.observe(currentWin);
    }

    return () => {
      if (currentWin) {
        observer.unobserve(currentWin);
      }
    };
  }, []);

  return (
    <div ref={winRef} className="win-card">
      <div className="win-metric">{metric}</div>
      <div className="win-label">{label}</div>
      <div className="win-context">{context}</div>
    </div>
  );
};

// Hook for section animations
const useSectionAnimation = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return sectionRef;
};

export default function Landing() {
  const specializationTitleRef = useSectionAnimation();
  const projectsTitleRef = useSectionAnimation();
  const winsTitleRef = useSectionAnimation();
  const missionTitleRef = useSectionAnimation();
  const missionContentRef = useSectionAnimation();
  const ctaTitleRef = useSectionAnimation();
  const ctaTextRef = useSectionAnimation();
  const ctaButtonsRef = useSectionAnimation();

  return (
    <div className="landing-container">
      <NetworkBackground />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Greetings! I am Zac</h1>
          <p className="hero-subtitle">
            Welcome to my Portfolio Site!
          </p>
          <p className="hero-tagline">
            Student at Florida State University. Aspiring Cybersecurity Professional.
          </p>
        </div>
      </section>

      {/* What I Specialize In */}
      <section className="section">
        <div className="section-content">
          <h2 ref={specializationTitleRef} className="section-title">What I Specialize In</h2>
          <div className="specialization-grid">
            <SpecializationCard 
              icon="🎯"
              title="Penetration Testing"
              brief="Comprehensive security assessments to identify vulnerabilities before attackers do."
              index={0}
            />
            <SpecializationCard 
              icon="🔍"
              title="Vulnerability Research"
              brief="Deep analysis of emerging threats and zero-day vulnerability discovery."
              index={1}
            />
            <SpecializationCard 
              icon="🛡️"
              title="Security Analysis"
              brief="Systematic evaluation of security postures and defensive mechanisms."
              index={2}
            />
            <SpecializationCard 
              icon="⚡"
              title="Incident Response"
              brief="Rapid threat containment and forensic analysis of security breaches."
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Currently Working On */}
      <section className="section">
        <div className="section-content">
          <h2 ref={projectsTitleRef} className="section-title">Currently Working On</h2>
          <div className="projects-container">
            <CurrentProject 
              status="Active Research"
              title="IoT Device Security Assessment"
              description="Analyzing security vulnerabilities in consumer IoT devices and developing automated testing frameworks."
              tech={["Python", "Burp Suite", "Wireshark", "Custom Scripts"]}
              index={0}
            />
            <CurrentProject 
              status="In Development"
              title="CTF Challenge Creation"
              description="Building advanced capture-the-flag challenges focused on real-world attack scenarios for educational purposes."
              tech={["Docker", "Web Security", "Cryptography", "Linux"]}
              index={1}
            />
            <CurrentProject 
              status="Ongoing Study"
              title="Advanced Persistent Threats"
              description="Researching APT tactics and developing detection mechanisms for enterprise-level threat hunting."
              tech={["MITRE ATT&CK", "SIEM", "Threat Intelligence", "Forensics"]}
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Quick Wins */}
      <section className="section">
        <div className="section-content">
          <h2 ref={winsTitleRef} className="section-title">Recent Achievements</h2>
          <div className="wins-grid">
            <QuickWin 
              metric="Top 15%"
              label="CTF Ranking"
              context="National cybersecurity competition"
              index={0}
            />
            <QuickWin 
              metric="3 CVEs"
              label="Discovered"
              context="Vulnerabilities in open-source projects"
              index={1}
            />
            <QuickWin 
              metric="12 Tools"
              label="Security Scripts"
              context="Automated testing frameworks built"
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Why Cybersecurity Matters */}
      <section className="section">
        <div className="section-content">
          <h2 ref={missionTitleRef} className="section-title">Why Cybersecurity Matters to Me</h2>
          <div ref={missionContentRef} className="mission-content">
            <div className="mission-text">
              <p className="mission-paragraph">
                In an increasingly connected world, cybersecurity isn't just about protecting data—it's about preserving trust, privacy, and the fundamental infrastructure that powers our digital lives.
              </p>
              <p className="mission-paragraph">
                Every vulnerability I discover, every system I help secure, and every person I educate about security best practices contributes to a safer digital ecosystem for everyone. This isn't just my career path; it's my contribution to building a more secure future.
              </p>
              <div className="mission-quote">
                Security is not a product, but a process. It's about making the cost of attack higher than the value of the target.
              </div>
            </div>
            <div className="mission-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Hours of Research</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">25+</div>
                <div className="stat-label">Security Tools Mastered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Ethical Commitment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="section-content">
          <h2 ref={ctaTitleRef} className="cta-title">Ready to Explore My Work?</h2>
          <p ref={ctaTextRef} className="cta-text">
            Dive deeper into my cybersecurity journey, technical projects, and professional background.
          </p>
          <div ref={ctaButtonsRef} className="cta-buttons">
            <a href="/about" className="cta-button">
              👨‍💻 About Me
            </a>
            <a href="/resume" className="cta-button">
              📄 Resume
            </a>
            <a href="/projects" className="cta-button">
              🚀 Projects
            </a>
            <a href="/contact" className="cta-button">
              📧 Contact
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}