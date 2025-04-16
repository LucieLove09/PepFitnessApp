import React, { useState, ChangeEvent } from 'react';

type Props = {};

interface Challenge {
  id: number;
  name: string;
  explanation: string;
}

const defaultChallenges: Challenge[] = [
  { id: 1, name: "Push-ups Challenge", explanation: "Do 50 push-ups daily to strengthen your upper body." },
  { id: 2, name: "Squat Challenge", explanation: "Perform 100 squats daily to improve leg strength." },
  { id: 3, name: "Plank Challenge", explanation: "Hold a plank for 1 minute to boost your core stability." },
  { id: 4, name: "Burpees Challenge", explanation: "Complete 20 burpees daily to enhance cardiovascular fitness." },
  { id: 5, name: "Yoga Challenge", explanation: "Practice 30 minutes of yoga daily to increase flexibility and balance." },
];

const Challenges: React.FC<Props> = () => {
  const [selectedChallenges, setSelectedChallenges] = useState<Challenge[]>([]);
  const [availableChallenges, setAvailableChallenges] = useState<Challenge[]>(defaultChallenges);
  const [selectedChallengeId, setSelectedChallengeId] = useState<number>(defaultChallenges[0]?.id || 0);

  // Add chosen challenge from the dropdown 
  const handleAddChallenge = () => {
    const challengeToAdd = availableChallenges.find(challenge => challenge.id === selectedChallengeId);
    if (challengeToAdd) {
      setSelectedChallenges([...selectedChallenges, challengeToAdd]);
      const newAvailable = availableChallenges.filter(challenge => challenge.id !== selectedChallengeId);
      setAvailableChallenges(newAvailable);
      // Reset the dropdown selection to the first available challenge, if any remain.
      if (newAvailable.length > 0) {
        setSelectedChallengeId(newAvailable[0].id);
      } else {
        setSelectedChallengeId(0);
      }
    }
  };

  // Remove a challenge from the selected list 
  const handleDeleteChallenge = (id: number) => {
    const challengeToRemove = selectedChallenges.find(challenge => challenge.id === id);
    if (challengeToRemove) {
      setSelectedChallenges(selectedChallenges.filter(challenge => challenge.id !== id));
      const updatedAvailable = [...availableChallenges, challengeToRemove].sort((a, b) => a.id - b.id);
      setAvailableChallenges(updatedAvailable);
      if (selectedChallengeId === 0) {
        setSelectedChallengeId(updatedAvailable[0].id);
      }
    }
  };

  // Update the dropdown selection 
  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedChallengeId(parseInt(e.target.value));
  };

  // Retrieve the currently selected challenge from the list.
  const currentSelectedChallenge = availableChallenges.find(challenge => challenge.id === selectedChallengeId);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Workout Challenges</h1>
      <div style={{ marginBottom: "20px" }}>
        <h2>Add a Challenge</h2>
        {availableChallenges.length > 0 ? (
          <>
            <select value={selectedChallengeId} onChange={handleDropdownChange}>
              {availableChallenges.map(challenge => (
                <option key={challenge.id} value={challenge.id}>
                  {challenge.name}
                </option>
              ))}
            </select>
            <button onClick={handleAddChallenge} style={{ marginLeft: "10px" }}>
              Add Challenge
            </button>
            {currentSelectedChallenge && (
              <div style={{ marginTop: "10px" }}>
                <strong>Description:</strong> {currentSelectedChallenge.explanation}
              </div>
            )}
          </>
        ) : (
          <p>No more challenges available to add.</p>
        )}
      </div>
      <div>
        <h2>Selected Challenges</h2>
        {selectedChallenges.length > 0 ? (
          <ul>
            {selectedChallenges.map(challenge => (
              <li key={challenge.id} style={{ marginBottom: "10px" }}>
                <div>
                  <strong>{challenge.name}</strong>
                </div>
                <div style={{ fontStyle: "italic" }}>{challenge.explanation}</div>
                <button onClick={() => handleDeleteChallenge(challenge.id)} style={{ marginTop: "5px" }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No challenges selected.</p>
        )}
      </div>
    </div>
  );
};

export default Challenges;
