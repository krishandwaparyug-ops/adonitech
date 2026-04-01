import { useState } from "react";
import { Typography } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import "../scss/login.scss";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
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
        `https://backend.cranebuffer.com/api/auth/login`,
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
        message.success("Login Successful");
        // setToken({ token: resData.token });
        localStorage.setItem("Token", JSON.stringify(resData.token));

        navigate("/");
      } else {
        message.error(
          resData.extraDetails ? resData.extraDetails : resData.message
        );
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
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
        <Typography.Title level={3}>Login</Typography.Title>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="inputWrapper">
              <MailOutlined className="icon" />
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
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

          <Typography.Text>
            <Link to="/login/passwordReset" className="mb-2">
              Forgot you&apos;r password?
            </Link>
          </Typography.Text>

          <br />

          <button type="submit" className="login-btn mb-4 mt-2">
            Login Now
          </button>
          <br />
          <Typography.Text>
            Don&apos;t have an account?
            <Link to="/register" className="ml-2">
              Create one now
            </Link>
          </Typography.Text>
        </form>
      </div>
    </div>
  );
};

export default Login;
