import React, { useState } from "react";
import emailjs from "emailjs-com";
import styles from "../components/styles/ContactPage.module.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_6k2o8xp",
        "template_7cz9x6p",
        e.target, 
        "M1cWDOp3tKTbEDLBJ"
      )
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        // Reset form fields
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      ></textarea>
      <button type="submit">Send Message</button>
    </form>
  );
};

export default ContactForm;
