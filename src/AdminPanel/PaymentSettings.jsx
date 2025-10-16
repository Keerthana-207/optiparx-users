function PaymentSettings({ slotConfig, setSlotConfig }) {
  const toggleMethod = (method) => {
    const current = slotConfig.paymentMethods;
    const updated = current.includes(method)
      ? current.filter((m) => m !== method)
      : [...current, method];

    setSlotConfig((prev) => ({ ...prev, paymentMethods: updated }));
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Available Payment Methods</h3>
      {["upi", "ewallet", "cash"].map((method) => (
        <label key={method} style={{ display: "block", marginBottom: "10px" }}>
          <input
            type="checkbox"
            checked={slotConfig.paymentMethods.includes(method)}
            onChange={() => toggleMethod(method)}
          />
          {` ${method.toUpperCase()}`}
        </label>
      ))}
    </div>
  );
}

export default PaymentSettings;
