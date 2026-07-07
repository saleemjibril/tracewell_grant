import AdminShell from "../../components/admin/AdminShell";
import GrantsManager from "../../components/admin/GrantsManager";

export default function AdminGrantsPage() {
  return (
    <AdminShell>
      <section className="admin-page">
        <div className="admin-page__intro">
          <h2 className="admin-page__heading">Grants</h2>
          <p className="admin-page__description">
            Review grant listings, update publication status, and inspect grant
            details.
          </p>
        </div>

        <GrantsManager />
      </section>
    </AdminShell>
  );
}
