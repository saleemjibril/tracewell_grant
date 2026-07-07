"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { fetchGrantFilters, fetchGrants } from "../lib/api";
import GrantCard, { SearchIcon } from "./GrantCard";

function getDefaultTagForTab(tags, tabId) {
  return tags?.[tabId]?.[0]?.id ?? null;
}

export default function GrantDirectory({ id = "grants", previewLimit = 9 }) {
  const isFullPage = previewLimit === null;
  const [filterTabs, setFilterTabs] = useState([]);
  const [tabTags, setTabTags] = useState({});
  const [filtersReady, setFiltersReady] = useState(false);
  const [filtersError, setFiltersError] = useState("");

  const [activeTab, setActiveTab] = useState("popular-funders");
  const [activeTags, setActiveTags] = useState({});
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [grants, setGrants] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [grantsError, setGrantsError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let cancelled = false;

    async function loadFilters() {
      try {
        const data = await fetchGrantFilters();
        if (cancelled) return;

        setFilterTabs(data.tabs ?? []);
        setTabTags(data.tags ?? {});

        const defaultTab = data.tabs?.[0]?.id ?? "popular-funders";
        const defaultTag = getDefaultTagForTab(data.tags, defaultTab);

        setActiveTab(defaultTab);
        setActiveTags({ [defaultTab]: defaultTag });
        setFiltersReady(true);
        setFiltersError("");
      } catch {
        if (!cancelled) {
          setFiltersError("Unable to load grant filters.");
          setFiltersReady(true);
        }
      }
    }

    loadFilters();

    return () => {
      cancelled = true;
    };
  }, []);

  const activeTag = activeTags[activeTab] ?? getDefaultTagForTab(tabTags, activeTab);
  const currentTags = tabTags[activeTab] ?? [];

  const loadGrants = useCallback(async () => {
    if (!filtersReady || !activeTag) return;

    setLoading(true);
    setGrantsError("");

    try {
      const result = await fetchGrants({
        q: debouncedSearch || undefined,
        tab: activeTab,
        tag: activeTag,
        page: 1,
        limit: isFullPage ? 100 : previewLimit,
      });

      setGrants(result.data ?? []);
      setHasMore(Boolean(result.pagination?.hasMore));
    } catch {
      setGrants([]);
      setHasMore(false);
      setGrantsError("Unable to load grants. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [
    activeTab,
    activeTag,
    debouncedSearch,
    filtersReady,
    isFullPage,
    previewLimit,
  ]);

  useEffect(() => {
    loadGrants();
  }, [loadGrants]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    setActiveTags((prev) => {
      if (prev[tabId]) return prev;
      return { ...prev, [tabId]: getDefaultTagForTab(tabTags, tabId) };
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
              onChange={(event) => setSearch(event.target.value)}
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

        {filtersError ? (
          <p className="grant-opportunities__empty" role="alert">
            {filtersError}
          </p>
        ) : (
          <div className="grant-opportunities__filters">
            <div className="grant-opportunities__tabs-scroll">
              <div className="grant-opportunities__tabs" role="tablist">
                {filterTabs.map((tab) => (
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
                    setActiveTags((prev) => ({
                      ...prev,
                      [activeTab]: tag.id,
                    }));
                  }}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grant-opportunities__grid">
          {loading ? (
            <p className="grant-opportunities__empty">Loading grants...</p>
          ) : grantsError ? (
            <p className="grant-opportunities__empty" role="alert">
              {grantsError}{" "}
              <button
                type="button"
                className="grant-opportunities__retry"
                onClick={loadGrants}
              >
                Retry
              </button>
            </p>
          ) : grants.length > 0 ? (
            grants.map((grant) => <GrantCard key={grant.id} grant={grant} />)
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
