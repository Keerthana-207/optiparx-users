import { useState, useEffect } from "react";

function Payment({ userData, slotConfig, onFinish }) {
  const [method, setMethod] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    if (method === "upi") {
      const upiID = "optipark@upi";
      const name = "OptiPark";
      const amount = "20.00";
      const data = `upi://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR`;
      const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        data
      )}&size=200x200`;
      setQrUrl(url);
    } else {
      setQrUrl("");
    }
  }, [method]);

  const confirmPayment = async () => {
    if (!method) {
      alert("Select a payment method");
      return;
    }

    try {
      const res = await fetch("https://optiparx-backend-9gc0lmpqj-keerthana-207s-projects.vercel.app/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userData.username,
          slot: userData.slot,
          carPlate: userData.carPlate,
          duration: userData.duration,
          method: method,
          paymentStatus: "paid",
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Could not complete booking");
      }

      alert(`✅ Pre-booking Payment successful via ${method.toUpperCase()}!`);
      onFinish();
    } catch (err) {
      alert("❌ Could not complete booking: " + err.message);
    }
  };


  return (
    <div className="container">
      <div className="step active">
        <h2>Payment Page</h2>
        <h4>(Service Charge)</h4>
        <div className="user-info">
          <p>
          <strong>Username:</strong> {userData.username}
        </p>
        <p>
          <strong>Slot:</strong> {userData.slot}
        </p>
        <p>
          <strong>Car Plate:</strong> {userData.carPlate}
        </p>
        </div>
        
        <div className="method-container">
          <label>Select Payment Method</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="">-- Select Method --</option>
            {slotConfig.paymentMethods.map((m) => (
              <option key={m} value={m}>
                {m.toUpperCase()}
              </option>
            ))}
          </select>

          {method === "upi" && qrUrl && (
            <div>
              <p>Scan QR to Pay:</p>
              <img src={qrUrl} alt="QR" style={{ width: 200, height: 200 }} />
            </div>
          )}

          {method === "ewallet" && <p>Send to: <strong>optipark@ewallet</strong></p>}
          {method === "cash" && <p>Pay cash at the counter.</p>}
        </div>

        <button onClick={confirmPayment}>Confirm & Pay</button>
      </div>
    </div>
  );
}

export default Payment;

