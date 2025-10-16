import { useEffect, useState } from "react";

function generateQr(amount) {
  const upiID = "optipark@upi";
  const name = "OptiPark";
  const data = `upi://pay?pa=${upiID}&pn=${name}&am=${amount.toFixed(2)}&cu=INR`;
  return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=200x200`;
}

function FinalPayment({ userData, onFinish }) {
  const durationToRate = {
    "30 min": 10,
    "1 hr": 20,
    "2 hrs": 30,
    "3 hrs": 40,
    "4 hrs": 50,
    "Full Day": 100,
  };

  const amountDue = durationToRate[userData.duration] || 20;
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const qr = generateQr(amountDue);
    setQrUrl(qr);
  }, [amountDue]);

  const handleFinalPay = async () => {
    // Send booking data to backend
    const bookingData = {
      username: userData.username,
      carPlate: userData.carPlate,
      slot: userData.slot,
      duration: userData.duration,
    };

    try {
      const res = await fetch("http://localhost:3000/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const error = await res.json();
        alert("❌ Booking failed: " + error.message);
        return;
      }

      alert("✅ Final payment successful and booking saved!");
      onFinish(); // Go back to dashboard
    } catch (error) {
      console.error("Booking error:", error);
      alert("❌ Could not complete booking. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Payment Page</h2>
      <h4>(Parking Fees)</h4>
      <div className="user-info">
        <p>
        Welcome back <strong>{userData.username}</strong>
      </p>
      <p>
        Slot: <strong>{userData.slot}</strong>
      </p>
      <p>
        Duration: <strong>{userData.duration}</strong>
      </p>
      <p>
        Due Amount: <strong>₹{amountDue}</strong>
      </p>
      </div>
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <p>Scan the QR below to pay the due amount via UPI:</p>
        {qrUrl && (
          <img
            src={qrUrl}
            alt="Final Payment UPI QR Code"
            style={{ width: 200, height: 200 }}
          />
        )}
      </div>

      <button style={{ marginTop: 20 }} onClick={handleFinalPay}>
        Confirm Payment & Exit
      </button>
    </div>
  );
}

export default FinalPayment;
