import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./user_profile.css";

const Frame = () => {
  const navigate = useNavigate();

  const onUFSignoutTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="user-profile">
      <div className="uf-picframe">
        <img
          className="uf-img-icon"
          alt=""
          src="/pxl-20230420-0511079402-1@2x.png"
        />
      </div>
      <div className="uf-md-jawadur-rahman">Md. Jawadur Rahman</div>
      <img className="uf-line-14-icon" alt="" src="/uf-line-14.svg" />
      <div className="uf-profile">Profile</div>
      <div className="uf-notifications">Notifications</div>
      <div className="uf-discounts">Discounts</div>
      <div className="uf-badges">Badges</div>
      <div className="uf-history">History</div>
      <div className="uf-map">Map</div>
      <div className="uf-settings">Settings</div>
      <div className="uf-signout" onClick={onUFSignoutTextClick}>
        Signout
      </div>
      <div className="uf-group-36635">
        <div className="uf-ellipse-64" />
        <div className="uf-5">5</div>
      </div>
      <img className="uf-user-1-1" alt="" src="/user-1-1@2x.png" />
      <img
        className="uf-placeholder-1-1"
        alt=""
        src="/placeholder-1-1@2x.png"
      />
      <img className="uf-image-2-icon" alt="" src="/image-2@2x.png" />
      <img className="uf-image-3-icon" alt="" src="/image-3@2x.png" />
      <img className="uf-image-4-icon" alt="" src="/image-4@2x.png" />
      <img className="uf-image-5-icon" alt="" src="/image-5@2x.png" />
      <img className="uf-image-6-icon" alt="" src="/image-6@2x.png" />
      <img className="uf-power-off-1-icon" alt="" src="/poweroff-1@2x.png" />
    </div>
  );
};

export default Frame;
