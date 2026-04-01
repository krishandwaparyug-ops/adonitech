const calculateCraneDataFromUI = (data) => {
    const mass = parseFloat(data.mValue);
    const height = parseFloat(data.hValue);
    const stroke = parseFloat(data.sValue);
    const cycle = parseFloat(data.cValue);
    const shock = Number(data.shockAbsorber) || 1;
  
    if (isNaN(mass) || isNaN(height) || isNaN(stroke) || isNaN(cycle)) {
      return null; // or throw an error or return default values
    }
  
    const g = 9.81;
  
    const kineticEnergy = Math.round((mass * g * height) / shock);
    const potentialEnergy = Math.round(((mass * g * stroke).toFixed(1)) / shock);
    const totalEnergy = Math.round(kineticEnergy + potentialEnergy);
    const energyPerHour = Math.round(totalEnergy * cycle);
  
    const Vd = parseFloat(Math.sqrt(2 * g * height).toFixed(2));
    const emassMin = Math.round((2 * totalEnergy) / (Vd ** 2));

    const strokeInMeters = stroke > 10 ? stroke / 1000 : stroke;
    const deceleration = strokeInMeters > 0 ? Number((0.75 * Vd ** 2 / strokeInMeters).toFixed(3)) : 0;
  
    return {
      kineticEnergy,
      potentialEnergy,
      totalEnergy,
      energyPerHour,
      Vd,
      emassMin,
      deceleration,
    };
  };
  export default calculateCraneDataFromUI;