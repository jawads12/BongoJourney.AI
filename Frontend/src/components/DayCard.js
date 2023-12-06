import React, { useState } from "react";
import "./DayCard.css";
import Modal from "react-modal"; // Import react-modal

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent", // Set modal background to transparent
    border: "none", // Remove modal border
  },
};
const DayCard = ({ day, nodes, onAddPlaceNode }) => {
  // State to manage the nodes array
  const [localNodes, setLocalNodes] = useState(nodes);
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state
  const [newNodeName, setNewNodeName] = useState(""); // State to store the new node name

  // Function to open the modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Function to handle the click on the plus button
  const handleAddNode = () => {
    openModal();
  };

  // Function to handle adding a new node
  const handleAddNewNode = () => {
    // Create a new node with a unique identifier (you can use a library like uuid for this)
    const newNode = {
      id: Date.now(),
      name: newNodeName || `Node ${localNodes.length + 1}`,
      day: day - 1,
    };

    // Update the localNodes state with the new node
    setLocalNodes([...localNodes, newNode]);

    // Call the parent component's onAddPlaceNode function if provided
    if (onAddPlaceNode) {
      onAddPlaceNode(newNode);
    }

    // Close the modal
    closeModal();
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
      {/* Modal for adding a new node */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Node Modal"
        style={customStyles} // Apply custom styles
      >
        <div className="day-card-modal"> {/* Apply the modal class */}
          <h2>Add Node</h2>
          <input
            type="text"
            placeholder="Node Name"
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
          />
          <button onClick={handleAddNewNode}>Add</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
    </form>
  );
};

export default DayCard;
