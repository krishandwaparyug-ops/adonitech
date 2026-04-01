const calculateCraneEnergy = (data) => {
  const {
    mass,
    velocity,
    cycle,
    shockAbsorber = 1,
    propellingTorque,
    radius,
    stroke,
    isMSec = true,
  } = data;
  const m = Number(mass);
  const v = Number(isMSec ? velocity : velocity / 60);
  const c = Number(cycle);
  const sa = Number(shockAbsorber);
  const torque = Number(propellingTorque);
  const r = Number(radius);
  const s = Number(stroke); // assumed in meters, convert if needed

  // Energies
  const kineticEnergy = Math.round((m * v ** 2 * 0.17) / sa);
  const potentialEnergy = Math.round((torque * s) / r / sa);
  const totalEnergy = kineticEnergy + potentialEnergy;

  // Rate
  const energyPerHour = Math.round(totalEnergy * c);

  // Vd = velocity * radius
  const Vd = v * r;

  // EMassMin = (2 * E) / Vd²
  const emassMin = Math.round((2 * totalEnergy) / Vd ** 2);

  // Force = mv² / (2s), convert stroke to meters if necessary
  const strokeInMeters = s > 10 ? s / 1000 : s; // safety check for mm inputs
  const force = Math.round((m * v ** 2) / (2 * strokeInMeters));

  // Deceleration = 0.75 * Vd² / stroke
  const deceleration = Number(((0.75 * Vd ** 2) / strokeInMeters).toFixed(2));

  return {
    kineticEnergy,
    potentialEnergy,
    totalEnergy,
    energyPerHour,
    emassMin,
    Vd,
    force,
    deceleration,
  };
};
export default calculateCraneEnergy;