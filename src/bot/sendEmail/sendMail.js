export const SendEmailToOwner = async (formData,currentCalculation, setMessages) => {
    try {
      const payload = {
        ...formData,
        currentCalculation,
      };  
      const response = await fetch(
        "https://45.55.226.102:3001/api/form/contactToOwner",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error("Failed to send email");
      return { ok: true };
    } catch (error) {
      console.error("Email send error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Failed to send email. Please try again.", isUser: false },
      ]);
      return { ok: false };
    }
  };

  // sending mail to user
  export const SendEmail = async (formData, setMessages) => {
    try {
      const response = await fetch(
        "https://45.55.226.102:3001/api/form/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Failed to send email");
      setMessages((prev) => [
        ...prev,
        { text: "Email sent successfully!", isUser: false },
      ]);
    } catch (error) {
      console.error("Email send error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Failed to send email. Please try again.", isUser: false },
      ]);
    }
  };