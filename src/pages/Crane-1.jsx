import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData, setVelocityUnit } from "../features/dataSlice";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TableScrollbar from "react-table-scrollbar";

import "../scss/Crane-1.scss";

// const option1 = [
//   { value: 0.05, display: "50" },
//   { value: 0.07, display: "70" },
//   { value: 0.075, display: "75" },
//   { value: 0.1, display: "100" },
//   { value: 0.125, display: "125" },
//   { value: 0.127, display: "127" },
//   { value: 0.15, display: "150" },
//   { value: 0.165, display: "165" },
//   { value: 0.2, display: "200" },
// ];
const option1 = [
  { value: 0.025, display: "25" },
  { value: 0.075, display: "75" },
  { value: 0.1, display: "100" },
  { value: 0.15, display: "150" },
  { value: 0.2, display: "200" },
  { value: 0.3, display: "300" },
  { value: 0.4, display: "400" },
  { value: 0.5, display: "500" },
  { value: 0.6, display: "600" },
  { value: 0.8, display: "800" },
  { value: 1, display: "1000" },
];
const option2 = ["1", "2", "3", "4"];

const Currency = ["USD", "INR"];

import { Link, useNavigate } from "react-router-dom";
import { TableBody, TableHead } from "@mui/material";
import { Modal } from "antd";

