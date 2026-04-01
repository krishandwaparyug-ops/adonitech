// import { Fragment, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// // import { Technical } from "./Technical";
// // import { useNavigate } from "react-router-dom";

// const Quotation = () => {
//   // const modelprice = useSelector((state) => state.data.price);
//   const { userId } = useParams();
//   const [userData, setUserData] = useState("");
//   // const [showTechnical, setShowTechnical] = useState(false);
//   const [checked1, setChecked1] = useState(false);
//   const [checked2, setChecked2] = useState(false);
//   const [phone, setPhone] = useState("");
//   const [visit, setVisit] = useState({
//     email: "",
//     username: "",
//     phone: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [tempNote, setTempNote] = useState("");
//   // const navigate = useNavigate();
//   // useEffect(() => {
//   //   const token = localStorage.getItem("Token");
//   //   if (!token) {
//   //     navigate("/login");
//   //   }
//   // }, [navigate]);

//   const [selectedFiles, setSelectedFiles] = useState([]);

//   console.log("selectedFiles", selectedFiles);
//   const handleFileChange = (event) => {
//     setSelectedFiles(event.target.value);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://calculation.cranebuffer.com/api/data/quotation/${userId}`,
//           // `http://localhost:5000/api/data/quotation/${userId}`,
//           { method: "GET" }
//         ); // Fetch user data using the user ID
//         if (!response.ok) {
//           throw new Error("Failed to fetch user data");
//         }
//         const data = await response.json();
//         // console.log(data.user);
//         setUserData(data.user); // Set the fetched user data in state
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   const temparature = userData.temperature;

//   useEffect(() => {
//     const temp = () => {
//       if (temparature > 60) {
//         return "Since your operating Temperature is Beyond -10--+60 Deg celsius. We will revert with a Special Sealing solution and a Special Price. The above Price is budgetary for the Standard Operating Range of -10 to +60 Degrees Celsius.";
//       } else {
//         return "";
//       }
//     };

//     setTempNote(temp());
//   }, []);

//   if (!userData) {
//     return <div>Loading...</div>;
//   }
//   //Todays date
//   const today = new Date();

//   // Extract the day, month, and year from the Date object
//   const day = today.getDate();
//   const month = today.toLocaleString("default", { month: "short" });
//   const year = today.getFullYear();

//   // Create a string representing the formatted date
//   const formattedDate = `${month} ${day}, ${year}`;

//   const {
//     model,
//     shockAbsorber,
//     series,
//     spare,
//     currency,
//     originalPrice,
//     AdditionalAccessories,
//     address,
//   } = userData;
//   const originalPrices = originalPrice;
//   const rows = [
//     {
//       model: model,
//       Quantity: shockAbsorber,
//       Price: originalPrices,
//       Series: series,
//       // Amount: shockAbsorber * originalPrice,
//       Spare: spare,
//       // OriginalPrice: originalPrice,

//       AdditionalAccessories: AdditionalAccessories,
//     },
//   ];

//   const spares = rows[0].Spare[0]?.name;
//   // const [Amount] = rows.map((row) => row.Amount);

//   // const spareAmount = rows.map((row) =>
//   //   row.Spare.map((spare) => spare.price * spare.quantity)
//   // );

//   const totalSpareAmount = rows.reduce(
//     (total, row) =>
//       total +
//       row.Spare.reduce((subtotal, spareItem) => {
//         const itemTotal = spareItem.price;
//         return subtotal + itemTotal;
//       }, 0),
//     0
//   );

//   const totalPrice = rows.reduce((total, row) => {
//     const itemTotal = row.Price * row.Quantity;
//     return total + itemTotal;
//   }, 0);

//   const Amount = totalSpareAmount + totalPrice;
//   const freight = Math.round(Amount * 0.02);
//   const amountFreight = Amount + freight;
//   const gst = Math.round(amountFreight * 0.18);
//   const total = Amount + gst + freight;

//   const packaging = Math.round(Amount * 0.02);
//   const totalPack = Amount + packaging;

