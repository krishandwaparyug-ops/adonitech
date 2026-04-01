export default function Shock1_Calculation(data) {
    const mValue = parseFloat(data.mass) || 0;
    const vValue = parseFloat(data.velocity) || 0;
    const fValue = parseFloat(data.force) || 0;
    const sValue = parseFloat(data.stroke) || 0;
    const cValue = parseFloat(data.cyclesPerHour) || 0;
    const isMSec = true; // Assuming velocity is in m/s by default
    const shockAbsorberCount = data.modelType.includes("2 shock absorbers") ? 2 : 1;
  
    // Validate inputs
    if (!mValue || !vValue || !fValue || !sValue || !cValue || !shockAbsorberCount) {
      throw new Error('All input parameters are required and must be greater than 0');
    }
  
    // Convert units if necessary
    const convertedVelocity = isMSec ? vValue : vValue / 60;
  
    // Perform calculations
    const kineticEnergy = Math.round(
      (mValue * Math.pow(convertedVelocity, 2) * 0.5) / shockAbsorberCount
    );
  
    const potentialEnergy = Math.round(
      (fValue * sValue) / shockAbsorberCount
    );
  
    const totalEnergy = kineticEnergy + potentialEnergy;
  
    const energyPerHour = Math.round(
      (totalEnergy * cValue)
    );
  
    const emassMin = Math.round((2 * totalEnergy) / Math.pow(convertedVelocity, 2));

    const strokeInMeters = sValue > 10 ? sValue / 1000 : sValue;
    const deceleration = strokeInMeters > 0 ? Number((0.75 * Math.pow(convertedVelocity, 2) / strokeInMeters).toFixed(3)) : 0;
  
    return {
      kineticEnergy,
      potentialEnergy,
      totalEnergy,
      energyPerHour,
      Vd: convertedVelocity,
      emassMin,
      deceleration,
      shockAbsorberCount,
      convertedVelocity
    };
  }
  