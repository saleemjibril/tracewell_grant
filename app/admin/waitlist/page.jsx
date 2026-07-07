import AdminShell from "../../components/admin/AdminShell";
import WaitlistTable from "../../components/admin/WaitlistTable";

export default function AdminWaitlistPage() {
  return (
    <AdminShell>
      <section className="admin-page">
        <div className="admin-page__intro">
          <h2 className="admin-page__heading">Waitlist</h2>
          <p className="admin-page__description">
            View organisations that joined the early access waitlist and export
            signups for outreach.
          </p>
        </div>

        <WaitlistTable />
      </section>
    </AdminShell>
  );
}
