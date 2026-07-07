function CloseIcon() {
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
        d="M6 6L18 18M18 6L6 18"
        stroke="#2D2D2D"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function WaitlistSuccessModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="waitlist-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-modal-title"
    >
      <button
        type="button"
        className="waitlist-modal__backdrop"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div className="waitlist-modal__dialog">
        <div className="waitlist-modal__header">
          <button
            type="button"
            className="waitlist-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="waitlist-modal__content">
          <div className="waitlist-modal__heading">
            <h2 id="waitlist-modal-title" className="waitlist-modal__title">
              Congratulations
            </h2>
            <span className="waitlist-modal__emoji" aria-hidden="true">
              🥳
            </span>
          </div>

          <p className="waitlist-modal__message">
            Your spot on the waitlist is secured.
          </p>

          <button
            type="button"
            className="waitlist-modal__btn"
            onClick={onClose}
          >
            Waitlist Joined
          </button>
        </div>
      </div>
    </div>
  );
}