export const CraneFirst = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [api, contextHolder] = notification.useNotification();
  // useEffect(() => {
  //   const token = localStorage.getItem("Token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  const [mValue, setMValue] = useState("");
  const [vValue, setVValue] = useState("");
  const [cValue, setCValue] = useState("");
  const [fValue, setFValue] = useState("");
  const [sValue, setSValue] = useState("");
  const [tMinValue, setTMinValue] = useState("-10");
  const [tMaxValue, setTMaxValue] = useState("60");
  const [convertedVValue, setConvertedVValue] = useState("");
  const [converted, setConverted] = useState(false);
  const [originalVValue, setOriginalVValue] = useState("");
  const [getDatas, setGetDatas] = useState("");
  const [isKg, setIsKg] = useState(true);
  const [isMMin, setIsMMin] = useState(true);
  const [top5ModelNames, setTop5ModelNames] = useState({
    ED: [],
    EI: [],
    SB: [],
    AKHG: [],
  });
  // const [showGreater, setShowGreater] = useState(true);
  // const [buttonClicked, setButtonClicked] = useState(false);

  const [shockAbsorber, setShockAbsorber] = useState("2");
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  const [calculatedResults, setCalculatedResults] = useState({
    kineticEnergy: "",
    potentialEnergy: "",
    totalEnergy: "",
    energyPerHour: "",
    emassMin: "",
    Vd: "",
  });
  const [showTable, setShowTable] = useState(false);
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [content, setContent] = useState("Initial Content");
  const [value, setValue] = useState("EI");
  // const [showText, setShowText] = useState(false);

  //Redux
  const mass = useSelector((state) => state.data.mass);
  const velocity = useSelector((state) => state.data.velocity);
  const cycle = useSelector((state) => state.data.cycle);
  const force = useSelector((state) => state.data.force);
  const stroke = useSelector((state) => state.data.stroke);
  const tempMax = useSelector((state) => state.data.tempMax);
  const tempMin = useSelector((state) => state.data.tempMin);
  //Dynamic heading
  const DynamicHeading = ({
    className,
    initialContent,
    content,
    setContent,
  }) => {
    const [dynamicContent, setDynamicContent] = useState(initialContent);

    useEffect(() => {
      setDynamicContent(content);
    }, [content]);

    useEffect(() => {
      setContent(dynamicContent);
    }, [dynamicContent, setContent]);
    return <h2 className={className}>{dynamicContent}</h2>;
  };

  DynamicHeading.propTypes = {
    className: PropTypes.string,
    initialContent: PropTypes.string.isRequired,
    content: PropTypes.string,
    setContent: PropTypes.func.isRequired,
  };

  // Event handlers for form controls
  const handleMChange = (event) => {
    const inputMValue = event.target.value;
    const newMValue = isKg ? inputMValue : inputMValue * 1000;
    setMValue(newMValue);
  };

  const handleVChange = (value) => {
    // const inputValue = event.target.value;
    const newValue = isMMin ? value : value * 60;
    // setVValue(inputValue);

    setOriginalVValue(newValue);
    setVValue(value);
    setConverted(false);
  };

  const handleCChange = (event) => {
    setCValue(event.target.value);
  };

  const handleFChange = (event) => {
    setFValue(event.target.value);
  };

  const handleSChange = (event, value) => {
    setSValue(value.value);
  };

  const handleAbsorberChange = (event, value) => {
    setShockAbsorber(value);
  };
  const handleTMinChange = (event) => {
    setTMinValue(event.target.value);
  };
  const handleTMaxChange = (event) => {
    setTMaxValue(event.target.value);
  };

  //Handle Calculated Data

  const handleCalculate = () => {
    const kineticEnergy = Math.round(
      (mValue * (isMMin ? vValue / 60 : vValue) ** 2 * 0.5) /
        Number(shockAbsorber)
    );
    const potentialEnergy = Math.round(
      (fValue * sValue) / Number(shockAbsorber)
    );
    const totalEnergy = kineticEnergy + potentialEnergy;
    const energyPerHour = Math.round(
      totalEnergy * cValue
    );
    const Vd = (isMMin ? vValue / 60 : vValue).toFixed(2);
    const emassMin = Math.round(
      (2 * totalEnergy) / Vd ** 2
    );

    // Update state with calculated results
    setCalculatedResults({
      kineticEnergy,
      potentialEnergy,
      totalEnergy,
      energyPerHour,
      Vd,
      emassMin,
    });
  };

  // const handleClick = () => {
  //   setShowGreater(!showGreater);
  //   setButtonClicked(true);
  // };

  //Fetching Data
  const getData = async () => {
    try {
      const response = await fetch(
        // "https://45.55.226.102:3001/api/data/data",
        "https://backend.cranebuffer.com/api/data/data",
        // "http://Calculation.cranebuffer.com/api/data/data",
        // "http://localhost:5000/api/data/data",
        // 15.206.90.45 + "/api/data/data",
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setGetDatas(data);

        const calculateDifference = (item) =>
          Math.abs(item.nmperstroke - calculatedResults.totalEnergy);
        const filteredData = {
          ED: data
            .filter(
              (item) =>
                // showGreater
                //   ?
                item.nmperstroke >= calculatedResults.totalEnergy * 0.9 &&
                item.nmperhr >= calculatedResults.energyPerHour &&
                item["series"] === "ED"
              // : item.nmperstroke <= calculatedResults.totalEnergy &&
              //   item.nmperhr <= calculatedResults.energyPerHour &&
              //   item["series"] === "ED"
            )
            .map((item) => ({
              ...item,
              difference: calculateDifference(item),
            })),
          EI: data
            .filter(
              (item) =>
                // showGreater
                //   ?
                item.nmperstroke >= calculatedResults.totalEnergy * 0.9 &&
                item.nmperhr >= calculatedResults.energyPerHour &&
                item["series"] === "EI"
              // : item.nmperstroke <= calculatedResults.totalEnergy &&
              //   item.nmperhr <= calculatedResults.energyPerHour &&
              //   item["series"] === "EI"
            )
            .map((item) => ({
              ...item,
              difference: calculateDifference(item),
            })),
          SB: data
            .filter(
              (item) =>
                // showGreater
                //   ?
                item.nmperstroke >= calculatedResults.totalEnergy * 0.9 &&
                item.nmperhr >= calculatedResults.energyPerHour &&
                item["series"] === "SB"
              // : item.nmperstroke <= calculatedResults.totalEnergy &&
              //   item.nmperhr <= calculatedResults.energyPerHour &&
              //   item["series"] === "SB"
            )
            .map((item) => ({
              ...item,
              difference: calculateDifference(item),
            })),

          AKHG: data
            .filter(
              (item) =>
                // showGreater
                //   ?
                item.nmperstroke >= calculatedResults.totalEnergy * 0.9 &&
                item.nmperhr >= calculatedResults.energyPerHour &&
                item["series"] === "AKHG"
              // : item.nmperstroke <= calculatedResults.totalEnergy &&
              //   item.nmperhr <= calculatedResults.energyPerHour &&
              //   item["series"] === "AKHG"
            )
            .map((item) => ({
              ...item,
              difference: calculateDifference(item),
            })),
        };

        console.log(filteredData);

        const sortedData = {
          ED: filteredData.ED.sort((a, b) => a.difference - b.difference),
          EI: filteredData.EI.sort((a, b) => a.difference - b.difference),
          SB: filteredData.SB.sort((a, b) => a.difference - b.difference),
          AKHG: filteredData.AKHG.sort((a, b) => a.difference - b.difference),
        };

        // Extract required fields for the top 5 models
        const top5ModelNames = {
          ED: sortedData.ED.map((item) => ({
            model: item.Model,
            stroke: item.Stroke,
            nmperstroke: item.nmperstroke,
            nmperhr: item.nmperhr,
          })),
          EI: sortedData.EI.map((item) => ({
            model: item.Model,
            stroke: item.Stroke,
            nmperstroke: item.nmperstroke,
            nmperhr: item.nmperhr,
          })),
          SB: sortedData.SB.map((item) => ({
            model: item.Model,
            stroke: item.Stroke,
            nmperstroke: item.nmperstroke,
            nmperhr: item.nmperhr,
          })),
          AKHG: sortedData.AKHG.map((item) => ({
            model: item.Model,
            stroke: item.Stroke,
            nmperstroke: item.nmperstroke,
            nmperhr: item.nmperhr,
          })),
        };

        setTop5ModelNames(top5ModelNames);
      }

      // if (buttonClicked) {
      //   if (showGreater) {
      //     api.success({
      //       message: `Successfully updated to Greater modal`,
      //     });
      //   } else {
      //     api.success({
      //       message: `Successfully updated to Down modal`,
      //     });
      //   }
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if ((mValue && vValue && cValue && fValue && sValue) || mValue || vValue) {
      getData();
      handleCalculate();
      setShowTable(true);
    } else {
      setShowTable(false);
      setCalculatedResults({
        kineticEnergy: "",
        potentialEnergy: "",
        totalEnergy: "",
        energyPerHour: "",
        emassMin: "",
        Vd: "",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mValue,
    vValue,
    cValue,
    fValue,
    sValue,
    shockAbsorber,
    calculatedResults.emassMin,
    calculatedResults.energyPerHour,
    calculatedResults.kineticEnergy,
    calculatedResults.potentialEnergy,
    calculatedResults.totalEnergy,
    calculatedResults.Vd,
    // showGreater,
  ]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleModelClick = (model) => {
    const modelType = Object.keys(top5ModelNames).find((key) =>
      top5ModelNames[key].find((m) => m.model === model)
    );

    if (modelType) {
      const selectedModel = top5ModelNames[modelType].find(
        (m) => m.model === model
      );
      dispatch(
        addData({
          currency: selectedCurrency,
          shockAbsorber: shockAbsorber,
          kineticEnergy: calculatedResults.kineticEnergy,
          potentialEnergy: calculatedResults.potentialEnergy,
          totalEnergy: calculatedResults.totalEnergy,
          energyPerHour: calculatedResults.energyPerHour,
          Vd: calculatedResults.Vd,
          emassMin: calculatedResults.emassMin,
          mass: mValue,
          velocity: vValue,
          cycle: cValue,
          force: fValue,
          stroke: sValue,
          tempMin: tMinValue,
          tempMax: tMaxValue,
          // velocityUnit: velocityUnit,
          decelerationValue: (
            (0.75 * calculatedResults.Vd ** 2) /
            (selectedModel.stroke / 1000)
          ).toFixed(2),
          rateOfUtilizationPerStroke: (
            (calculatedResults.totalEnergy / selectedModel.nmperstroke) *
            100
          ).toFixed(2),
          rateOfUtilizationPerHour: (
            (calculatedResults.energyPerHour / selectedModel.nmperhr) *
            100
          ).toFixed(2),
          contentType: content,
        })
      );
      navigate(`/price/${model}`);
    }
  };
  useEffect(() => {
    if (mass !== null) {
      setMValue(`${mass}`);
    }
    if (velocity !== null) {
      setVValue(`${velocity}`);
    }
    if (cycle !== null) {
      setCValue(`${cycle}`);
    }
    if (force !== null) {
      setFValue(`${force}`);
    }
    if (stroke !== null) {
      setSValue(stroke);
    }
    if (tempMax !== null) {
      setTMaxValue(`${tempMax}`);
    }
    if (tempMin !== null) {
      setTMinValue(`${tempMin}`);
    }
  }, [mass, velocity, cycle, force, stroke, tempMax, tempMin]);

  const toggleUnitKg = () => {
    setIsKg(!isKg);
  };
  const toggleUnitVelocity = (e) => {
    const newUnit = e.target.value;
    dispatch(setVelocityUnit(newUnit));
    const isMMinNew = newUnit === "M/min";
    setIsMMin(isMMinNew);

    // const v = m ? originalVValue  : originalVValue / 60;
    let v;

    if (isMMinNew) {
      v = originalVValue;
    } else {
      v = originalVValue / 60;
    }

    setConvertedVValue(isNaN(v) ? "" : v);
    setConverted(true);

    localStorage.setItem("velocityUnit", newUnit);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const savedUnit = localStorage.getItem("velocityUnit");
    if (savedUnit) {
      setIsMMin(savedUnit === "M/min");
      dispatch(setVelocityUnit(savedUnit));
    } else {
      const defaultUnit = "M/sec";
      dispatch(setVelocityUnit(defaultUnit));
      localStorage.setItem("velocityUnit", defaultUnit);
    }
  }, []);

  useEffect(() => {
    if (getDatas) {
      const strokeSet = new Set();
      getDatas.forEach((item) => strokeSet.add(item.Stroke));

      const sortedStrokes = [...strokeSet].sort((a, b) => a - b);

      const strokeOptions = sortedStrokes.map((stroke) => ({
        value: stroke / 1000,
        display: `${stroke}`,
      }));
      // const strokeOptions = getDatas.map((item) => ({
      //   value: item.Stroke / 1000,
      //   display: `${item.Stroke}`,
      // }));
      setOptions(strokeOptions);
    }
  }, [getDatas]);

  return (
    <>
      <div className="Crane1 inputFields">
        {/* {contextHolder} */}
        <div className="flex w-full justify-between">
          <div>
            <img
              src="/images/crane1.1.png"
              alt="crane1"
              className="md:w-52 w-40 ml-2 hidden"
            />
          </div>
          <div className="images flex justify-center ">
            <img
              src="images/logo.png"
              className="md:w-40 md:h-16 mt-4 w-32 mr-2"
            />
          </div>
        </div>
        <div className="md:flex md:justify-between">
          <div className="text-sm md:text-lg  md:flex md:justify-center md:items-center  text-center font-bold">
            Selection of Shock Absorbers
          </div>
          <DynamicHeading
            className=" forMobile text-center !text-sm md:text-2xl font-bold"
            initialContent="Crane/Wagon/Girder against 2 Shock Absorber"
            content={content}
            setContent={setContent}
          />
        </div>

        <div className="flex justify-center items-center max-lg:flex-col">
          <div>
            <img
              src="/images/crane1.1.png"
              alt="crane1"
              className="w-full px-2"
            />
          </div>
          <div className="mobileIndex">
            {/* <Box sx={{ display: "flex", flexWrap: "wrap" }}> */}
            <Card
              sx={{
                boxShadow: "none",
              }}
              className="mb-7 md:p-6 p-4 md:border border-gray-300
            "
            >
              <div className="firstLine ">
                <FormControl className="fromMobile">
                  <TextField
                    size="small"
                    className=""
                    id="outlined-adornment-password"
                    label="Mass"
                    value={isKg ? mValue : mValue / 1000}
                    onChange={handleMChange}
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <select
                            value={isKg ? "Kg" : "Tonne"}
                            onChange={toggleUnitKg}
                            style={{
                              border: "none",
                              padding: "2px",
                              fontSize: "0.9rem",
                              outline: "none",
                              width: "auto",
                            }}
                          >
                            <option value="Kg">Kg</option>
                            <option value="Tonne">Tonne</option>
                          </select>
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "0.9rem",
                        marginTop: "2px",
                      }, //
                    }}
                    aria-describedby="outlined-weight-helper-text"
                  />
                </FormControl>
                <FormControl variant="outlined" className="fromMobile">
                  <TextField
                    size="small"
                    className=""
                    label="Velocity"
                    id="outlined-adornment-weight"
                    value={converted ? convertedVValue : vValue}
                    onChange={(e) => handleVChange(e.target.value)}
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <select
                            id="speed"
                            value={isMMin ? "M/min" : "M/sec"}
                            onChange={toggleUnitVelocity}
                            style={{
                              border: "none",
                              padding: "2px",
                              fontSize: "0.9rem",
                              outline: "none",
                              width: "auto",
                            }}
                          >
                            <option value="M/min">M/min</option>
                            <option value="M/sec">M/sec</option>
                          </select>
                        </InputAdornment>
                      ),

                      // onMouseEnter: () => setShowText(true),
                      // onClick: () => setShowText(true),
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "0.9rem",
                        marginTop: "2px",
                      },
                    }}
                    aria-describedby="outlined-weight-helper-text"
                  />
                </FormControl>
                <FormControl variant="outlined" className="fromMobile">
                  <TextField
                    size="small"
                    className=""
                    id="outlined-adornment-weight"
                    label="Cycles per hour"
                    value={cValue}
                    onChange={handleCChange}
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">/hr</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "0.9rem",
                        marginTop: "2px",
                      }, //
                    }}
                    aria-describedby="outlined-weight-helper-text"
                  />
                </FormControl>
                <FormControl variant="outlined" className="fromMobile">
                  <TextField
                    size="small"
                    className=""
                    id="outlined-adornment-weight"
                    value={fValue}
                    label="Force"
                    onChange={handleFChange}
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">N</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "0.9rem",
                        marginTop: "2px",
                      }, //
                    }}
                    aria-describedby="outlined-weight-helper-text"
                  />
                </FormControl>
              </div>
              <div className="secondLine">
                <div className="lineBox">
                  <FormControl
                    variant="outlined"
                    className="fromMobile"
                    autoComplete="off"
                  >
                    <Autocomplete
                      onChange={handleSChange}
                      id="controllable-states-demo"
                      value={
                        options.find((option) => option.value === sValue) ||
                        null
                      }
                      options={option1}
                      className="autoComplete "
                      getOptionLabel={(option) => option.display}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          label="Stroke in mm"
                          className="!pr-0"
                          InputLabelProps={{
                            style: {
                              fontSize: "0.9rem",
                              marginTop: "2px",
                              paddingRight: "0",
                            },
                          }}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    className="fromMobile"
                    autoComplete="off"
                  >
                    <Autocomplete
                      id="controllable-states-demo"
                      className="autocomplete"
                      value={shockAbsorber}
                      onChange={handleAbsorberChange}
                      options={option2}
                      getOptionLabel={(option) => option.toString()}
                      isOptionEqualToValue={(option, value) => option === value}
                      name="shockAbsorber"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          label="Shock Absorbers"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <InputAdornment position="end">
                                Pcs
                              </InputAdornment>
                            ),

                            style: {
                              paddingRight: "14px",
                            },
                          }}
                        />
                      )}
                    />
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    className="fromMobile"
                    autoComplete="off"
                  >
                    <Autocomplete
                      id="controllable-states-demo "
                      className="autocomplete"
                      value={selectedCurrency} // Set default currency
                      onChange={(event, newValue) =>
                        setSelectedCurrency(newValue)
                      }
                      options={Currency}
                      name="selectedCurrency"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          label="Choose your currency"
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl variant="outlined" className="fromMobile">
                    <TextField
                      size="small"
                      className=""
                      id="outlined-adornment-weight"
                      value={tMinValue}
                      label="Min Temperature"
                      onChange={handleTMinChange}
                      autoComplete="off"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">°C</InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        style: {
                          fontSize: "0.9rem",
                          marginTop: "2px",
                        }, //
                      }}
                      aria-describedby="outlined-weight-helper-text"
                    />
                  </FormControl>
                  <FormControl variant="outlined" className="fromMobile">
                    <TextField
                      size="small"
                      className=""
                      id="outlined-adornment-weight"
                      value={tMaxValue}
                      label="Max Temperature"
                      onChange={handleTMaxChange}
                      autoComplete="off"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">°C</InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        style: {
                          fontSize: "0.9rem",
                          marginTop: "2px",
                        }, //
                      }}
                      aria-describedby="outlined-weight-helper-text"
                    />
                  </FormControl>
                  <FormControl>
                    <div className="Link mt-6 ml-4">
                      <Link
                        onClick={showModal}
                        className="text-sm text-blue-500"
                      >
                        Click to View Standard details related to Buffer
                        selection
                      </Link>
                      <Modal
                        title="BUFFERS"
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={null}
                        className="relative top-5"
                      >
                        <div className="h-[85vh] !overflow-y-auto">
                          <div className="flex">
                            <h2 className="font-semibold mr-2">1.</h2>
                            <p>
                              Provisions in the design of the runway and the
                              design of the runway stops shall consider the
                              energy absorbing or storage device used in the
                              crane bumper. The device may be non-linear (for
                              example, hydraulic bumpers) or a linear device,
                              such as, a coil spring. Other types of buffers
                              like hydraulic and resilient plastic buffers may
                              also be used subject to agreement between the
                              manufacturer and the purchaser.
                            </p>
                          </div>
                          <div className="flex mt-4">
                            <h2 className="font-semibold mr-2">2.</h2>
                            <p>
                              Buffers shall have sufficient energy absorbing
                              capacity to bring unloaded crane / trolley (
                              loaded crane in the case of stiff masted cranes )
                              to rest from a speed of 50 percent of the rated
                              speed at a deceleration rate not exceeding 5 m/s2.
                            </p>
                          </div>
                          <div className="flex mt-4">
                            <h2 className="font-semibold mr-2">3.</h2>
                            <p>
                              Between cranes or trolleys (if two trolleys are
                              located on one bridge) bumpers shall be capable of
                              absorbing the energy from 70 percent of full load
                              rated speed of both cranes or trolleys travelling
                              in opposite directions, or the energy from 100
                              percent of full load rated speed of either crane
                              or trolley, whichever is the greatest.
                            </p>
                          </div>
                          <div className="flex mt-4">
                            <h2 className="font-semibold mr-2">4.</h2>
                            <p>
                              The design of all bumpers shall include safety
                              cables to prevent parts from dropping to the
                              floor. For computing bridge bumper energy, the
                              trolley shall be placed in the end approach which
                              will produce the maximum end reaction from both
                              bridge and trolley. This end reaction shall be
                              used as the maximum weight portion of thc cranc
                              that can act on each bridge bumper. The energy
                              absorbing capacity of the bumper shall be based on
                              power-off and shall not include the lifted load,
                              if free to swing. Bridge bumpers shall have a
                              contact surface of not less than 125 mm in
                              diameter, be located on the rail centreline and
                              mounted to provide proper clearance when bumpers
                              of two cranes come together and both are fully
                              compressed. Where practical, they shall be mounted
                              to provide for easy removal of bridge track
                              wheels.
                            </p>
                          </div>
                          <div className="flex mt-4">
                            <h2 className="font-semibold mr-2">5.</h2>
                            <p>
                              If required by the customer, buffer may be
                              designed at 0.7 times of the rated speed.
                            </p>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </FormControl>
                </div>
              </div>
            </Card>

            <Card
              className="mb-10 md:p-6 p-4  border-0 md:border md:border-gray-300"
              variant="outlined"
              sx={{ backgroundColor: " #ffff" }}
            >
              <div className="resultOutput">
                <FormControl variant="outlined" className="fromMobile">
                  <TextField
                    label="Kinetic Energy"
                    disabled
                    size="small"
                    id="outlined-adornment-weight"
                    value={parseFloat(calculatedResults.kineticEnergy).toFixed(1)}
                    readOnly={true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Nm</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "0.9rem",
                        marginTop: "2px",
                      }, //
                    }}
                    aria-describedby="outlined-weight-helper-text"
                  />
                </FormControl>
                <FormControl variant="outlined" className="fromMobile">
                  <TextField
                    disabled
                    label="Potential Energy"
                    size="small"
                    id="outlined-adornment-weight"
                    value={parseFloat(calculatedResults.potentialEnergy).toFixed(1)}
                    readOnly={true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Nm</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "0.9rem",
                        marginTop: "2px",
                      }, //
                    }}
                    aria-describedby="outlined-weight-helper-text"
                  />
                </FormControl>
                <FormControl variant="outlined" className="fromMobile">
                  <TextField
                    label="Total Energy"
                    disabled
                    size="small"
                    id="outlined-adornment-weight"
                    value={parseFloat(calculatedResults.totalEnergy).toFixed(1)}
                    readOnly={true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Nm</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "0.9rem",
                        marginTop: "2px",
                      }, //
                    }}
                    aria-describedby="outlined-weight-helper-text"
                  />
                </FormControl>
                <FormControl variant="outlined" className="fromMobile">
                  <TextField
                    disabled
                    label="Energy per hour"
                    size="small"
                    id="outlined-adornment-weight"
                    value={calculatedResults.energyPerHour}
                    readOnly={true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Nm/hr</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "0.9rem",
                        marginTop: "2px",
                      }, //
                    }}
                    aria-describedby="outlined-weight-helper-text"
                  />
                </FormControl>
                <FormControl variant="outlined" className="fromMobile">
                  <TextField
                    disabled
                    label="Impact velocity at shock absorber "
                    size="small"
                    id="outlined-adornment-weight"
                    value={parseFloat(calculatedResults.Vd).toFixed(2)}
                    readOnly={true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">m/s</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "0.9rem",
                        marginTop: "2px",
                      }, //
                    }}
                    aria-describedby="outlined-weight-helper-text"
                  />
                </FormControl>
                <FormControl variant="outlined" className="fromMobile ">
                  <TextField
                    disabled
                    label="Emass Min"
                    size="small"
                    id="outlined-adornment-weight"
                    value={
                      isNaN(calculatedResults.emassMin)
                        ? 0
                        : calculatedResults.emassMin
                    }
                    readOnly={true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Kg</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "0.9rem",
                        marginTop: "2px",
                      }, //
                    }}
                    aria-describedby="outlined-weight-helper-text"
                  />
                </FormControl>
              </div>
            </Card>
            {/* </Box> */}
          </div>
        </div>

        {showTable && (
          <div className="flex flex-col">
            {/* <div className="p-2">
              <Tooltip title="prompt text">
                <Button className="float-right" onClick={handleClick}>
                  {showGreater
                    ? "Show the Below Models"
                    : "Show the Greater Models"}
                </Button>
              </Tooltip>
            </div> */}
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    width: "100%",
                  }}
                >
                  <TabList
                    onChange={handleTabChange}
                    aria-label="lab API tabs example"
                    className="flex flex-wrap justify-between w-full"
                    TabIndicatorProps={{ style: { display: "none" } }}
                  >
                    <Tab
                      value="AKHG"
                      className="w-3/12 !max-w-[380px]"
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "#E5E8E8",
                          color: "black", // Change the color to your desired color
                        },
                      }}
                      label={
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            paddingRight: "4px",
                          }}
                        >
                          <img
                            src="/images/AKHGmain.jpg"
                            alt="AKHG Icon"
                            style={{
                              marginRight: "8px",
                              width: "60px",
                              height: "",
                              padding: "10px",
                              mixBlendMode: "multiply",
                              border: "1px solid #000",
                              borderRadius: "4px",
                            }}
                          />
                          AKHG
                        </div>
                      }
                    />
                    <Tab
                      value="EI"
                      className="w-3/12 !max-w-[380px]"
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "#E5E8E8",
                          color: "black", // Change the color to your desired color
                        },
                      }}
                      label={
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src="/images/EImain.png"
                            alt="ED Icon"
                            style={{
                              marginRight: "8px",
                              width: "40px",
                              height: "30px",
                              mixBlendMode: "multiply",
                              border: "1px solid #000",
                              borderRadius: "4px",
                            }}
                          />
                          EI
                        </div>
                      }
                    />
                    <Tab
                      value="SB"
                      className="w-3/12 !max-w-[380px]"
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "#E5E8E8",
                          color: "black", // Change the color to your desired color
                        },
                      }}
                      label={
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            paddingRight: "4px",
                          }}
                        >
                          <img
                            src="/images/SBmain.png"
                            alt="SB Icon"
                            style={{
                              marginRight: "8px",
                              width: "40px",
                              height: "30px",
                              mixBlendMode: "multiply",
                              border: "1px solid #000",
                              borderRadius: "4px",
                            }}
                          />
                          SB
                        </div>
                      }
                    />

                    <Tab
                      value="ED"
                      className="w-3/12 !max-w-[380px]"
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "#E5E8E8",
                          color: "black",
                        },
                      }}
                      label={
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src="/images/EDmain.png"
                            alt="ED Icon"
                            style={{
                              marginRight: "8px",
                              width: "40px",
                              height: "30px",
                              mixBlendMode: "multiply",
                              border: "1px solid #000",
                              borderRadius: "4px",
                            }}
                          />
                          ED
                        </div>
                      }
                    />
                  </TabList>
                </Box>
                <TabPanel value="ED" className="" sx={{ padding: "0" }}>
                  <Box
                    sx={{
                      overflowX: "auto",
                      backgroundColor: "#ffff",
                      transition: "0.4s",
                    }}
                  >
                    <div style={{ height: "50vh" }}>
                      <TableScrollbar className="h-auto">
                        <Table
                          className="table-auto w-full"
                          sx={{ minWidth: 500, overflow: "hidden" }}
                        >
                          <TableHead>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: "1px solid rgba(0, 0, 0, 0.2)",
                                  backgroundColor: "#E5E8E8",
                                },
                              }}
                            >
                              <TableCell align="right">Model</TableCell>
                              <TableCell align="right">
                                Energy Capacity
                              </TableCell>
                              <TableCell align="right">Stroke</TableCell>
                              <TableCell align="right">
                                Rate of Utilization/stroke
                              </TableCell>
                              <TableCell align="right">
                                Rate of Utilization/hr
                              </TableCell>
                              <TableCell align="right">
                                Deceleration Rate m/s2
                              </TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: "1px solid rgba(0, 0, 0, 0.2)",
                              },
                            }}
                          >
                            {top5ModelNames.ED.map((model, index) => (
                              <TableRow
                                key={index}
                                className={
                                  hoveredRowIndex === index
                                    ? ""
                                    : "bg-gray-200 "
                                }
                                onMouseEnter={() => setHoveredRowIndex(index)}
                                onMouseLeave={() => setHoveredRowIndex(null)}
                              >
                                <TableCell
                                  align="right"
                                  onClick={() => handleModelClick(model.model)}
                                  className="md:cursor-pointer  md:duration-300 md:hover:scale-110 hover:text-blue-900"
                                  sx={{ whiteSpace: "nowrap" }}
                                >
                                  {model.model}
                                </TableCell>
                                <TableCell align="right">
                                  {model.nmperstroke}
                                </TableCell>
                                <TableCell align="right">
                                  {model.stroke}
                                </TableCell>
                                <TableCell align="right">
                                  {(
                                    (calculatedResults.totalEnergy /
                                      model.nmperstroke) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </TableCell>
                                <TableCell align="right">
                                  {(
                                    (calculatedResults.energyPerHour /
                                      model.nmperhr) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </TableCell>
                                <TableCell
                                  align="right"
                                  className={
                                    (0.75 * calculatedResults.Vd ** 2) /
                                      (model.stroke / 1000) >
                                    5
                                      ? "!text-red-400"
                                      : "!text-green-500"
                                  }
                                >
                                  {(
                                    (0.75 * calculatedResults.Vd ** 2) /
                                    (model.stroke / 1000)
                                  ).toFixed(2)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableScrollbar>
                    </div>
                  </Box>
                </TabPanel>
                <TabPanel value="EI" sx={{ padding: "0" }}>
                  <Box
                    sx={{
                      overflowX: "auto",
                      backgroundColor: "#ffff",
                      transition: "0.4s",
                    }}
                  >
                    <div style={{ height: "50vh" }}>
                      <TableScrollbar className="h-auto">
                        <Table
                          className="table-auto w-full"
                          sx={{ minWidth: 500, overflow: "hidden" }}
                        >
                          <TableHead>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: "1px solid rgba(0, 0, 0, 0.2)",
                                  backgroundColor: "#E5E8E8",
                                },
                              }}
                            >
                              <TableCell align="right">Model</TableCell>
                              <TableCell align="right">
                                Energy Capacity
                              </TableCell>
                              <TableCell align="right">Stroke</TableCell>
                              <TableCell align="right">
                                Rate of Utilization/stroke
                              </TableCell>
                              <TableCell align="right">
                                Rate of Utilization/hr
                              </TableCell>
                              <TableCell align="right">
                                Deceleration Rate m/s2
                              </TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: "1px solid rgba(0, 0, 0, 0.2)",
                              },
                            }}
                          >
                            {top5ModelNames.EI.map((model, index) => (
                              <TableRow
                                key={index}
                                className={
                                  hoveredRowIndex === index ? "" : "bg-gray-200"
                                }
                                onMouseEnter={() => setHoveredRowIndex(index)}
                                onMouseLeave={() => setHoveredRowIndex(null)}
                              >
                                <TableCell
                                  align="right"
                                  onClick={() => handleModelClick(model.model)}
                                  className="md:cursor-pointer md:hover:scale-110 md:duration-300 hover:text-blue-900"
                                  sx={{ whiteSpace: "nowrap" }}
                                >
                                  {model.model}
                                </TableCell>
                                <TableCell align="right">
                                  {model.nmperstroke}
                                </TableCell>
                                <TableCell align="right">
                                  {model.stroke}
                                </TableCell>
                                <TableCell align="right">
                                  {(
                                    (calculatedResults.totalEnergy /
                                      model.nmperstroke) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </TableCell>
                                <TableCell align="right">
                                  {(
                                    (calculatedResults.energyPerHour /
                                      model.nmperhr) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </TableCell>
                                <TableCell
                                  align="right"
                                  className={
                                    (0.75 * calculatedResults.Vd ** 2) /
                                      (model.stroke / 1000) >
                                    5
                                      ? "!text-red-400"
                                      : "!text-green-500"
                                  }
                                >
                                  {(
                                    (0.75 * calculatedResults.Vd ** 2) /
                                    (model.stroke / 1000)
                                  ).toFixed(2)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableScrollbar>
                    </div>
                  </Box>
                </TabPanel>
                <TabPanel value="SB" sx={{ padding: "0" }}>
                  <Box sx={{ overflowX: "auto", backgroundColor: "#ffff" }}>
                    <div style={{ height: "50vh" }}>
                      <TableScrollbar className="h-auto">
                        <Table
                          className="table-auto w-full"
                          sx={{ minWidth: 500, overflow: "hidden" }}
                        >
                          <TableHead>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: "1px solid rgba(0, 0, 0, 0.2)",
                                  backgroundColor: "#E5E8E8",
                                },
                              }}
                            >
                              <TableCell align="right">Model</TableCell>
                              <TableCell align="right">
                                Energy Capacity
                              </TableCell>
                              <TableCell align="right">Stroke</TableCell>
                              <TableCell align="right">
                                Rate of Utilization/stroke
                              </TableCell>
                              <TableCell align="right">
                                Rate of Utilization/hr
                              </TableCell>
                              <TableCell align="right">
                                Deceleration Rate m/s2
                              </TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: "1px solid rgba(0, 0, 0, 0.2)",
                              },
                            }}
                          >
                            {top5ModelNames.SB.map((model, index) => (
                              <TableRow
                                key={index}
                                className={
                                  hoveredRowIndex === index ? "" : "bg-gray-200"
                                }
                                onMouseEnter={() => setHoveredRowIndex(index)}
                                onMouseLeave={() => setHoveredRowIndex(null)}
                              >
                                <TableCell
                                  align="right"
                                  onClick={() => handleModelClick(model.model)}
                                  className="md:cursor-pointer md:hover:scale-110 md:duration-300 hover:text-blue-900"
                                  sx={{ whiteSpace: "nowrap" }}
                                >
                                  {model.model}
                                </TableCell>
                                <TableCell align="right">
                                  {model.nmperstroke}
                                </TableCell>
                                <TableCell align="right">
                                  {Number(model.stroke)}
                                </TableCell>
                                <TableCell align="right">
                                  {(
                                    (calculatedResults.totalEnergy /
                                      model.nmperstroke) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </TableCell>
                                <TableCell align="right">
                                  {(
                                    (calculatedResults.energyPerHour /
                                      model.nmperhr) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </TableCell>
                                <TableCell
                                  align="right"
                                  className={
                                    (0.75 * calculatedResults.Vd ** 2) /
                                      (model.stroke / 1000) >
                                    5
                                      ? "!text-red-400"
                                      : "!text-green-500"
                                  }
                                >
                                  {(
                                    (0.75 * calculatedResults.Vd ** 2) /
                                    (model.stroke / 1000)
                                  ).toFixed(2)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableScrollbar>
                    </div>
                  </Box>
                </TabPanel>
                {/* {showAKHG && ( */}
                <TabPanel value="AKHG" sx={{ padding: "0" }}>
                  <Box sx={{ overflowX: "auto", backgroundColor: "#ffff" }}>
                    <div style={{ height: "50vh" }}>
                      <TableScrollbar className="h-auto">
                        <Table
                          className="table-auto w-full"
                          sx={{ minWidth: 500, overflow: "hidden" }}
                        >
                          <TableHead>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: "1px solid rgba(0, 0, 0, 0.2)",
                                  backgroundColor: "#E5E8E8",
                                },
                              }}
                            >
                              <TableCell align="right">Model</TableCell>
                              <TableCell align="right">
                                Energy Capacity
                              </TableCell>
                              <TableCell align="right">Stroke</TableCell>
                              <TableCell align="right">
                                Rate of Utilization/stroke
                              </TableCell>
                              <TableCell align="right">
                                Rate of Utilization/hr
                              </TableCell>
                              <TableCell align="right">
                                Deceleration Rate m/s2
                              </TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: "1px solid rgba(0, 0, 0, 0.2)",
                              },
                            }}
                          >
                            {top5ModelNames.AKHG.map((model, index) => (
                              <TableRow
                                key={index}
                                className={
                                  hoveredRowIndex === index ? "" : "bg-gray-200"
                                }
                                onMouseEnter={() => setHoveredRowIndex(index)}
                                onMouseLeave={() => setHoveredRowIndex(null)}
                              >
                                <TableCell
                                  align="right"
                                  onClick={() => handleModelClick(model.model)}
                                  className="md:cursor-pointer md:hover:scale-110 md:duration-300 hover:text-blue-900"
                                  sx={{ whiteSpace: "nowrap" }}
                                >
                                  {model.model}
                                </TableCell>
                                <TableCell align="right">
                                  {model.nmperstroke}
                                </TableCell>
                                <TableCell align="right">
                                  {model.stroke}
                                </TableCell>
                                <TableCell align="right">
                                  {(
                                    (calculatedResults.totalEnergy /
                                      model.nmperstroke) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </TableCell>
                                <TableCell align="right">
                                  {(
                                    (calculatedResults.energyPerHour /
                                      model.nmperhr) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </TableCell>
                                <TableCell
                                  align="right"
                                  className={
                                    (0.75 * calculatedResults.Vd ** 2) /
                                      (model.stroke / 1000) >
                                    5
                                      ? "!text-red-400"
                                      : "!text-green-500"
                                  }
                                >
                                  {(
                                    (0.75 * calculatedResults.Vd ** 2) /
                                    (model.stroke / 1000)
                                  ).toFixed(2)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableScrollbar>
                    </div>
                  </Box>
                </TabPanel>
                {/* )} */}
              </TabContext>
            </Box>
          </div>
        )}
        <div className="px-[5%] pb-[5%] md:px-0 mt-14">
          <div>NOTE:</div>
          <div className=" mb-2 text-xs md:flex">
            &bull; As per IS 3317 : 2020 deaceleration less than{" "}
            <div className="flex">
              <p className="ml-[4px] mr-[4px] text-green-500">5 m/s2</p>
              is desired
            </div>
          </div>
          <h2 className="text-xs">
            &bull; Buffers shall have sufficient energy absorbing capacity to
            bring unloaded crane / trolley ( loaded crane in the case of stiff
            masted cranes ) to rest from a speed of 50 percent of the rated
            speed at a deceleration rate
            <div className="flex">
              <p>not exceeding</p>
              <p className="text-green-500 ml-[4px]">5 m/s2.</p>
            </div>
          </h2>
        </div>
      </div>
    </>
  );
};
