import Crane1 from "../images/crane1.png";
import Crane2 from "../images/crane2.png";
import Crane3 from "../images/crane3.png";
import Crane4 from "../images/crane4.png";

import ShockAbsorber1 from "../images/shockAbsober1.png";
import ShockAbsorber2 from "../images/shockAbsober2.png";
import ShockAbsorber3 from "../images/shockAbsober3.png";
import ShockAbsorber4 from "../images/shockAbsober4.png";
import ShockAbsorber5 from "../images/shockAbsober5.png";
import ShockAbsorber6 from "../images/shockAbsober6.png";
import ShockAbsorber7 from "../images/shockAbsober7.png";
import ShockAbsorber8 from "../images/shockAbsober8.png";
import ShockAbsorber9 from "../images/shockAbsober9.png";

export const brandModels = {
  CraneBuffer: [
    "Wagon against 2 shock absorbers",
    "Wagon against Wagon",
    "Wagon against Wagon 2 shock absorber",
    "Wagon against 1 shock absorbers",
  ],
  ShockAbsorber: [
    "Mass with propelling force",
    "Mass without propelling force",
    "Mass with Motor Drive",
    "Mass on driven rollers",
    "Swinging mass with propelling torque",
    "Free Falling Mass",
    "Rotary index table with propelling torque",
    "Swinging arm with propelling torque",
    "Swinging arm with propelling force",
  ],
};
export const modelImages = {
  // Crane Buffer Models
  "Wagon against 2 shock absorbers": Crane1,
  "Wagon against Wagon": Crane2,
  "Wagon against Wagon 2 shock absorber": Crane3,
  "Wagon against 1 shock absorbers": Crane4,

  // Shock Absorber Models
  "Mass with propelling force": ShockAbsorber1,
  "Mass without propelling force": ShockAbsorber2,
  "Mass with Motor Drive": ShockAbsorber3,
  "Mass on driven rollers": ShockAbsorber4,
  "Swinging mass with propelling torque": ShockAbsorber5,
  "Free Falling Mass": ShockAbsorber6,
  "Rotary index table with propelling torque": ShockAbsorber7,
  "Swinging arm with propelling torque": ShockAbsorber8,
  "Swinging arm with propelling force": ShockAbsorber9,
};

