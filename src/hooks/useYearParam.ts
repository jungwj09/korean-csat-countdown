import { useState, useEffect } from "react";
import { BIRTH_YEARS, type BirthYear } from "../constants/targetDate";

const DEFAULT_YEAR: BirthYear = 9;

function parseYearParam(): BirthYear {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("year");
  if (raw === null) return DEFAULT_YEAR;
  const num = parseInt(raw, 10);
  if ((BIRTH_YEARS as readonly number[]).includes(num)) {
    return num as BirthYear;
  }
  return DEFAULT_YEAR;
}

export function useYearParam() {
  const [selectedYear, setSelectedYear] = useState<BirthYear>(parseYearParam);

  const changeYear = (year: BirthYear) => {
    setSelectedYear(year);
    const params = new URLSearchParams(window.location.search);
    params.set("year", String(year));
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  // 브라우저 뒤로가기/앞으로가기 대응
  useEffect(() => {
    const onPop = () => setSelectedYear(parseYearParam());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return { selectedYear, changeYear };
}