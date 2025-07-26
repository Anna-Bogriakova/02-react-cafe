import { useState } from "react";
import styles from "./App.module.css";
import CafeInfo from "./components/CafeInfo/CafeInfo.tsx";
import VoteOptions from "./components/VoteOptions/VoteOptions.tsx";
import VoteStats from "./components/VoteStats/VoteStats.tsx";
import type { Votes, VoteType } from "./types/votes.ts";

function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate =
    totalVotes > 0 ? Math.round((votes.good / totalVotes) * 100) : 0;

  const handleVote = (type: VoteType) => {
    setVotes((prev: Votes) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const resetVotes = () => {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  };

  return (
    <div className={styles.app}>
      <CafeInfo />
      <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={true} />
      <VoteStats
        votes={votes}
        totalVotes={totalVotes}
        positiveRate={positiveRate}
      />
    </div>
  );
}

export default App;