export const questionFlows = {
  CraneBuffer: {
    "Wagon against 2 shock absorbers": [
      { field: "mass", question: "Please enter the mass (in kg):" },
      {
        field: "velocity",
        question: "Please enter the velocity (in m/min):",
      },
      {
        field: "temperature",
        question: "Please enter the temperature (in °C):",
      },
      { field: "cyclesPerHour", question: "Please enter cycles per hour:" },
      { field: "force", question: "Please enter the force (in N):" },
      { field: "shockAbsorberCount", question: "Number of shock absorbers:" },
      { field: "stroke", question: "Please enter the stroke (in mm):" },
    ],
    "Wagon against Wagon": [
      { field: "mass", question: "Please enter the mass 1 (in kg):" },
      {
        field: "velocity",
        question: "Please enter the velocity 1 (in m/min):",
      },
      { field: "mass2", question: "Please enter the mass 2 (in kg):" },
      {
        field: "velocity2",
        question: "Please enter the velocity 2 (in m/min):",
      },
      { field: "cyclesPerHour", question: "Please enter cycles per hour:" },
      { field: "force", question: "Please enter the force (in N):" },
      { field: "stroke", question: "Please enter the stroke (in mm):" },
    ],
    "Wagon against Wagon 2 shock absorber": [
      { field: "mass", question: "Please enter the mass 1 (in kg):" },
      {
        field: "velocity",
        question: "Please enter the velocity 1 (in m/min):",
      },
      { field: "mass2", question: "Please enter the mass 2 (in kg):" },
      {
        field: "velocity2",
        question: "Please enter the velocity 2 (in m/min):",
      },
      { field: "cyclesPerHour", question: "Please enter cycles per hour:" },
      { field: "force", question: "Please enter the force (in N):" },
      { field: "stroke", question: "Please enter the stroke (in mm):" },
    ],
    "Wagon against 1 shock absorbers": [
      { field: "mass", question: "Please enter the mass (in kg):" },
      {
        field: "velocity",
        question: "Please enter the velocity (in m/min):",
      },
      { field: "cyclesPerHour", question: "Please enter cycles per hour:" },
      {
        field: "propulsionForce",
        question: "Please enter the propulsion force (in kN):",
      },
      {
        field: "strokeTime",
        question: "Please enter the stroke time (in s):",
      },
      { field: "stroke", question: "Please enter the stroke (in mm):" },
    ],
  },
  ShockAbsorber: {
    "Mass with propelling force": [
      { field: "mass", question: "Enter mass (in kg):" },
      {
        field: "velocity",
        question: "Please enter the velocity (in m/min):",
      },
      { field: "cyclesPerHour", question: "Please enter cycles per hour:" },
      { field: "force", question: "Please enter the force (in N):" },
      { field: "stroke", question: "Please enter the stroke (in mm):" },
      { field: "shockAbsorberCount", question: "Number of shock absorbers:" },
      {
        field: "temperature",
        question: "Please enter the temperature (in °C):",
      },
    ],
    "Mass without propelling force": [
      {
        field: "mass",
        question: "Please enter the mass (in kg):",
      },
      {
        field: "velocity",
        question: "Please enter the velocity (in m/min):",
      },
      {
        field: "cycles",
        question: "Please enter the number of cycles:",
      },
      {
        field: "shockAbsorberCount",
        question: "Please enter the number of shock absorbers:",
      },
      {
        field: "isMSec",
        question:
          "Is the provided velocity in m/s? Please type true or false (default is true):",
      },
    ],
    "Mass with Motor Drive": [
      {
        field: "mass",
        question: "Please enter the mass (in kg):",
      },
      {
        field: "velocity",
        question: "Please enter the velocity (in m/min):",
      },
      {
        field: "cycles",
        question: "Please enter the number of cycles:",
      },
      {
        field: "stroke",
        question: "Please enter the stroke (in mm):",
      },
      {
        field: "power",
        question: "Please enter the power:",
      },
      {
        field: "stallFactor",
        question: "Please enter the stall factor:",
      },
      {
        field: "sValue",
        question: "Please enter the s value:",
      },
      {
        field: "shockAbsorber",
        question: "Please enter the number of shock absorbers:",
      },
      {
        field: "isMSec",
        question:
          "Is the provided velocity in m/s? Type true or false (default is true):",
      },
    ],
    "Mass on driven rollers": [
      {
        field: "mass",
        question: "Please enter the mass (in kg):",
      },
      {
        field: "velocity",
        question: "Please enter the velocity:",
      },
      {
        field: "isVelocityInMSec",
        question:
          "Is the provided velocity in m/s? Type true or false (default is true):",
      },
      {
        field: "shockAbsorber",
        question: "Please enter the number of shock absorbers:",
      },
      {
        field: "stroke",
        question: "Please enter the stroke:",
      },
      {
        field: "cycle",
        question: "Please enter the cycle count:",
      },
    ],
    "Swinging mass with propelling torque": [
      {
        field: "mValue",
        question: "Enter the mass (mValue in kg):",
      },
      {
        field: "vValue",
        question: "Enter the velocity (vValue):",
      },
      {
        field: "isMSec",
        question: "Is the velocity in m/s? (true or false):",
      },
      {
        field: "shockAbsorber",
        question: "Enter the number of shock absorbers:",
      },
      {
        field: "M1Value",
        question: "Enter the M1 value (used in potential energy calculation):",
      },
      {
        field: "sValue",
        question: "Enter the stroke value (sValue):",
      },
      {
        field: "RValue",
        question: "Enter the R value (used in potential and Vd calculations):",
      },
      {
        field: "cValue",
        question: "Enter the number of cycles (cValue):",
      },
      {
        field: "LValue",
        question: "Enter the L value (used in Vd calculation):",
      },
    ],
    "Free Falling Mass": [
      {
        field: "mValue",
        question: "Enter the mass (mValue in kg):",
      },
      {
        field: "hValue",
        question: "Enter the height (hValue in meters):",
      },
      {
        field: "sValue",
        question: "Enter the stroke value (sValue in meters):",
      },
      {
        field: "cValue",
        question: "Enter the number of cycles (cValue):",
      },
      {
        field: "shockAbsorber",
        question: "Enter the number of shock absorbers:",
      },
    ],
    "Rotary index table with propelling torque": [
      {
        field: "mass",
        question: "Enter the mass (in kg):",
      },
      {
        field: "velocity",
        question: "Enter the velocity:",
      },
      {
        field: "isVelocityInMSec",
        question: "Is the velocity in m/sec? (true/false):",
      },
      {
        field: "cycles",
        question: "Enter the number of cycles:",
      },
      {
        field: "propellingTorque",
        question: "Enter the propelling torque:",
      },
      {
        field: "strokeValue",
        question: "Enter the stroke value:",
      },
      {
        field: "radius",
        question: "Enter the radius:",
      },
      {
        field: "length",
        question: "Enter the length:",
      },
      {
        field: "shockAbsorber",
        question: "Enter the number of shock absorbers:",
      },
    ],
    "Swinging arm with propelling torque": [
      {
        field: "mass",
        question: "Enter the mass (in kg):",
      },
      {
        field: "velocity",
        question: "Enter the velocity:",
      },
      {
        field: "isMSec",
        question: "Is the velocity in m/s? (true/false):",
      },
      {
        field: "propellingTorque",
        question: "Enter the propelling torque (Nm):",
      },
      {
        field: "stroke",
        question: "Enter the stroke length (in mm):",
      },
      {
        field: "radius",
        question: "Enter the radius (in meters):",
      },
      {
        field: "length",
        question: "Enter the length (in meters):",
      },
      {
        field: "cycle",
        question: "Enter the number of cycles:",
      },
      {
        field: "shockAbsorber",
        question: "Enter the number of shock absorbers:",
      },
    ],
    "Swinging arm with propelling force": [
      {
        field: "mass",
        question: "Enter the mass (in kg):",
      },
      {
        field: "velocity",
        question: "Enter the velocity:",
      },
      {
        field: "isMSec",
        question: "Is the velocity in m/s? (true/false):",
      },
      {
        field: "cycle",
        question: "Enter the number of cycles per hour:",
      },
      {
        field: "shockAbsorber",
        question: "Enter the shock absorber count (default is 1):",
      },
      {
        field: "propellingTorque",
        question: "Enter the propelling torque (in Nm):",
      },
      {
        field: "radius",
        question: "Enter the radius (in meters):",
      },
      {
        field: "stroke",
        question: "Enter the stroke length (in meters or mm):",
      },
    ],
  },
};
