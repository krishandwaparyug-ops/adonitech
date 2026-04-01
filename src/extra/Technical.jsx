import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addData } from "../features/dataSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import DownloadList from "../components/DownloadList";

export const Technical = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modelName, userId } = useParams();
  const [loading, setLoading] = useState(false);
  // const [uniqueNumber, setUniqueNumber] = useState(null);

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
  const selectedPartsData = useSelector((state) => state.data.spare);
  const shockAbsorber = useSelector((state) => state.data.shockAbsorber);
  const prices = useSelector((state) => state.data.data);
  const currency = useSelector((state) => state.data.currency);
  const name = useSelector((state) => state.data.username);
  const email = useSelector((state) => state.data.email);
  const phone = useSelector((state) => state.data.phone);
  const company = useSelector((state) => state.data.company);
  const project = useSelector((state) => state.data.project);
  const GSTn = useSelector((state) => state.data.GSTn);
  const contentType = useSelector((state) => state.data.contentType);
  const drawingFormat = useSelector((state) => state.data.drawingFormat) ?? [];
  const tempMax = useSelector((state) => state.data.tempMax);
  const tempMin = useSelector((state) => state.data.tempMin);

  const addAdditionalPriceData = useSelector(
    (state) => state.data.addAdditionalPriceData
  );
  const decelerationValue = useSelector(
    (state) => state.data.decelerationValue
  );
  const rateOfUtilizationPerStroke = useSelector(
    (state) => state.data.rateOfUtilizationPerStroke
  );
  const rateOfUtilizationPerHour = useSelector(
    (state) => state.data.rateOfUtilizationPerHour
  );
  const [extraData, setExtraData] = useState({});

  const spareItems = extraData?.spare || [];

  const accessory = extraData?.AdditionalAccessories || [];

  const velocityUnit = useSelector((state) => state.data.velocityUnit);
  const velocityUnit2 = useSelector((state) => state.data.velocityUnit2);

  const mounting = spareItems[0]?.name;

  const [fileData, setFileData] = useState(null);

  const fileFormats = ["pdf", "iges", "dxf", "step"];

  const missingFormats = fileFormats
    .filter((format) => {
      if (typeof fileData !== "object" || fileData === null) {
        return false;
      }

      const formatKey = Object.keys(fileData).find((key) =>
        key.endsWith(format)
      );

      return formatKey && (!fileData[formatKey] || fileData[formatKey] === "");
    })
    .map((format) => format.toUpperCase());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://backend.cranebuffer.com/api/data/quotation/${userId}`,
          // `http://localhost:5000/api/data/quotation/${userId}`,
          { method: "GET" }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();

        setExtraData(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId, dispatch]);

  const handleDownloadClick = async () => {
    setLoading(true);
    try {
      const datas = {
        Model: modelName,
        DrawingFormat: drawingFormat,
        Mounting: mounting,
      };

      const response = await fetch(
        "https://backend.cranebuffer.com/api/data/getFilePath",
        // `http://localhost:5000/api/data/getFilePath`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datas),
        }
      );

      const data = await response.json();

      setFileData(data);

      const {
        rear_flange_pdf,
        rear_flange_iges,
        rear_flange_dxf,
        rear_flange_step,
        front_flange_pdf,
        front_flange_iges,
        front_flange_dxf,
        front_flange_step,
      } = data;

      // Create download URLs
      const baseUrl = "https://admin.cranebuffer.com/api/";
      // const baseUrl = "http://localhost:5000/api/";
      const fileUrls = {
        rearFlange: {
          pdf: rear_flange_pdf ? `${baseUrl}${rear_flange_pdf}` : null,
          iges: rear_flange_iges ? `${baseUrl}${rear_flange_iges}` : null,
          dxf: rear_flange_dxf ? `${baseUrl}${rear_flange_dxf}` : null,
          step: rear_flange_step ? `${baseUrl}${rear_flange_step}` : null,
        },
        frontFlange: {
          pdf: front_flange_pdf ? `${baseUrl}${front_flange_pdf}` : null,
          iges: front_flange_iges ? `${baseUrl}${front_flange_iges}` : null,
          dxf: front_flange_dxf ? `${baseUrl}${front_flange_dxf}` : null,
          step: front_flange_step ? `${baseUrl}${front_flange_step}` : null,
        },
      };

      const formatExtensions = {
        pdf: "pdf",
        iges: "igs",
        dxf: "dxf",
        step: "step",
      };

      const downloadOrOpenFile = (url, fileName, format) => {
        console.log("format", format);
        console.log("fileName", fileName);
        console.log("url", url);
        try {
          if (format === "pdf") {
            const newWindow = window.open(url, "_blank");

            setTimeout(async () => {
              if (newWindow) {
                // newWindow.close();
              }
            }, 3000);
          } else {
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        } catch (error) {
          console.error(`Failed to process ${fileName}:`, error);
        }
      };

      for (const [format, url] of Object.entries(fileUrls.rearFlange)) {
        if (url) {
          const fileName = `Rear_Flange.${formatExtensions[format]}`;
          downloadOrOpenFile(url, fileName, format);
        }
      }

      for (const [format, url] of Object.entries(fileUrls.frontFlange)) {
        if (url) {
          const fileName = `Front_Flange.${formatExtensions[format]}`;
          downloadOrOpenFile(url, fileName, format);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formdata = {
    kineticEnergy,
    potentialEnergy,
    totalEnergy,
    energyPerHour,
    Vd,
    emassMin,
    mass,
    velocity,
    cycle,
    force,
    mass2,
    velocity2,
    power,
    stallFactor,
    decelerationValue,
    rateOfUtilizationPerStroke,
    rateOfUtilizationPerHour,
    modelName,
    contentType,
    name,
    email,
    phone,
    project,
    GSTn,
    drawingFormat,
    shockAbsorber,
    spareItems,
    accessory,
    tempMax,
    tempMin,
    velocityUnit,
    velocityUnit2,
  };
  console.log(formdata);

  const handlepdf = async () => {
    setLoading(true);

    // const formdataWithDateTime = {
    //   ...formdata,
    //   currentDate: getFormattedDate(),
    //   currentTime: getFormattedTime(),
    // };

    try {
      // const res = await fetch(
      //   "https://cranebackend-1.onrender.com/api/data/technical/pdf",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(formdataWithDateTime),
      //   }
      // );
      // if (!res.ok) {
      //   alert("something went wrong to send email");
      // }

      window.print();

      // setTimeout(async () => {
      //   await handleDownloadClick();
      // }, 3000);
    } catch (error) {
      console.error("Error generating technical PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  const isAnyInputMissing =
    !kineticEnergy ||
    !potentialEnergy ||
    !totalEnergy ||
    !energyPerHour ||
    !Vd ||
    !emassMin ||
    !decelerationValue ||
    !rateOfUtilizationPerStroke ||
    !rateOfUtilizationPerHour;

  // Determine if tempMax and tempMin meet the conditions for color change
  const isTempMaxValid = tempMax !== -10;
  const isTempMinValid = tempMin !== 60;

  const getFormattedDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const getFormattedTime = () => {
    const date = new Date();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strHours = String(hours).padStart(2, "0");
    return `${strHours}:${minutes} ${ampm}`;
  };

  return (
    <>
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <div className="p-4 md:w-[75%] technical">
        <div className=" w-[100%] flex justify-between ">
          <div>
            <img className="md:w-[90%] w-[70%]" src="/images/logo.png" />
          </div>
          <div className="md:w-[30%] flex justify-end flex-col">
            <h2 className="md:text-xl text-[17px] font-medium ">
              Technical Report
            </h2>
            <div className="mt-2 flex">
              <p className="mr-[3px] font-semibold">Date: </p>
              <p> {getFormattedDate()}</p>
            </div>

            <div className="mt-2 flex">
              <p className="mr-[3px] font-semibold">Time: </p>
              <p> {getFormattedTime()}</p>
            </div>
          </div>
        </div>
        {/* <div className="text-center text-lg font-bold">#{uniqueNumber}</div> */}

        <div className="md:mt-2 mb-2 w-full md:flex md:justify-between mains">
          <div className="md:w-[50%] infos">
            <h2 className="text-xl font-medium">Customer Information</h2>
            <div className="mt-2">
              <p className="font-bold">
                Project Name: <span className="font-normal">{project}</span>
              </p>
              <p className="font-bold">
                Name: <span className="font-normal">{name}</span>
              </p>
              <p className="font-bold">
                Email: <span className="font-normal">{email}</span>
              </p>
              <p className="font-bold">
                Phone: <span className="font-normal">{phone}</span>
              </p>
              <p className="font-bold">
                GSTn: <span className="font-normal">{GSTn}</span>
              </p>
              <p className="font-bold">
                Company: <span className="font-normal">{company}</span>
              </p>
            </div>
          </div>

          <div className="craneImages md:w-[50%] ">
            {contentType === "Crane/Wagon/Girder against 2 Shock Absorber" && (
              <img
                src="/images/crane1.1.png"
                className="md:w-[60%]  md:float-right craneImage"
              />
            )}
            {contentType === "Crane/Wagon/Girder against Wagon" && (
              <img
                src="/images/crane2.1.png"
                className="md:w-[60%] md:float-right craneImage"
              />
            )}
            {contentType === "Crane/Wagon/Girder against Wagon 2 Shock Absorber" && (
              <img
                src="/images/crane3.1.png"
                className="md:w-[60%] md:float-right craneImage"
              />
            )}
            {contentType === "Crane/Wagon/Girder against Shock Absorber" && (
              <img
                src="/images/crane4.1.png"
                className="md:w-[60%] md:float-right craneImage"
              />
            )}
          </div>
        </div>
        <div>
          <p className="font-bold mt-4 flex w-full">
            <div className="mr-4">
              Model Name: <span className="font-normal">{modelName}</span>
            </div>
            <div className="flex">
              <p>Mounting:</p>
              <div className="mr-4">
                {spareItems.map((item, index) => (
                  <div key={index}>
                    <span className="font-normal ml-[4px]">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex">
              <p>Spares:</p>
              <div className="font-normal ml-[4px]">
                {accessory.map((item, index) => (
                  <span key={index} className="">
                    {item.name}
                    {index < accessory.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>
          </p>
        </div>
        <div className="mt-10">
          <h2 className="text-lg font-medium">Customer Input Data</h2>
          <TableContainer component={Paper} className="mt-2">
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: "1px solid rgba(0, 0, 0, 0.2)",
                      backgroundColor: "#E5E8E8",
                      fontSize: "0.8rem",
                    },
                  }}
                >
                  {mass && <TableCell>Mass</TableCell>}
                  {velocity && <TableCell>Velocity</TableCell>}
                  {cycle && <TableCell>Cycles</TableCell>}
                  {force && <TableCell>Force</TableCell>}
                  {stroke && <TableCell>Stroke</TableCell>}
                  {velocity2 && <TableCell>Velocity2</TableCell>}
                  {mass2 && <TableCell>Mass2</TableCell>}
                  {power && <TableCell>Motor Power</TableCell>}
                  {stallFactor && <TableCell>Stall Torque factor</TableCell>}
                  {drawingFormat && <TableCell>Drawing Formats</TableCell>}
                  {tempMax && <TableCell>Max Temp</TableCell>}
                  {tempMin && <TableCell>Min Temp</TableCell>}{" "}
                  {shockAbsorber && <TableCell>Quantity</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: "1px solid rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <TableRow>
                  {mass && <TableCell>{mass} Kg</TableCell>}
                  {velocity && (
                    <TableCell>
                      {velocity} {velocityUnit}
                    </TableCell>
                  )}
                  {cycle && <TableCell>{cycle} /hr</TableCell>}
                  {force && <TableCell>{force} N</TableCell>}
                  {stroke && <TableCell>{stroke * 1000} MM</TableCell>}
                  {velocity2 && (
                    <TableCell>
                      {velocity2} {velocityUnit2}
                    </TableCell>
                  )}
                  {mass2 && <TableCell>{mass2} Kg</TableCell>}
                  {power && <TableCell>{power} HP</TableCell>}
                  {stallFactor && <TableCell>{stallFactor}</TableCell>}
                  {drawingFormat && (
                    <TableCell>{drawingFormat.join(", ")}</TableCell>
                  )}
                  {tempMax && (
                    <TableCell
                      style={{ color: isTempMaxValid ? "black" : "red" }}
                    >
                      {tempMax}
                    </TableCell>
                  )}
                  {tempMin && (
                    <TableCell
                      style={{ color: isTempMinValid ? "black" : "red" }}
                    >
                      {tempMin}
                    </TableCell>
                  )}
                  {shockAbsorber && <TableCell>{shockAbsorber}</TableCell>}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="mt-12">
          <h2 className="text-lg font-medium">
            Calculated Parameters Per Shock Absorber
          </h2>
          <TableContainer component={Paper} className="mt-2">
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: "1px solid rgba(0, 0, 0, 0.2)",
                      backgroundColor: "#E5E8E8",
                      fontSize: "0.8rem",
                    },
                  }}
                >
                  <TableCell>Kinetic Energy</TableCell>
                  <TableCell>Potential Energy</TableCell>
                  <TableCell className="rateOfUtilizationCell">
                    Total Energy
                  </TableCell>
                  <TableCell>Energy Per Hour</TableCell>
                  <TableCell>Vd</TableCell>
                  <TableCell>Emass Min</TableCell>
                  <TableCell>Deceleration</TableCell>
                  <TableCell className="rateOfUtilizationCell">
                    Rate of Utilization/Stroke
                  </TableCell>

                  <TableCell className="rateOfUtilizationCell">
                    Rate of Utilization/hr
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
                <TableRow>
                  {kineticEnergy && <TableCell>{kineticEnergy} N-M</TableCell>}
                  {potentialEnergy && (
                    <TableCell>{potentialEnergy || 0} N-M</TableCell>
                  )}
                  {totalEnergy && <TableCell>{totalEnergy} N-M</TableCell>}
                  {energyPerHour && <TableCell>{energyPerHour} N-M</TableCell>}
                  {Vd && <TableCell>{parseFloat(Vd).toFixed(2)} M/s</TableCell>}
                  {emassMin && <TableCell>{emassMin} Kg</TableCell>}
                  {decelerationValue && (
                    <TableCell
                      className={`${
                        decelerationValue > 5
                          ? "!text-red-500"
                          : "!text-green-500"
                      }`}
                    >
                      {decelerationValue} M/s²
                    </TableCell>
                  )}
                  {rateOfUtilizationPerStroke && (
                    <TableCell className="rateOfUtilizationCell">
                      {rateOfUtilizationPerStroke || ""} %
                    </TableCell>
                  )}
                  {rateOfUtilizationPerHour && (
                    <TableCell className="rateOfUtilizationCell">
                      {rateOfUtilizationPerHour || ""} %
                    </TableCell>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* Showing Download List Related To Model */}
        <DownloadList model={modelName} username={name} email={email} />

        {isAnyInputMissing && (
          <p className="text-red-500 mt-8 text-sm">
            It looks like some input values are missing. Please check and enter
            all required information.
          </p>
        )}

        {/* {drawingFormat && (
          <p className="mt-6">
            The following file{drawingFormat.length > 1 ? "s" : ""} will be
            downloaded along with the technical file{" "}
            {drawingFormat.length > 1
              ? drawingFormat.slice(0, -1).join(", ") +
                ", and " +
                drawingFormat[drawingFormat.length - 1]
              : drawingFormat[0]}
            . Please ensure you review and save all necessary files.
          </p>
        )} */}
        {/* download checkBox */}
        {missingFormats.length > 0 ? (
          <p className="mt-6 text-red-600">
            Sorry, the required file formats{" "}
            {missingFormats.map((format) => format).join(" and ")} are not
            available. The company will contact you soon to send the requested
            formats.
          </p>
        ) : (
          <p className="mt-6">
            The following file{drawingFormat.length > 1 ? "s" : ""} will be
            downloaded along with the technical file{" "}
            {drawingFormat.length > 1
              ? drawingFormat.slice(0, -1).join(", ") +
                ", and " +
                drawingFormat[drawingFormat.length - 1]
              : drawingFormat[0]}
            . Please ensure you review and save all necessary files.
          </p>
        )}

        <div className="mt-10">
          <div>Note:</div>
          <h2 className="text-sm flex flex-wrap">
            &bull; If deaceleration is {"<"} than
            <p className="ml-[4px] mr-[4px] text-green-600">5 m/s²</p>
            <p>then the model is Suitable for Crane Duty </p>
            <p className="ml-[4px]">
              application as per IS 3317-2020 else unsafe.
            </p>
          </h2>
        </div>
        <div className="btn mt-6 mb-10 md:flex md:justify-between">
          <div className="mb-4 md:mb-0">
            <button
              onClick={handlepdf}
              className="submitBtn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-[auto] "
            >
              Save Technical Report
            </button>
          </div>
          <div>
            <button
              onClick={() => {
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
                    username: name,
                    email: email,
                    phone: phone,
                    company: company,
                    project: project,
                    GSTn: GSTn,
                    contentType: contentType,
                    decelerationValue: decelerationValue,
                    rateOfUtilizationPerStroke: rateOfUtilizationPerStroke,
                    rateOfUtilizationPerHour: rateOfUtilizationPerHour,
                    tempMin: tempMin,
                    tempMax: tempMax,
                  })
                );
                navigate(`/price/${modelName}/info/${userId}/technical/RFQ`);
              }}
              className="next bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-[auto]"
            >
              Proceed to RFQ
            </button>
          </div>
        </div>
        {modelName.slice(0, 6) === "ED 1.5" ? (
          <img
            src="/images/ED1.5.png"
            className="w-[100%] h-[100%] hidden catlog"
          />
        ) : null}
        {modelName.slice(0, 6) === "ED 2.0" ? (
          <img
            src="/images/ED2.0.png"
            className="w-[100%] h-[100%] hidden catlog"
          />
        ) : null}
        {modelName.slice(0, 6) === "ED 3.0" ? (
          <img
            src="/images/ED3.0.png"
            className="w-[100%] h-[100%] hidden catlog"
          />
        ) : null}
        {modelName.slice(0, 6) === "ED 4.0" ? (
          <img
            src="/images/ED4.0.png"
            className="w-[100%] h-[100%] hidden catlog"
          />
        ) : null}
        {modelName.slice(0, 6) === "ED 3.5" ? (
          <img
            src="/images/ED3.5.png"
            className="w-[100%] h-[100%] hidden catlog"
          />
        ) : null}
        {modelName.slice(0, 6) === "EI 50 " ? (
          <img
            src="/images/EI50.png"
            className="w-[100%] h-[100%] hidden catlog"
          />
        ) : null}
        {modelName.slice(0, 6) === "EI 80 " ? (
          <img
            src="/images/EI50.png"
            className="w-[100%] h-[100%] hidden catlog"
          />
        ) : null}
        {modelName.slice(0, 6) === "EI 100" ? (
          <img
            src="/images/EI50.png"
            className="w-[100%] h-[100%] hidden catlog"
          />
        ) : null}
        {modelName.slice(0, 6) === "EI 120" ? (
          <img
            src="/images/EI50.png"
            className="w-[100%] h-[100%] hidden catlog"
          />
        ) : null}
        {modelName.slice(0, 6) === "EI 130" ? (
          <img
            src="/images/EI130.png"
            className="w-[100%] h-[100%] hidden catlog"
          />
        ) : null}
        {modelName.slice(0, 6) === "EI 150" ? (
          <img
            src="/images/EI130.png"
            className="w-[100%] h-[100%] hidden catlog"
          />
        ) : null}
        {modelName.slice(0, 2) === "SB" ? (
          <img
            src="/images/SB.png"
            className="w-[100%] h-[100%] hidden catlog"
          />
        ) : null}
      </div>

      <style>{`
        @media print {
         
          .submitBtn, .next {
            display: none;
          }
          .catlog{
            display:block;
          }
            body {
            margin: 0;
            padding: 0;
          }
          // .technical {
          //   width: 250mm; 
          //   height: 300mm;
          //   margin: 0 auto; 
          //   padding: 20mm;
          // }

          .technical{
            width:100%;
          }

            @page {
              size: A3; /* Set the page size to A3 */
            }

          .mains{
            width:100%;
            display: flex;
            display: -webkit-flex;
          }
          .infos{
            width:50%
          }
          .craneImages{
            width:50%;
          }
          .craneImage{
            width:90%;
          }
        }



        @media screen {
          .spinner-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }
  
          .spinner {
            width: 44.8px;
            height: 44.8px;
            animation: spinner-y0fdc1 2s infinite ease;
            transform-style: preserve-3d;
          }
  
          .spinner > div {
            background-color: rgba(71, 75, 255, 0.2);
            height: 100%;
            position: absolute;
            width: 100%;
            border: 2.2px solid #474bff;
          }
  
          .spinner div:nth-of-type(1) {
            transform: translateZ(-22.4px) rotateY(180deg);
          }
  
          .spinner div:nth-of-type(2) {
            transform: rotateY(-270deg) translateX(50%);
            transform-origin: top right;
          }
  
          .spinner div:nth-of-type(3) {
            transform: rotateY(270deg) translateX(-50%);
            transform-origin: center left;
          }
  
          .spinner div:nth-of-type(4) {
            transform: rotateX(90deg) translateY(-50%);
            transform-origin: top center;
          }
  
          .spinner div:nth-of-type(5) {
            transform: rotateX(-90deg) translateY(50%);
            transform-origin: bottom center;
          }
  
          .spinner div:nth-of-type(6) {
            transform: translateZ(22.4px);
          }
  
          @keyframes spinner-y0fdc1 {
            0% {
              transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
            }
  
            50% {
              transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
            }
  
            100% {
              transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
            }
          }
        }
      `}</style>
    </>
  );
};
