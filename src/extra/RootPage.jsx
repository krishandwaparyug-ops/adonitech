import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addData } from "../features/dataSlice";
import { useEffect } from "react";
// import { Dropdown, Menu } from "antd";
// import { LogoutOutlined } from "@ant-design/icons";

export const RootPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // const token = localStorage.getItem("Token");
    // if (!token) {
    //   navigate("/login");
    // }

    // Token found, initialize data and continue to render
    dispatch(
      addData({
        mass: "",
        velocity: "",
        cycle: "",
        force: "",
        stroke: "",
        mass2: "",
        velocity2: "",
        power: "",
        stallFactor: "2.5",
        tempMin: "-10",
        tempMax: "60",
      })
    );
  }, [dispatch]);

  const handlefirstcrane = () => {
    navigate("/Wagon against 2 shock absorbers");
  };
  const handlesecondcrane = () => {
    navigate("/Wagon against Wagon");
  };
  const handlethirdcrane = () => {
    navigate("/Wagon against Wagon 2 shock absorber");
  };
  const handlefourthcrane = () => {
    navigate("/Wagon against 1 shock absorbers");
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("Token");
  //   navigate("/login"); // Redirect to login
  // };

  // const menu = (
  //   <Menu className="!mr-2 w-[100px]">
  //     <Menu.Item key="logout" onClick={handleLogout}>
  //       Logout
  //     </Menu.Item>
  //   </Menu>
  // );

  return (
    <>
      <div>
        <div className="heading">
          <div className="logo flex items-center justify-between">
            <img src="images/logo.png" className="md:w-60 w-32 ml-4 mt-2" />
            {/* <Dropdown overlay={menu} trigger={["hover"]} className="">
              <div className="logout pr-8 text-xl flex justify-center items-center cursor-pointer">
                <LogoutOutlined />
              </div>
            </Dropdown> */}
          </div>
          <div className="head font-semibold text-xl px-4 flex items-center justify-center ">
            Selection of Shock Absorbers
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center p-4 h-[100%] md:h-[50vh] gap-4 md:gap-14 md:mb-28">
          <div
            className="flex  items-center flex-col gap-3 cursor-pointer"
            onClick={handlefourthcrane}
          >
            <img
              className="md:w-full w-[50%] h-[50%]"
              src="/images/crane4.png"
              alt="Wagon against 1 shock absorbers"
            />

            <h2 className="text-xs font-medium md:flex">
              <p className="flex justify-center items-center">
                Crane/Wagon/Girder
              </p>
              <p className="flex justify-center items-center ml-[3px]">
                against Shock Absorbers
              </p>
            </h2>
          </div>
          <div
            className="flex  items-center flex-col gap-3 cursor-pointer"
            onClick={handlefirstcrane}
          >
            <img
              className="md:w-full w-[50%] h-[50%] "
              src="/images/crane1.png"
              alt="Wagon against 2 shock absorbers"
            />

            <h2 className="text-xs font-medium md:flex">
              <p className="flex justify-center items-center">
                Crane/Wagon/Girder
              </p>
              <p className="flex justify-center items-center ml-[3px]">
                against 2 Shock Absorber
              </p>
            </h2>
          </div>
          <div
            className="flex  items-center flex-col gap-3 md:mt-2 cursor-pointer"
            onClick={handlesecondcrane}
          >
            <img
              className="md:w-full w-[50%] h-[50%] "
              src="/images/crane2.png"
              alt="Wagon against wagon"
            />

            <h2 className="text-xs font-medium md:flex">
              <p className="flex justify-center items-center ml-[3px]">
                Crane/Wagon/Girder
              </p>
              <p className="flex justify-center items-center ml-[2px]">
                against wagon
              </p>
            </h2>
          </div>
          <div
            className="flex  items-center flex-col gap-3 md:mt-4 cursor-pointer"
            onClick={handlethirdcrane}
          >
            <img
              className="md:w-full w-[50%] h-[50%] "
              src="/images/crane3.png"
              alt="Wagon against wagon 2 shock absorbers"
            />

            <h2 className="text-xs font-medium md:flex">
              <p className="flex justify-center items-center ml-[3px]">
                Crane/Wagon/Girder
              </p>
              <p className="flex justify-center items-center">
                against wagon 2 Shock Absorber
              </p>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};
