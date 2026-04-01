export default function calculateCraneEnergy(data) {
    const Vd = data.isVelocityInMSec ? data.velocity : data.velocity / 60;
  
    const kineticEnergy = Math.round((data.mass * Vd ** 2 * 0.5) / data.shockAbsorber);
    const potentialEnergy = Math.round((data.mass * 9.81 * 0.2 * data.stroke) / data.shockAbsorber);
    const totalEnergy = Math.round(kineticEnergy + potentialEnergy);
    const energyPerHour = Math.round(totalEnergy * data.cycle);
    const emassMin = Math.round((2 * totalEnergy) / Vd ** 2);

    const strokeInMeters = data.stroke > 10 ? data.stroke / 1000 : data.stroke;
    const deceleration = strokeInMeters > 0 ? Number((0.75 * Vd ** 2 / strokeInMeters).toFixed(3)) : 0;
  
    return {
      Vd,
      kineticEnergy,
      potentialEnergy,
      totalEnergy,
      energyPerHour,
      emassMin,
      deceleration,
    };
  }
