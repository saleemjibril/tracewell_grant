export default function StatCard({ label, value, detail }) {
  return (
    <article className="admin-stat-card">
      <p className="admin-stat-card__label">{label}</p>
      <p className="admin-stat-card__value">{value}</p>
      {detail && <p className="admin-stat-card__detail">{detail}</p>}
    </article>
  );
}