//   const handleCheckboxChange = (e) => {
//     setChecked1(e.target.checked);
//     if (e.target.checked) {
//       const storedPhone = localStorage.getItem("phone");
//       if (storedPhone) {
//         setPhone(storedPhone);
//       }
//     } else {
//       setPhone("");
//     }
//   };

//   const callback = {
//     phone,
//   };

//   const callBack = async () => {
//     const response = await fetch(
//       "https://calculation.cranebuffer.com/api/data/quotation/callback",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(callback),
//       }
//     );

//     const data = await response.json();
//   };

//   const handleVist = (e) => {
//     setChecked2(e.target.checked);
//     if (e.target.checked) {
//       const email = userData.email;
//       const username = userData.username;
//       const phone = userData.phone;
//       setVisit({ email, username, phone });
//     } else {
//       setVisit({ email: "", username: "", phone: "" });
//     }
//   };

//   const arrangeVisit = async () => {
//     const response = await fetch(
//       "https://calculation.cranebuffer.com/api/data/quotation/arrangemeeting",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(visit),
//       }
//     );

//     const data = await response.json();
//   };

//   const formdata = {
//     model,
//     shockAbsorber,
//     Amount,
//     freight,
//     gst,
//     total,
//     packaging,
//     totalPack,
//     spare,
//     AdditionalAccessories,
//     originalPrice,
//     userData,
//     formattedDate,
//     currency,
//     address,
//     selectedFiles,
//   };

//   const printPage = async () => {
//     setLoading(true);
//     const response = await fetch(
//       "https://calculation.cranebuffer.com/api/data/quotation/pdf",
//       // "http://localhost:5000/api/data/quotation/pdf",

//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formdata),
//       }
//     );
//     const data = await response.json();
//     // setShowTechnical(true);
//     setLoading(false);
//     window.print();

//     if (checked1) {
//       callBack();
//     }
//     if (checked2) {
//       arrangeVisit();
//     }
//   };

//   return (
//     <>
//       {loading && (
//         <div className="spinner-overlay">
//           <div className="spinner">
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//           </div>
//         </div>
//       )}
//       <div className="w-full flex flex-col justify-center items-center">
//         <div className="p-4 quotation md:w-[70%] w-full flex justify-center flex-col ">
//           <div className="">
//             <div className="h-[10vh] w-[100%] flex justify-between ">
//               <div>
//                 <img className="w-[100%]" src="/images/logo.png" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-medium">Quotation</h2>
//               </div>
//             </div>
//             <div className="quotation-by-section w-[100%] flex flex-col justify-between md:flex-row">
//               <div className="">
//                 <h2 className="font-medium text-xl">Quotation to</h2>
//                 <p className="my-2">Company: {userData.company}</p>
//                 <p className="my-2">Name: {userData.username}</p>
//                 <p className="my-2">Email: {userData.email}</p>
//                 <p className="mb-8">Contact:{userData.phone}</p>
//               </div>
//               <div className=" flex flex-col gap-2">
//                 <div className="flex gap-2 md:justify-between">
//                   <h2 className="font-medium">Date:</h2>
//                   <p>{formattedDate}</p>
//                 </div>
//                 {/* <div className="flex gap-2 md:justify-between">
//                 <h2 className="font-medium">Model:</h2>
//                 <p>{model}</p>
//               </div>

