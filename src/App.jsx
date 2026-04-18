import { useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEYS = {
  session: "lab_portal_session",
  results: "lab_portal_results",
  entryMode: "lab_portal_entry_mode",
  form: "lab_portal_manual_form",
  scanForm: "lab_portal_scan_form",
  extractedData: "lab_portal_extracted_data",
  employees: "lab_portal_employees",
};

const HOSPITAL_NAME = "King Salman Armed Forces Hospital";
const SYSTEM_NAME = "Zero Downtime Lab Portal Prototype";

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const defaultResults = [
  {
    id: "res-1",
    barcode: "LIS-001",
    mrn: "MRN-102344",
    patient: "Ahmed",
    test: "Potassium",
    result: "6.5",
    status: "Critical",
    time: "10:32",
    note: "Issued during LIS downtime",
    technician: "Fatimah",
    synced: false,
    source: "Manual Entry",
    createdAt: "2026-04-18 10:32",
  },
  {
    id: "res-2",
    barcode: "LIS-002",
    mrn: "MRN-102355",
    patient: "Sara",
    test: "CBC",
    result: "WBC: 8.5 | RBC: 4.7 | Hb: 13.2 | Platelets: 220",
    status: "Normal",
    time: "10:38",
    note: "Queued for LIS reconciliation",
    technician: "Mona",
    synced: false,
    source: "Scanned Sheet",
    createdAt: "2026-04-18 10:38",
  },
];

const fixedUsers = {
  admin: {
    username: "admin",
    password: "1234",
    role: "Admin",
    name: "System Administrator",
    active: true,
  },
  doctor: {
    username: "doctor",
    password: "1234",
    role: "Doctor",
    name: "Duty Doctor",
    active: true,
  },
};

const defaultEmployees = [
  {
    id: 1,
    username: "lab",
    password: "1234",
    role: "Lab",
    name: "Laboratory Staff",
    active: true,
  },
];

const defaultManualForm = {
  barcode: "",
  mrn: "",
  patient: "",
  test: "CBC",
  result: "",
  cbc: {
    wbc: "",
    rbc: "",
    hb: "",
    platelets: "",
  },
  time: "",
  technician: "",
};

const defaultScanForm = {
