import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addData } from "../features/dataSlice";

const UserDetails = () => {
  const { modelName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const kineticEnergy = useSelector((state) => state.data.kineticEnergy);
  const potentialEnergy = useSelector((state) => state.data.potentialEnergy);
  const totalEnergy = useSelector((state) => state.data.totalEnergy);
  const energyPerHour = useSelector((state) => state.data.energyPerHour);
  const Vd = useSelector((state) => state.data.Vd);
  const emassMin = useSelector((state) => state.data.emassMin);
  const mass = useSelector((state) => state.data.mass);
  const velocity = useSelector((state) => state.data.velocity);
  const cycle = useSelector((state) => state.data.cycle);
  const force = useSelector((state) => state.data.force);
  const stroke = useSelector((state) => state.data.stroke);
  const mass2 = useSelector((state) => state.data.mass2);
  const velocity2 = useSelector((state) => state.data.velocity2);
  const power = useSelector((state) => state.data.power);
  const stallFactor = useSelector((state) => state.data.stallFactor);
  const totalPrice = useSelector((state) => state.data.totalPrice);
  const spare = useSelector((state) => state.data.spare);
  const shockAbsorber = useSelector((state) => state.data.shockAbsorber);
  const series = useSelector((state) => state.data.data.series);
  const originalPrice = useSelector((state) => state.data.data.NEWPRICE);
  const currency = useSelector((state) => state.data.currency);
  const prices = useSelector((state) => state.data.data);
  const selectedPartsData = useSelector((state) => state.data.spare);
  const contentType = useSelector((state) => state.data.contentType);
  const tempMax = useSelector((state) => state.data.tempMax);
  const tempMin = useSelector((state) => state.data.tempMin);
  const decelerationValue = useSelector(
    (state) => state.data.decelerationValue
  );
  const rateOfUtilizationPerStroke = useSelector(
    (state) => state.data.rateOfUtilizationPerStroke
  );
  const rateOfUtilizationPerHour = useSelector(
    (state) => state.data.rateOfUtilizationPerHour
  );

  const addAdditionalPriceData = useSelector(
    (state) => state.data.addAdditionalPriceData
  );
  const defaultContactFormData = {
    username: "",
    project: "",
    email: "",
    GSTn: "",
    phone: "",
    company: "",
  };
  const [contact, setContact] = useState(defaultContactFormData);

  const [currentModelName, setCurrentModelName] = useState("");
  const [isDrawingChecked, setIsDrawingChecked] = useState(false);
  const [ModelData, setModelData] = useState([]);

  const [address, setAddress] = useState("");

  const formats = [
    { name: "IGES", value: "IGES" },
    { name: "STEP", value: "STEP" },
    { name: "PDF", value: "PDF" },
    { name: "DXF", value: "DXF" },
  ];

  const [selectedFormats, setSelectedFormats] = useState("");

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFormats([...selectedFormats, value]);
      setIsDrawingChecked(true);
    } else {
      setSelectedFormats(selectedFormats.filter((format) => format !== value));
      setIsDrawingChecked(false);
    }
  };

  useEffect(() => {
    setCurrentModelName(modelName);
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  useEffect(() => {
    const storedProject = localStorage.getItem("project");
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    const storedGSTn = localStorage.getItem("GSTn");
    const storedPhone = localStorage.getItem("phone");
    const storedCompany = localStorage.getItem("company");

    if (storedProject) {
      setContact((prevContact) => ({
        ...prevContact,
        project: storedProject,
      }));
    }

    if (storedUsername) {
      setContact((prevContact) => ({
        ...prevContact,
        username: storedUsername,
      }));
    }
    if (storedEmail) {
      setContact((prevContact) => ({ ...prevContact, email: storedEmail }));
    }
    if (storedGSTn) {
      setContact((prevContact) => ({ ...prevContact, GSTn: storedGSTn }));
    }
    if (storedPhone) {
      setContact((prevContact) => ({ ...prevContact, phone: storedPhone }));
    }
    if (storedCompany) {
      setContact((prevContact) => ({ ...prevContact, company: storedCompany }));
    }
  }, []);

  let fullAddress;
  const apiEndpoint = "https://api.opencagedata.com/geocode/v1/json?";
  const apiKey = "6eaf0be0532c46f1b10e5ad2c27df3dc";
  const getUserCurrentLocation = async (latitude, longitude) => {
    const url = `${apiEndpoint}q=${latitude}+${longitude}&key=${apiKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        fullAddress = data.results[0].formatted;
        setAddress(fullAddress);
      });
  };

  const location = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getUserCurrentLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    }
  };

  useEffect(() => {
    location();
  }, []);

  const handleSubmit = async (e, modelName) => {
    e.preventDefault();
    setisLoading(true);
    dispatch(
      addData({
        totalPrice: totalPrice,
        spare: selectedPartsData,
        shockAbsorber: shockAbsorber,
        data: prices,
        currency: currency,
        addAdditionalPriceData,
        kineticEnergy: kineticEnergy,
        potentialEnergy: potentialEnergy,
        totalEnergy: totalEnergy,
        energyPerHour: energyPerHour,
        Vd: Vd,
        emassMin: emassMin,
        mass: mass,
        velocity: velocity,
        cycle: cycle,
        force: force,
        stroke: stroke,
        velocity2: velocity2,
        mass2: mass2,
        power: power,
        stallFactor: stallFactor,
        decelerationValue: decelerationValue,
        rateOfUtilizationPerStroke: rateOfUtilizationPerStroke,
        rateOfUtilizationPerHour: rateOfUtilizationPerHour,
        username: contact.username,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        project: contact.project,
        GSTn: contact.GSTn,
        contentType: contentType,
        drawingFormat: selectedFormats,
        tempMax: tempMax,
        tempMin: tempMin,
      })
    );
    //localStorage
    localStorage.setItem("project", contact.project);
    localStorage.setItem("username", contact.username);
    localStorage.setItem("email", contact.email);
    localStorage.setItem("GSTn", contact.GSTn);
    localStorage.setItem("phone", contact.phone);
    localStorage.setItem("company", contact.company);

    try {
      const formData = {
        ...contact,
        shockAbsorber: shockAbsorber,
        model: currentModelName,
        price: totalPrice,
        spare: spare,
        series: series,
        originalPrice: originalPrice,
        currency: currency,
        AdditionalAccessories: addAdditionalPriceData,
        drawing: isDrawingChecked,
        drawingFormat: selectedFormats,
        address: address,
        tempMax: tempMax,
        tempMin: tempMin,
      };

      const response = await fetch(
        // "https://cranebackend-1.onrender.com/api/form/deliverContactInfo",
        "https://backend.cranebuffer.com/api/form/contact",
        // "http://localhost:5000/api/form/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (data?.createdContact) {
        setContact(defaultContactFormData);
        const userId = data.createdContact._id;
        navigate(`/price/${modelName}/info/${userId}/technical`);

        // Clear local storage keys after successful submission
      } else {
        throw new Error("Failed to send message"); // Throw an error to trigger the catch block
      }
    } catch (error) {
      alert("Server Error");
      console.log("Server Error", error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <div className="form mt-2 p-4 pb-20">
        <div className="image flex justify-center mb-2 ">
          <img src="/images/logo.png" />
        </div>
        <Box
          className="flex flex-col gap-6 p-4"
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(e) => handleSubmit(e, modelName)}
        >
          <TextField
            size="small"
            type="text"
            name="project"
            value={contact.project}
            id="project"
            required
            autoComplete="off"
            // value={contact.username}
            label="Enter your Project Name"
            variant="outlined"
            className="input "
            onChange={handleInput}
            InputLabelProps={{
              style: {
                fontSize: "0.9rem",
                marginTop: "2px",
              }, //
            }}
          />

          <TextField
            size="small"
            type="text"
            name="username"
            value={contact.username}
            id="username"
            required
            autoComplete="off"
            // value={contact.username}
            label="Enter your Name"
            variant="outlined"
            className="input "
            onChange={handleInput}
            InputLabelProps={{
              style: {
                fontSize: "0.9rem",
                marginTop: "2px",
              }, //
            }}
          />

          <TextField
            size="small"
            type="number"
            name="phone"
            value={contact.phone}
            id="phone"
            required
            autoComplete="off"
            // value={contact.phone}
            label="Enter your Phone Number"
            variant="outlined"
            className="input"
            onChange={handleInput}
            InputLabelProps={{
              style: {
                fontSize: "0.9rem",
                marginTop: "2px",
              }, //
            }}
          />

          <TextField
            size="small"
            type="email"
            name="email"
            value={contact.email}
            id="email"
            required
            autoComplete="off"
            // value={contact.phone}
            label="Enter your Email"
            variant="outlined"
            className="input"
            onChange={handleInput}
            InputLabelProps={{
              style: {
                fontSize: "0.9rem",
                marginTop: "2px",
              }, //
            }}
          />

          {/* <TextField
            size="small"
            type="text"
            name="GSTn"
            value={contact.GSTn}
            id="gst"
            required
            autoComplete="off"
            // value={contact.email}
            label="Enter GSTN"
            variant="outlined"
            className="input"
            onChange={handleInput}
            inputProps={{ maxLength: 15 }}
            InputLabelProps={{
              style: {
                fontSize: "0.9rem",
                marginTop: "2px",
              }, //
            }}
          /> */}

          <TextField
            size="small"
            type="text"
            name="company"
            value={contact.company}
            id="company"
            required
            autoComplete="off"
            // value={contact.company}
            label="Enter your Co Name"
            variant="outlined"
            className="input"
            onChange={handleInput}
            InputLabelProps={{
              style: {
                fontSize: "0.9rem",
                marginTop: "2px",
              }, //
            }}
          />
          <div className="drawing mt-2 flex justify-between items-center">
            <div className="">
              <label className="text-xl text-center" htmlFor="drawing">
                Choose your Format for Drawings
              </label>
              <div className="flex gap-4 mt-4">
                {formats.map((format) => (
                  <div key={format.value}>
                    <input
                      type="checkbox"
                      name={format.name}
                      value={format.value}
                      onChange={handleCheckboxChange}
                      checked={selectedFormats.includes(format.value)}
                    />
                    <label> {format.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className="submitBtn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded m-[auto] mt-4 md:w-[100%]"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </Box>
      </div>
    </>
  );
};
export default UserDetails;
