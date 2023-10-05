import "./OTP.css";

const OTP = () => {
  return (
    <div className="otp">
      <div className="enter-otp-sent">Enter OTP sent to yout Email</div>
      <div className="ellipse-parent">
        <img className="group-child" alt="" src="/ellipse-68@2x.png" />
        <img className="encrypted-1-icon" alt="" src="/encrypted-1@2x.png" />
      </div>
      <div className="vector-parent">
        <img className="group-item" alt="" src="/rectangle-30.svg" />
        <input
          className="sdfxgdfsgfsdgdsfgsdgsdfg"
          placeholder="OTP here"
          type="text"
        />
      </div>
    </div>
  );
};

export default OTP;
