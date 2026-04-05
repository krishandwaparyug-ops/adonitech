import { useState, useRef, useEffect } from "react";
import Cranel1_Calculation from "../calculations/Cranebuffer/Crane1_Calculation";
import Cranel2_Calculation from "../calculations/Cranebuffer/Crane2_Calculation";
import Cranel3_Calculation from "../calculations/Cranebuffer/Crane3_Calculation";
import Cranel4_Calculation from "../calculations/Cranebuffer/Crane4_Calculation";

import ShockAbsorber1_Calculation from "../calculations/ShockAbsorber/Shock1_calculation";
import ShockAbsorber2_Calculation from "../calculations/ShockAbsorber/Shock2_calculation";
import ShockAbsorber3_Calculation from "../calculations/ShockAbsorber/Shock3_calculation";
import ShockAbsorber4_Calculation from "../calculations/ShockAbsorber/Shock4_calculation";
import ShockAbsorber5_Calculation from "../calculations/ShockAbsorber/Shock5_calculation";
import ShockAbsorber6_Calculation from "../calculations/ShockAbsorber/Shock6_calculation";
import ShockAbsorber7_Calculation from "../calculations/ShockAbsorber/Shock7_calculation";
import ShockAbsorber8_Calculation from "../calculations/ShockAbsorber/Shock8_calculation";
import ShockAbsorber9_Calculation from "../calculations/ShockAbsorber/Shock9_calculation";

import { brandModels, modelImages, questionFlows } from "./questionData";
import Bot_Logo from "../images/bot_img.webp";
// <-- Charts Images -->
import Chart1 from "../images/figure_1.jpg";
import Chart2 from "../images/figure_2.jpg";
import Chart3 from "../images/figure_3.jpg";
import Chart4 from "../images/figure_4.jpg";

import { SendEmailToOwner, SendEmail } from "../sendEmail/sendMail";
import { velocityFromHeight } from "../helper/calculateVelocityFromHeight";
import { renderSummary } from "../helper/renderSummary";
import { loadCsv } from "../utils/csvLoader";
import { generateTechnicalReport } from "../utils/generatePdf";
import Typing from "./ui/Typing";
import CallIcon from "@mui/icons-material/Call";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";

