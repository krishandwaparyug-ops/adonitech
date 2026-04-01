import { jsPDF } from "jspdf"; // if using npm package

export async function generateTechnicalReport (data) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Technical Report", 20, 20);

  // Section: Original Inputs
  doc.setFontSize(14);
  doc.text("1. Original Inputs", 20, 35);

  doc.setFontSize(12);
  doc.text(`- Weight (W): ${data?.vibrationData?.W} kg`, 25, 45);
  doc.text(`- Velocity (V): ${data?.vibrationData?.V} mm/s`, 25, 53);
  doc.text(`- Minimum Deflection (Dmin): ${data?.Dmin.toFixed(2)} mm`, 25, 61);
  doc.text(`- Required Spring Rate (Ks_required): ${data?.Ks_required.toFixed(2)} N/mm`, 25, 69);

  // Section: Computed Values
  doc.setFontSize(14);
  doc.text("2. Computed Values", 20, 85);

  doc.setFontSize(12);
  doc.text(`- Natural Frequency (Fn): ${computed.Fn.toFixed(2)} Hz`, 25, 95);
  doc.text(`- D_actual: ${computed.Dactual.toFixed(2)} mm`, 25, 103);
  doc.text(`- % Loading: ${computed.percentLoading.toFixed(2)} %`, 25, 111);

  // Section: Selected Isolator Details
  doc.setFontSize(14);
  doc.text("3. Selected Isolator Details", 20, 127);

  doc.setFontSize(12);
  let isolatorDetails = [
    `- Series: ${isolator.series}`,
    `- Size: ${isolator.size}`,
    `- Loops: ${isolator.loops}`,
    `- Model: ${isolator.model}`,
    `- Height: ${isolator.height} mm`,
    `- Max Static Load: ${isolator.Max_static_load} kg`,
    `- Max Deflection: ${isolator.Max_deflection} mm`,
    `- Ks (Spring Rate): ${isolator.Ks} N/mm`,
    `- Kv (Vertical Stiffness): ${isolator.Kv} N/mm`,
    `- Mounting Options: ${isolator.mounting_options}`,
    `- Thread (mm): ${isolator.thread_mm}`,
    `- Thru Hole (mm): ${isolator.thru_hole_mm}`,
    `- Weight: ${isolator.weight} kg`,
    `- Width: ${isolator.width} mm`
  ];

  let y = 137;
  isolatorDetails.forEach((line) => {
    doc.text(line, 25, y);
    y += 8; // space between lines
  });

  // Save the PDF
  doc.save(`Technical_Report_${isolator.model}.pdf`);
}
