function PortalCard({ portal }) {
  return (
    <article className="what-were-building__card">
      <div className="what-were-building__card-content">
        <div className="what-were-building__card-copy">
          <div className="what-were-building__card-heading">
            <p className="what-were-building__card-label">{portal.label}</p>
            <h3 className="what-were-building__card-title">{portal.title}</h3>
          </div>
          <p className="what-were-building__card-description">
            {portal.description}
          </p>
        </div>
        <span
          className={`what-were-building__status what-were-building__status--${portal.statusVariant}`}
        >
          {portal.status}
        </span>
      </div>
    </article>
  );
}

export default PortalCard;
