import "./BuildPlanMyself.css";

const BuildPlanMyself = () => {
  return (
    <div className="build-plan-myself">

        <div className="upper-div">
            <div className="from-to">
                <input className="from" placeholder="From" type="text"/>
                <input className="to" placeholder="To" type="text"/>
            </div>
            
            <div >Date</div>
            <div >with</div>
            <div >Family</div>
            <div >Number of Days</div>
            
        </div>
        <div className="lower-div">
            <label >Daywise Plan</label>
            <input placeholder="Day" type="text" />
            <label >5</label>
            <img  alt="" src="/node-div.svg" />
        </div>
      
    </div>
  );
};

export default BuildPlanMyself;
