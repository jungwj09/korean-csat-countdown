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

export const BIRTH_YEARS = [8, 9, 10, 11, 12, 13, 14, 15] as const;
export type BirthYear = typeof BIRTH_YEARS[number];

function getSubjectParticle(n: number): string {
  const ones = n % 10;
  return [0, 1, 3, 6, 7, 8].includes(ones) ? "이" : "가";
}

export const CLOCK_TITLE = (birthYear: number) => {
  const teamNum = String(birthYear).padStart(2, "0");
  const particle = getSubjectParticle(birthYear);
  return `TEAM${teamNum}${particle} 수능보는 날까지`;
};

export const TARGET_LABEL = (csatDate: Date) => {
  const y = csatDate.getFullYear();
  const m = csatDate.getMonth() + 1;
  const d = csatDate.getDate();
  return `${y}년 ${m}월 ${d}일 오전 8시 10분까지\n배정받은 교실로 입실하세요.`;
};

export const TARGET_LABEL_SHORT = (birthYear: number) => {
  const teamNum = String(birthYear).padStart(2, "0");
  return `TEAM${teamNum} 수능`;
};