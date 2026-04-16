import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Otp.css";

function Otp() {

  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const phone = location.state?.phone;

  // ✅ safety check
  if (!phone) {
    alert("Phone number missing");
    navigate("/login");
  }

  const handleVerify = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          otp: Number(otp)   // ✅ FIX
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Login Successful");

        // ✅ store user
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/");
      } else {
        alert("Invalid Otp");
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-card">

        <h3>Welcome back BigHaat Farmer</h3>

        <p className="otp-text">
          Please enter the OTP you received at <br />
          +91 {phone}
        </p>

        <input
          type="text"
          placeholder="Enter otp"
          className="otp-input"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button className="verify-btn" onClick={handleVerify}>
          Verify
        </button>

        <p className="terms">
          By continuing you agree that you have read and accept our
          <span> Terms & Conditions </span>
          and
          <span> Privacy Policy</span>
        </p>

      </div>
    </div>
  );
}

export default Otp;