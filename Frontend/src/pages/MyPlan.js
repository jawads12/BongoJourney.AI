import { useState, useCallback, useEffect } from "react";
import "./MyPlan.css";
import Navbar from "../components/Navbar";
import axios from "axios";

const MyPlan = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/plans/${localStorage.getItem("phone")}`)
      .then((response) => {
        setPlans(response.data);
      })
      .catch((error) => {
        console.error("Error fetching plans:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="heading">Your Plans:</h1>
      <div className="plan-container">
        {plans.map((plan) => (
          <div key={plan._id} className="plan-box">
            <h3 className="title">
              {plan.from} to {plan.to}
            </h3>
            {/* <div>
              <p>Start Date: {new Date(plan.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(plan.endDate).toLocaleDateString()}</p>
            </div>
            <ul>
              {plan.days.map((day) => (
                <li key={day._id}>
                  <strong>Day {day.day}:</strong>
                  <ul>
                    {day.nodes.map((node) => (
                      <li key={node.id}>{node.name}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default MyPlan;
