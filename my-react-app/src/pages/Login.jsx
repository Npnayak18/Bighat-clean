import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!phone) {
      alert("Please enter phone number");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phone.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        alert("OTP sent successfully");

        // ✅ FIX: pass phone here
        navigate("/otp", { state: { phone: phone.trim() } });

      } else {
        alert("Error sending OTP");
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="container">
      <h4>Login</h4>

      <div className="pho">
        <input type="text" className="country" value="+91" disabled />

        <input
          type="text"
          className="ph"
          placeholder="Enter mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <button className="btn" onClick={handleContinue}>
        Continue
      </button>

      <p style={{ fontSize: "13px", color: "#666", marginTop: "15px" }}>
        By continuing you agree that you have read and accept our
        <span style={{ color: "mediumseagreen" }}> Terms & Conditions </span>
        and
        <span style={{ color: "mediumseagreen" }}> Privacy Policy</span>
      </p>
    </div>
  );
}

export default Login;