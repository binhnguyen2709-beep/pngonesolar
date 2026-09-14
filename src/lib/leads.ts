import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export interface LeadRecord {
  id: string;
  createdAt: string;
  source: "calculator" | "contact" | "project-cta";
  name: string;
  phone: string;
  email?: string;
  address?: string;
  note?: string;
  meta?: Record<string, unknown>;
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function ensureStore() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(LEADS_FILE, "utf-8");
  } catch {
    await writeFile(LEADS_FILE, "[]", "utf-8");
  }
}

export async function getLeads(): Promise<LeadRecord[]> {
  await ensureStore();
  const raw = await readFile(LEADS_FILE, "utf-8");
  try {
    return JSON.parse(raw) as LeadRecord[];
  } catch {
    return [];
  }
}

export async function deleteLead(id: string): Promise<void> {
  await ensureStore();
  const raw = await readFile(LEADS_FILE, "utf-8");
  const list: LeadRecord[] = JSON.parse(raw);
  const filtered = list.filter((lead) => lead.id !== id);
  await writeFile(LEADS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
}

export async function saveLead(lead: Omit<LeadRecord, "id" | "createdAt">): Promise<LeadRecord> {
  await ensureStore();

  const record: LeadRecord = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const raw = await readFile(LEADS_FILE, "utf-8");
  const list: LeadRecord[] = JSON.parse(raw);
  list.unshift(record);
  await writeFile(LEADS_FILE, JSON.stringify(list, null, 2), "utf-8");

  return record;
}
