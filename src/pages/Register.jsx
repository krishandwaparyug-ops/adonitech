import { useState } from "react";
import { Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import "../scss/register.scss";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleInput = (e) => {
    // console.log(e);

    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://backend.cranebuffer.com/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const resData = await response.json();

      if (response.ok) {
        message.success("Registration Successful");

        navigate("/login");
      } else {
        message.error(
          resData.extraDetails ? resData.extraDetails : resData.message
        );
      }
    } catch (error) {
      console.error("Error registering in:", error.message);
    }
  };

  const handleTogglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    }
  };

  return (
    <div className="appBackground">
      <div className="loginForm">
        <div className="logo">
          <img src="/images/logo.png" alt="Logo" />
        </div>
        <Typography.Title level={3}>Register</Typography.Title>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="inputWrapper">
              <UserOutlined className="icon" />
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                id="username"
                required
                autoComplete="off"
                value={user.username}
                onChange={handleInput}
              />
            </div>
          </div>

          <div>
            <div className="inputWrapper">
              <MailOutlined className="icon" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                id="email"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
              />
            </div>
          </div>

          <div>
            <div className="inputWrapper relative">
              <LockOutlined className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                id="password"
                required
                autoComplete="off"
                value={user.password}
                onChange={handleInput}
              />

              <button
                type="button"
                onClick={() => handleTogglePassword("password")}
                className="absolute right-0 "
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
          </div>

          <br />

          <button type="submit" className="signIn-btn">
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
