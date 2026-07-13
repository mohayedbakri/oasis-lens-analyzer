import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { SudanMap } from "@/components/poc/dashboard/SudanMap";
import { RoadmapSidebar } from "@/components/poc/dashboard/RoadmapSidebar";
import { TasksPanel } from "@/components/poc/dashboard/TasksPanel";
import { StateDetailDrawer } from "@/components/poc/dashboard/StateDetailDrawer";
import type { StageId } from "@/lib/oasis-data";

const searchSchema = z.object({
  stage: fallback(
    z.enum(["feasibility", "planning", "financing", "build", "operate", "scale"]).optional(),
    undefined,
  ),
  state: fallback(z.string().optional(), undefined),
});

export const Route = createFileRoute("/poc/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Oasis Lens Analyzer — National RSIC Dashboard" },
      {
        name: "description",
        content:
          "Interactive national dashboard: Sudan map with per-state RSIC data, the roadmap to build a complex, and measurable running tasks.",
      },
      { property: "og:title", content: "Oasis Lens Analyzer — National RSIC Dashboard" },
      {
        property: "og:description",
        content: "Sudan map, RSIC roadmap, and measurable tasks in one linked view.",
      },
    ],
    links: [{ rel: "canonical", href: "/poc" }],
  }),
  component: NationalDashboard,
});

function NationalDashboard() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const stage: StageId | null = search.stage ?? null;
  const stateId: string | null = search.state ?? null;
  const [drawerId, setDrawerId] = useState<string | null>(null);

  const setStage = (s: StageId | null) =>
    navigate({ search: (p) => ({ ...p, stage: s ?? undefined }) });
  const setState = (id: string | null) =>
    navigate({ search: (p) => ({ ...p, state: id ?? undefined }) });

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="order-2 lg:order-1">
          <RoadmapSidebar activeStage={stage} onSelect={setStage} />
        </div>
        <div className="order-1 space-y-6 lg:order-2">
          <SudanMap
            selectedStateId={stateId}
            filterStage={stage}
            onSelect={(id) => {
              setState(id);
              setDrawerId(id);
            }}
          />
          <TasksPanel
            activeStage={stage}
            activeStateId={stateId}
            onSelectState={setState}
          />
        </div>
      </div>

      <StateDetailDrawer stateId={drawerId} onClose={() => setDrawerId(null)} />
    </section>
  );
}
