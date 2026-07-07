const STATUS_STYLES = {
  published: "admin-badge--published",
  review: "admin-badge--review",
  draft: "admin-badge--draft",
  active: "admin-badge--published",
  subscribed: "admin-badge--published",
};

export default function StatusBadge({ status, label }) {
  const modifier = STATUS_STYLES[status] || "admin-badge--neutral";

  return (
    <span className={`admin-badge ${modifier}`}>
      {label || status}
    </span>
  );
}
