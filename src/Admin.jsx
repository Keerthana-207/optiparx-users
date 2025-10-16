import { useEffect, useState } from "react";
import ManageSlots from "./AdminPanel/ManageSlots";
import PaymentSettings from "./AdminPanel/PaymentSettings";

function Admin({ slotConfig, setSlotConfig }) {
  const [users, setUsers] = useState([]);
  const [occupiedSlots, setOccupiedSlots] = useState([]);

  useEffect(() => {
    // Inject fake users if none exist
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (!storedUsers || storedUsers.length === 0) {
      const fakeUsers = [
        {
          id: 101,
          username: "john doe",
          email: "johndoe@example.com",
          carPlate: "MH12AB1234",
          phone: "9876543210"
        },
        {
          id: 102,
          username: "jane",
          email: "jane@example.com",
          carPlate: "MH14XY5678",
          phone: "9123456789"
        },
        {
          id: 103,
          username: "mark",
          email: "mark@example.com",
          carPlate: "MH01CD4321",
          phone: "9988776655"
        }
      ];
      localStorage.setItem("users", JSON.stringify(fakeUsers));
      setUsers(fakeUsers);
    } else {
      setUsers(storedUsers);
    }

    // Inject fake occupied slots if none exist
    const storedOccupied = JSON.parse(localStorage.getItem("occupiedSlots"));
    if (!storedOccupied || storedOccupied.length === 0) {
      const fakeOccupied = [2, 4, 7];
      localStorage.setItem("occupiedSlots", JSON.stringify(fakeOccupied));
      setOccupiedSlots(fakeOccupied);
    } else {
      setOccupiedSlots(storedOccupied.map(Number));
    }
  }, []);

  const freeSlot = (slotNumber) => {
    const isOccupied = occupiedSlots.includes(slotNumber);
    if (!isOccupied) {
      alert(`Slot ${slotNumber} is already vacant.`);
      return;
    }

    if (window.confirm(`Do you want to free Slot ${slotNumber}?`)) {
      const updated = occupiedSlots.filter((s) => s !== slotNumber);
      setOccupiedSlots(updated);
      localStorage.setItem("occupiedSlots", JSON.stringify(updated));
      alert(`✅ Slot ${slotNumber} is now free. Booking history is preserved.`);
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {/* Slot Management */}
      <ManageSlots slotConfig={slotConfig} setSlotConfig={setSlotConfig} />

      {/* Payment Settings */}
      <PaymentSettings slotConfig={slotConfig} setSlotConfig={setSlotConfig} />

      {/* Registered Users */}
      <section style={{ marginTop: "40px" }}>
        <h3>Registered Users</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Car Plate</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.carPlate}</td>
                <td>{u.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Occupied Slots */}
      <section style={{ marginTop: "40px" }}>
        <h3>Slot Status</h3>
        <div className="slot-container">
          {[...Array(10)].map((_, i) => {
            const slot = i + 1;
            const isOccupied = occupiedSlots.includes(slot);
            const slotClass = isOccupied ? "occupied" : "vacant";

            return (
              <div
                key={slot}
                className={`admin-slot ${slotClass}`}
                onClick={() => freeSlot(slot)}
                title={isOccupied ? "Click to free this slot" : "Slot is available"}
              >
                Slot {slot} {isOccupied && "(Occupied)"}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Admin;