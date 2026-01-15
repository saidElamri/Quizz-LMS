import React, { useState } from 'react';

const Announcements = ({ initialAnnouncements }) => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [newAnnouncement, setNewAnnouncement] = useState('');

  const handleAnnouncementChange = (e) => {
    setNewAnnouncement(e.target.value);
  };

  const addAnnouncement = () => {
    if (newAnnouncement.trim()) {
      setAnnouncements([...announcements, newAnnouncement]);
      setNewAnnouncement('');
    }
  };

  const deleteAnnouncement = (index) => {
    const updatedAnnouncements = announcements.filter((_, i) => i !== index);
    setAnnouncements(updatedAnnouncements);
  };

  return (
    <div style={styles.container}>
      <h2>Announcements</h2>
      <ul style={styles.list}>
        {announcements.length > 0 ? (
          announcements.map((announcement, index) => (
            <li key={index} style={styles.listItem}>
              <span>{announcement}</span>
              <button
                style={styles.deleteButton}
                onClick={() => deleteAnnouncement(index)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No announcements available.</p>
        )}
      </ul>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newAnnouncement}
          onChange={handleAnnouncementChange}
          style={styles.input}
          placeholder="Enter new announcement"
        />
        <button onClick={addAnnouncement} style={styles.addButton}>
          Add Announcement
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    width: '92%',
    maxWidth: '600px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    marginBottom: '20px',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '75%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  addButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
};

export default Announcements;
