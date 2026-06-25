function PlusIcon({ open }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`faq__icon${open ? " faq__icon--open" : ""}`}
    >
      <path
        d="M16 8V24M8 16H24"
        stroke="#141919"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FaqItem({ item, isOpen, onToggle }) {
  const panelId = `faq-panel-${item.id}`;
  const buttonId = `faq-button-${item.id}`;

  return (
    <div className={`faq__item${isOpen ? " faq__item--open" : ""}`}>
      <button
        id={buttonId}
        type="button"
        className="faq__trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="faq__question">{item.question}</span>
        <PlusIcon open={isOpen} />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="faq__panel"
        hidden={!isOpen}
      >
        <p className="faq__answer">{item.answer}</p>
      </div>
    </div>
  );
}

export { PlusIcon };
