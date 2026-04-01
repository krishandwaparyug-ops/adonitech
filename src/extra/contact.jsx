import React, { useState, useEffect } from "react";
// import Select from 'react-select';
function ContactUs() {
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [isSending, setIsSending] = useState(false);
  const [formError, setFormError] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [toSend, setToSend] = useState({
    username: "",
    email: "",
    phone: "",
    message: "",
  });
  console.log(toSend);
  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["username", "email", "phone", "message"];
    const hasEmptyField = requiredFields.some((field) => !toSend[field]);
    if (hasEmptyField) {
      setFormError("Please fill all fields.");
      return;
    }

    setIsSending(true);
    setFormError(null);

    const data = new FormData();
    data.append("username", toSend.username);
    data.append("email", toSend.email);
    data.append("phone", toSend.phone);
    data.append("message", toSend.message);
    if (fileName && fileURL) {
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput && fileInput.files[0]) {
        data.append("file", fileInput.files[0]);
      }
    }
    // for (let [key, value] of data.entries()) {
    //   console.log(key, value);
    // }
    try {
      setLoading(true);
      console.log("second");

      const response = await fetch(
        "https://backend.cranebuffer.com/api/data/websiteContact",
        // "http://localhost:5000/api/data/websiteContact",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        setLoading(false);
        setToSend({
          username: "",
          email: "",
          phone: "",
          message: "",
        });
        handleFileRemove();
        for (let [key, value] of data.entries()) {
          console.log(key, value);
        }
      }
      console.log("third");

      //   if (!response.ok) {
      //     throw new Error("Network response was not ok " + response.statusText);
      //   }
      console.log("fourth");

      const result = await response.json();
      alert(result.msg);

      console.log("fifth");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to send message to you");
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileName(file.name);
      setFileURL(URL.createObjectURL(file));
    } else {
      setFileName("");
      setFileURL("");
    }
  };
  const handleFileRemove = () => {
    setFileName("");
    setFileURL("");
    // Clear the file input value
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div>
      <section
        className="min-h-screen bg-cover pt-10  xs:pb-10 "
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`,
        }}
      >
        <div className="flex min-h-screen flex-col bg-black/60">
          <div className="container mx-auto flex flex-1 flex-col px-6 py-12">
            <div className="flex-1 lg:-mx-6 lg:flex lg:items-center">
              <div className="text-white lg:mx-6 lg:w-1/2">
                <h1 className="pt-20 text-2xl font-semibold capitalize lg:text-3xl">
                  Get In Touch With Us
                </h1>

                <p className="mt-6 max-w-xl">
                  For inquiries, partnerships, or to explore how we can
                  collaborate to pioneer innovative solutions in safety and
                  efficiency across diverse industries, please feel free to
                  reach out to us. We value your input and are committed to
                  ensuring seamless integration of advanced technologies to
                  safeguard lives, assets, and operations worldwide
                </p>
                {/* 
                                <button className="px-8 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50">
                                    get in touch
                                </button> */}

                <div className="mt-6 md:mt-8">
                  <h3 className="text-gray-300 ">Follow us</h3>

                  <div className="-mx-1.5 mt-4 flex ">
                    <a
                      className="mx-1.5 transform text-white transition-colors duration-300 hover:text-blue-500"
                      href="#"
                    >
                      <svg
                        className="h-10 w-10 fill-current"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18.6668 6.67334C18.0002 7.00001 17.3468 7.13268 16.6668 7.33334C15.9195 6.49001 14.8115 6.44334 13.7468 6.84201C12.6822 7.24068 11.9848 8.21534 12.0002 9.33334V10C9.83683 10.0553 7.91016 9.07001 6.66683 7.33334C6.66683 7.33334 3.87883 12.2887 9.3335 14.6667C8.0855 15.498 6.84083 16.0587 5.3335 16C7.53883 17.202 9.94216 17.6153 12.0228 17.0113C14.4095 16.318 16.3708 14.5293 17.1235 11.85C17.348 11.0351 17.4595 10.1932 17.4548 9.34801C17.4535 9.18201 18.4615 7.50001 18.6668 6.67268V6.67334Z" />
                      </svg>
                    </a>

                    <a
                      className="mx-1.5 transform text-white transition-colors duration-300 hover:text-blue-500"
                      href="#"
                    >
                      <svg
                        className="h-8 w-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.2 8.80005C16.4731 8.80005 17.694 9.30576 18.5941 10.2059C19.4943 11.1061 20 12.327 20 13.6V19.2H16.8V13.6C16.8 13.1757 16.6315 12.7687 16.3314 12.4687C16.0313 12.1686 15.6244 12 15.2 12C14.7757 12 14.3687 12.1686 14.0687 12.4687C13.7686 12.7687 13.6 13.1757 13.6 13.6V19.2H10.4V13.6C10.4 12.327 10.9057 11.1061 11.8059 10.2059C12.7061 9.30576 13.927 8.80005 15.2 8.80005Z"
                          fill="currentColor"
                        />
                        <path
                          d="M7.2 9.6001H4V19.2001H7.2V9.6001Z"
                          fill="currentColor"
                        />
                        <path
                          d="M5.6 7.2C6.48366 7.2 7.2 6.48366 7.2 5.6C7.2 4.71634 6.48366 4 5.6 4C4.71634 4 4 4.71634 4 5.6C4 6.48366 4.71634 7.2 5.6 7.2Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>

                    <a
                      className="mx-1.5 transform text-white transition-colors duration-300 hover:text-blue-500"
                      href="#"
                    >
                      <svg
                        className="h-8 w-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 10.2222V13.7778H9.66667V20H13.2222V13.7778H15.8889L16.7778 10.2222H13.2222V8.44444C13.2222 8.2087 13.3159 7.9826 13.4826 7.81591C13.6493 7.64921 13.8754 7.55556 14.1111 7.55556H16.7778V4H14.1111C12.9324 4 11.8019 4.46825 10.9684 5.30175C10.1349 6.13524 9.66667 7.2657 9.66667 8.44444V10.2222H7Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>

                    <a
                      className="mx-1.5 transform text-white transition-colors duration-300 hover:text-blue-500"
                      href="https://www.instagram.com/adonitech/"
                    >
                      <svg
                        className="h-8 w-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.9294 7.72275C9.65868 7.72275 7.82715 9.55428 7.82715 11.825C7.82715 14.0956 9.65868 15.9271 11.9294 15.9271C14.2 15.9271 16.0316 14.0956 16.0316 11.825C16.0316 9.55428 14.2 7.72275 11.9294 7.72275ZM11.9294 14.4919C10.462 14.4919 9.26239 13.2959 9.26239 11.825C9.26239 10.354 10.4584 9.15799 11.9294 9.15799C13.4003 9.15799 14.5963 10.354 14.5963 11.825C14.5963 13.2959 13.3967 14.4919 11.9294 14.4919ZM17.1562 7.55495C17.1562 8.08692 16.7277 8.51178 16.1994 8.51178C15.6674 8.51178 15.2425 8.08335 15.2425 7.55495C15.2425 7.02656 15.671 6.59813 16.1994 6.59813C16.7277 6.59813 17.1562 7.02656 17.1562 7.55495ZM19.8731 8.52606C19.8124 7.24434 19.5197 6.10901 18.5807 5.17361C17.6453 4.23821 16.51 3.94545 15.2282 3.88118C13.9073 3.80621 9.94787 3.80621 8.62689 3.88118C7.34874 3.94188 6.21341 4.23464 5.27444 5.17004C4.33547 6.10544 4.04628 7.24077 3.98201 8.52249C3.90704 9.84347 3.90704 13.8029 3.98201 15.1238C4.04271 16.4056 4.33547 17.5409 5.27444 18.4763C6.21341 19.4117 7.34517 19.7045 8.62689 19.7687C9.94787 19.8437 13.9073 19.8437 15.2282 19.7687C16.51 19.708 17.6453 19.4153 18.5807 18.4763C19.5161 17.5409 19.8089 16.4056 19.8731 15.1238C19.9481 13.8029 19.9481 9.84704 19.8731 8.52606ZM18.1665 16.5412C17.8881 17.241 17.349 17.7801 16.6456 18.0621C15.5924 18.4799 13.0932 18.3835 11.9294 18.3835C10.7655 18.3835 8.26272 18.4763 7.21307 18.0621C6.51331 17.7837 5.9742 17.2446 5.69215 16.5412C5.27444 15.488 5.37083 12.9888 5.37083 11.825C5.37083 10.6611 5.27801 8.15832 5.69215 7.10867C5.97063 6.40891 6.50974 5.8698 7.21307 5.58775C8.26629 5.17004 10.7655 5.26643 11.9294 5.26643C13.0932 5.26643 15.596 5.17361 16.6456 5.58775C17.3454 5.86623 17.8845 6.40534 18.1665 7.10867C18.5843 8.16189 18.4879 10.6611 18.4879 11.825C18.4879 12.9888 18.5843 15.4916 18.1665 16.5412Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 lg:mx-6 lg:w-1/2">
                <div className="mx-auto w-full overflow-hidden rounded-xl bg-white px-8 py-10 shadow-2xl  lg:max-w-xl">
                  <h1 className="text-xl font-medium text-gray-700 ">
                    Contact form
                  </h1>

                  <p className="mt-2 text-gray-500">
                    Ask us everything and we would love to hear from you
                  </p>

                  <form className="mt-6" onSubmit={onSubmit}>
                    {formError && (
                      <p className="mb-2 text-red-500">{formError}</p>
                    )}
                    <div className="flex-1">
                      <label className="mb-2 block text-sm text-gray-600 ">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={toSend.username}
                        name="username"
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring  focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mt-6 flex-1">
                      <label className="mb-2 block text-sm text-gray-600">
                        Email address
                      </label>
                      <input
                        type="email"
                        value={toSend.email}
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter email"
                        className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700  focus:border-blue-400 focus:outline-none focus:ring  focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    </div>
                    <div className="mt-6 flex-1">
                      <label className="mb-2 block text-sm text-gray-600">
                        Contact Number
                      </label>
                      <input
                        type="number"
                        value={toSend.phone}
                        name="phone"
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700  focus:border-blue-400 focus:outline-none focus:ring  focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    </div>
                    <div className="mt-6 w-full">
                      <label className="mb-2 block text-sm text-gray-600 ">
                        Message
                      </label>
                      <textarea
                        value={toSend.message}
                        name="message"
                        onChange={handleChange}
                        className="mt-2 block h-18 w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400  focus:outline-none focus:ring focus:ring-blue-300  focus:ring-opacity-40 md:h-20"
                        placeholder="Message"
                      ></textarea>
                    </div>
                    <div className="mt-6 flex flex-col">
                      <div>
                        <label className="mb-3 block text-sm text-gray-600 ">
                          Attach File
                        </label>
                        <label className=" cursor-pointer ">
                          <span className="rounded-md bg-blue-500 text-white hover:bg-blue-600 px-6 py-2.5">
                            Choose File
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      {fileName && (
                        <div className="mt-6 flex items-center space-x-3">
                          <span className="text-sm text-blue-600 ">
                            {fileName}
                          </span>
                          <button
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() =>
                              document.getElementById("my_modal_3").showModal()
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                            >
                              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                              <path
                                fillRule="evenodd"
                                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={handleFileRemove}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      )}

                      <dialog id="my_modal_3" className="modal ">
                        <div className="modal-box bg-white">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                          <img
                            src={fileURL}
                            alt={fileName}
                            className="mt-4 w-full"
                          />
                        </div>
                      </dialog>
                    </div>
                    <button
                      type="submit"
                      className={`mt-6 w-full transform rounded-md bg-blue-600 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50 hover:bg-blue-500 ${
                        loading
                          ? "bg-green-500 hover:bg-green-600 focus:ring-green-300"
                          : "bg-blue-600 hover:bg-blue-500 focus:ring-blue-400"
                      }`}
                      disabled={loading}
                    >
                      {loading && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 100 101"
                          className="inline w-4 h-4 mr-3 text-white animate-bounce"
                          role="status"
                          aria-hidden="true"
                        >
                          <circle
                            fill="#34D399"
                            r="45"
                            cy="50"
                            cx="50"
                          ></circle>
                        </svg>
                      )}
                      {loading ? "Loading..." : "Get in Touch"}
                    </button>
                  </form>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
