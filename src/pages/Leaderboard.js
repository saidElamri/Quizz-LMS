import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import Header from '../components/Header';
import Footer from '../components/Footer';

const LeaderboardEntry = ({ rank, username, score, time }) => (
  <TableRow style={styles.row}>
    <TableCell style={styles.cell}>{rank}</TableCell>
    <TableCell style={styles.cell}>{username}</TableCell>
    <TableCell style={styles.cell}>{score}</TableCell>
    <TableCell style={styles.cell}>{time}</TableCell>
  </TableRow>
);

const Leaderboard = ({ entries = [] }) => {
  return (
    <div style={styles.container}>
      <Header />
      <h1 style={styles.title}>Leaderboard</h1>
      <Table style={styles.table}>
        <TableHeader>
          <TableRow style={styles.headerRow}>
            <TableHead style={styles.headerCell}>Rank</TableHead>
            <TableHead style={styles.headerCell}>Username</TableHead>
            <TableHead style={styles.headerCell}>Score</TableHead>
            <TableHead style={styles.headerCell}>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <LeaderboardEntry
                key={entry.username}
                rank={index + 1}
                {...entry}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} style={styles.emptyCell}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Footer />
    </div>
  );
};

// Sample random leaderboard entries
const sampleEntries = Array.from({ length: 30 }, (_, index) => ({
  username: `User${index + 1}`,
  score: Math.floor(Math.random() * 100), // Random score between 0 and 99
  time: `${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, '0')}` // Random time in MM:SS format
}));

const styles = {
  container: {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerRow: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  headerCell: {
    padding: '12px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cell: {
    padding: '12px',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
  },
  row: {
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
  emptyCell: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#777',
  },
};

// Assign arrow function to a variable before exporting
const LeaderboardPage = () => <Leaderboard entries={sampleEntries} />;

export default LeaderboardPage;


 // Assuming you create a CSS file for styles

// Sample leaderboard entry
// const LeaderboardEntry = ({ rank, username, score, time }) => (
//   <TableRow className="leaderboard-entry">
//     <TableCell>{rank}</TableCell>
//     <TableCell>{username}</TableCell>
//     <TableCell>{score}</TableCell>
//     <TableCell>{time}</TableCell>
//   </TableRow>
// );

// // Leaderboard Component
// const Leaderboard = ({ entries = [] }) => {
//   return (
//     <div className="leaderboard-container">
//       <Header />
//       <h1 className="leaderboard-title">Quiz Leaderboard</h1>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Rank</TableHead>
//             <TableHead>Username</TableHead>
//             <TableHead>Score</TableHead>
//             <TableHead>Time Taken</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {entries.length > 0 ? (
//             entries.map((entry, index) => (
//               <LeaderboardEntry
//                 key={entry.username}
//                 rank={index + 1}
//                 {...entry}
//               />
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={4}>No data available</TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//       <Footer />
//     </div>
//   );
// };


