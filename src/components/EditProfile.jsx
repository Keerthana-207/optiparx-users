import { useState } from "react";

function EditProfile({ userData, setUserData, onBack }) {
  const [formData, setFormData] = useState({
    username: userData.username || "",
    email: userData.email || "",
    phone: userData.phone || "",
    newPassword: "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    const { username, email, phone, newPassword } = formData;

    if (!email && !phone) {
      alert("⚠️ Please provide at least email or phone.");
      return;
    }

    if (newPassword && newPassword.length < 6) {
      alert("⚠️ New password must be at least 6 characters long.");
      return;
    }

    setSaving(true);

    try {
      const body = { email, phone };
      if (newPassword) body.password = newPassword;

      const res = await fetch(`https://optiparx-backend.onrender.com/api/users/update-profile/${username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Update failed");

      alert("✅ Profile updated successfully!");
      setUserData((prev) => ({ ...prev, ...formData, newPassword: undefined }));
      onBack();
    } catch (error) {
      console.error("Update error:", error);
      alert("❌ Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
      <div className="edit-container">
        <button style={{ marginBottom: 20 }} onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h2>Edit Profile</h2>

        <label>Username (cannot change)</label>
        <input type="text" value={formData.username} disabled />

        <label>Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
        />

        <label>Phone</label>
        <input
          type="text"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="9876543210"
        />

        <label>New Password (optional)</label>
        <input
          type="password"
          id="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="At least 6 characters"
        />

        <button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

  );
}

export default EditProfile;

