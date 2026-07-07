"use client";

import { useMemo, useState } from "react";
import { MOCK_NEWSLETTER } from "../../data/admin";
import StatusBadge from "./StatusBadge";

export default function NewsletterTable() {
  const [search, setSearch] = useState("");
  const [subscribers] = useState(MOCK_NEWSLETTER);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return subscribers;

    return subscribers.filter((entry) =>
      entry.email.toLowerCase().includes(query)
    );
  }, [subscribers, search]);

  return (
    <div className="admin-section">
      <div className="admin-toolbar">
        <label className="admin-search">
          <span className="visually-hidden">Search subscribers</span>
          <input
            type="search"
            placeholder="Search by email..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Subscribed</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.email}</td>
                <td>{entry.subscribedAt}</td>
                <td>
                  <StatusBadge status={entry.status} label={entry.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="admin-empty">No subscribers found.</p>
        )}
      </div>
    </div>
  );
}
