import { useEffect, useState } from "react";

// Duration to minutes mapping
function getDurationMinutes(durationLabel) {
  const map = {
    "30 min": 30,
    "1 hr": 60,
    "2 hrs": 120,
    "3 hrs": 180,
    "4 hrs": 240,
    "Full Day": 1440,
  };
  return map[durationLabel] || 60;
}

// Format to IST
function formatIST(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

function BookingHistory({ userData, onBack }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`https://optiparx-backend-9gc0lmpqj-keerthana-207s-projects.vercel.app/api/slots/bookings/${userData.username}`);
        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Failed to load booking history.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userData.username]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await fetch(`https://optiparx-backend-9gc0lmpqj-keerthana-207s-projects.vercel.app/api/slots/cancel-booking/${bookingId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Cancellation failed");

      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      alert("✅ Booking cancelled successfully!");
    } catch (error) {
      console.error("Cancel error:", error);
      alert("❌ Failed to cancel booking.");
    }
  };

  const isBookingActive = (bookedAt, durationLabel) => {
    const durationMins = getDurationMinutes(durationLabel);
    const expiryTime = new Date(new Date(bookedAt).getTime() + durationMins * 60000);
    return new Date() < expiryTime;
  };

  return (
    <div className="container">
      <h2>Booking History</h2>
      <button onClick={onBack}>← Back to Dashboard</button>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-history-frame">
          {bookings
            .slice()
            .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt)) // Sort by newest first
            .map((b) => {
              const isActive = isBookingActive(b.bookedAt, b.duration);
              const expiresAt = new Date(
                new Date(b.bookedAt).getTime() + getDurationMinutes(b.duration) * 60000
              );

              return (
                <div key={b._id} className="booking-item">
                  <p><strong>Slot:</strong> {b.slot}</p>
                  <p><strong>Car Plate:</strong> {b.carPlate}</p>
                  <p><strong>Duration:</strong> {b.duration}</p>
                  <p><strong>Booked At:</strong> {formatIST(b.bookedAt)}</p>
                  <p><strong>Expires At:</strong> {formatIST(expiresAt)}</p>
                  <p><strong>Status:</strong> {isActive ? "🟢 Active" : "🔴 Expired"}</p>

                  {isActive && (
                    <button onClick={() => handleCancel(b._id)} style={{ marginTop: 5 }}>
                      Cancel Booking
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default BookingHistory;
