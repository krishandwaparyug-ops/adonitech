import React, { useState, useEffect, useMemo } from "react";

const CheckboxList = ({
  model,
  username,
  email,
  dbConnection = "cranebuffer",
}) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [files, setFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);

  // New loading states
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoadingFiles(false);
      true;
      try {
        // 1️⃣ Fetch all file paths for this model
        const response = await fetch(
          // "https://adonitech.badak.in/api/data/byModel",
          "https://backend.cranebuffer.com/api/data/byModel",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-db-connection": dbConnection,
            },
            body: JSON.stringify({ model, showFiles: true }),
          }
        );

        const result = await response.json();
        if (!response.ok) {
          console.error("Error fetching files:", result.error || result);
          return;
        }

        // 2️⃣ Build full URLs
        const allEntries = result.data.flatMap((doc) =>
          Object.entries(doc).map(([key, relativePath]) => ({
            key,
            url: `https://backend.cranebuffer.com//api/${relativePath}`,
            // url: `https://adonitech.badak.in/api/${relativePath}`,
            name: relativePath.split("/").pop(),
          }))
        );

        // 3️⃣ HEAD-check each URL in parallel
        const validEntries = (
          await Promise.all(
            allEntries.map(async (entry) => {
              try {
                const headResp = await fetch(entry.url, { method: "HEAD" });
                return headResp.ok ? entry : null;
              } catch (err) {
                console.warn(`Skipping bad URL ${entry.url}`, err);
                return null;
              }
            })
          )
        ).filter((e) => e !== null);

        // 4️⃣ Update state with only the good ones
        setFiles(validEntries);
      } catch (err) {
        console.error("Unexpected error in fetchFiles:", err);
      } finally {
        setLoadingFiles(false);
      }
    };

    if (model) {
      fetchFiles();
    }
  }, [model, dbConnection]);

  const selectedCount = useMemo(
    () => Object.values(checkedItems).filter(Boolean).length,
    [checkedItems]
  );

  const toggleItem = (key) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleDownload = () => {
    setLoadingDownload(true);
    // We wrap in setTimeout 0 to let React render the loading state
    setTimeout(() => {
      files.forEach((file) => {
        if (checkedItems[file.key]) {
          const a = document.createElement("a");
          a.href = file.url;
          a.download = file.name;
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
      });
      setLoadingDownload(false);
    }, 0);
  };

  const handleEmail = async () => {
    const selectedFiles = files.filter((f) => checkedItems[f.key]);
    if (selectedFiles.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    setLoadingEmail(true);
    try {
      const downloadUrls = selectedFiles.map((f) => f.url);
      const res = await fetch("https://cranebackend-1.onrender.com/api/form/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, model, downloadUrls }),
      });
      const data = await res.json();
      console.log(data);
      
      if (res.ok) {
        alert("Request processed successfully");
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoadingEmail(false);
    }
  };

  if (!model) return <p>Please specify a model name.</p>;
  if (loadingFiles) return <p>Loading files...</p>;

  return (
    <div className="bg-white border my-8 border-gray-400 rounded-lg p-4 font-sans">
      <h2 className="uppercase text-sm font-semibold text-gray-800 mb-3">
        Download Files for {model}
      </h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {files.map((file) => {
          const isSelected = !!checkedItems[file.key];
          return (
            <li key={file.key}>
              <label
                htmlFor={file.key}
                className={`flex items-center p-2 border rounded cursor-pointer transition-colors duration-150 ${
                  isSelected
                    ? "bg-gray-100 border-blue-500"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  id={file.key}
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleItem(file.key)}
                  className="sr-only"
                />
                <div
                  className={`flex-shrink-0 h-4 w-4 border-2 rounded-sm mr-3 transition-colors duration-150 flex items-center justify-center ${
                    isSelected
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      className="w-3 h-3"
                    >
                      <path d="M5 10l3 3 7-7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-800">{file.key}</span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-center space-x-4">
        <button
          onClick={handleDownload}
          disabled={!selectedCount || loadingDownload}
          className={`px-4 py-2 font-bold text-white uppercase text-sm rounded transition duration-150 ${
            !selectedCount || loadingDownload
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {loadingDownload ? "Loading..." : "Download"}
        </button>

        <button
          onClick={handleEmail}
          disabled={!selectedCount || loadingEmail}
          className={`px-4 py-2 font-bold text-white uppercase text-sm rounded transition duration-150 ${
            !selectedCount || loadingEmail
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {loadingEmail ? "Loading..." : "Via Email"}
        </button>
      </div>
    </div>
  );
};

export default CheckboxList;
