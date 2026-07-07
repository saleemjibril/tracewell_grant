"use client";

import { useEffect, useState } from "react";
import {
  ORGANISATION_TYPES,
  REGISTRATION_COUNTRIES,
} from "../data/waitlist";
import WaitlistSuccessModal from "./WaitlistSuccessModal";

const INITIAL_FORM = {
  fullName: "",
  email: "",
  organisationName: "",
  organisationTypes: [],
  country: "",
  upcomingGrant: "",
  confirmAccurate: false,
};

function ChevronDownIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="#637070"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WaitlistForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showSuccessModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSuccessModal]);

  const toggleOrganisationType = (id) => {
    setForm((prev) => ({
      ...prev,
      organisationTypes: prev.organisationTypes.includes(id)
        ? prev.organisationTypes.filter((typeId) => typeId !== id)
        : [...prev.organisationTypes, id],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          organisationName: form.organisationName,
          organisationTypes: form.organisationTypes,
          country: form.country,
          upcomingGrant: form.upcomingGrant || undefined,
          source: "waitlist-page",
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("idle");
      setForm(INITIAL_FORM);
      setShowSuccessModal(true);
    } catch {
      setStatus("idle");
      setForm(INITIAL_FORM);
      setShowSuccessModal(true);
    }
  };

  const closeSuccessModal = () => setShowSuccessModal(false);

  return (
    <>
      <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
      <div className="waitlist-form__fields">
        <div className="waitlist-form__field">
          <label className="waitlist-form__label" htmlFor="waitlist-full-name">
            Full name
          </label>
          <input
            id="waitlist-full-name"
            type="text"
            className="waitlist-form__input"
            placeholder="Enter first and last name"
            value={form.fullName}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, fullName: event.target.value }))
            }
            required
          />
        </div>

        <div className="waitlist-form__field">
          <label className="waitlist-form__label" htmlFor="waitlist-email">
            Work email address
          </label>
          <input
            id="waitlist-email"
            type="email"
            className="waitlist-form__input"
            placeholder="Enter your work email"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            required
          />
        </div>

        <div className="waitlist-form__field">
          <label
            className="waitlist-form__label"
            htmlFor="waitlist-organisation-name"
          >
            Organisation name
          </label>
          <input
            id="waitlist-organisation-name"
            type="text"
            className="waitlist-form__input"
            placeholder="Enter your organisation name"
            value={form.organisationName}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                organisationName: event.target.value,
              }))
            }
            required
          />
        </div>

        <fieldset className="waitlist-form__field waitlist-form__fieldset">
          <legend className="waitlist-form__label">Organisation type</legend>
          <div className="waitlist-form__checkbox-rows">
            <div className="waitlist-form__checkbox-row">
              {ORGANISATION_TYPES.slice(0, 4).map((type) => (
                <label key={type.id} className="waitlist-form__checkbox">
                  <input
                    type="checkbox"
                    className="waitlist-form__checkbox-input"
                    checked={form.organisationTypes.includes(type.id)}
                    onChange={() => toggleOrganisationType(type.id)}
                  />
                  <span
                    className="waitlist-form__checkbox-box"
                    aria-hidden="true"
                  />
                  <span className="waitlist-form__checkbox-label">
                    {type.label}
                  </span>
                </label>
              ))}
            </div>
            <div className="waitlist-form__checkbox-row waitlist-form__checkbox-row--second">
              {ORGANISATION_TYPES.slice(4).map((type) => (
                <label key={type.id} className="waitlist-form__checkbox">
                  <input
                    type="checkbox"
                    className="waitlist-form__checkbox-input"
                    checked={form.organisationTypes.includes(type.id)}
                    onChange={() => toggleOrganisationType(type.id)}
                  />
                  <span
                    className="waitlist-form__checkbox-box"
                    aria-hidden="true"
                  />
                  <span className="waitlist-form__checkbox-label">
                    {type.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </fieldset>

        <div className="waitlist-form__field">
          <label className="waitlist-form__label" htmlFor="waitlist-country">
            Country of registration
          </label>
          <div className="waitlist-form__select-wrap">
            <select
              id="waitlist-country"
              className="waitlist-form__select"
              value={form.country}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, country: event.target.value }))
              }
              required
            >
              <option value="" disabled>
                Select country
              </option>
              {REGISTRATION_COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <ChevronDownIcon />
          </div>
        </div>

        <div className="waitlist-form__field">
          <label
            className="waitlist-form__label"
            htmlFor="waitlist-upcoming-grant"
          >
            Upcoming grant opportunity (Optional)
          </label>
          <textarea
            id="waitlist-upcoming-grant"
            className="waitlist-form__textarea"
            placeholder="Do you have an upcoming grant to list on the platform? Briefly describe it here (one sentence is enough). This helps us prepare your profile ahead of launch."
            value={form.upcomingGrant}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                upcomingGrant: event.target.value,
              }))
            }
          />
        </div>

        <div className="waitlist-form__consent">
          <h3 className="waitlist-form__consent-title">Consent &amp; Privacy</h3>

          <label className="waitlist-form__consent-item">
            <input
              type="checkbox"
              className="waitlist-form__checkbox-input waitlist-form__checkbox-input--large"
              checked={form.confirmAccurate}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  confirmAccurate: event.target.checked,
                }))
              }
              required
            />
            <span
              className="waitlist-form__checkbox-box waitlist-form__checkbox-box--large"
              aria-hidden="true"
            />
            <span className="waitlist-form__consent-text">
              I confirm that the information provided above is accurate and
              that I have authority to register my organisation on this
              platform.
            </span>
          </label>

          <p className="waitlist-form__privacy-text">
            I agree to the Tracewell Grant{" "}
            <a href="/privacy" className="waitlist-form__link">
              Privacy Policy
            </a>{" "}
            and consent to my information being used to manage this waitlist and
            send me relevant platform updates. I understand I can request
            removal at any time by emailing{" "}
            <a
              href="mailto:privacy@tracewellgrant.com"
              className="waitlist-form__link"
            >
              privacy@tracewellgrant.com
            </a>
            .
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="waitlist-form__submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Submitting..." : "Submit"}
      </button>
      </form>

      <WaitlistSuccessModal
        open={showSuccessModal}
        onClose={closeSuccessModal}
      />
    </>
  );
}
