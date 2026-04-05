const calculateEnergyData = (data) => {
    const {
        mass, // in kg
        velocity, // in m/s (not converted)
        propellingTorque,
        radius,
        length,
        cycle,
        stroke,
        shockAbsorber,
        isMSec,
      } = data;
    const v = isMSec ? velocity : velocity / 60; // convert mm/min to m/s if needed
  
    // 1. Kinetic Energy
    const kineticEnergy = Math.round((mass * v ** 2 * 0.5) / shockAbsorber);
  
    // 2. Potential Energy
    const potentialEnergy = Math.round(((propellingTorque * stroke) / radius) / shockAbsorber);
  
    // 3. Total Energy
    const totalEnergy = kineticEnergy + potentialEnergy;
  
    // 4. Energy Per Hour
    const energyPerHour = Math.round(totalEnergy * cycle);
  
    // 5. Vd = v * r / l
    const Vd = (v * radius) / length;
  
    // 6. emassMin = (2 * E) / Vd^2
    const emassMin = Math.round((2 * totalEnergy) / Vd ** 2);

    const strokeInMeters = stroke > 10 ? stroke / 1000 : stroke;
    const deceleration = strokeInMeters > 0 ? Number((0.75 * Vd ** 2 / strokeInMeters).toFixed(3)) : 0;
    const force = Math.round((mass * v ** 2) / (2 * strokeInMeters)); // N (Newtons)
  
  
    return {
      kineticEnergy,
      potentialEnergy,
      totalEnergy,
      energyPerHour,
      Vd,
      emassMin,
      deceleration,
      force
    };
  };
  export default calculateEnergyData;