const calculateEnergyValuesWithPotential = (data) => {
  const m = parseFloat(data.mass) || 0;
  const v = parseFloat(data.velocity) || 0;
  const c = parseFloat(data.cycles) || 0;
  const st = parseFloat(data.stroke) || 0;
  const p = parseFloat(data.power) || 0;
  const sf = parseFloat(data.stallFactor) || 0;
  const s = parseFloat(data.sValue) || 0;
  const absorber = parseInt(data.shockAbsorber) || 1;
  const isMSec = data.isMSec ?? true; // Default to true if not provided

  if (!m || !v || !c || !p || !st || !s) {
    return {
      kineticEnergy: 0,
      potentialEnergy: 0,
      totalEnergy: 0,
      energyPerHour: 0,
      emassMin: 0,
      Vd: 0,
    };
  }

  const convertedVelocity = isMSec ? v : v / 60;

  const kineticEnergy = Math.round(
    (m * Math.pow(convertedVelocity, 2) * 0.5) / absorber
  );

  const potentialEnergy = Math.round(
    ((1000 * p * sf * s) / convertedVelocity).toFixed(1) / absorber
  );

  const totalEnergy = Math.round(kineticEnergy + potentialEnergy);

  const energyPerHour = Math.round(totalEnergy * c);

  const emassMin = Math.round(
    (2 * totalEnergy) / Math.pow(convertedVelocity, 2)
  );

  const strokeInMeters = st > 10 ? st / 1000 : st;
  const deceleration = strokeInMeters > 0 ? Number((0.75 * Math.pow(convertedVelocity, 2) / strokeInMeters).toFixed(3)) : 0;

  return {
    kineticEnergy,
    potentialEnergy,
    totalEnergy,
    energyPerHour,
    emassMin,
    Vd: convertedVelocity,
    deceleration,
  };
};
export default calculateEnergyValuesWithPotential;