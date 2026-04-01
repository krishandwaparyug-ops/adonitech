export const velocityFromHeight = (H) => {
    const g = 9.81; // Acceleration due to gravity in m/s²
    if (H < 0) throw new Error("Height must be a positive value.");
    return Math.sqrt(2 * g * H);
  }