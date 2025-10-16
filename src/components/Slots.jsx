import { useState, useEffect } from "react";

function Slots({ userData, setUserData, onNext, onBack }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [reservedSlots, setReservedSlots] = useState([]);
  const [totalSlots, setTotalSlots] = useState(0);

  const durationPrices = {
    "30 min": 10,
    "1 hr": 20,
    "2 hrs": 30,
    "3 hrs": 40,
    "4 hrs": 50,
    "Full Day": 100,
  };

  useEffect(() => {
    fetchSlotConfig();
    fetchReservedSlots();
  }, []);

  const fetchSlotConfig = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/slots/total-slots"); // ✅ fixed endpoint
      const data = await res.json();
      setTotalSlots(data.totalSlots || 0);
      const generatedSlots = Array.from({ length: data.totalSlots }, (_, i) => `Slot ${i + 1}`);
      setSlots(generatedSlots);
    } catch (err) {
      console.error("Failed to fetch slot config:", err);
    }
  };

  const fetchReservedSlots = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/slots/reserved-slots");
      const data = await res.json();
      setReservedSlots(data.reservedSlots || []);
    } catch (err) {
      console.error("Failed to fetch reserved slots:", err);
    }
  };

  const handleSlotClick = (slot) => {
    if (reservedSlots.includes(slot)) return;
    setSelectedSlot(slot);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleProceed = async () => {
    if (!selectedSlot) return alert("Please select a slot.");
    if (!userData.carPlate || !userData.duration)
      return alert("Please fill in Car Plate and Duration first.");

    try {
      const bookingData = {
        slot: selectedSlot,
        username: userData.username,
        carPlate: userData.carPlate,
        duration: userData.duration,
      };

      const res = await fetch("http://localhost:3000/api/slots/reserve-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to reserve slot");

      setUserData({ ...userData, slot: selectedSlot });
      fetchReservedSlots();
      onNext();
    } catch (err) {
      alert("Error reserving slot: " + err.message);
    }
  };

  const getMinutes = (duration) => {
    const map = {
      "30 min": 30,
      "1 hr": 60,
      "2 hrs": 120,
      "3 hrs": 180,
      "4 hrs": 240,
      "Full Day": 1440,
    };
    return map[duration] || 60;
  };

  const selectedPrice = durationPrices[userData.duration] || 0;
  const estimatedExpiry = userData.duration
    ? new Date(Date.now() + getMinutes(userData.duration) * 60000).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    : null;

  return (
    <div className="container">
      <div className="step active">
        <h2>Select Parking Slot</h2>

          <button style={{ margin: "10px" }} onClick={onBack}>
          ← Back to Dashboard
          </button>


        {/* SLOT BUTTONS */}
        <div className="slot-container">
          <div className="slots">
          {slots.map((slot) => {
            const isReserved = reservedSlots.includes(slot);
            const isSelected = selectedSlot === slot;

            return (
              <button
                key={slot}
                disabled={isReserved}
                onClick={() => handleSlotClick(slot)}
                style={{
                  width: "120px",
                  height: "50px",
                  margin: "5px",
                  backgroundColor: isReserved
                    ? "#ccc"
                    : isSelected
                    ? "#1976d2"
                    : "#4caf50",
                  color: isReserved ? "#666" : "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: isReserved ? "not-allowed" : "pointer",
                  fontWeight: isSelected ? "bold" : "normal",
                }}
              >
                {slot}
                {isReserved ? " (Reserved)" : ""}
              </button>
            );
          })}
        </div>
        </div>
        

        <div className="form-group" style={{ marginTop: "30px" }}>
          <label>Car Plate Number</label>
          <input
            type="text"
            id="carPlate"
            value={userData.carPlate || ""}
            onChange={handleChange}
            required
          />

          <label>Parking Duration</label>
          <select
            id="duration"
            value={userData.duration || ""}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Duration --</option>
            <option>30 min</option>
            <option>1 hr</option>
            <option>2 hrs</option>
            <option>3 hrs</option>
            <option>4 hrs</option>
            <option>Full Day</option>
          </select>

          {userData.duration && (
            <>
              <p style={{ marginTop: "10px", fontWeight: "bold", color: "#2c7a7b" }}>
                Total Cost: ₹{selectedPrice}
              </p>
              <div style={{ color: "#555" }}>
                <p>Estimated Expiry:</p>
                <p>{estimatedExpiry}</p>
              </div>
            </>
          )}
        </div>

        <button onClick={handleProceed} style={{ marginTop: "20px" }}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Slots;
