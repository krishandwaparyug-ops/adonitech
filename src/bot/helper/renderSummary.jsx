export const renderSummary = (currentCalculation) => {
  if (!currentCalculation) return null;

  // Enhanced units configuration with display names
  const fieldConfig = {
    shockAbsorberCount: { unit: "", displayName: "Shock Absorbers" },
    energy: { unit: "Nm", displayName: "Energy per Absorber" },
    totalEnergy: { unit: "Nm", displayName: "Total Energy" },
    power: { unit: "W", displayName: "Power" },
    velocity: { unit: "m/s", displayName: "Velocity" },
    mass: { unit: "kg", displayName: "Mass" },
    force: { unit: "N", displayName: "Force" },
    stroke: { unit: "mm", displayName: "Stroke" },
    cyclesPerHour: { unit: "/hr", displayName: "Cycles per Hour" },
    temperature: { unit: "°C", displayName: "Temperature" },
    propulsionForce: { unit: "N", displayName: "Propulsion Force" },
    strokeTime: { unit: "s", displayName: "Stroke Time" },
    deceleration: { unit: "m/s²", displayName: "Deceleration" },
  };

  // Format numeric values with appropriate decimal places
  const formatValue = (value) => {
    if (typeof value === "number") {
      // Use 0 decimal places for counts, 2 for others
      return Number.isInteger(value) ? value.toString() : value.toFixed(2);
    }
    return value;
  };

  // Sort keys to ensure consistent order with shock absorbers first
  const sortedKeys = Object.keys(currentCalculation).sort((a, b) => {
    if (a === "shockAbsorberCount") return -1;
    if (b === "shockAbsorberCount") return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-lg text-blue-800">Calculation Results</h4>
        {currentCalculation?.absorberCount && (
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {currentCalculation.absorberCount} Shock Absorber
            {currentCalculation.absorberCount !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sortedKeys.map((key) => {
          if (key === "shockAbsorberCount") return null; // Already displayed in header
          
          const config = fieldConfig[key] || { unit: "", displayName: key };
          const value = currentCalculation[key];

          return (
            <div 
              key={key} 
              className="bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    {config.displayName}
                  </div>
                  <div className="text-lg font-bold text-gray-800 mt-1">
                    {formatValue(value)}
                    {config.unit && (
                      <span className="text-sm font-normal text-gray-500 ml-1">
                        {config.unit}
                      </span>
                    )}
                  </div>
                </div>
                {key.includes("Energy") && currentCalculation?.absorberCount > 1 && (
                  <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                    {key === "energy" ? "Per unit" : "Combined"}
                  </div>
                )}
              </div>
              
              {/* Visual indicator for energy values */}
              {key.includes("Energy") && (
                <div className="mt-2 h-2 bg-blue-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ 
                      width: `${Math.min(100, (value / (currentCalculation.totalEnergy || value)) * 100)}%` 
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};