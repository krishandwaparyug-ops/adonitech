// utils/csvLoader.js
import Papa from "papaparse";

export async function loadCsv(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    return Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
    }).data;
  } catch (err) {
    console.error("Error loading CSV:", url, err);
    return [];
  }
}
