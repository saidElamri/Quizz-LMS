// Resources.js
import React from 'react';

const Resources = ({ resources }) => {
  return (
    <div style={styles.section}>
      <h2>Resources</h2>
      <ul>
        {resources.length > 0 ? (
          resources.map((resource, index) => (
            <li key={index}>{resource.title}</li>
          ))
        ) : (
          <li>No resources available</li>
        )}
      </ul>
    </div>
  );
};

const styles = {
  section: {
    marginBottom: '20px',
  },
};

export default Resources;