//               <div className="flex gap-2 md:justify-between">
//                 <h2 className="font-medium">price:</h2>
//                 <p>
//                   {currency === "INR"
//                     ? `₹ ${originalPrice}`
//                     : `$ ${(originalPrice / 80).toFixed(2)}`}
//                 </p>
//               </div>
//               <div className="flex gap-2 md:justify-between">
//                 <h2 className="font-medium">shockAbsorber:</h2>
//                 <p>{shockAbsorber}</p>
//               </div> */}
//               </div>
//             </div>
//           </div>
//           {/* <table border="" className="border-2">
//           <tr>
//             <th>Model Name</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Amount</th>
//           </tr>
//           <tr>
//             <td>{userData.model}</td>
//             <td>{userData.shockAbsorber}</td>
//             <td>{userData.price}</td>
//             <td>{userData.shockAbsorber * userData.price}</td>
//           </tr>
//         </table> */}
//           <TableContainer className="mt-[6%] " component={Paper}>
//             <Table sx={{ minWidth: 400 }} aria-label="simple table">
//               <TableHead>
//                 <TableRow
//                   sx={{
//                     "&:last-child td, &:last-child th": {
//                       border: "1px solid rgba(0, 0, 0, 0.2)",
//                     },
//                   }}
//                 >
//                   <TableCell align="left">Sl</TableCell>
//                   <TableCell align="left">Item</TableCell>
//                   <TableCell align="center">Quantity</TableCell>
//                   <TableCell align="right">Price</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody
//                 sx={{
//                   "&:last-child td, &:last-child th": {
//                     border: "1px solid rgba(0, 0, 0, 0.2)",
//                   },
//                 }}
//               >
//                 {rows.map((row, index) => {
//                   // Calculate the total price for the current row
//                   const totalPriceForRow = row.Price * row.Quantity;

//                   // Check if the first row is 'ED', 'EI', or 'SB'
//                   const isFirstRowSpecial = ["ED", "EI", "SB"].includes(
//                     row.Series
//                   );

//                   let serialNumber = index + 1; // Initialize serial number for the current row

//                   return (
//                     <Fragment key={row.model}>
//                       <TableRow>
//                         <TableCell align="left">{serialNumber}</TableCell>
//                         <TableCell align="left">{row.model}</TableCell>
//                         <TableCell align="center">{row.Quantity}</TableCell>
//                         <TableCell align="right">
//                           {currency === "INR"
//                             ? `₹ ${totalPriceForRow}`
//                             : `$ ${(totalPriceForRow / 80).toFixed(2)}`}
//                         </TableCell>
//                       </TableRow>
//                       {isFirstRowSpecial && row.Spare.length > 0 && (
//                         <>
//                           {row.Spare.map((spareItem) => {
//                             const totalSparePrice = spareItem.price;
//                             serialNumber++;

//                             return (
//                               <TableRow key={serialNumber}>
//                                 <TableCell align="left">
//                                   {serialNumber}
//                                 </TableCell>
//                                 <TableCell align="left">
//                                   {spareItem.name}
//                                 </TableCell>
//                                 <TableCell align="right">
//                                   {spareItem.quantity}
//                                 </TableCell>
//                                 <TableCell align="right">
//                                   {currency === "INR"
//                                     ? `₹ ${totalSparePrice}`
//                                     : `$ ${totalSparePrice / 80}`}
//                                 </TableCell>
//                               </TableRow>
//                             );
//                           })}
//                         </>
//                       )}
//                       {isFirstRowSpecial &&
//                         row.AdditionalAccessories.length > 0 && (
//                           <>
//                             {row.AdditionalAccessories.map((accessory) => {
//                               serialNumber++;

//                               return (
//                                 <TableRow key={serialNumber}>
//                                   <TableCell align="left">
//                                     {serialNumber}
//                                   </TableCell>
//                                   <TableCell align="left">
//                                     {accessory.name}
//                                   </TableCell>
//                                   <TableCell align="right">
//                                     {accessory.quantity}
//                                   </TableCell>
//                                   <TableCell align="right">N/A</TableCell>
//                                 </TableRow>
//                               );
//                             })}
//                           </>
//                         )}
//                     </Fragment>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <TableContainer>
//             <Table className="border-2">
//               <TableBody>
//                 <TableRow>
//                   <TableCell colSpan={2}>Amount</TableCell>
//                   <TableCell align="right">
//                     {currency === "INR"
//                       ? `₹ ${Amount}`
//                       : `$ ${(Amount / 80).toFixed(2)}`}
//                   </TableCell>
//                 </TableRow>
//                 {currency !== "USD" && (
//                   <TableRow>
//                     <TableCell colSpan={2}>Freight 2%</TableCell>
//                     <TableCell align="right">
//                       {currency === "INR"
//                         ? `₹ ${freight}`
//                         : `$ ${freight / 80}`}
//                     </TableCell>
//                   </TableRow>
//                 )}

