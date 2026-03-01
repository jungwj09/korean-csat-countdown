import { BIRTH_YEARS, type BirthYear } from "../constants/targetDate";
import "./YearSelector.css";

interface Props {
  selectedYear: BirthYear;
  onChange: (year: BirthYear) => void;
}

export default function YearSelector({ selectedYear, onChange }: Props) {
  return (
    <div className="year-selector" role="tablist" aria-label="출생연도 선택">
      {BIRTH_YEARS.map((y) => (
        <button
          key={y}
          className={`year-chip${selectedYear === y ? " active" : ""}`}
          onClick={() => onChange(y)}
          role="tab"
          aria-selected={selectedYear === y}
        >
          {String(y).padStart(2, "0")}년생
        </button>
      ))}
    </div>
  );
}