function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" stroke="#0A0D0D" strokeWidth="2" />
      <path
        d="M16 16L21 21"
        stroke="#0A0D0D"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 8L20 16L12 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function GrantCard({ grant }) {
  return (
    <a href={`#grant-${grant.id}`} className="grant-card">
      <div className="grant-card__body">
        <div className="grant-card__main">
          <p className="grant-card__amount">{grant.amount}</p>
          <div className="grant-card__details">
            <div className="grant-card__header">
              <h3 className="grant-card__title">{grant.title}</h3>
              <p className="grant-card__deadline">{grant.deadline}</p>
            </div>
            <p className="grant-card__description">{grant.description}</p>
          </div>
        </div>
        <div className="grant-card__footer">
          <span className="grant-card__location">{grant.location}</span>
          <span className="grant-card__arrow" aria-hidden="true">
            <ArrowIcon />
          </span>
        </div>
      </div>
    </a>
  );
}

export { SearchIcon };
