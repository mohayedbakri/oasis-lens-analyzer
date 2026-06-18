// Phase-1 data layer for the Al-Bergig PoC dashboard.
// Reads from a public Google Sheet "Publish to web → CSV" link when configured,
// otherwise falls back to bundled JSON so the page always renders.
//
// Future phases: swap fetchPocData() to call a server function / API.

import { queryOptions } from "@tanstack/react-query";
import fallback from "./poc-fallback.json";
import { pocConfig } from "./site";

export type UnitType = "mill" | "silo" | "packaging" | "admin" | "training" | "energy";
export type UnitStatus = "planned" | "in_progress" | "done" | "blocked";
export type WpCategory =
  | "agreement"
  | "due_diligence"
  | "mou"
  | "procurement"
  | "civil"
  | "training";
export type WpStatus = "planned" | "in_progress" | "done" | "blocked";

export interface Unit {
  id: string;
  name_ar: string;
  type: UnitType;
  status: UnitStatus;
  x: number;
  y: number;
  z: number;
}

export interface WorkPackage {
  id: string;
  unit_id: string;
  name_ar: string;
  category: WpCategory;
  status: WpStatus;
  progress_pct: number;
  planned_start: string;
  planned_end: string;
  actual_start: string | null;
  actual_end: string | null;
  doc_url: string;
}

export interface Funding {
  work_package_id: string;
  allocated_usd: number;
  received_usd: number;
}

export interface PocDocument {
  id: string;
  title_ar: string;
  type: string;
  url: string;
  work_package_id: string;
}

export interface PocSnapshot {
  lastUpdated: string;
  units: Unit[];
  work_packages: WorkPackage[];
  funding: Funding[];
  documents: PocDocument[];
  source: "sheet" | "fallback";
}

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.replace(/\r/g, "").trim().split("\n");
  if (lines.length < 2) return [];
  const split = (line: string) => {
    const out: string[] = [];
    let cur = "";
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQ && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQ = !inQ;
      } else if (c === "," && !inQ) {
        out.push(cur);
        cur = "";
      } else cur += c;
    }
    out.push(cur);
    return out;
  };
  const headers = split(lines[0]).map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cols = split(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => (row[h] = (cols[i] ?? "").trim()));
    return row;
  });
}

async function fetchSheet(url: string): Promise<PocSnapshot | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const csv = await res.text();
    const rows = parseCsv(csv);
    // Sheet contract: each row has a "table" column identifying which dataset it belongs to.
    // Simplest single-CSV design — field team uses one tab.
    const units: Unit[] = [];
    const wps: WorkPackage[] = [];
    const funding: Funding[] = [];
    const docs: PocDocument[] = [];
    for (const r of rows) {
      const t = r.table;
      if (t === "unit") {
        units.push({
          id: r.id,
          name_ar: r.name_ar,
          type: r.type as UnitType,
          status: r.status as UnitStatus,
          x: Number(r.x) || 0,
          y: Number(r.y) || 0,
          z: Number(r.z) || 0,
        });
      } else if (t === "wp") {
        wps.push({
          id: r.id,
          unit_id: r.unit_id,
          name_ar: r.name_ar,
          category: r.category as WpCategory,
          status: r.status as WpStatus,
          progress_pct: Number(r.progress_pct) || 0,
          planned_start: r.planned_start,
          planned_end: r.planned_end,
          actual_start: r.actual_start || null,
          actual_end: r.actual_end || null,
          doc_url: r.doc_url || "#",
        });
      } else if (t === "funding") {
        funding.push({
          work_package_id: r.work_package_id,
          allocated_usd: Number(r.allocated_usd) || 0,
          received_usd: Number(r.received_usd) || 0,
        });
      } else if (t === "doc") {
        docs.push({
          id: r.id,
          title_ar: r.title_ar,
          type: r.type,
          url: r.url || "#",
          work_package_id: r.work_package_id,
        });
      }
    }
    if (units.length === 0 && wps.length === 0) return null;
    return {
      lastUpdated: new Date().toISOString(),
      units,
      work_packages: wps,
      funding,
      documents: docs,
      source: "sheet",
    };
  } catch {
    return null;
  }
}

export async function fetchPocData(): Promise<PocSnapshot> {
  if (pocConfig.sheetCsvUrl) {
    const live = await fetchSheet(pocConfig.sheetCsvUrl);
    if (live) return live;
  }
  return { ...(fallback as Omit<PocSnapshot, "source">), source: "fallback" };
}

export const pocQueryOptions = queryOptions({
  queryKey: ["poc"],
  queryFn: fetchPocData,
  staleTime: 30_000,
  refetchInterval: pocConfig.refreshIntervalMs,
});
