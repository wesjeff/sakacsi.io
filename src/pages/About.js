import React from 'react';

export default function About() {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>About Me</h2>
      <p style={styles.text}>
        Hello! I'm Zsaka, a cybersecurity student at [Your University], graduating December 2025. I specialize in penetration testing, vulnerability assessment, and security research.  
      </p>
      <p style={styles.text}>
        I have hands-on experience with Linux, Python scripting, network security, and ethical hacking. I'm passionate about securing systems and constantly learning new techniques.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: '80px 20px',
    maxWidth: '700px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#0a1f44',
  },
  header: {
    fontSize: '2.5rem',
    marginBottom: '30px',
  },
  text: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
};
