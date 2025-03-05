import React, { useEffect, useRef } from 'react';
import { Question, COLORS } from '../env';
import styled from 'styled-components';

interface WheelProps {
  questions: Question[];
  isSpinning: boolean;
  currentIndex: number;
}

const WheelContainer = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  margin: 0 auto;
  border: 10px solid #2c3e50;
  border-radius: 50%;
  overflow: hidden;
`;

const WheelElement = styled.div<{ rotation: number; isSpinning: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(${props => props.rotation}deg);
  transition: transform ${props => props.isSpinning ? '4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'};
`;

const CenterPoint = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: #2c3e50;
  border-radius: 50%;
  z-index: 2;
`;

const Wheel: React.FC<WheelProps> = ({ questions, isSpinning, currentIndex }) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = React.useState(0);

  useEffect(() => {
    if (isSpinning) {
      const fullRotations = 5 + Math.random() * 5;
      const sectorAngle = 360 / questions.length;
      const targetRotation = fullRotations * 360 + (currentIndex * sectorAngle) + (sectorAngle / 2);
      setRotation(targetRotation);
    } else {
      const sectorAngle = 360 / questions.length;
      setRotation((currentIndex * sectorAngle) + (sectorAngle / 2));
    }
  }, [isSpinning, currentIndex, questions.length]);

  const sectorAngle = 360 / questions.length;
  const radius = 250; // Радиус круга

  // Функция для создания SVG path сектора
  const createSectorPath = (index: number) => {
    const startAngle = index * sectorAngle;
    const endAngle = (index + 1) * sectorAngle;

    // Конвертируем углы в радианы
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);

    // Вычисляем координаты точек
    const startX = radius + radius * Math.cos(startRad);
    const startY = radius + radius * Math.sin(startRad);
    const endX = radius + radius * Math.cos(endRad);
    const endY = radius + radius * Math.sin(endRad);

    // Определяем, нужно ли рисовать большую дугу
    const largeArcFlag = sectorAngle > 180 ? 1 : 0;

    return `M ${radius} ${radius} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
  };

  // Функция для определения цвета сектора
  const getSectorColor = (index: number) => {
    const question = questions[index];
    if (question.isUsed) {
      return index % 2 === 0 ? COLORS.USED.PRIMARY : COLORS.USED.SECONDARY;
    }
    return index % 2 === 0 ? COLORS.ACTIVE.PRIMARY : COLORS.ACTIVE.SECONDARY;
  };

  return (
    <WheelContainer>
      <WheelElement ref={wheelRef} rotation={rotation} isSpinning={isSpinning}>
        <svg width="500" height="500" viewBox="0 0 500 500">
          {questions.map((question, index) => (
            <path
              key={question.id}
              d={createSectorPath(index)}
              fill={getSectorColor(index)}
            />
          ))}
        </svg>
      </WheelElement>
      <CenterPoint />
    </WheelContainer>
  );
};

export default Wheel; 