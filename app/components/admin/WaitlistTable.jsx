"use client";

import { useMemo, useState } from "react";
import { MOCK_WAITLIST } from "../../data/admin";
import { ORGANISATION_TYPES } from "../../data/waitlist";
import StatusBadge from "./StatusBadge";

function formatOrgTypes(ids) {
  return ids
    .map((id) => ORGANISATION_TYPES.find((type) => type.id === id)?.label || id)
    .join(", ");
}

export default function WaitlistTable() {
  const [search, setSearch] = useState("");
  const [entries] = useState(MOCK_WAITLIST);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return entries;

    return entries.filter(
      (entry) =>
        entry.fullName.toLowerCase().includes(query) ||
        entry.email.toLowerCase().includes(query) ||
        entry.organisationName.toLowerCase().includes(query) ||
        entry.country.toLowerCase().includes(query)
    );
  }, [entries, search]);

  const exportCsv = () => {
    const headers = [
      "Name",
      "Email",
      "Organisation",
      "Types",
      "Country",
      "Source",
      "Joined",
    ];
    const rows = filtered.map((entry) => [
      entry.fullName,
      entry.email,
      entry.organisationName,
      formatOrgTypes(entry.organisationTypes),
      entry.country,
      entry.source,
      entry.joinedAt,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "waitlist-export.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-section">
      <div className="admin-toolbar">
        <label className="admin-search">
          <span className="visually-hidden">Search waitlist</span>
          <input
            type="search"
            placeholder="Search by name, email, or organisation..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <button type="button" className="admin-button" onClick={exportCsv}>
          Export CSV
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Organisation</th>
              <th scope="col">Country</th>
              <th scope="col">Source</th>
              <th scope="col">Joined</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry) => (
              <tr key={entry.id}>
                <td>
                  <p className="admin-table__primary">{entry.fullName}</p>
                  <p className="admin-table__meta">{entry.email}</p>
                </td>
                <td>
                  <p className="admin-table__primary">{entry.organisationName}</p>
                  <p className="admin-table__meta">
                    {formatOrgTypes(entry.organisationTypes)}
                  </p>
                </td>
                <td>{entry.country}</td>
                <td>{entry.source}</td>
                <td>{entry.joinedAt}</td>
                <td>
                  <StatusBadge status={entry.status} label={entry.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="admin-empty">No waitlist entries found.</p>
        )}
      </div>
    </div>
  );
}
