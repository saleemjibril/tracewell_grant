"use client";

import { useMemo, useState } from "react";
import { FILTER_TABS } from "../../data/grants";
import { GRANT_STATUSES, seedAdminGrants } from "../../data/admin";
import StatusBadge from "./StatusBadge";

function formatFunder(id) {
  const tab = FILTER_TABS.find((item) => item.id === id);
  return tab ? tab.label : id;
}

export default function GrantsManager() {
  const [grants, setGrants] = useState(() => seedAdminGrants());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return grants.filter((grant) => {
      const matchesStatus =
        statusFilter === "all" || grant.status === statusFilter;
      const matchesSearch =
        !query ||
        grant.title.toLowerCase().includes(query) ||
        grant.location.toLowerCase().includes(query) ||
        formatFunder(grant.funder).toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [grants, search, statusFilter]);

  const selected = grants.find((grant) => grant.id === selectedId);

  const updateStatus = (id, status) => {
    setGrants((current) =>
      current.map((grant) =>
        grant.id === id ? { ...grant, status, updatedAt: "2026-07-07" } : grant
      )
    );
  };

  return (
    <div className="admin-grants">
      <div className="admin-toolbar">
        <label className="admin-search">
          <span className="visually-hidden">Search grants</span>
          <input
            type="search"
            placeholder="Search grants..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <div className="admin-filter-tabs" role="tablist" aria-label="Grant status">
          <button
            type="button"
            role="tab"
            aria-selected={statusFilter === "all"}
            className={`admin-filter-tabs__tab${
              statusFilter === "all" ? " admin-filter-tabs__tab--active" : ""
            }`}
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>
          {GRANT_STATUSES.map((status) => (
            <button
              key={status.id}
              type="button"
              role="tab"
              aria-selected={statusFilter === status.id}
              className={`admin-filter-tabs__tab${
                statusFilter === status.id ? " admin-filter-tabs__tab--active" : ""
              }`}
              onClick={() => setStatusFilter(status.id)}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-grants__layout">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Grant</th>
                <th scope="col">Funder</th>
                <th scope="col">Deadline</th>
                <th scope="col">Status</th>
                <th scope="col">
                  <span className="visually-hidden">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((grant) => (
                <tr key={grant.id}>
                  <td>
                    <button
                      type="button"
                      className="admin-table__link"
                      onClick={() => setSelectedId(grant.id)}
                    >
                      {grant.title}
                    </button>
                    <p className="admin-table__meta">{grant.location}</p>
                  </td>
                  <td>{formatFunder(grant.funder)}</td>
                  <td>{grant.deadline}</td>
                  <td>
                    <StatusBadge status={grant.status} label={grant.status} />
                  </td>
                  <td>
                    <select
                      className="admin-select"
                      value={grant.status}
                      aria-label={`Update status for ${grant.title}`}
                      onChange={(event) =>
                        updateStatus(grant.id, event.target.value)
                      }
                    >
                      {GRANT_STATUSES.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="admin-empty">No grants match your filters.</p>
          )}
        </div>

        {selected && (
          <aside className="admin-panel">
            <div className="admin-panel__header">
              <h2 className="admin-panel__title">{selected.title}</h2>
              <button
                type="button"
                className="admin-panel__close"
                onClick={() => setSelectedId(null)}
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            <dl className="admin-panel__details">
              <div>
                <dt>Amount</dt>
                <dd>{selected.amount}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{selected.location}</dd>
              </div>
              <div>
                <dt>Deadline</dt>
                <dd>{selected.deadline}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  <StatusBadge status={selected.status} label={selected.status} />
                </dd>
              </div>
              <div>
                <dt>Last updated</dt>
                <dd>{selected.updatedAt}</dd>
              </div>
            </dl>

            <p className="admin-panel__description">{selected.description}</p>
          </aside>
        )}
      </div>
    </div>
  );
}
