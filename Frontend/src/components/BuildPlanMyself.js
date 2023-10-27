import "./BuildPlanMyself.css";

const BuildPlanMyself = () => {
  return (
    <div className="build-plan-myself">
        <div className="uppper-div">
        <div className="from">From</div>
        <div className="date">Date</div>
        <div className="with">with</div>
        <div className="family">Family</div>
        <div className="number-of-days">Number of Days</div>
        <div className="to">To</div>
      </div>
      <div className="lower-div">
        <label className="daywise-plan">Daywise Plan</label>
        <input className="day" placeholder="Day" type="text" />
        <label className="label">5</label>
        <img className="node-div-icon" alt="" src="/node-div.svg" />
      </div>
      
    </div>
  );
};

export default BuildPlanMyself;
