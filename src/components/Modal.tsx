import React, { useState } from 'react';
import styled from 'styled-components';
import { Question } from '../env';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 800px;
  width: 90%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const QuestionText = styled.h2`
  margin-bottom: 1.5rem;
  color: #2c3e50;
`;

const AnswerText = styled.p`
  font-size: 1.2rem;
  color: #34495e;
  margin-bottom: 1.5rem;
`;

const ImageContainer = styled.div`
  margin: 1.5rem 0;
  
  img {
    max-width: 600px;
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const TeamButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:first-child {
    background-color: #3498db;
    color: white;
    
    &:hover {
      background-color: #2980b9;
    }
  }
  
  &:last-child {
    background-color: #e74c3c;
    color: white;
    
    &:hover {
      background-color: #c0392b;
    }
  }
`;

const ShowAnswerButton = styled(TeamButton)`
  background-color: #2ecc71;
  color: white;
  
  &:hover {
    background-color: #27ae60;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
  width: 100%;
  box-sizing: border-box;
`;

const OptionText = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #f8f9fa;
  color: #666;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
`;

interface ModalProps {
  question: Question;
  onClose: () => void;
  onAddPoint: (teamNumber: 1 | 2) => void;
}

const Modal: React.FC<ModalProps> = ({ question, onClose, onAddPoint }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <QuestionText>{question.question}</QuestionText>
        {question.imageUrl && (
          <ImageContainer>
            <img src={question.imageUrl} alt="Question illustration" />
          </ImageContainer>
        )}
        
        {question.options && question.options.length > 0 && (
          <OptionsContainer>
            {question.options.map((option, index) => (
              <OptionText key={index}>
                {option}
              </OptionText>
            ))}
          </OptionsContainer>
        )}
        
        {!showAnswer ? (
          <ButtonContainer>
            <ShowAnswerButton onClick={() => setShowAnswer(true)}>
              Показать ответ
            </ShowAnswerButton>
          </ButtonContainer>
        ) : (
          <>
            <AnswerText>Ответ: {question.answer}</AnswerText>
            <ButtonContainer>
              <TeamButton onClick={() => onAddPoint(1)}>Команда 1</TeamButton>
              <TeamButton onClick={() => onAddPoint(2)}>Команда 2</TeamButton>
            </ButtonContainer>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal; 