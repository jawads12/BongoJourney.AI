import "./StartPopup.css";

const StartPopup = () => {
  return (
    <div className="start-popup">
      <input
        className="i-want-to"
        placeholder="I want to start from"
        type="text"
      />
      <button className="pop">
        <div className="go">Go</div>
      </button>
    </div>
  );
};

export default StartPopup;
