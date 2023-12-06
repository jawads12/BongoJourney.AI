// // DayCard.js
// import React from "react";
// import "./DayCard.css"; // Assuming you have a separate CSS file for styles

// const DayCard = ({ day, nodes, onAddPlaceNode }) => {
//   return (
//     <form onSubmit={onAddPlaceNode} className="day-card">
//       <div className="full">
//         <div className="left">
//           <div className="">Day {day}</div>
//           <div>+</div>
//         </div>
//         <div className="right">
//           <div>Node 1</div>
//           <div>Node 1</div>
//           <div>Node 1</div>
//           <div>Node 1</div>
//           <div>Node 1</div>
//         </div>
//       </div>
//       {/* <div className="container">
//         <div className="">Day {day}</div>
//         <div className="plus-button">+</div>
//       </div> */}

//       {/* <div className="node-container">
//         {nodes
//             .filter((node) => node.day === day - 1)
//             .map((node, index) => (
//               <div key={index} className="node">
//                 <div className="node-circle"></div>
//                 <div className="node-name">{node.name}</div>
//               </div>
//             ))}
//       </div> */}
//     </form>
//   );
// };

// export default DayCard;

import React, { useState } from "react";
import "./DayCard.css";

const DayCard = ({ day, nodes, onAddPlaceNode }) => {
  // State to manage the nodes array
  const [localNodes, setLocalNodes] = useState(nodes);

  // Function to handle the click on the plus button
  const handleAddNode = (e) => {
    // e.preventDefault();
    // Create a new node with a unique identifier (you can use a library like uuid for this)
    const newNode = {
      id: Date.now(),
      name: `Node ${localNodes.length + 1}`,
      day: day - 1,
    };

    // Update the localNodes state with the new node
    setLocalNodes([...localNodes, newNode]);

    // Call the parent component's onAddPlaceNode function if provided
    if (onAddPlaceNode) {
      onAddPlaceNode(newNode);
    }
  };

  return (
    <form onSubmit={onAddPlaceNode} className="day-card">
      <div className="full">
        <div className="left">
          <div className="">Day {day}</div>
          <div className="plus-button" onClick={handleAddNode}>
            +
          </div>
        </div>
        <div className="right">
          <div className="node-container">
            {localNodes
              .filter((node) => node.day === day - 1)
              .map((node, index, array) => (
                <React.Fragment key={node.id}>
                  <div className="node">
                    <div className="node-circle"></div>
                    <div className="node-name">{node.name}</div>
                  </div>
                  {index < array.length - 1 && <div className="line"></div>}
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default DayCard;
