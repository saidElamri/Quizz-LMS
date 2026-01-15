// Resources.js
import React from 'react';

const Resources = () => {
  const resources = [
    { title: 'Math Study Guide', link: '#' },
    { title: 'History Cheat Sheet', link: '#' },
    { title: 'Science Reference Book', link: '#' },
    { title: 'Geography Maps Collection', link: '#' },
    { title: 'Literature Analysis Notes', link: '#' },
  ];

  return (
    <div style={styles.section}>
      <h2>Helpful Resources</h2>
      <ul style={styles.resourceList}>
        {resources.length > 0 ? (
          resources.map((resource, index) => (
            <li key={index} style={styles.resourceItem}>
              <a href={resource.link} style={styles.resourceLink} target="_blank" rel="noopener noreferrer">
                {resource.title}
              </a>
            </li>
          ))
        ) : (
          <li style={styles.noResource}>No resources available</li>
        )}
      </ul>
    </div>
  );
};

const styles = {
  section: {
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f0f8ff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  resourceList: {
    listStyleType: 'none',
    padding: 0,
  },
  resourceItem: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  },
  resourceLink: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#007BFF',
    fontSize: '16px',
  },
  noResource: {
    fontStyle: 'italic',
    color: '#888',
  },
};

export default Resources;
