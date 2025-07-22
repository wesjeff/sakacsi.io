import React, { useEffect, useRef } from 'react';

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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

const SpecializationCard = ({ icon, title, brief }) => (
  <div style={styles.specializationCard}>
    <div style={styles.cardIcon}>{icon}</div>
    <h3 style={styles.cardTitle}>{title}</h3>
    <p style={styles.cardBrief}>{brief}</p>
  </div>
);

const CurrentProject = ({ status, title, description, tech }) => (
  <div style={styles.projectItem}>
    <div style={styles.projectStatus}>
      <div style={styles.statusDot}></div>
      {status}
    </div>
    <h4 style={styles.projectTitle}>{title}</h4>
    <p style={styles.projectDescription}>{description}</p>
    <div style={styles.techTags}>
      {tech.map((technology, index) => (
        <span key={index} style={styles.techTag}>{technology}</span>
      ))}
    </div>
  </div>
);

const QuickWin = ({ metric, label, context }) => (
  <div style={styles.winCard}>
    <div style={styles.winMetric}>{metric}</div>
    <div style={styles.winLabel}>{label}</div>
    <div style={styles.winContext}>{context}</div>
  </div>
);

export default function Landing() {
  return (
    <div style={styles.container}>
      <NetworkBackground />
      
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Hello :)</h1>
          <p style={styles.subtitle}>
            College student graduating December 2025. Passionate about cybersecurity, ethical hacking, and security research.
          </p>
          <p style={styles.tagline}>
            Building tomorrow's digital defenses through ethical hacking and security research.
          </p>
          <div style={styles.heroButtons}>
            <a href="/projects" style={styles.ctaButton}>
              View My Work
            </a>
            <a href="/about" style={styles.secondaryButton}>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* What I Specialize In */}
      <section style={styles.section}>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionTitle}>What I Specialize In</h2>
          <div style={styles.specializationGrid}>
            <SpecializationCard 
              icon="🎯"
              title="Penetration Testing"
              brief="Comprehensive security assessments to identify vulnerabilities before attackers do."
            />
            <SpecializationCard 
              icon="🔍"
              title="Vulnerability Research"
              brief="Deep analysis of emerging threats and zero-day vulnerability discovery."
            />
            <SpecializationCard 
              icon="🛡️"
              title="Security Analysis"
              brief="Systematic evaluation of security postures and defensive mechanisms."
            />
            <SpecializationCard 
              icon="⚡"
              title="Incident Response"
              brief="Rapid threat containment and forensic analysis of security breaches."
            />
          </div>
        </div>
      </section>

      {/* Currently Working On */}
      <section style={styles.section}>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionTitle}>Currently Working On</h2>
          <div style={styles.projectsContainer}>
            <CurrentProject 
              status="Active Research"
              title="IoT Device Security Assessment"
              description="Analyzing security vulnerabilities in consumer IoT devices and developing automated testing frameworks."
              tech={["Python", "Burp Suite", "Wireshark", "Custom Scripts"]}
            />
            <CurrentProject 
              status="In Development"
              title="CTF Challenge Creation"
              description="Building advanced capture-the-flag challenges focused on real-world attack scenarios for educational purposes."
              tech={["Docker", "Web Security", "Cryptography", "Linux"]}
            />
            <CurrentProject 
              status="Ongoing Study"
              title="Advanced Persistent Threats"
              description="Researching APT tactics and developing detection mechanisms for enterprise-level threat hunting."
              tech={["MITRE ATT&CK", "SIEM", "Threat Intelligence", "Forensics"]}
            />
          </div>
        </div>
      </section>

      {/* Quick Wins */}
      <section style={styles.section}>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionTitle}>Recent Achievements</h2>
          <div style={styles.winsGrid}>
            <QuickWin 
              metric="Top 15%"
              label="CTF Ranking"
              context="National cybersecurity competition"
            />
            <QuickWin 
              metric="3 CVEs"
              label="Discovered"
              context="Vulnerabilities in open-source projects"
            />
            <QuickWin 
              metric="12 Tools"
              label="Security Scripts"
              context="Automated testing frameworks built"
            />
          </div>
        </div>
      </section>

      {/* Why Cybersecurity Matters */}
      <section style={styles.section}>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionTitle}>Why Cybersecurity Matters to Me</h2>
          <div style={styles.missionContent}>
            <div style={styles.missionText}>
              <p style={styles.missionParagraph}>
                In an increasingly connected world, cybersecurity isn't just about protecting data—it's about preserving trust, privacy, and the fundamental infrastructure that powers our digital lives.
              </p>
              <p style={styles.missionParagraph}>
                Every vulnerability I discover, every system I help secure, and every person I educate about security best practices contributes to a safer digital ecosystem for everyone. This isn't just my career path; it's my contribution to building a more secure future.
              </p>
              <div style={styles.missionQuote}>
                "Security is not a product, but a process. It's about making the cost of attack higher than the value of the target."
              </div>
            </div>
            <div style={styles.missionStats}>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>500+</div>
                <div style={styles.statLabel}>Hours of Research</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>25+</div>
                <div style={styles.statLabel}>Security Tools Mastered</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>100%</div>
                <div style={styles.statLabel}>Ethical Commitment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={styles.ctaSection}>
        <div style={styles.sectionContent}>
          <h2 style={styles.ctaTitle}>Ready to Explore My Work?</h2>
          <p style={styles.ctaText}>
            Dive deeper into my cybersecurity journey, technical projects, and professional background.
          </p>
          <div style={styles.ctaButtons}>
            <a href="/projects" style={styles.ctaButton}>
              🚀 View Projects
            </a>
            <a href="/about" style={styles.ctaButton}>
              👤 About Me
            </a>
            <a href="/resume" style={styles.ctaButton}>
              📄 Resume
            </a>
            <a href="/contact" style={styles.ctaButton}>
              💬 Contact
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    backgroundColor: '#0a1f44',
    color: 'white',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heroSection: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10,
  },
  heroContent: {
    textAlign: 'center',
    padding: '20px',
    maxWidth: '800px',
  },
  title: {
    fontSize: '3.5rem',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    margin: '0 0 20px 0',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
    lineHeight: '1.6',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  tagline: {
    fontSize: '1.2rem',
    marginBottom: '40px',
    color: '#64b5ff',
    fontWeight: '500',
    lineHeight: '1.5',
  },
  heroButtons: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  section: {
    position: 'relative',
    zIndex: 10,
    padding: '80px 0',
    backgroundColor: 'rgba(10, 31, 68, 0.9)',
    backdropFilter: 'blur(10px)',
  },
  ctaSection: {
    position: 'relative',
    zIndex: 10,
    padding: '100px 0',
    backgroundColor: 'rgba(41, 120, 181, 0.1)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(41, 120, 181, 0.3)',
  },
  sectionContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  sectionTitle: {
    fontSize: '2.2rem',
    textAlign: 'center',
    marginBottom: '50px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
  },
  specializationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  specializationCard: {
    padding: '30px 25px',
    borderRadius: '12px',
    backgroundColor: 'rgba(41, 120, 181, 0.1)',
    border: '1px solid rgba(41, 120, 181, 0.2)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  cardIcon: {
    fontSize: '2.5rem',
    marginBottom: '15px',
  },
  cardTitle: {
    fontSize: '1.3rem',
    marginBottom: '12px',
    color: '#64b5ff',
  },
  cardBrief: {
    fontSize: '0.95rem',
    lineHeight: '1.5',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  projectsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
  },
  projectItem: {
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: 'rgba(41, 120, 181, 0.1)',
    border: '1px solid rgba(41, 120, 181, 0.2)',
  },
  projectStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    color: '#64b5ff',
    marginBottom: '15px',
    fontWeight: '500',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#64b5ff',
    animation: 'pulse 2s infinite',
  },
  projectTitle: {
    fontSize: '1.4rem',
    marginBottom: '12px',
    color: '#ffffff',
  },
  projectDescription: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '20px',
  },
  techTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  techTag: {
    padding: '4px 12px',
    fontSize: '0.8rem',
    backgroundColor: 'rgba(100, 181, 255, 0.2)',
    color: '#64b5ff',
    borderRadius: '12px',
    border: '1px solid rgba(100, 181, 255, 0.3)',
  },
  winsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  },
  winCard: {
    padding: '40px 30px',
    borderRadius: '12px',
    backgroundColor: 'rgba(41, 120, 181, 0.15)',
    border: '1px solid rgba(41, 120, 181, 0.3)',
    textAlign: 'center',
  },
  winMetric: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#64b5ff',
    marginBottom: '10px',
  },
  winLabel: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#ffffff',
  },
  winContext: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  missionContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '60px',
    alignItems: 'center',
  },
  missionText: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
  },
  missionParagraph: {
    marginBottom: '25px',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  missionQuote: {
    padding: '25px',
    borderLeft: '4px solid #64b5ff',
    backgroundColor: 'rgba(100, 181, 255, 0.1)',
    borderRadius: '0 8px 8px 0',
    fontStyle: 'italic',
    fontSize: '1.05rem',
    color: '#64b5ff',
    marginTop: '30px',
  },
  missionStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
  },
  statItem: {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: 'rgba(41, 120, 181, 0.2)',
    border: '1px solid rgba(41, 120, 181, 0.3)',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#64b5ff',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#ffffff',
  },
  ctaText: {
    fontSize: '1.2rem',
    textAlign: 'center',
    marginBottom: '40px',
    color: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '600px',
    margin: '0 auto 40px auto',
  },
  ctaButtons: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaButton: {
    backgroundColor: '#2978b5',
    padding: '15px 35px',
    fontSize: '1.1rem',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    boxShadow: '0 4px 8px rgba(41, 120, 181, 0.3)',
    transition: 'all 0.3s ease',
    display: 'inline-block',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: '15px 35px',
    fontSize: '1.1rem',
    color: '#64b5ff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    border: '2px solid #64b5ff',
    transition: 'all 0.3s ease',
    display: 'inline-block',
  },
};