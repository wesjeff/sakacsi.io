import React from 'react';

export default function Contact() {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Contact Me</h2>
      <p style={styles.text}>Feel free to reach out via email or connect with me on LinkedIn!</p>
      <p style={styles.text}>
        Email: <a href="mailto:your.email@example.com" style={styles.link}>your.email@example.com</a>
      </p>
      <p style={styles.text}>
        LinkedIn: <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" style={styles.link}>linkedin.com/in/yourprofile</a>
      </p>
      <p style={styles.text}>
        GitHub: <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" style={styles.link}>github.com/yourusername</a>
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
    marginBottom: '20px',
  },
  link: {
    color: '#2978b5',
    fontWeight: '600',
    textDecoration: 'none',
  },
};
