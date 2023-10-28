import React from 'react';
import './BuildPlanMyself.css';

const BuildPlanMyself = () => {
  return (
    <div className="build-plan-myself">
      <div className="upper-div">
        <input className="from" type="text" placeholder="From" />
        <input className="date" type="date" />
        <div className="with">with</div>
        <select className="family">
          <option value="couple">Couple</option>
          <option value="family">Family</option>
          <option value="friend">Friend</option>
          <option value="friend">Solo trip</option>
        </select>
        <input className="number-of-days" type="number" placeholder="Number of Days" />
        <input className="to" type="text" placeholder="To" />
      </div>
      <div className="lower-div">
        <label className="daywise-plan">Daywise Plan</label>
        <input className="day" placeholder="Day" type="text" />
        <select className="label">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <img className="node-div-icon" alt="" src="/node-div.svg" />
      </div>
    </div>
  );
};

export default BuildPlanMyself;
