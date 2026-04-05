// utils/calculateEnergy.js
export default function calculateEnergyValues(data) {
  const {
    mass,
    velocity,
    isVelocityInMSec,
    cycles,
    propellingTorque,
    strokeValue,
    radius,
    length,
    shockAbsorber,
  } = data;
  const v = isVelocityInMSec ? velocity : velocity / 60;

  const kineticEnergy = Math.round((mass * v ** 2 * 0.5) / shockAbsorber);
  const potentialEnergy = Math.round(
    (propellingTorque * strokeValue) / radius / shockAbsorber
  );
  const totalEnergy = kineticEnergy + potentialEnergy;
  const energyPerHour = Math.round(totalEnergy * cycles);

  const Vd = ((v * radius) / length).toFixed(2);
  const emassMin = Math.round((2 * totalEnergy) / Vd ** 2);

  const strokeInMeters = strokeValue > 10 ? strokeValue / 1000 : strokeValue;
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
}
