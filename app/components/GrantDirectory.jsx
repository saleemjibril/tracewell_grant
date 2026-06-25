"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FILTER_TABS,
  GRANTS,
  TAB_TAGS,
  getDefaultTagForTab,
  grantMatchesTabTag,
} from "../data/grants";
import GrantCard, { SearchIcon } from "./GrantCard";

export default function GrantDirectory({ id = "grants", previewLimit = 9 }) {
  const isFullPage = previewLimit === null;
  const [activeTab, setActiveTab] = useState("popular-funders");
  const [activeTags, setActiveTags] = useState(() => ({
    "popular-funders": getDefaultTagForTab("popular-funders"),
  }));
  const [search, setSearch] = useState("");

  const activeTag = activeTags[activeTab] ?? getDefaultTagForTab(activeTab);
  const currentTags = TAB_TAGS[activeTab] ?? [];

  const filteredGrants = useMemo(() => {
    const query = search.trim().toLowerCase();

    return GRANTS.filter((grant) => {
      if (!grantMatchesTabTag(grant, activeTab, activeTag)) return false;
      if (!query) return true;

      return [
        grant.amount,
        grant.title,
        grant.deadline,
        grant.description,
        grant.location,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [activeTab, activeTag, search]);

  const visibleGrants = isFullPage
    ? filteredGrants
    : filteredGrants.slice(0, previewLimit);
  const hasMore = !isFullPage && filteredGrants.length > previewLimit;

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    setActiveTags((prev) => {
      if (prev[tabId]) return prev;
      return { ...prev, [tabId]: getDefaultTagForTab(tabId) };
    });
  };

  return (
    <section
      className={`grant-opportunities${
        isFullPage ? " grant-opportunities--full" : ""
      }`}
      id={id}
    >
      <div className="grant-opportunities__inner">
        <div className="grant-opportunities__header">
          <div className="grant-opportunities__intro">
            <h2 className="grant-opportunities__title">
              Explore active grant opportunities
            </h2>
            <p className="grant-opportunities__subtitle">
              Browse curated grant opportunities for nonprofits, startups,
              researchers, and impact driven organizations updated weekly.
            </p>
          </div>

          <div className="grant-opportunities__search">
            <input
              type="search"
              className="grant-opportunities__search-input"
              placeholder="Browse active grants by sectors, locations, and more..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search grants"
            />
            <button
              type="button"
              className="grant-opportunities__search-btn"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        <div className="grant-opportunities__filters">
          <div className="grant-opportunities__tabs-scroll">
            <div className="grant-opportunities__tabs" role="tablist">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`tabpanel-${tab.id}`}
                  className={`grant-opportunities__tab${
                    activeTab === tab.id
                      ? " grant-opportunities__tab--active"
                      : ""
                  }`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            className="grant-opportunities__tags"
          >
            {currentTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                className={`grant-opportunities__tag${
                  activeTag === tag.id
                    ? " grant-opportunities__tag--active"
                    : ""
                }`}
                onClick={() => {
                  setActiveTags((prev) => ({ ...prev, [activeTab]: tag.id }));
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grant-opportunities__grid">
          {visibleGrants.length > 0 ? (
            visibleGrants.map((grant) => (
              <GrantCard key={grant.id} grant={grant} />
            ))
          ) : (
            <p className="grant-opportunities__empty">
              No grants match your current filters.
            </p>
          )}
        </div>

        {isFullPage ? (
          <Link href="/#grants" className="grant-opportunities__show-more">
            Show less
          </Link>
        ) : hasMore ? (
          <Link href="/grants" className="grant-opportunities__show-more">
            Show more
          </Link>
        ) : null}
      </div>
    </section>
  );
}