//                 {currency !== "USD" && (
//                   <TableRow>
//                     <TableCell colSpan={2}>Gst 18%</TableCell>
//                     <TableCell align="right">{`₹ ${gst}`}</TableCell>
//                   </TableRow>
//                 )}

//                 {currency == "USD" && (
//                   <TableRow>
//                     <TableCell colSpan={2}>Packaging 2%</TableCell>
//                     <TableCell align="right">
//                       {currency === "INR"
//                         ? `₹ ${packaging}`
//                         : `$ ${(packaging / 80).toFixed(2)}`}
//                     </TableCell>
//                   </TableRow>
//                 )}

//                 <TableRow className="border-t-4   border-gray-300">
//                   <TableCell colSpan={2} className="!font-medium ">
//                     Total
//                   </TableCell>

//                   {currency === "INR" ? (
//                     <TableCell
//                       align="right"
//                       className="!text-green-600 !font-semibold"
//                     >
//                       {`₹ ${total}`}
//                     </TableCell>
//                   ) : (
//                     <TableCell
//                       align="right"
//                       className="!text-green-600 !font-semibold"
//                     >
//                       {currency === "INR"
//                         ? `₹ ${totalPack}`
//                         : `$ ${(totalPack / 80).toFixed(2)}`}
//                     </TableCell>
//                   )}
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <div className="flex justify-end mt-10 ">
//             <div className="md:w-[30%] adoni">
//               <h2 className="font-medium text-xl">Quotation by</h2>
//               <p className="my-2">AdoniTech</p>
//               <p className="mb-2 address">
//                 SLU - W - 39, Addl; MIDC, Kodoli, Satara - 415004. MH.
//               </p>
//               <span className="mb-8 flex">
//                 <p className="mr-2">GSTN:</p>
//                 <p className="">27AHAPA3555B1Z1</p>
//               </span>
//             </div>
//           </div>

//           <div className="flex justify-between mt-10 ">
//             <div>
//               <label className="flex items-center mt-4 checkbox">
//                 <input
//                   type="checkbox"
//                   className="mr-2 w-[16px] h-[16px]"
//                   checked={checked1}
//                   onChange={handleCheckboxChange}
//                 />
//                 Request for a call back
//               </label>

