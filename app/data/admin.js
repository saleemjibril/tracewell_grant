import { GRANTS } from "./grants";

export const GRANT_STATUSES = [
  { id: "published", label: "Published" },
  { id: "review", label: "In review" },
  { id: "draft", label: "Draft" },
];

export const MOCK_WAITLIST = [
  {
    id: "wl-001",
    fullName: "Ada Okonkwo",
    email: "ada@greenroots.ng",
    organisationName: "Green Roots Initiative",
    organisationTypes: ["nigerian-ngo"],
    country: "Nigeria",
    source: "waitlist-page",
    joinedAt: "2026-07-01",
    status: "active",
  },
  {
    id: "wl-002",
    fullName: "James Mbeki",
    email: "james@climatehub.org",
    organisationName: "Climate Hub Africa",
    organisationTypes: ["foundation"],
    country: "Kenya",
    source: "hero",
    joinedAt: "2026-07-02",
    status: "active",
  },
  {
    id: "wl-003",
    fullName: "Sarah Chen",
    email: "sarah@agrifuture.co",
    organisationName: "AgriFuture Co-op",
    organisationTypes: ["community-fund", "other"],
    country: "Ghana",
    source: "footer",
    joinedAt: "2026-07-03",
    status: "active",
  },
  {
    id: "wl-004",
    fullName: "Michael Torres",
    email: "m.torres@csr-alliance.com",
    organisationName: "CSR Alliance",
    organisationTypes: ["corporate-csr"],
    country: "United Kingdom",
    source: "join-funders",
    joinedAt: "2026-07-05",
    status: "active",
  },
  {
    id: "wl-005",
    fullName: "Fatima Bello",
    email: "fatima@watersave.ng",
    organisationName: "WaterSave Nigeria",
    organisationTypes: ["nigerian-ngo"],
    country: "Nigeria",
    source: "nav",
    joinedAt: "2026-07-06",
    status: "active",
  },
];

export const MOCK_NEWSLETTER = [
  {
    id: "nl-001",
    email: "insights@example.org",
    subscribedAt: "2026-06-28",
    status: "subscribed",
  },
  {
    id: "nl-002",
    email: "updates@fieldwork.africa",
    subscribedAt: "2026-07-01",
    status: "subscribed",
  },
  {
    id: "nl-003",
    email: "news@impactlab.io",
    subscribedAt: "2026-07-04",
    status: "subscribed",
  },
];

export function seedAdminGrants() {
  return GRANTS.map((grant, index) => ({
    ...grant,
    status:
      index % 7 === 0 ? "draft" : index % 5 === 0 ? "review" : "published",
    updatedAt: "2026-07-06",
  }));
}

export function getDashboardStats(grants, waitlist, newsletter) {
  return [
    {
      id: "grants",
      label: "Total grants",
      value: grants.length,
      detail: `${grants.filter((g) => g.status === "published").length} published`,
    },
    {
      id: "review",
      label: "In review",
      value: grants.filter((g) => g.status === "review").length,
      detail: `${grants.filter((g) => g.status === "draft").length} drafts`,
    },
    {
      id: "waitlist",
      label: "Waitlist signups",
      value: waitlist.length,
      detail: "All sources",
    },
    {
      id: "newsletter",
      label: "Newsletter subscribers",
      value: newsletter.length,
      detail: "Footer signups",
    },
  ];
}

export const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/grants", label: "Grants", icon: "grants" },
  { href: "/admin/waitlist", label: "Waitlist", icon: "waitlist" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "newsletter" },
];
