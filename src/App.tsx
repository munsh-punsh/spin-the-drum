import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Wheel from './components/Wheel';
import Modal from './components/Modal';
import { questions, Question, TEAM_NAMES } from './env';

const AppContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const SpinButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 2rem 0;
  
  &:hover {
    background-color: #c0392b;
  }
  
  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const CurrentSectorButton = styled(SpinButton)`
  background-color: #2ecc71;
  margin-left: 1rem;
  
  &:hover {
    background-color: #27ae60;
  }
  
  &:disabled {
    background-color: #bdc3c7;
  }
`;

const ScoreBoard = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const TeamScore = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 5px;
  min-width: 150px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
`;

interface GameState {
  currentIndex: number;
  isSpinning: boolean;
  showModal: boolean;
  team1Score: number;
  team2Score: number;
  questions: Question[];
}

const STORAGE_KEY = 'wheelGameState';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      return {
        ...parsedState,
        questions: parsedState.questions || questions.map(q => ({ ...q, isUsed: false }))
      };
    }
    return {
      currentIndex: 0,
      isSpinning: false,
      showModal: false,
      team1Score: 0,
      team2Score: 0,
      questions: questions.map(q => ({ ...q, isUsed: false }))
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  const handleSpin = () => {
    // Находим неиспользованные сектора
    const unusedIndices = gameState.questions
      .map((q, index) => q.isUsed ? -1 : index)
      .filter(index => index !== -1);

    if (unusedIndices.length === 0) {
      alert('Все вопросы уже использованы!');
      return;
    }

    // Выбираем случайный неиспользованный сектор
    const randomIndex = unusedIndices[Math.floor(Math.random() * unusedIndices.length)];
    
    setGameState(prev => ({ ...prev, isSpinning: true }));
    
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        currentIndex: randomIndex,
        isSpinning: false,
        showModal: true,
      }));
    }, 4000);
  };

  const handleCloseModal = () => {
    setGameState(prev => ({ ...prev, showModal: false }));
  };

  const handleAddPoint = (teamNumber: 1 | 2) => {
    setGameState(prev => {
      const newQuestions = [...prev.questions];
      newQuestions[prev.currentIndex] = {
        ...newQuestions[prev.currentIndex],
        isUsed: true
      };

      return {
        ...prev,
        team1Score: teamNumber === 1 ? prev.team1Score + 1 : prev.team1Score,
        team2Score: teamNumber === 2 ? prev.team2Score + 1 : prev.team2Score,
        showModal: false,
        questions: newQuestions
      };
    });
  };

  const handleShowCurrentSector = () => {
    setGameState(prev => ({
      ...prev,
      showModal: true
    }));
  };

  return (
    <AppContainer>
      <Title>Крути барабан</Title>
      <Wheel
        questions={gameState.questions || []}
        isSpinning={gameState.isSpinning}
        currentIndex={gameState.currentIndex}
      />
      <ButtonContainer>
        <SpinButton
          onClick={handleSpin}
          disabled={gameState.isSpinning || (gameState.questions && gameState.questions.every(q => q.isUsed))}
        >
          Крутить барабан
        </SpinButton>
        {!gameState.isSpinning && !gameState.questions[gameState.currentIndex].isUsed && (
          <CurrentSectorButton
            onClick={handleShowCurrentSector}
            disabled={gameState.showModal}
          >
            Показать текущий сектор
          </CurrentSectorButton>
        )}
      </ButtonContainer>
      
      <ScoreBoard>
        <TeamScore>
          <h3>{TEAM_NAMES.TEAM_1}</h3>
          <p>{gameState.team1Score} баллов</p>
        </TeamScore>
        <TeamScore>
          <h3>{TEAM_NAMES.TEAM_2}</h3>
          <p>{gameState.team2Score} баллов</p>
        </TeamScore>
      </ScoreBoard>

      {gameState.showModal && (
        <Modal
          question={gameState.questions[gameState.currentIndex]}
          onClose={handleCloseModal}
          onAddPoint={handleAddPoint}
        />
      )}
    </AppContainer>
  );
};

export default App; 