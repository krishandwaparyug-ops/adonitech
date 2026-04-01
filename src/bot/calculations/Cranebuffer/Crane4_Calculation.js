export default function Cranel4_Calculation(formData) {
    const mValue = parseFloat(formData.mass) || 0;
    const vValue = parseFloat(formData.velocity) || 0;
    const cValue = parseFloat(formData.cyclesPerHour) || 0;
    const pValue = parseFloat(formData.propulsionForce) || 0; // in kN
    const stValue = parseFloat(formData.strokeTime) || 0;     // in seconds
    const sValue = parseFloat(formData.stroke) || 0;          // in mm
    const shockAbsorber = formData.modelType.includes("2 shock absorbers") ? 2 : 1;
    const isMMin = true;
  
    const vInMps = isMMin ? vValue / 60 : vValue;
    const kineticEnergy = Math.round((mValue * vInMps ** 2 * 0.5) / shockAbsorber);
    const potentialEnergy = Math.round((1000 * pValue * stValue * sValue) / vInMps / shockAbsorber);
    const totalEnergy = kineticEnergy + potentialEnergy;
    const energyPerHour = Math.round(totalEnergy * cValue);
    const Vd = vInMps.toFixed(2);
    const emassMin = Math.round((2 * totalEnergy) / (Vd ** 2));

    const strokeInMeters = sValue > 10 ? sValue / 1000 : sValue;
    const deceleration = strokeInMeters > 0 ? Number((0.75 * Vd ** 2 / strokeInMeters).toFixed(3)) : 0;
  
    return { kineticEnergy, potentialEnergy, totalEnergy, energyPerHour, Vd, emassMin, deceleration };
  }