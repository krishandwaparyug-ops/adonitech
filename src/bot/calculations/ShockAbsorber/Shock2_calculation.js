const calculateEnergyValues = (data) => {
    const mValue = parseFloat(data.mass) || 0;
    const vValue = parseFloat(data.velocity) || 0;
    const cValue = parseFloat(data.cycles) || 0;
    const absorber = parseInt(data.shockAbsorberCount) || 1;
    const isMSec = data.isMSec ?? true; // Default to true if not provided
  
    if (!mValue || !vValue || !cValue || !absorber) {
      return {
        kineticEnergy: 0,
        potentialEnergy: 0,
        totalEnergy: 0,
        energyPerHour: 0,
        emassMin: 0,
        Vd: 0,
      };
    }
  
    const convertedVelocity = isMSec ? vValue : vValue / 60;
  
    const kineticEnergy = Math.round(
      (mValue * Math.pow(convertedVelocity, 2) * 0.5) / absorber
    );
  
    const potentialEnergy = 0; // Placeholder for future expansion
    const totalEnergy = kineticEnergy + potentialEnergy;
  
    const energyPerHour = Math.round(totalEnergy * cValue);
    const emassMin = Math.round((2 * totalEnergy) / Math.pow(convertedVelocity, 2));
  
    return {
      kineticEnergy,
      potentialEnergy,
      totalEnergy,
      energyPerHour,
      emassMin,
      Vd: convertedVelocity,
    };
  };
  export default calculateEnergyValues
  