const Bot = ({ showTip, setShowTip }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentCalculation, setCurrentCalculation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({
    modelType: "",
    category: "",
    brand: "",
    series: "",
    Model: "",
    quantity: "",
    applicationType: "",
    email: "",
    MobileNumber: "",
    ProjectNumber: "",
    ProjectName: "",
    mass: "",
    mass2: "",
    velocity: "",
    velocity2: "",
    stroke: "",
    temperature: "",
    cyclesPerHour: "",
    force: "",
    propulsionForce: "",
    strokeTime: "",
    shockAbsorberCount: "",
    visitUsername: "",
    vibrationData: {
      orientation: "",
      weight: "",
      loadAxis: "",
      excitationFrequency: "",
      transmittedAcceleration: "",
      shockVelocity: "",
      height: "",
      numIsolators: "",
      velocity: "",
      V: "",
      Wt: "",
      N: "",
      Fi: "",
      At: "",
    },
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const normalizeCalculationOutput = (input, result) => {
    if (!result || typeof result !== "object") {
      return result;
    }

    const totalEnergyValue = Number(result.totalEnergy);
    const vdValue = Number(result.Vd);

    const cycleCandidates = [
      input?.cyclesPerHour,
      input?.cycles,
      input?.cycle,
      input?.cValue,
    ];
    const cycleValue = cycleCandidates
      .map((value) => Number(value))
      .find((value) => Number.isFinite(value));

    const correctedEnergyPerHour =
      Number.isFinite(totalEnergyValue) && Number.isFinite(cycleValue)
        ? Math.round(totalEnergyValue * cycleValue)
        : result.energyPerHour;

    const correctedEmassMin =
      Number.isFinite(totalEnergyValue) && Number.isFinite(vdValue) && vdValue !== 0
        ? Math.round((2 * totalEnergyValue) / vdValue ** 2)
        : result.emassMin;

    const strokeCandidates = [input?.stroke, input?.sValue, input?.strokeValue];
    const strokeRaw = strokeCandidates
      .map((value) => Number(value))
      .find((value) => Number.isFinite(value) && value > 0);
    const strokeInMeters =
      Number.isFinite(strokeRaw) && strokeRaw > 0
        ? strokeRaw > 10
          ? strokeRaw / 1000
          : strokeRaw
        : null;

    const correctedDeceleration =
      Number.isFinite(vdValue) && strokeInMeters
        ? Number(((0.75 * vdValue ** 2) / strokeInMeters).toFixed(3))
        : result.deceleration;

    return {
      ...result,
      energyPerHour: correctedEnergyPerHour,
      emassMin: correctedEmassMin,
      deceleration: correctedDeceleration,
    };
  };

  const performVibrationCalculations = async (vibrationData) => {
    setIsLoading(true);
    const Wt_N = vibrationData.Wt * 9.81;
    const W = Wt_N / vibrationData.N;
    const Fn = vibrationData.Fi / 30;
    const Kv = (W * (2 * Math.PI * Fn)) / 9.81;
    const V = vibrationData.V;
    const Dmin = V ** 2 / (9.81 * vibrationData.At);
    const Ks_required = (W * Math.pow(V / Dmin, 2)) / 9.8;

    // Placeholder isolator data (replace with actual database/API data)
    let csvPath;
    switch (formData.vibrationData.loadAxis) {
      case "Compression":
        csvPath = "/csv/chart1.csv";
        break;
      case "45°":
        csvPath = "/csv/chart2.csv";
        break;
      case "Fixed Shear":
        csvPath = "/csv/chart3.csv";
        break;
      case "Fixed Roll":
        csvPath = "/src/bot/csv/chart4.csv";
        break;
      default:
        setMessages((prev) => [
          ...prev,
          {
            text: `Unknown loadAxis:, ${vibrationData.loadAxis}`,
            isUser: false,
          },
        ]);
        console.warn("Unknown loadAxis:", vibrationData.loadAxis);
        return [];
    }
    try {
      const isolatorData = await loadCsv(csvPath);
      console.log(isolatorData);

      const suitableIsolators = isolatorData
        // .filter(
        //   (isolator) =>
        //     Number(isolator.Max_static_load) >= W &&
        //     Number(isolator.Max_deflection) >= Dmin * 1000 &&
        //     Number(isolator.Ks) >= Ks_required
        // )
        .map((isolator) => {
          const Dactual = V / Math.sqrt(Number(isolator.Ks) / W);
          const percentLoading =
            (Dactual / Number(isolator.Max_deflection)) * 100;
          return {
            ...isolator,
            Dactual,
            percentLoading,
            Fn,
            Kv,
            Dmin,
            Ks_required,
          };
        })
        // Sort by percentLoading (ascending: lower % = better performance)
        .sort((a, b) => a.percentLoading - b.percentLoading)
        // Keep only the top 5 results
        .slice(0, 5);

      setMessages((prev) => [
        ...prev,
        {
          text: suitableIsolators.length
            ? "Suitable Top 5 Isolator Models:"
            : "No suitable isolators found.",
          models: suitableIsolators.map((iso) => ({
            ...iso,
            Dactual: iso.Dactual.toFixed(3),
            percentLoading: iso.percentLoading.toFixed(2),
          })),
          isUser: false,
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error("error message", error);
    }
  };

  // Initialize conversation
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Welcome to Adoni Tech's Bot! Are you looking for a solution for impact or vibration issues?",
          isUser: false,
          optionList: ["Impact", "Vibration Isolation"],
          optionType: "category",
        },
      ]);
    }
  }, [isOpen]);

  const handleOptionClick = (option, optionType) => {
    setMessages((prev) => [...prev, { text: option, isUser: true }]);
    setFormData((prev) => ({
      ...prev,
      [optionType]: option.toLowerCase().replace(" ", ""),
    }));
    // Show typing indicator
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (optionType === "category") {
        if (option === "Impact") {
          setMessages((prev) => [
            ...prev,
            {
              text: "Are you currently using a product and looking to replace it?",
              isUser: false,
              optionList: ["Yes", "No"],
              optionType: "replaceProduct",
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              text: "Please select the load axis:",
              isUser: false,
              options: [
                { text: "Compression", image: Chart1 },
                { text: "45°", image: Chart2 },
                { text: "Fixed Shear", image: Chart3 },
                { text: "Fixed Roll", image: Chart4 },
              ],
              image: true,
              optionType: "loadAxis",
            },
          ]);
        }
      } else if (optionType === "loadAxis") {
        setFormData((prev) => ({
          ...prev,
          vibrationData: { ...prev.vibrationData, loadAxis: option },
        }));
        setMessages((prev) => [
          ...prev,
          {
            text: "Please enter the total weight Wt (Kg):",
            isUser: false,
            expectingInput: true,
            inputType: "vibrationWt",
          },
        ]);
      } else if (optionType === "knowTR") {
        generateTechnicalReport(formData);
        alert("Technical report");
      } else if (optionType === "knowVH") {
        if (option === "Velocity V") {
          setMessages((prev) => [
            ...prev,
            {
              text: "Please enter the shock velocity V (m/sec):",
              isUser: false,
              expectingInput: true,
              inputType: "vibrationV",
            },
          ]);
        } else if (option === "Height H") {
          setMessages((prev) => [
            ...prev,
            {
              text: "Please enter the height of drop H (m):",
              isUser: false,
              expectingInput: true,
              inputType: "vibrationH",
            },
          ]);
        }
      } else if (optionType === "replaceProduct") {
        if (option === "Yes") {
          setMessages((prev) => [
            ...prev,
            {
              text: "Please provide the product's make.",
              isUser: false,
              expectingInput: true,
              inputType: "series",
            },
          ]);
        } else {
          setFormData((prev) => ({ ...prev, category: option.toLowerCase() }));
          setMessages((prev) => [
            ...prev,
            {
              text: "Is the impact industrial or crane duty?",
              isUser: false,
              optionList: ["Industrial Application", "Crane Duty"],
              optionType: "applicationType",
            },
          ]);
        }
      } else if (optionType === "applicationType") {
        const brand =
          option === "Industrial Application" ? "ShockAbsorber" : "CraneBuffer";
        setFormData((prev) => ({
          ...prev,
          applicationType:
            option === "Industrial Application"
              ? "industrialapplication"
              : "craneduty",
          brand,
        }));
        // Create model options with images
        const modelOptions = brandModels[brand].map((model) => ({
          text: model,
          image: modelImages[model],
        }));
        setMessages((prev) => [
          ...prev,
          {
            text: "Select your model type:",
            isUser: false,
            options: modelOptions,
            optionType: "modelType",
          },
        ]);
      } else if (optionType === "modelType") {
        const questions = questionFlows[formData.brand]?.[option];
        if (!questions || questions.length === 0) {
          setMessages((prev) => [
            ...prev,
            {
              text: "No questions available for this model type. Please contact support.",
              isUser: false,
            },
          ]);
          return;
        }
        setFormData((prev) => ({
          ...prev,
          modelType: option,
          questions,
          currentQuestionIndex: 0,
        }));
        setMessages((prev) => [
          ...prev,
          {
            text: questions[0].question,
            isUser: false,
            expectingInput: true,
            inputType: "modelQuestion",
            currentField: questions[0].field,
          },
        ]);
      }
    }, 1000);
  };

  const handleSendMessage = () => {
    const message = inputMessage.trim();
    if (!message) return;

    setMessages((prev) => [...prev, { text: message, isUser: true }]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(async () => {
      const lastBotMessage = [...messages].reverse().find((m) => !m.isUser);
      setIsTyping(false);

      if (message.toLowerCase() === "hello") {
        return setMessages((prev) => [
          ...prev,
          { text: "Hello! How can I assist you today?", isUser: false },
          {
            text: "Are you looking for a solution for impact or vibration issues?",
            isUser: false,
            optionList: ["Impact", "Vibration Isolation"],
            optionType: "category",
          },
        ]);
      }
      if (message.toLowerCase() === "/restart") {
        return setMessages(() => [
          {
            text: "Are you looking for a solution for impact or vibration issues?",
            isUser: false,
            optionList: ["Impact", "Vibration Isolation"],
            optionType: "category",
          },
        ]);
      }
      if (
        message.trim().toLowerCase() === "/help" ||
        message.toLowerCase().includes("help")
      ) {
        setMessages((prev) => [
          ...prev,
          {
            text: "It seems you need assistance. Would you like one of our specialists to call you back?",
            isUser: false,
          },
        ]);
        handleRequestCallback();
        return;
      }

      if (lastBotMessage?.inputType === "callbackMobile") {
        const mobile = message.trim();
        if (!/^\d{7,15}$/.test(mobile)) {
          // invalid number, re-ask
          setMessages((prev) => [
            ...prev,
            {
              text: "That doesn’t look like a valid number. Please enter digits only (7–15 digits).",
              isUser: false,
              expectingInput: true,
              inputType: "callbackMobile",
            },
          ]);
        } else {
          // valid, save and fire off
          setFormData((prev) => ({ ...prev, MobileNumber: mobile }));
          setMessages((prev) => [
            ...prev,
            {
              text: "Working on it...",
              isUser: false,
            },
          ]);
          try {
            const res = await fetch(
              "https://45.55.226.102:3001/api/data/quotation/callback",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: mobile }),
              }
            );
            if (!res.ok) throw new Error(`Status ${res.status}`);

            setMessages((prev) => [
              ...prev,
              {
                text: "Thanks! You’ve requested a callback. Our team will contact you shortly.",
                isUser: false,
                isSystem: true,
              },
            ]);
          } catch (err) {
            console.error(err);
            setMessages((prev) => [
              ...prev,
              {
                text: "Sorry, something went wrong. Please try again later.",
                isUser: false,
                isSystem: true,
              },
            ]);
          }
        }
      }

      // 1) Capture email → ask phone
      if (lastBotMessage?.inputType === "visitEmail") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message)) {
          return setMessages((prev) => [
            ...prev,
            {
              text: "Please enter a valid email address.",
              isUser: false,
              expectingInput: true,
              inputType: "visitEmail",
            },
          ]);
        }
        setFormData((prev) => ({ ...prev, visitEmail: message }));
        setMessages((prev) => [
          ...prev,
          {
            text: "Thanks! Now please enter your phone number (digits only):",
            isUser: false,
            expectingInput: true,
            inputType: "visitPhone",
          },
        ]);
        return;
      }

      // 2) Capture phone → ask username
      if (lastBotMessage?.inputType === "visitPhone") {
        if (!/^\d{7,15}$/.test(message)) {
          return setMessages((prev) => [
            ...prev,
            {
              text: "That doesn’t look like a valid phone number. Please re-enter:",
              isUser: false,
              expectingInput: true,
              inputType: "visitPhone",
            },
          ]);
        }
        setFormData((prev) => ({ ...prev, visitPhone: message }));
        setMessages((prev) => [
          ...prev,
          {
            text: "Almost done—what username should we use for your account?",
            isUser: false,
            expectingInput: true,
            inputType: "visitUsername",
          },
        ]);
        return;
      }

      // 3) Capture username → finalize
      if (lastBotMessage?.inputType === "visitUsername") {
        setFormData((prev) => ({ ...prev, visitUsername: message }));
        setMessages((prev) => [
          ...prev,
          {
            text: "Working on it...",
            isUser: false,
          },
        ]);
        try {
          const res = await fetch(
            "https://45.55.226.102:3001/api/data/quotation/arrangemeeting",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: formData.email, username: formData.visitUsername, phone: formData.MobileNumber }),
            }
          );
          if (!res.ok) throw new Error(`Status ${res.status}`);

          setMessages((prev) => [
          ...prev,
          {
            text: "Thank you! We’ve got everything we need and will reach out soon to confirm your visit.",
            isUser: false,
            isSystem: true,
          },
        ]);
        } catch (err) {
          console.error(err);
          setMessages((prev) => [
            ...prev,
            {
              text: "Sorry, something went wrong. Please try again later.",
              isUser: false,
              isSystem: true,
            },
          ]);
        }

        // (Optional) fire your scheduling API here:
        // scheduleVisit(formData.visitDate, formData.visitEmail, formData.visitPhone, formData.visitUsername);
        return;
      }

      if (lastBotMessage?.inputType === "ProjectName") {
        setFormData((prev) => ({ ...prev, ProjectName: message }));
        setMessages((prev) => [
          ...prev,
          {
            text: "Enter your Project Number: ",
            isUser: false,
            expectingInput: true,
            inputType: "ProjectNumber",
          },
        ]);
      }
      if (lastBotMessage?.inputType === "ProjectNumber") {
        setFormData((prev) => ({ ...prev, ProjectNumber: message }));
        setMessages((prev) => [
          ...prev,
          {
            text: "Enter your Email: ",
            isUser: false,
            expectingInput: true,
            inputType: "projectEmail",
          },
        ]);
      }
      if (lastBotMessage?.inputType === "CalculationNumber") {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message)) {
          // Basic email validation
          setFormData((prev) => ({ ...prev, email: message }));
          setMessages((prev) => [
            ...prev,
            {
              text: "Enter your Mobile Number: ",
              isUser: false,
              expectingInput: true,
              inputType: "sendCalculation",
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              text: "Enter a valid Email",
              isUser: false,
              expectingInput: true,
              inputType: "CalculationNumber",
            },
          ]);
        }
      }
      if (lastBotMessage?.inputType === "sendCalculation") {
        if (/^\d{7,15}$/.test(message)) {
          // setFormData((prev) => ({ ...prev, email: message }));
          const updatedForm = { ...formData, MobileNumber: message };
          setMessages((prev) => [
            ...prev,
            {
              text: "Working on it....",
              isUser: false,
            },
          ]);
          // Basic email validation
          try {
            const res = await SendEmailToOwner(
              updatedForm,
              currentCalculation,
              setMessages
            );
            setMessages((prev) => [
              ...prev,
              {
                text: res.ok
                  ? "Email Received, Our team will Contact you soon."
                  : "Something went wrong; please try again later.",
                isUser: false,
              },
            ]);
          } catch (error) {
            console.error("Error occupied: ", error);
            setMessages((prev) => [
              ...prev,
              {
                text: "Error Occupied Please try again later",
                isUser: false,
              },
            ]);
          }
        } else {
          setMessages((prev) => [
            ...prev,
            {
              text: "Please Enter a valid Number",
              isUser: false,
              expectingInput: true,
              inputType: "sendCalculation",
            },
          ]);
        }
      }
      if (lastBotMessage?.inputType === "projectEmail") {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message)) {
          // Basic email validation
          setFormData((prev) => ({ ...prev, email: message }));
          setMessages((prev) => [
            ...prev,
            {
              text: "Enter your Mobile Number: ",
              isUser: false,
              expectingInput: true,
              inputType: "MobileNumber",
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              text: "Enter a valid Email",
              isUser: false,
              expectingInput: true,
              inputType: "projectEmail",
            },
          ]);
        }
      }
      if (lastBotMessage?.inputType === "MobileNumber") {
        setFormData((prev) => ({ ...prev, MobileNumber: message }));
        setMessages((prev) => [
          ...prev,
          {
            text: "Here's your Technical report",
            isUser: false,
            optionList: ["View Technical Report"],
            optionType: "knowTR",
          },
        ]);
      } else if (lastBotMessage?.inputType === "vibrationWt") {
        const Wt = parseFloat(message);
        if (isNaN(Wt) || Wt <= 0) {
          setMessages((prev) => [
            ...prev,
            {
              text: "Please enter a valid positive number for Wt.",
              isUser: false,
              expectingInput: true,
              inputType: "vibrationWt",
            },
          ]);
        } else {
          setFormData((prev) => ({
            ...prev,
            vibrationData: { ...prev.vibrationData, Wt },
          }));
          setMessages((prev) => [
            ...prev,
            {
              text: "Please enter the number of isolators N:",
              isUser: false,
              expectingInput: true,
              inputType: "vibrationN",
            },
          ]);
        }
      } else if (lastBotMessage?.inputType === "vibrationN") {
        const N = parseInt(message);
        if (isNaN(N) || N <= 0) {
          setMessages((prev) => [
            ...prev,
            {
              text: "Please enter a valid positive integer for N.",
              isUser: false,
              expectingInput: true,
              inputType: "vibrationN",
            },
          ]);
        } else {
          setFormData((prev) => ({
            ...prev,
            vibrationData: { ...prev.vibrationData, N },
          }));
          setMessages((prev) => [
            ...prev,
            {
              text: "Please enter the excitation frequency Fi (Hz):",
              isUser: false,
              expectingInput: true,
              inputType: "vibrationFi",
            },
          ]);
        }
      } else if (lastBotMessage?.inputType === "vibrationFi") {
        const Fi = parseFloat(message);
        if (isNaN(Fi) || Fi <= 0) {
          setMessages((prev) => [
            ...prev,
            {
              text: "Please enter a valid positive number for Fi.",
              isUser: false,
              expectingInput: true,
              inputType: "vibrationFi",
            },
          ]);
        } else {
          setFormData((prev) => ({
            ...prev,
            vibrationData: { ...prev.vibrationData, Fi },
          }));
          setMessages((prev) => [
            ...prev,
            {
              text: "Please enter the max allowable transmitted acceleration At (G):",
              isUser: false,
              expectingInput: true,
              inputType: "vibrationAt",
            },
          ]);
        }
      } else if (lastBotMessage?.inputType === "vibrationAt") {
        const At = parseFloat(message);
        if (isNaN(At) || At <= 0) {
          setMessages((prev) => [
            ...prev,
            {
              text: "Please enter a valid positive number for At.",
              isUser: false,
              expectingInput: true,
              inputType: "vibrationAt",
            },
          ]);
        } else {
          setFormData((prev) => ({
            ...prev,
            vibrationData: { ...prev.vibrationData, At },
          }));
          setMessages((prev) => [
            ...prev,
            {
              text: "Do you know the impact velocity V or the height of drop H?",
              isUser: false,
              optionList: ["Velocity V", "Height H"],
              optionType: "knowVH",
            },
          ]);
        }
      } else if (lastBotMessage?.inputType === "vibrationV") {
        const V = parseFloat(message);
        if (isNaN(V) || V <= 0) {
          setMessages((prev) => [
            ...prev,
            {
              text: "Please enter a valid positive number for V.",
              isUser: false,
              expectingInput: true,
              inputType: "vibrationV",
            },
          ]);
        } else {
          const updatedVibrationData = { ...formData.vibrationData, V };
          setFormData((prev) => ({
            ...prev,
            vibrationData: updatedVibrationData,
          }));
          performVibrationCalculations(updatedVibrationData);
        }
      } else if (lastBotMessage?.inputType === "vibrationH") {
        const H = parseFloat(message);
        if (isNaN(H) || H <= 0) {
          setMessages((prev) => [
            ...prev,
            {
              text: "Please enter a valid positive number for H.",
              isUser: false,
              expectingInput: true,
              inputType: "vibrationH",
            },
          ]);
        } else {
          const V = velocityFromHeight(H);
          const updatedVibrationData = { ...formData.vibrationData, V, H };
          setFormData((prev) => ({
            ...prev,
            vibrationData: updatedVibrationData,
          }));
          performVibrationCalculations(updatedVibrationData);
        }
      } else if (lastBotMessage?.expectingInput) {
        const inputType = lastBotMessage.inputType;
        setFormData((prev) => ({ ...prev, [inputType]: message }));

        if (inputType === "series") {
          setMessages((prev) => [
            ...prev,
            {
              text: "Please provide the model.",
              isUser: false,
              expectingInput: true,
              inputType: "Model",
            },
          ]);
        } else if (inputType === "Model") {
          setMessages((prev) => [
            ...prev,
            {
              text: "Enter your email.",
              isUser: false,
              expectingInput: true,
              inputType: "quantity",
            },
          ]);
        } else if (inputType === "quantity") {
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message)) {
            // Basic email validation
            setFormData((prev) => ({ ...prev, email: message }));
            setMessages((prev) => [
              ...prev,
              {
                text: "Thank you! Our team will contact you soon.",
                isUser: false,
              },
            ]);
            // TODO: - create a seperate enquire mail
            SendEmailToOwner(formData, setMessages);
            setTimeout(() => {
              setMessages([
                {
                  text: "Welcome to Adoni Tech's Bot! Are you looking for a solution for impact or vibration issues?",
                  isUser: false,
                  optionList: ["Impact", "Vibration Isolation"],
                  optionType: "category",
                },
              ]);
              setFormData({});
            }, 2000);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                text: "Place enter a valid email",
                isUser: false,
                expectingInput: true,
                inputType: "Model",
              },
            ]);
          }
        } else if (inputType === "modelQuestion") {
          const currentIndex = formData.currentQuestionIndex;
          const questions = formData.questions;
          const currentField = questions[currentIndex].field;

          setFormData((prev) => ({
            ...prev,
            [currentField]: parseFloat(message) || message,
            currentQuestionIndex: prev.currentQuestionIndex + 1,
          }));

          if (currentIndex + 1 < questions.length) {
            const nextQuestion = questions[currentIndex + 1];
            setMessages((prev) => [
              ...prev,
              {
                text: nextQuestion.question,
                isUser: false,
                expectingInput: true,
                inputType: "modelQuestion",
                currentField: nextQuestion.field,
              },
            ]);
          } else {
            let calculationResult;
            try {
              switch (formData.modelType) {
                case "Wagon against 2 shock absorbers":
                  calculationResult = Cranel1_Calculation(formData);
                  break;
                case "Wagon against Wagon":
                  calculationResult = Cranel2_Calculation(formData);
                  break;
                case "Wagon against Wagon 2 shock absorber":
                  calculationResult = Cranel3_Calculation(formData);
                  break;
                case "Wagon against 1 shock absorbers":
                  calculationResult = Cranel4_Calculation(formData);
                  break;
                case "Mass with propelling force":
                  calculationResult = ShockAbsorber1_Calculation(formData);
                  break;
                case "Mass without propelling force":
                  calculationResult = ShockAbsorber2_Calculation(formData);
                  break;
                case "Mass with Motor Drive":
                  calculationResult = ShockAbsorber3_Calculation(formData);
                  break;
                case "Mass on driven rollers":
                  calculationResult = ShockAbsorber4_Calculation(formData);
                  break;
                case "Swinging mass with propelling torque":
                  calculationResult = ShockAbsorber5_Calculation(formData);
                  break;
                case "Free Falling Mass":
                  calculationResult = ShockAbsorber6_Calculation(formData);
                  break;
                case "Rotary index table with propelling torque":
                  calculationResult = ShockAbsorber7_Calculation(formData);
                  break;
                case "Swinging arm with propelling torque":
                  calculationResult = ShockAbsorber8_Calculation(formData);
                  break;
                case "Swinging arm with propelling force":
                  calculationResult = ShockAbsorber9_Calculation(formData);
                  break;
                default:
                  throw new Error("Invalid model type");
              }
              setCurrentCalculation(
                normalizeCalculationOutput(formData, calculationResult)
              );
              setMessages((prev) => [
                ...prev,
                {
                  isUser: false,
                  showSummary: true,
                },
                {
                  text: "Please enter your email address to receive further details:",
                  isUser: false,
                  expectingInput: true,
                  inputType: "CalculationNumber",
                },
              ]);
            } catch (error) {
              setMessages((prev) => [
                ...prev,
                {
                  text:
                    error.message ||
                    "Calculation error. Please contact support.",
                  isUser: false,
                },
              ]);
            }
          }
        } else if (inputType === "email") {
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message)) {
            // Basic email validation
            setFormData((prev) => ({ ...prev, email: message }));
            setMessages((prev) => [
              ...prev,
              {
                text: "Thank you! Our team will contact you soon.",
                isUser: false,
              },
            ]);
            SendEmail(formData, setMessages);
            setTimeout(() => {
              setMessages([
                {
                  text: "Welcome to Adoni Tech's Bot! Are you looking for a solution for impact or vibration issues?",
                  isUser: false,
                  optionList: ["Impact", "Vibration Isolation"],
                  optionType: "category",
                },
              ]);
              setFormData({});
            }, 2000);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                text: "Invalid email. Please enter a valid email address.",
                isUser: false,
                expectingInput: true,
                inputType: "email",
              },
            ]);
          }
        }
      } else {
        return setMessages((prev) => [
          ...prev,
          {
            text: "I’m sorry, I didn’t understand that. Please select one of the options below to continue:",
            isUser: false,
            optionList: ["Impact", "Vibration Isolation"],
            optionType: "category",
          },
        ]);
      }
    }, 1000);
  };

  const handleModelSelection = (model) => {
    // setMessages((prev) => [
    //   ...prev,
    //   { text: `${model.series || ""} ${model.Model || "" }`, isUser: true },
    //   {
    //     text: model.pdfUrl
    //       ? "Download PDF or provide email?"
    //       : "Provide email for details:",
    //     isUser: false,
    //     expectingInput: true,
    //     inputType: model.pdfUrl ? "confirmation" : "email",
    //   },
    // ]);

    setMessages((prev) => [
      ...prev,
      {
        text: "Please provide the following to proceed:",
        isUser: false,
      },
      {
        text: "Project Name",
        expectingInput: true,
        inputType: "ProjectName",
      },
    ]);
  };
  const handleRequestCallback = () => {
    setMessages((prev) => [
      ...prev,
      {
        text: "Please enter your mobile number to request a callback:",
        isUser: false,
        expectingInput: true,
        inputType: "callbackMobile",
      },
    ]);
  };

  const handleVisitRequest = () => {
    setMessages((prev) => [
      ...prev,
      {
        text: "Sure! To schedule your visit, what’s your email address?",
        isUser: false,
        expectingInput: true,
        inputType: "visitEmail",
      },
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showTip && (
        <div
          className="
        absolute -top-12 right-0 
        bg-gray-800 text-white
        px-3 py-2 rounded-lg
        text-sm shadow-lg
        animate-fade-out
        pointer-events-none
        w-max
"
        >
          Hello 👋, how may i help you!
          <span
            className="
          absolute bottom-[-6px] right-4 
          transform -translate-x-1/2
          w-0 h-0
          border-l-[6px] border-r-[6px] border-t-[6px]
          border-l-transparent border-r-transparent
          border-t-gray-800
        "
          />
        </div>
      )}
      {isOpen ? (
        <div className="md:w-[80vh] h-[90vh] bg-white shadow-lg rounded-t-lg flex flex-col">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-2 rounded-full">
                <SmartToyIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-semibold text-lg tracking-tight">
                Adoni Tech Assistant
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleRequestCallback}
                className="bg-white/90 hover:bg-white text-blue-700 px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-all hover:shadow-sm active:scale-95"
                aria-label="Request callback"
              >
                <CallIcon className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline">Callback</span>
              </button>

              <button
                onClick={handleVisitRequest}
                className="bg-white/90 hover:bg-white text-blue-700 px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-all hover:shadow-sm active:scale-95"
                aria-label="Schedule visit"
              >
                <CalendarMonthIcon className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline">Visit</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  setMessages([]);
                  setFormData({});
                }}
                className="ml-2 p-1.5 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                aria-label="Close chat"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading && (
              <div className="text-gray-500">Loading products...</div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] p-3 rounded-lg ${
                    msg.isUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.showSummary && renderSummary(currentCalculation)}
                  {typeof msg.text === "string" && msg.text}
                  {msg.options && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                      {msg.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            handleOptionClick(option.text, msg.optionType)
                          }
                          className={`
                            group relative overflow-hidden
                            bg-white border border-gray-200
                            rounded-lg p-3 shadow-sm
                            hover:shadow-md hover:border-blue-300
                            transition-all duration-200
                            flex flex-col items-center
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                          `}
                        >
                          {/* Optional shimmer effect on hover */}
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>

                          {option.image && (
                            <div className="w-20 h-20 mb-2 flex items-center justify-center p-1">
                              <img
                                src={option.image}
                                alt={option.text}
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          )}

                          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                            {option.text}
                          </span>

                          {/* Subtle indicator for clickable items */}
                          <span className="absolute bottom-1 right-1 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  {msg.optionList && !msg.image && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.optionList.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            handleOptionClick(option, msg.optionType)
                          }
                          className={`${
                            msg.optionType === "modelType" && "w-full"
                          } bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-sm`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                  {msg.models && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {msg.models.map((model, idx) => (
                          <button
                            key={idx}
                            onClick={() =>
                              handleModelSelection(
                                model ? model : model?.series
                              )
                            }
                            className="bg-white hover:bg-blue-50 text-blue-600 px-3 py-2 rounded border border-blue-200 text-sm flex flex-col items-start"
                          >
                            <span className="font-medium">
                              {model?.series} {model?.Model}
                            </span>
                            <small>
                              • Dₐₜₙ: {model.Dactual ? model.Dactual : "N/A"}
                              {model?.percentLoading}%
                            </small>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Showing Typing Animation */}
            {isTyping && <Typing />}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t p-2 flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 border rounded-l p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Type your message"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 text-sm"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowTip(false);
          }}
          className="w-16 h-16 shadow-md rounded-full overflow-hidden hover:shadow-lg transition-shadow"
          aria-label="Open chat"
        >
          <img
            src={Bot_Logo}
            alt="Adoni Tech Chat Bot"
            className="w-full h-full object-cover"
          />
        </button>
      )}
    </div>
  );
};

export default Bot;
