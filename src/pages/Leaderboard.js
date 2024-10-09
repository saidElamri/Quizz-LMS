import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import Header from '../components/Header';
import Footer from '../components/Footer';

const LeaderboardEntry = ({ rank, username, score, time }) => (
  <TableRow>
    <TableCell>{rank}</TableCell>
    <TableCell>{username}</TableCell>
    <TableCell>{score}</TableCell>
    <TableCell>{time}</TableCell>
  </TableRow>
);

const Leaderboard = ({ entries = [] }) => {  // Provide a default empty array for entries
  return (
    <div>
      <Header />
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.length > 0 ? (  // Check if entries exist
          entries.map((entry, index) => (
            <LeaderboardEntry
              key={entry.username}
              rank={index + 1}
              {...entry}
            />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4}>No data available</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    <Footer />
    </div>
  );
};

export default Leaderboard;
