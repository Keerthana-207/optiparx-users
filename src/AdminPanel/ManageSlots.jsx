function ManageSlots({ slotConfig, setSlotConfig }) {
  const handleToggleSlot = (slotNumber) => {
    const updated = slotConfig.disabledSlots.includes(slotNumber)
      ? slotConfig.disabledSlots.filter((s) => s !== slotNumber)
      : [...slotConfig.disabledSlots, slotNumber];

    setSlotConfig((prev) => ({ ...prev, disabledSlots: updated }));
  };

  return (
    <div>
      <h3>Slot Management</h3>
      <div className="slots">
        {[...Array(10)].map((_, i) => {
          const slotNum = i + 1;
          const isDisabled = slotConfig.disabledSlots.includes(slotNum);
          return (
            <button
              key={slotNum}
              onClick={() => handleToggleSlot(slotNum)}
              style={{
                background: isDisabled ? "#f87171" : "#4ade80",
                color: "#fff",
                margin: "5px",
                padding: "10px",
                border: "none",
                borderRadius: "4px"
              }}
            >
              Slot {slotNum} {isDisabled ? "(Disabled)" : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ManageSlots;