//               <label className="flex items-center mt-4 checkbox">
//                 <input
//                   type="checkbox"
//                   className="mr-2 w-[16px] h-[16px]"
//                   checked={checked2}
//                   onChange={handleVist}
//                 />
//                 Arrange a Visit
//               </label>
//             </div>
//             {spares === "Rear_Flange" || spares === "Front_Flange" ? (
//               <div className="file-chooser-container w-80">
//                 <h2 className="font-medium text-base mb-4">
//                   Select File Type(s)
//                 </h2>
//                 <FormControl fullWidth>
//                   <InputLabel id="Choose-File-Type-label">
//                     Choose File Type
//                   </InputLabel>
//                   <Select
//                     multiple
//                     labelId="Choose-File-Type-label"
//                     id="Choose-File-Type"
//                     label="Choose File Type"
//                     onChange={handleFileChange}
//                     value={selectedFiles}
//                     renderValue={(selected) => selected.join(", ")}
//                   >
//                     {spares === "Front_Flange"
//                       ? [
//                           <MenuItem
//                             key="front_flange_pdf"
//                             value="front_flange_pdf"
//                           >
//                             Front Flange Pdf
//                           </MenuItem>,
//                           <MenuItem
//                             key="front_flange_iges"
//                             value="front_flange_iges"
//                           >
//                             Front Flange IGES
//                           </MenuItem>,
//                           <MenuItem
//                             key="front_flange_step"
//                             value="front_flange_step"
//                           >
//                             Front Flange STEP
//                           </MenuItem>,
//                           <MenuItem
//                             key="front_flange_dxf"
//                             value="front_flange_dxf"
//                           >
//                             Front Flange DXF
//                           </MenuItem>,
//                         ]
//                       : [
//                           <MenuItem
//                             key="rear_flange_pdf"
//                             value="rear_flange_pdf"
//                           >
//                             Rear Flange Pdf
//                           </MenuItem>,
//                           <MenuItem
//                             key="rear_flange_iges"
//                             value="rear_flange_iges"
//                           >
//                             Rear Flange IGES
//                           </MenuItem>,
//                           <MenuItem
//                             key="rear_flange_step"
//                             value="rear_flange_step"
//                           >
//                             Rear Flange STEP
//                           </MenuItem>,
//                           <MenuItem
//                             key="rear_flange_dxf"
//                             value="rear_flange_dxf"
//                           >
//                             Rear Flange DXF
//                           </MenuItem>,
//                         ]}
//                   </Select>
//                 </FormControl>
//               </div>
//             ) : (
//               <div className="text-base">
//                 <div>&#x1F449; Call the Factory for Drawings</div>
//               </div>
//             )}
//           </div>
//           <div className="btn mt-4">
//             <button
//               onClick={printPage}
//               // onClick={() => {
//               //   window.print();
//               // }}
//               className="submitBtn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-[auto]"
//             >
//               Save Quotation
//             </button>
//           </div>
//           <div className="px-[5%] pb-[5%] md:px-0 mt-16 note">
//             <div>Note:</div>
//             <h2 className=" mb-2 md:text-sm  text-[12px]">
//               &bull; Contact factory for Delivery Schedule and Quantity base
//               discount, insales@adonitech.co.in, adonitech@gmail.com,
//               adonisatara@gmail.com, adonisatara@gmail.com
//             </h2>

//             <h2 className="md:text-sm  text-[12px]">
//               {tempNote && <p>&bull; {tempNote}</p>}
//             </h2>
//             {currency == "INR" && (
//               <h2 className=" mb-2 md:text-sm text-[12px] mt-2">
//                 &bull; Free delivery all over the India.
//               </h2>
//             )}
//             {currency == "USD" && (
//               <h2 className=" mb-2 md:text-sm text-[12px] mt-2">
//                 &bull; Prices are FOB Mumbai
//               </h2>
//             )}
//           </div>
//         </div>

//         <style>{`

//         .technical {
//           display: none;
//         }
//         @media print {
//           .quotation-by-section {
//             display: flex;
//             flex-direction: row;

//           }
//           .adoni{
//           margin-right: -18%;

//           }
//           .address{
//             width:65%;
//           }
//           .submitBtn{
//             display: none;
//           }

//           .note{
//             margin-top:-6%;
//           }

//           .quotation{
//             width:100%;
//           }

//           .technical {
//             display: block;
//             margin-top: 10% !important;
//           }

//           .checkbox{
//             display: none;
//           }

//           .file-chooser-container{
//             display: none;
//           }

//         }

//         @media screen {
//           .spinner-overlay {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100vw;
//             height: 100vh;
//             background-color: rgba(0, 0, 0, 0.5);
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             z-index: 9999;
//           }

//           .spinner {
//             width: 44.8px;
//             height: 44.8px;
//             animation: spinner-y0fdc1 2s infinite ease;
//             transform-style: preserve-3d;
//           }

//           .spinner > div {
//             background-color: rgba(71, 75, 255, 0.2);
//             height: 100%;
//             position: absolute;
//             width: 100%;
//             border: 2.2px solid #474bff;
//           }

//           .spinner div:nth-of-type(1) {
//             transform: translateZ(-22.4px) rotateY(180deg);
//           }

//           .spinner div:nth-of-type(2) {
//             transform: rotateY(-270deg) translateX(50%);
//             transform-origin: top right;
//           }

//           .spinner div:nth-of-type(3) {
//             transform: rotateY(270deg) translateX(-50%);
//             transform-origin: center left;
//           }

