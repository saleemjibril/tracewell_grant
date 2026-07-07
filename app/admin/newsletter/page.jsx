import AdminShell from "../../components/admin/AdminShell";
import NewsletterTable from "../../components/admin/NewsletterTable";

export default function AdminNewsletterPage() {
  return (
    <AdminShell>
      <section className="admin-page">
        <div className="admin-page__intro">
          <h2 className="admin-page__heading">Newsletter</h2>
          <p className="admin-page__description">
            Track footer newsletter subscribers and monitor list growth over
            time.
          </p>
        </div>

        <NewsletterTable />
      </section>
    </AdminShell>
  );
}
