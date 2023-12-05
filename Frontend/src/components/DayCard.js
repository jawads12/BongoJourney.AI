// DayCard.js
import React from 'react';
import './DayCard.css'; // Assuming you have a separate CSS file for styles

const DayCard = ({ day, nodes, onAddPlaceNode }) => {
  return (
    <form onSubmit={onAddPlaceNode} className="day-card">
      <div className="day-label">Day {day}</div>
      <div className="node-container">
        {nodes
          .filter(node => node.day === day - 1)
          .map((node, index) => (
            <div key={index} className="node">
              <div className="node-circle"></div>
              <div className="node-name">{node.name}</div>
            </div>
          ))}
      </div>
    </form>
  );
};

export default DayCard;
