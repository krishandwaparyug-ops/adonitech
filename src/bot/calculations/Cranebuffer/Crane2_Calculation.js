export default function Cranel2_Calculation(formData) {
    const mValue = parseFloat(formData.mass) || 0;
    const v1Value = parseFloat(formData.velocity) || 0;
    const v2Value = parseFloat(formData.velocity2) || 0;
    const m2Value = parseFloat(formData.mass2) || 0;
    const cValue = parseFloat(formData.cyclesPerHour) || 0;
    const fValue = parseFloat(formData.force) || 0;
    const sValue = parseFloat(formData.stroke) || 0;
    const shockAbsorber = formData.modelType.includes("2 shock absorbers") ? 2 : 1;
    const isMMin = true;
    const isMMin2 = true;
  
    const v1InMps = isMMin ? v1Value / 60 : v1Value;
    const v2InMps = isMMin2 ? v2Value / 60 : v2Value;
    const kineticEnergy = Math.round(
      ((mValue * m2Value) / (mValue + m2Value)) * (v1InMps + v2InMps) ** 2 * 0.5 / shockAbsorber
    );
    const potentialEnergy = Math.round((fValue * sValue) / shockAbsorber);
    const totalEnergy = kineticEnergy + potentialEnergy;
    const energyPerHour = Math.round(totalEnergy * cValue);
    const Vd = (v1InMps + v2InMps).toFixed(2);
    const emassMin = Math.round((2 * totalEnergy) / (Vd ** 2));

    const strokeInMeters = sValue > 10 ? sValue / 1000 : sValue;
    const deceleration = strokeInMeters > 0 ? Number((0.75 * Vd ** 2 / strokeInMeters).toFixed(3)) : 0;
  
    return { kineticEnergy, potentialEnergy, totalEnergy, energyPerHour, Vd, emassMin, deceleration };
  }