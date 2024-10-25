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

// Better static leaderboard entries
const sampleEntries = [
  { username: 'GamerGuru', score: 95, time: '02:15' },
  { username: 'CodeNinja', score: 88, time: '03:05' },
  { username: 'QuizWhiz', score: 82, time: '01:45' },
  { username: 'Brainiac77', score: 76, time: '02:30' },
  { username: 'SmartyPants', score: 70, time: '04:00' },
  { username: 'QuizMaster', score: 67, time: '02:50' },
  { username: 'TriviaTitan', score: 65, time: '03:20' },
  { username: 'KnowledgeKing', score: 60, time: '02:10' },
  { username: 'FactFinder', score: 55, time: '03:15' },
  { username: 'Intellecto', score: 50, time: '03:30' },
  { username: 'MindMaven', score: 45, time: '02:45' },
  { username: 'QuestionQueen', score: 40, time: '01:55' },
  { username: 'LogicLord', score: 35, time: '02:25' },
  { username: 'BrainBoss', score: 30, time: '03:10' },
  { username: 'WiseGuy', score: 25, time: '02:35' },
  { username: 'NerdAlert', score: 20, time: '02:50' },
  { username: 'SmartCookie', score: 15, time: '04:20' },
  { username: 'WhizKid', score: 10, time: '05:00' },
  { username: 'EinsteinJunior', score: 5, time: '04:45' },
];

// Assign arrow function to a variable before exporting
const LeaderboardPage = () => <Leaderboard entries={sampleEntries} />;

export default LeaderboardPage;

// Add styles if needed (similar to your original styles)
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


