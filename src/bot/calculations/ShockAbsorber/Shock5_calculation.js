const calculateCraneData = (data) => {
    const {
      mValue,
      vValue,
      isMSec,
      shockAbsorber,
      M1Value,
      sValue,
      RValue,
      cValue,
      LValue,
    } = data;
  
    const velocity = isMSec ? vValue : vValue / 60;
    const shockFactor = Number(shockAbsorber) || 1;
  
    const kineticEnergy = Math.round((mValue * velocity ** 2 * 0.5) / shockFactor);
  
    const rawPotentialEnergy = (M1Value * sValue) / RValue;
    const potentialEnergy = Math.round((+rawPotentialEnergy.toFixed(1)) / shockFactor);
  
    const totalEnergy = kineticEnergy + potentialEnergy;
  
    const energyPerHour = Math.round(totalEnergy * cValue);
  
    const Vd = (velocity * RValue) / LValue;
  
    const emassMin = Math.round((2 * totalEnergy) / Vd ** 2);

    const strokeInMeters = sValue > 10 ? sValue / 1000 : sValue;
    const deceleration = strokeInMeters > 0 ? Number((0.75 * Vd ** 2 / strokeInMeters).toFixed(3)) : 0;
  
    return {
      kineticEnergy,
      potentialEnergy,
      totalEnergy,
      energyPerHour,
      emassMin,
      Vd,
      deceleration,
    };
  };
export default calculateCraneData;