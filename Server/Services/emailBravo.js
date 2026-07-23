import axios from "axios"

export const mailSend = async (to, subject, text, html) => {
  const url = "https://api.brevo.com/v3/smtp/email";

  const payload = {
    sender: {
      name: "Qalam Academy",
      // Use your verified Brevo email or process.env.GOOGLE_USER if it matches your Brevo account
      email: process.env.BREVO_SENDER_EMAIL || process.env.GOOGLE_USER, 
    },
    to: [
      {
        email: to,
      },
    ],
    subject: subject,
    textContent: text,
    htmlContent: html,
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
    });

    console.log("Message sent successfully via Brevo. Message ID:", response.data.messageId);
    return response.data;
    
  } catch (error) {
    // Axios attaches backend API errors to 'error.response'
    if (error.response) {
      console.error("Brevo API Error Details:", error.response.data);
      throw new Error(error.response.data.message || "Failed to send email via Brevo");
    } else {
      console.error("Network or setup error:", error.message);
      throw new Error(error.message || "SMTP_Failure provide a valid email");
    }
  }
};