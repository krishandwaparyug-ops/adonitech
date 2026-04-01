import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../features/dataSlice";

const PricePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = localStorage.getItem("Token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [navigate]);
  const currency = useSelector((state) => state.data.currency);
  const shockAbsorber = useSelector((state) => state.data.shockAbsorber);
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
  const contentType = useSelector((state) => state.data.contentType);
  const [totalPrice, setTotalPrice] = useState(0);
  const { modelName } = useParams();
  const [prices, setPrices] = useState({});
  // const [quantityDisplay, setQuantityDisplay] = useState({});
  const [selectedSparePart, setSelectedSparePart] = useState(null);
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [tempNote, setTempNote] = useState("");
  const modeldata = modelName.slice(0, 2);

  // Fetch spare parts data
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        if (!modelName) {
          return;
        }
        const response = await fetch(
          `https://backend.cranebuffer.com/api/prices/${modelName}`,
          // `http://localhost:5000/api/prices/${modelName}`,
          { method: "GET" }
        );
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setPrices(data.price);
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
  }, [modelName]);

  // useEffect(() => {
  //   const initialQuantityDisplay = Object.keys(prices).reduce((acc, part) => {
  //     acc[part] = 0;
  //     return acc;
  //   }, {});

  //   // Initialize quantities for parts in edassoc to 0
  //   edassoc.forEach((part) => {
  //     if (!(part in initialQuantityDisplay)) {
  //       initialQuantityDisplay[part] = 0;
  //     }
  //   });
  //   setQuantityDisplay(initialQuantityDisplay);
  // }, [prices]);

  // useEffect(() => {
  //   let total = prices.NEWPRICE || 0;
  //   Object.keys(quantityDisplay).forEach((part) => {
  //     total += prices[part] * quantityDisplay[part] || 0;
  //   });
  //   setTotalPrice(total);
  // }, [quantityDisplay, prices]);

  // const handleQuantityChange = (part, newQuantity) => {
  //   setQuantityDisplay((prevQuantityDisplay) => ({
  //     ...prevQuantityDisplay,
  //     [part]: newQuantity,
  //   }));
  // };

  const handleRadioChange = (part) => {
    setSelectedSparePart(part);
    setTotalPrice(prices.NEWPRICE || 0);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + (prices[part] || 0));
  };
  const imagesection = {
    Rear_Flange_Front_Foot_Mount: "../images/Rear Flange Front Foot Mount.png",
    Front_Flange: "../images/Front Flange.png",
    Rear_Flange: "../images/Rear Flange.png",
    Clevis_Mount: "../images/Clevis Mount.png",
    Front_and_Rear_Flanges: "../images/Front and Rear Flanges.png",
    Front_and_Rear_Foot_Mount: "../images/Front and Rear Foot Mount.png",
  };

  const filteredParts = Object.keys(prices).filter((part) => {
    const series = prices.series;

    if (series === "EI") {
      return part === "Front_Flange" || part === "Rear_Flange";
    } else {
      return (
        part === "Rear_Flange_Front_Foot_Mount" ||
        part === "Front_Flange" ||
        part === "Rear_Flange" ||
        part === "Clevis_Mount" ||
        part === "Front_and_Rear_Flanges" ||
        part === "Front_and_Rear_Foot_Mount" ||
        part === "Rear_Flange_Front_Foot_Mount"
      );
    }
  });

  const edassoc = ["Bellows", "Piston Rod Sensor", "Ureathane Cap"];

  const handleAccessoryChange = (part, isChecked) => {
    setSelectedAccessories((prevSelectedAccessories) => {
      if (isChecked) {
        return [...prevSelectedAccessories, part];
      } else {
        return prevSelectedAccessories.filter(
          (selectedPart) => selectedPart !== part
        );
      }
    });
  };

  const handleNextButtonClick = () => {
    const selectedPartsData = selectedSparePart
      ? [
          {
            name: selectedSparePart,
            price: prices[selectedSparePart],
          },
        ]
      : [];

    const additionalPriceData = selectedAccessories.map((part) => ({
      name: part,
    }));

    dispatch(
      addData({
        totalPrice: totalPrice,
        spare: selectedPartsData,
        shockAbsorber: shockAbsorber,
        data: prices,
        currency: currency,
        addAdditionalPriceData: additionalPriceData,
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
        contentType: contentType,
        tempMax: tempMax,
        tempMin: tempMin,
      })
    );
    // Navigate to the next page
    navigate(`/price/${modelName}/info`);
  };

  useEffect(() => {
    const temp = () => {
      if (tempMax > 60 || tempMin < -10) {
        return "Since your operating Temperature is Beyond -10--+60 Deg celsius. We will revert with a Special Sealing solution and a Special Price. The above Price is budgetary for the Standard Operating Range of -10 to +60 Degrees Celsius.";
      } else {
        return "";
      }
    };

    setTempNote(temp());
  }, [tempMax, tempMin]);

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-2 ">
      <div className="images flex justify-center mb-2">
        <img src="/images/logo.png" />
      </div>
      <div className="p-2 text-lg flex font-semibold">
        Model: <p className="ml-2 font-normal"> {modelName}</p>
      </div>
      <h1 className="text-xl font-bold mb-4 ml-2">Choose Mountings</h1>
      <div className="mb-12">
        {/* <h2 className="text-xl font-semibold mb-2">Spare Parts</h2> */}
        <ul className="grid grid-cols-1 md:grid-cols-1 gap-y-6 gap-x-4 md:p-2">
          {filteredParts.map((part, index) => (
            <li key={index} className="flex items-center justify-between ">
              <img className="w-[25%]" src={imagesection[part]} alt={part} />
              <div className="mr-2 w-[30%] text-sm">{part}</div>
              <input
                type="radio"
                name="spareParts"
                onClick={() => handleRadioChange(part)}
                className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-800">
                {currency === "INR"
                  ? `₹ ${prices[part]}`
                  : `$ ${prices[part] / 80}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1 className="text-xl font-bold mb-4 ml-2">Choose Accessories</h1>
        {(() => {
          if (modeldata === "ED") {
            return (
              <>
                {edassoc.map((part, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between mb-4 ml-2 "
                  >
                    <div className="mr-2 w-[50%]">{part}</div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleAccessoryChange(
                            part,
                            !selectedAccessories.includes(part)
                          )
                        }
                        checked={selectedAccessories.includes(part)}
                        className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                  </li>
                ))}
              </>
            );
          } else if (modeldata === "EI") {
            return (
              <li className="flex items-center justify-between mb-4 ml-2 ">
                <div className="mr-2 w-[50%]">Bellows</div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={() => {
                      // Toggle the selection of the accessory
                      if (selectedAccessories.includes("Bellows")) {
                        setSelectedAccessories(
                          selectedAccessories.filter(
                            (item) => item !== "Bellows"
                          )
                        );
                      } else {
                        setSelectedAccessories([
                          ...selectedAccessories,
                          "Bellows",
                        ]);
                      }
                    }}
                    checked={selectedAccessories.includes("Bellows")}
                    className="mr-2"
                  />
                </div>
              </li>
            );
          } else {
            return (
              <>
                <input className="mb-4" placeholder="customer request only" />
              </>
            );
          }
        })()}
      </div>

      <div className="border border-gray-200 p-4 ">
        <div className="originalPrice flex items-center justify-between mb-4">
          <div className="font-semibold">Original Price</div>
          <div className="text-green-600 font-semibold">
            {currency === "INR"
              ? `₹ ${prices.NEWPRICE}`
              : `$ ${prices.NEWPRICE / 80}`}
          </div>
        </div>

        {selectedSparePart && (
          <li className="flex items-center justify-between mb-2 ">
            <span className="text-blue-600 mr-2">{selectedSparePart}</span>
            <span className="text-gray-800">
              {currency === "INR"
                ? `₹ ${prices[selectedSparePart]}`
                : `$ ${prices[selectedSparePart] / 80}`}
            </span>
          </li>
        )}

        {selectedAccessories.map((part, index) => (
          <li key={index} className="flex items-center justify-between mb-2 ">
            <span className="text-blue-600 mr-2">{part}</span>
            <span className="text-gray-800">
              {prices[part] !== undefined
                ? currency === "INR"
                  ? `₹ ${prices[part]}`
                  : `$ ${prices[part] / 80}`
                : "N/A"}
            </span>
          </li>
        ))}

        <hr />
        <div className=" flex items-center justify-between mt-4">
          <span className="font-semibold  mr-2">Total Price:</span>
          <span className="text-green-600 font-semibold">
            {currency === "INR" ? `₹ ${totalPrice}` : `$ ${totalPrice / 80}`}
          </span>
        </div>
      </div>

      <div className="mt-4">
        {tempNote && (
          <>
            <div>Note:</div>
            <h2 className="md:text-xs text-[12px]">
              <p>&bull; {tempNote}</p>
            </h2>
          </>
        )}
      </div>
      <div className="mb-2 mt-6">
        <div className="font-bold">Note:</div>
        <h2 className="md:text-sm text-[12px]">
          &bull; Prices are Indicative, Contact Factory for Quality based
          Discounts
        </h2>
      </div>

      <div className="flex justify-center mt-10 mb-10">
        <button
          onClick={handleNextButtonClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
        >
          Proceed to Next
        </button>
      </div>
    </div>
  );
};
export default PricePage;
