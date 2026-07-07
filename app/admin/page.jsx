import Link from "next/link";
import AdminShell from "../components/admin/AdminShell";
import StatCard from "../components/admin/StatCard";
import {
  getDashboardStats,
  MOCK_NEWSLETTER,
  MOCK_WAITLIST,
  seedAdminGrants,
} from "../data/admin";

const RECENT_ACTIVITY = [
  {
    id: "act-1",
    label: "New waitlist signup",
    detail: "Fatima Bello — WaterSave Nigeria",
    time: "2 hours ago",
  },
  {
    id: "act-2",
    label: "Grant updated",
    detail: "Global Youth Leadership Grants moved to review",
    time: "5 hours ago",
  },
  {
    id: "act-3",
    label: "Newsletter subscriber",
    detail: "news@impactlab.io joined the list",
    time: "Yesterday",
  },
];

export default function AdminDashboardPage() {
  const grants = seedAdminGrants();
  const stats = getDashboardStats(grants, MOCK_WAITLIST, MOCK_NEWSLETTER);

  return (
    <AdminShell>
      <section className="admin-page">
        <div className="admin-page__intro">
          <h2 className="admin-page__heading">Overview</h2>
          <p className="admin-page__description">
            Monitor grants, waitlist signups, and newsletter growth from one
            place.
          </p>
        </div>

        <div className="admin-stats-grid">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              detail={stat.detail}
            />
          ))}
        </div>

        <div className="admin-dashboard-grid">
          <section className="admin-card">
            <div className="admin-card__header">
              <h3 className="admin-card__title">Quick actions</h3>
            </div>
            <div className="admin-quick-actions">
              <Link href="/admin/grants" className="admin-quick-actions__link">
                Manage grants
              </Link>
              <Link href="/admin/waitlist" className="admin-quick-actions__link">
                View waitlist
              </Link>
              <Link
                href="/admin/newsletter"
                className="admin-quick-actions__link"
              >
                Newsletter subscribers
              </Link>
              <a
                href="/grants"
                target="_blank"
                rel="noopener noreferrer"
                className="admin-quick-actions__link admin-quick-actions__link--muted"
              >
                Preview grants page
              </a>
            </div>
          </section>

          <section className="admin-card">
            <div className="admin-card__header">
              <h3 className="admin-card__title">Recent activity</h3>
            </div>
            <ul className="admin-activity-list">
              {RECENT_ACTIVITY.map((item) => (
                <li key={item.id} className="admin-activity-list__item">
                  <div>
                    <p className="admin-activity-list__label">{item.label}</p>
                    <p className="admin-activity-list__detail">{item.detail}</p>
                  </div>
                  <time className="admin-activity-list__time">{item.time}</time>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </AdminShell>
  );
}
