import React, { useState, useEffect } from 'react';
import './Resume.css';

export default function Resume() {
  const [activeTab, setActiveTab] = useState('experience');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const skills = {
    programming: [
      { name: 'Python', level: 90 },
      { name: 'C++', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'SQL', level: 85 },
      { name: 'HTML/CSS', level: 90 }
    ],
    security: [
      { name: 'CrowdStrike', level: 90 },
      { name: 'Splunk', level: 85 },
      { name: 'Metasploit', level: 80 },
      { name: 'Wireshark', level: 85 },
      { name: 'Nmap', level: 80 }
    ],
    cloud: [
      { name: 'AWS', level: 85 },
      { name: 'Azure', level: 80 },
      { name: 'Docker', level: 75 },
      { name: 'Git', level: 85 }
    ]
  };

  const experiences = [
    {
      title: 'Cybersecurity Intern',
      company: 'Capital One',
      location: 'Dallas, TX',
      period: 'June 2025 – August 2025',
      type: 'Internship',
      logo: '/capitalone.png',
      website: 'https://www.capitalone.com',
      highlights: [
        'Integrating Google Gemini AI to automatically process and securely analyze Jira ticket metadata',
        'Developing frameworks that monitor data flow and usage patterns in third-party applications',
        'Conducting threat modeling for AWS applications handling highly sensitive human data'
      ]
    },
    {
      title: 'IT Security Assistant',
      company: 'Florida State University',
      location: 'Tallahassee, FL',
      period: 'February 2023 – Present',
      type: 'Part-time',
      logo: '/fsu.png',
      website: 'https://www.fsu.edu',
      highlights: [
        'Utilizing security tools such as CrowdStrike Falcon, Microsoft Defender, and Nexpose',
        'Analyzing Splunk network logs to identify potential threats',
        'Managing access to sensitive data for 400+ university staff'
      ]
    },
    {
      title: 'Technology Solutions Intern',
      company: 'GTE Financial',
      location: 'Tampa, FL',
      period: 'May 2024 – August 2024',
      type: 'Internship',
      logo: '/gte.jpg',
      website: 'https://www.gtefinancial.org',
      highlights: [
        'Created internal email phishing campaigns sent to 500+ employees',
        'Applied cloud security tools such as Wiz and InsightVM',
        'Addressed fraudulent activity by developing mobile application concepts'
      ]
    },
    {
      title: 'Early Childhood Educator',
      company: 'Pinellas County School Board',
      location: 'St. Petersburg, FL',
      period: 'June 2023 – July 2023',
      type: 'Internship',
      logo: '/pcsb.png',
      website: 'https://www.pcsb.org',
      highlights: [
        'Educated 20 kindergarten-aged children with hands-on assistance from a current teacher',
        'Tutored students on literacy skills ranging from learning letters to phonics and word pronunciation'
      ]
    }
  ];

  const certifications = [
    {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: 'July 2025',
      icon: '☁️',
      isImage: true,
      imageSrc: '/awsccp.png'
    },
    {
      name: 'Certified Secure Software Engineer (CSSE)',
      issuer: 'Professional Certification',
      date: 'June 2025',
      icon: '🔐',
      isImage: true,
      imageSrc: '/capitalone.png'
    }
  ];

  const SkillBar = ({ skill, delay = 0, categoryIndex = 0 }) => (
    <div className="skill-item" style={{ animationDelay: `${1 + categoryIndex * 0.2 + delay * 0.1}s` }}>
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-level">{skill.level}%</span>
      </div>
      <div className="skill-bar-container">
        <div 
          className="skill-bar"
          style={{
            width: activeTab === 'skills' ? `${skill.level}%` : '0%',
            transitionDelay: `${1.2 + categoryIndex * 0.2 + delay * 0.1}s`
          }}
        ></div>
      </div>
    </div>
  );

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/ZacharySakacsiResume.pdf';
    link.download = 'Zachary_Sakacsi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTabChange = (newTab) => {
    if (newTab !== activeTab) {
      const contentSection = document.querySelector('.content-section');
      if (contentSection) {
        contentSection.style.opacity = '0';
        contentSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          setActiveTab(newTab);
          contentSection.style.opacity = '1';
          contentSection.style.transform = 'translateY(0)';
        }, 150);
      } else {
        setActiveTab(newTab);
      }
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'experience':
        return (
          <div className="content-section" key="experience">
            <h2 className="section-title">Professional Experience</h2>
            <div className="experience-grid">
              {experiences.map((exp, index) => (
                <div key={index} className="experience-card">
                  <div className="experience-header">
                    <div>
                      <h3 className="experience-title">{exp.title}</h3>
                      <div className="experience-company-container">
                        <img 
                          src={exp.logo} 
                          alt={`${exp.company} logo`}
                          className="company-logo"
                        />
                        <a 
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="experience-company-link"
                        >
                          {exp.company}
                        </a>
                      </div>
                      <p className="experience-location">
                        <span>📍</span> {exp.location}
                      </p>
                    </div>
                    <div className="experience-meta">
                      <span className="experience-badge">{exp.type}</span>
                      <p className="experience-period">
                        <span>📅</span> {exp.period}
                      </p>
                    </div>
                  </div>
                  <ul className="experience-highlights">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="experience-highlight">
                        <span className="highlight-bullet">▪</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="content-section" key="education">
            <h2 className="section-title">Education</h2>
            <div className="education-card">
              <div className="education-header">
                <div>
                  <h3 className="education-school">Florida State University</h3>
                  <p className="education-degree">Bachelor of Science in Cyber Criminology</p>
                  <p className="education-minor">Minor in Computer Science</p>
                  <p className="education-location">
                    <span>📍</span> Tallahassee, FL
                  </p>
                </div>
                <div>
                  <span className="education-badge">Expected December 2025</span>
                </div>
              </div>
              
              <div>
                <h4 className="coursework-title">Relevant Coursework:</h4>
                <div className="coursework-grid">
                  {[
                    'Computer and Network System Administration',
                    'Computer Security Fundamentals',
                    'Data Structures and Algorithms (C++)',
                    'Web Applications Development (React + Node.js)',
                    'Unix Tools',
                    'Cybercrime Forensics',
                    'Databases',
                    'Computer Science Ethics',
                    'Criminology',
                    'Forensics in Crime',
                    'Law Enforcement',
                    'Courts'
                  ].map((course, index) => (
                    <span key={index} className="coursework-item">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="content-section" key="skills">
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-grid">
              <div className="skills-category">
                <div className="skills-category-header">
                  <span className="skills-category-icon">💻</span>
                  <h3 className="skills-category-title">Programming</h3>
                </div>
                {skills.programming.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} delay={index} categoryIndex={0} />
                ))}
              </div>

              <div className="skills-category">
                <div className="skills-category-header">
                  <span className="skills-category-icon">🛡️</span>
                  <h3 className="skills-category-title">Security Tools</h3>
                </div>
                {skills.security.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} delay={index} categoryIndex={1} />
                ))}
              </div>

              <div className="skills-category">
                <div className="skills-category-header">
                  <span className="skills-category-icon">☁️</span>
                  <h3 className="skills-category-title">Cloud & DevOps</h3>
                </div>
                {skills.cloud.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} delay={index} categoryIndex={2} />
                ))}
              </div>
            </div>
          </div>
        );

      case 'certifications':
        return (
          <div className="content-section" key="certifications">
            <h2 className="section-title">Certifications</h2>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <div key={index} className="certification-card">
                  <div className="certification-logo">
                    {cert.isImage ? (
                      <img 
                        src={cert.imageSrc} 
                        alt={cert.name}
                        className="certification-image"
                      />
                    ) : (
                      <div className="certification-icon">
                        {cert.icon}
                      </div>
                    )}
                  </div>
                  <h3 className="certification-title">{cert.name}</h3>
                  <p className="certification-issuer">{cert.issuer}</p>
                  <p className="certification-date">
                    <span>🏆</span>
                    Issued: {cert.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`resume-container ${isLoaded ? 'loaded' : ''}`}>
      {/* Header Section */}
      <div className="header-section">
        <div className="header-container">
          <h1 className="header-title">Zachary Sakacsi</h1>
          <div className="contact-info">
            <a 
              href="https://linkedin.com/in/zacharysakacsi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-item contact-link"
            >
              <img 
                src="/linkedin.png" 
                alt="LinkedIn"
                className="contact-icon"
              />
              <span>linkedin.com/in/zacharysakacsi/</span>
            </a>
          </div>

          <button onClick={handleDownloadPDF} className="download-btn">
            <span>📥</span>
            Download Resume
          </button>
          <p className="header-subtitle">Cybersecurity and networking enthusiast with hands-on experience in enterprise security, cloud risk assessment, and threat detection across various environments. Skilled in leveraging tools like Splunk, AWS, CrowdStrike, and Wireshark to secure systems, automate workflows, and analyze network activity. AWS Certified Cloud Practitioner with interests in threat intelligence, network defense, and cloud security architecture.</p>   
          
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-container">
        <div className="nav-wrapper">
          <nav className="nav-menu">
            {[
              { id: 'experience', label: 'Experience', icon: '💼' },
              { id: 'education', label: 'Education', icon: '🎓' },
              { id: 'skills', label: 'Skills', icon: '⚡' },
              { id: 'certifications', label: 'Certifications', icon: '🏆' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
}