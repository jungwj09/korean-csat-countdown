export function getCsatDate(year: number): Date {
  const nov1 = new Date(year, 10, 1);
  const dayOfWeek = nov1.getDay();
  const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
  const firstThursday = 1 + daysUntilThursday;
  const thirdThursday = firstThursday + 14;
  return new Date(year, 10, thirdThursday, 8, 10, 0);
}

// 출생연도(4자리) -> 수능연도: 2008 → 2026, 2009 → 2027, ...
export function getCsatYear(birthYear: number): number {
  return birthYear + 18;
}

export const BIRTH_YEARS = [8, 9, 10, 11, 12, 13, 14] as const;
export type BirthYear = typeof BIRTH_YEARS[number];

export const CLOCK_TITLE = (birthYear: number) =>
  `${String(birthYear).padStart(2, "0")}년생이 수능보는 날까지`;

export const TARGET_LABEL = (csatDate: Date) => {
  const y = csatDate.getFullYear();
  const m = csatDate.getMonth() + 1;
  const d = csatDate.getDate();
  return `${y}년 ${m}월 ${d}일 오전 8시 10분까지\n배정받은 교실로 입실하세요.`;
};

export const TARGET_LABEL_SHORT = (birthYear: number) =>
  `${String(birthYear).padStart(2, "0")}년생 수능`;