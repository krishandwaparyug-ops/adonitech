import { useState } from "react";
import { message } from "antd";
const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");

  const formdata = {
    email,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://backend.cranebuffer.com/api/data/login/passwordResetLink",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      }
    );
    const data = await response.json();
    if (response.ok) {
      message.success("Link Sent Successfully");
    } else {
      message.error(data.msg); // Display error message
    }
  };

  return (
    <div className="md:h-[85vh] h-[93vh]  flex justify-center items-center p-4">
      <div
        className="max-w-sm mx-auto mt-8 p-6 bg-white rounded"
        style={{ boxShadow: " 0px 0px 35px 0 rgba(0, 0, 255, 0.15)" }}
      >
        <h2 className="text-2xl font-semibold mb-4">Forgot Password?</h2>
        <p className="text-gray-600 mb-4">
          Enter your email address to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
