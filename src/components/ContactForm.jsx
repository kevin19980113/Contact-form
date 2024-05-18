import { useState, useRef } from "react";
import SuccessModal from "./SuccessModal.jsx";

export default function ContactForm() {
  const [checkedValue, setCheckedValue] = useState("");
  const [isInvalid, setisInvalid] = useState(false);
  const successModal = useRef();

  function handleChange(e) {
    setCheckedValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const consent = fd.getAll("consent");
    const query = fd.getAll("query");
    const data = Object.fromEntries(fd.entries());

    data.consent = consent;
    data.query = query;

    if (
      data.firstname === "" ||
      data.lastname === "" ||
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data.email) ===
        false ||
      data.message === "" ||
      data.consent.length === 0 ||
      data.query.length === 0
    ) {
      setisInvalid(true);
      return;
    }

    successModal.current.open();

    setTimeout(() => {
      successModal.current.close();
    }, 3000);

    setisInvalid(false);
    setCheckedValue("");
    e.target.reset();
  }

  return (
    <>
      <SuccessModal ref={successModal} />
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <h1>Contact Us</h1>
        <div className="name-container">
          <div className={`firstname-container ${isInvalid ? "invalid" : ""}`}>
            <label htmlFor="firstname">
              First Name <span>*</span>
            </label>
            <input type="text" id="firstname" name="firstname" required />
            <p className="error">The field is required</p>
          </div>

          <div className={`lastname-container ${isInvalid ? "invalid" : ""}`}>
            <label htmlFor="lastname">
              Last Name <span>*</span>
            </label>
            <input type="text" id="lastname" name="lastname" required />
            <p className="error">The field is required</p>
          </div>
        </div>

        <div className={`email-container ${isInvalid ? "invalid" : ""}`}>
          <label>
            Email Address <span>*</span>
          </label>
          <input
            required
            name="email"
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          />
          <p className="error">please enter a vaild email address</p>
        </div>

        <div className={`enquiry-container ${isInvalid ? "invalid" : ""}`}>
          <label>
            Query Type <span>*</span>
          </label>
          <div className="query-options">
            <div
              className={`radio-option ${
                checkedValue === "General Enquiry" ? "checked" : ""
              }`}
            >
              <input
                type="radio"
                value="General Enquiry"
                id="general-enquiry"
                name="query"
                onChange={handleChange}
                required
              />
              <label htmlFor="general-enquiry">General Enquiry</label>
            </div>

            <div
              className={`radio-option ${
                checkedValue === "Support Request" ? "checked" : ""
              }`}
            >
              <input
                type="radio"
                value="Support Request"
                id="support-requests"
                name="query"
                onChange={handleChange}
                required
              />
              <label htmlFor="support-requests">Support Request</label>
            </div>
          </div>
          <p className="error">please select a query type</p>
        </div>

        <div className={`message-container ${isInvalid ? "invalid" : ""}`}>
          <label htmlFor="message">
            Message <span>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            className="field"
            required
          ></textarea>
          <p className="error">the field is required</p>
        </div>

        <div className={`consent-container ${isInvalid ? "invalid" : ""}`}>
          <div className="consent">
            <input type="checkbox" name="consent" id="consent" required />
            <label htmlFor="consent">
              I consent to being contacted by the team <span>*</span>
            </label>
          </div>

          <p className="error">
            to submit this form please cosent to being contacted
          </p>
        </div>

        <button className="submit">Submit</button>
      </form>
    </>
  );
}