//           .spinner div:nth-of-type(4) {
//             transform: rotateX(90deg) translateY(-50%);
//             transform-origin: top center;
//           }

//           .spinner div:nth-of-type(5) {
//             transform: rotateX(-90deg) translateY(50%);
//             transform-origin: bottom center;
//           }

//           .spinner div:nth-of-type(6) {
//             transform: translateZ(22.4px);
//           }

//           @keyframes spinner-y0fdc1 {
//             0% {
//               transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
//             }

//             50% {
//               transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
//             }

//             100% {
//               transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
//             }
//           }
//         }
//       `}</style>
//         {/* {showTechnical && <Technical />} */}
//       </div>
//     </>
//   );
// };

// export default Quotation;

import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Papa from "papaparse";
import { useSelector } from "react-redux";

const RFQ = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [phone, setPhone] = useState("");
  const [visit, setVisit] = useState({ email: "", username: "", phone: "" });
  const [models, setModels] = useState([]);

  const contentType = useSelector((state) => state?.data?.contentType);

  // State to manage multiple rows/models
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://backend.cranebuffer.com/api/data/quotation/${userId}`,
          { method: "GET" }
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUserData(data.user);
        setRows([
          {
            model: data.user.model,
            Quantity: data.user.shockAbsorber,
            Series: data.user.series,
            Spare: data.user.spare,
            AdditionalAccessories: data.user.AdditionalAccessories,
          },
        ]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [userId]);

  const getData = async () => {
    try {
      const response = await fetch(
        // "https://calculation.cranebuffer.com/api/data/data",
        "https://backend.cranebuffer.com/api/data/data",
        // "http://localhost:5000/api/data/data",
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setModels(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!userData) return <div>Loading...</div>;

  const today = new Date();
  const formattedDate = today.toLocaleString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Handle quantity changes
  const handleQuantityChange = (index, newValue) => {
    const updatedRows = [...rows];
    updatedRows[index].Quantity = parseInt(newValue) || 1;
    setRows(updatedRows);
  };

  // Add a new model
  const addModel = () => {
    const modelData = models.find((m) => m.Model === selectedModel);
    if (modelData) {
      setRows([
        ...rows,
        {
          model: selectedModel,
          Quantity: newQuantity,
        },
      ]);
      setOpenDialog(false);
      setSelectedModel("");
      setNewQuantity(1);
    }
  };

  const handleCheckboxChange = (e) => {
    setChecked1(e.target.checked);
    if (e.target.checked) {
      const storedPhone = localStorage.getItem("phone");
      if (storedPhone) setPhone(storedPhone);
    } else {
      setPhone("");
    }
  };

  const handleVisit = (e) => {
    setChecked2(e.target.checked);
    if (e.target.checked) {
      const { email, username, phone } = userData;
      setVisit({ email, username, phone });
    } else {
      setVisit({ email: "", username: "", phone: "" });
    }
  };

  const callBack = async () => {
    await fetch(
      "https://cranebackend-1.onrender.com/api/data/quotation/callback",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      }
    );
  };

  const arrangeVisit = async () => {
    await fetch(
      "https://cranebackend-1.onrender.com/api/data/quotation/arrangemeeting",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visit),
      }
    );
  };

  const printPage = async () => {
    setLoading(true);
    const formdata = {
      rows,
      notes,
      userData,
      formattedDate,
    };
    const res = await fetch(
      "https://cranebackend-1.onrender.com/api/data/rfq/sendmail",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      }
    );

    setLoading(false);
    if (!res.ok) {
      // optionally show error to user
      console.error("Failed to send email");
      return;
    }

    // window.print();
    if (checked1) callBack();
    if (checked2) arrangeVisit();
    navigate("/");
  };

  return (
    <>
      {loading && (
        <div className="spinner-overlay flex flex-col">
          <div className="spinner">
            {[...Array(6)].map((_, i) => (
              <div key={i}></div>
            ))}
          </div>
          <span className="pt-6 font-medium">Sending a File via Email</span>
        </div>
      )}
      <div className="w-full flex flex-col justify-center items-center">
        <div className="p-6 quotation md:w-[70%] w-full flex flex-col bg-white shadow-lg rounded-lg">
          <div className="header flex justify-between items-center mb-6">
            <img src="/images/logo.png" alt="AdoniTech Logo" className="w-32" />
            {/* <h2 className="text-3xl font-semibold text-gray-800">
              Request for Quotation
            </h2> */}
          </div>
          <div className="quotation-by-section flex flex-col md:flex-row justify-between mb-8">
            <div>
              <h3 className="text-xl font-medium text-gray-700">
                REQUEST FOR QUOTE
              </h3>
              <p className="mt-2">Company: {userData.company}</p>
              <p>Name: {userData.username}</p>
              <p>Email: {userData.email}</p>
              <p>Contact: {userData.phone}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <p>
                <span className="font-medium">Date:</span> {formattedDate}
              </p>
            </div>
          </div>

          <TableContainer component={Paper} className="mb-6">
            <Table sx={{ minWidth: 400 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Sl</TableCell>
                  <TableCell align="left">Item</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  let serialNumber = index + 1;
                  return (
                    <Fragment key={index}>
                      <TableRow>
                        <TableCell>{serialNumber}</TableCell>
                        <TableCell>{row.model}</TableCell>
                        <TableCell align="center">
                          <TextField
                            type="number"
                            value={row.Quantity}
                            onChange={(e) =>
                              handleQuantityChange(index, e.target.value)
                            }
                            inputProps={{ min: 1 }}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="flex justify-between mt-8">
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setOpenDialog(true);
                    getData();
                }}
              >
                Add Model
              </Button>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-medium text-gray-700">
                Quotation By
              </h3>
              <p className="mt-2">AdoniTech</p>
              <p>
                SLU - W - 39, Addl. MIDC, Kodoli, Satara - 415004, MH, India
              </p>
            </div>
          </div>

          <div className="mt-6">
            <TextField
              multiline
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              label="Remarks/Notes"
              placeholder="Add any additional remarks or notes here"
              fullWidth
              variant="outlined"
            />
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={checked1}
                  onChange={handleCheckboxChange}
                />
                Request a Call Back
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={checked2}
                  onChange={handleVisit}
                />
                Arrange a Visit
              </label>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              variant="contained"
              color="primary"
              onClick={printPage}
              className="py-2 px-6"
            >
              Send RFQ
            </Button>
          </div>

          <div className="mt-8 note text-sm text-gray-600">
            <h4 className="font-medium">Notes:</h4>
            <p>
              • Contact factory for delivery schedule and quantity-based
              discounts: insales@adonitech.co.in, adonitech@gmail.com,
              adonisatara@gmail.com
            </p>
            <p>
              • The above price includes all applicable taxes and delivery
              charges.
            </p>
          </div>
        </div>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Add New Model</DialogTitle>
          <DialogContent
            dividers
            sx={{
              maxHeight: "50vh",
              overflowY: "auto",
              pt: 1,
            }}
          >
            <FormControl fullWidth margin="dense">
              <InputLabel>Model</InputLabel>
              <Select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                label="Model"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4 + 8, // show ~4 items before scrolling
                      width: 240,
                    },
                  },
                }}
              >
                {models.map((m, idx) => (
                  <MenuItem key={idx} value={m.Model}>
                    {m.Model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Quantity"
              type="number"
              fullWidth
              value={newQuantity}
              onChange={(e) => setNewQuantity(parseInt(e.target.value) || 1)}
              inputProps={{ min: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={addModel} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <style>{`
        .quotation {
          font-family: "Arial", sans-serif;
        }
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
        @media print {
          .quotation {
            width: 100%;
            box-shadow: none;
          }
          .submitBtn,
          .checkbox,
          .file-chooser-container {
            display: none;
          }
          .note {
            margin-top: 0;
          }
        }
      `}</style>
    </>
  );
};

export default RFQ;
