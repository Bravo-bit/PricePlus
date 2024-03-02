import styles from "../components/styles/AboutPage.module.css";

function About() {
  return (
    <div>
      <section className={styles["aboutus"]}>
        <div className={styles["container"]}>
          <h1 className={styles["header"]}>Welcome to Price Plus</h1>
          <p>
            Discover the power of AI-driven property price predictions with
            Price Plus. Our platform leverages advanced algorithms to provide
            accurate and insightful forecasts, empowering users to make informed
            decisions in the dynamic real estate market.
          </p>
          <div className={styles["values"]}>
            <div className={styles["valueitem"]}>
              <h2 className={styles["subheader"]}>Innovation</h2>
              <p>
                At Price Plus, we are committed to innovation. We continually
                refine our AI models and explore emerging technologies to ensure
                our predictions remain at the forefront of accuracy and
                reliability.
              </p>
            </div>
            <div className={styles["valueitem"]}>
              <h2 className={styles["subheader"]}>Reliability</h2>
              <p>
                Trust in the reliability of Price Plus. Our AI algorithms are
                rigorously tested and validated, providing dependable
                predictions that you can rely on when navigating the complex
                world of property pricing.
              </p>
            </div>
            <div className={styles["valueitem"]}>
              <h2 className={styles["subheader"]}>Customer Focus</h2>
              <p>
                At the heart of Price Plus is our commitment to customer
                satisfaction. We prioritize your needs, offering personalized
                support and tailored solutions to ensure you have the best
                possible experience using our platform.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
