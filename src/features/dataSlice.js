import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  // Define initial state here
  shockAbsorber: 2,
  kineticEnergy: null,
  potentialEnergy: null,
  totalEnergy: null,
  energyPerHour: null,
  Vd: null,
  emassMin: null,
  currency: "INR",
  data: [],
  spare: [],
  totalPrice: null,
  addAdditionalPriceData: [],
  mass: null,
  velocity: null,
  cycle: null,
  force: null,
  stroke: null,
  velocity2: null,
  mass2: null,
  power: null,
  stallFactor: null,
  temperature: null,
  tempMin: null,
  tempMax: null,
  username: "",
  email: "",
  phone: "",
  company: "",
  project: "",
  GSTn: "",
  isLoggedIn: false,
  decelerationValue: null,
  rateOfUtilizationPerStroke: null,
  rateOfUtilizationPerHour: null,
  contentType: "",
  drawingFormat: [],
  velocityUnit: "",
  velocityUnit2: "",
};
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // Define action creators here
    addData(state, action) {
      // Add data to state
      state.shockAbsorber = action.payload.shockAbsorber;
      state.kineticEnergy = action.payload.kineticEnergy;
      state.potentialEnergy = action.payload.potentialEnergy;
      state.totalEnergy = action.payload.totalEnergy;
      state.energyPerHour = action.payload.energyPerHour;
      state.Vd = action.payload.Vd;
      state.emassMin = action.payload.emassMin;
      state.currency = action.payload.currency;
      state.data = action.payload.data;
      state.spare = action.payload.spare;
      state.totalPrice = action.payload.totalPrice;
      state.addAdditionalPriceData = action.payload.addAdditionalPriceData;
      state.mass = action.payload.mass;
      state.velocity = action.payload.velocity;
      state.cycle = action.payload.cycle;
      state.force = action.payload.force;
      state.stroke = action.payload.stroke;
      state.velocity2 = action.payload.velocity2;
      state.mass2 = action.payload.mass2;
      state.power = action.payload.power;
      state.stallFactor = action.payload.stallFactor;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.company = action.payload.company;
      state.decelerationValue = action.payload.decelerationValue;
      state.rateOfUtilizationPerStroke =
        action.payload.rateOfUtilizationPerStroke;
      state.rateOfUtilizationPerHour = action.payload.rateOfUtilizationPerHour;
      state.project = action.payload.project;
      state.GSTn = action.payload.GSTn;
      state.contentType = action.payload.contentType;
      state.drawingFormat = action.payload.drawingFormat;
      state.temperature = action.payload.temperature;
      state.tempMin = action.payload.tempMin;
      state.tempMax = action.payload.tempMax;
      // state.velocityUnit = action.payload.velocityUnit;
    },

    setVelocityUnit(state, action) {
      state.velocityUnit = action.payload;
    },

    setVelocityUnit2(state, action) {
      state.velocityUnit2 = action.payload;
    },
  },
});
export const { addData, setVelocityUnit, setVelocityUnit2 } = dataSlice.actions;
export default dataSlice.reducer;
