import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const PasswordResetConfirm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { email } = useParams();
  const [loading, setLoading] = useState(false);
  const handleTogglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        "https://backend.cranebuffer.com/api/auth/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      console.log(data);
      setLoading(false);
      if (response.ok) {
        message.success("Password reset successful");
        navigate("/login");
      } else {
        message.error("Some error has occurred"); // Display error message
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      message.error("An error occurred. Please try again."); // Display generic error message
    }
  };

  return (
    <>
      {loading && (
        <div className="mb-4 relative">
          <div className="line-loader"></div>
        </div>
      )}
      <div className="flex justify-center items-center md:h-[85vh] h-[93vh] p-4">
        <div
          className="max-w-sm w-[400px] mx-auto bg-white shadow-md rounded mt-4 p-8 relative"
          style={{ boxShadow: " 0px 0px 35px 0 rgba(0, 0, 255, 0.15)" }}
        >
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                New Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-3 px-3 text-xs text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                required
              />
              <button
                type="button"
                onClick={() => handleTogglePassword("password")}
                className="absolute right-0 top-7 mt-2 mr-3"
              >
                {showPassword ? (
                  <EyeInvisibleOutlined
                    style={{ fontSize: "1em", color: "gray" }}
                  />
                ) : (
                  <EyeOutlined style={{ fontSize: "1em", color: "gray" }} />
                )}
              </button>
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-3 px-3 text-xs text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                required
              />
              <button
                type="button"
                onClick={() => handleTogglePassword("confirmPassword")}
                className="absolute right-0 top-7 mt-2 mr-3"
              >
                {showConfirmPassword ? (
                  <EyeInvisibleOutlined
                    style={{ fontSize: "1em", color: "gray" }}
                  />
                ) : (
                  <EyeOutlined style={{ fontSize: "1em", color: "gray" }} />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>

      <style>{`

    @media screen {
     .line-loader {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        background-color: #007bff; /* Change color as needed */
        animation: loading 2s linear infinite;
      }
      
      @keyframes loading {
        0% {
          width: 0;
        }
        100% {
          width: 100%;
        }
      }
     }
    `}</style>
    </>
  );
};

export default PasswordResetConfirm;
