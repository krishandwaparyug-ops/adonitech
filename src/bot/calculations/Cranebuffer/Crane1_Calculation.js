export default function Cranel1_Calculation(data) {
  const mValue = parseFloat(data.mass) || 0;
  const vValue = parseFloat(data.velocity) || 0;
  const isMMin = true;
  const shockAbsorberCount = data.modelType.includes("2 shock absorbers")
    ? 2
    : 1;
  const fValue = parseFloat(data.force) || 0;
  const sValue = parseFloat(data.stroke) || 0;
  const cValue = parseFloat(data.cyclesPerHour) || 0;
  const absorberCount = Number(shockAbsorberCount) || 1;

  const velocityInMps = isMMin ? vValue / 60 : vValue;
  const kineticEnergy = Math.round(
    (mValue * velocityInMps ** 2 * 0.25) / absorberCount
  );
  const potentialEnergy = Math.round((fValue * sValue) / absorberCount);
  const totalEnergy = kineticEnergy + potentialEnergy;
  const energyPerHour = Math.round(totalEnergy * cValue);
  const Vd = (velocityInMps * 0.5).toFixed(2);
  const emassMin = Math.round((2 * totalEnergy) / Vd ** 2);

  const strokeInMeters = sValue > 10 ? sValue / 1000 : sValue;
  const deceleration = strokeInMeters > 0 ? Number((0.75 * Vd ** 2 / strokeInMeters).toFixed(3)) : 0;

  return {
    kineticEnergy,
    absorberCount,
    potentialEnergy,
    totalEnergy,
    energyPerHour,
    Vd,
    emassMin,
    deceleration,
  };
}
