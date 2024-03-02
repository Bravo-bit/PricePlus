import styles from "../components/styles/ContactPage.module.css";

function ContactUs() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement email sending logic here
    alert("Your message has been sent!");
  };

  return (
    <div>
      <section className={styles["form"]}>
        <div className={styles["container"]}>
          <h1 className={styles["header"]}>Contact Us</h1>
          <p>
            Have a question or suggestion? Feel free to get in touch with us
            using the form below.
          </p>
          <form onSubmit={handleSubmit} className={styles["form"]}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
