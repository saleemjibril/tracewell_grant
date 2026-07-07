import "../../styles/admin/index.scss";

export const metadata = {
  title: "Admin | Tracewell Grant",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="admin-root">{children}</div>;
}
