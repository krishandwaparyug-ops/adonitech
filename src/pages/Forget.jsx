import { useState } from "react";
import { Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Forget = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://backend.cranebuffer.com/api/auth/forget`,
        // {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const resData = await response.json();
      if (response.ok) {
        console.log(resData);
      } else {
        console.log(resData);
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <>
      <div className="appBackground">
        <div className="loginForm">
          <div className="logo">
            <img src="/images/logo.png" alt="Logo" />
          </div>
          <Typography.Title level={4}>Forget Password</Typography.Title>
          <div className="inputWrapper">
            <UserOutlined className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              id="email"
              required
              autoComplete="off"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="login-btn mb-4"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Forget;
