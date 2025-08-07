import React from 'react';

export default function Contact() {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Contact Me</h2>
      <p style={styles.text}>
        or dont... (wip)
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
