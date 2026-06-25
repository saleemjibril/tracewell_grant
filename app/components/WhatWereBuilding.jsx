"use client";

import { useState } from "react";
import { BUILDING_STAGES } from "../data/buildingStages";
import PortalCard from "./PortalCard";
import { STAGE_ICONS } from "./StageIcons";

export default function WhatWereBuilding() {
  const [activeStage, setActiveStage] = useState(BUILDING_STAGES[0].id);
  const stage =
    BUILDING_STAGES.find((s) => s.id === activeStage) ?? BUILDING_STAGES[0];

  return (
    <section className="what-were-building" id="what-were-building">
      <div className="what-were-building__inner">
        <div className="what-were-building__intro">
          <span className="what-were-building__badge">What we&apos;re building</span>
          <div className="what-were-building__headlines">
            <h2 className="what-were-building__title">
              The infrastructure the sector has always needed
            </h2>
            <p className="what-were-building__subtitle">
              Six stages. Two portals. One compounding trust system that gets
              stronger with every grant delivered.
            </p>
          </div>
        </div>

        <div className="what-were-building__panel">
          <div
            className="what-were-building__stages"
            role="tablist"
            aria-label="Building stages"
          >
            {BUILDING_STAGES.map((item) => {
              const Icon = STAGE_ICONS[item.id];
              const isActive = activeStage === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={item.label}
                  className={`what-were-building__stage${
                    isActive ? " what-were-building__stage--active" : ""
                  }`}
                  onClick={() => setActiveStage(item.id)}
                >
                  <Icon active={isActive} />
                </button>
              );
            })}
          </div>

          <div
            className="what-were-building__cards"
            role="tabpanel"
            aria-label={`${stage.label} stage`}
          >
            <PortalCard portal={stage.seeker} />
            <PortalCard portal={stage.funder} />
          </div>
        </div>
      </div>
    </section>
  );
}
