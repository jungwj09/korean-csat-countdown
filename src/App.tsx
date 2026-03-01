import "./App.css";
import { useCountdown } from "./hooks/useCountdown";
import { useYearParam } from "./hooks/useYearParam";
import {
  getCsatDate,
  getCsatYear,
  CLOCK_TITLE,
  TARGET_LABEL,
  TARGET_LABEL_SHORT,
} from "./constants/targetDate";
import CountdownClock from "./components/CountdownClock";
import MotivationMessage from "./components/MotivationMessage";
import Copyright from "./components/Copyright";
import YearSelector from "./components/YearSelector";
import { useMemo } from "react";

export default function App() {
  const { selectedYear, changeYear } = useYearParam();

  const targetDate = useMemo(() => {
    const csatYear = getCsatYear(2000 + selectedYear); // 2009 + 18 = 2027 ✓
    return getCsatDate(csatYear);
  }, [selectedYear]);

  const { timeLeft, isFinished } = useCountdown(targetDate);

  const copyTime = () => {
    const text = isFinished
      ? "수능이 시작되었습니다. 지금까지의 노력이 결실을 맺길!"
      : `${TARGET_LABEL_SHORT(selectedYear)}까지 ${timeLeft.days}일 ${timeLeft.hours}시간 ${timeLeft.minutes}분 ${timeLeft.seconds}초 남았습니다.`;
    navigator.clipboard.writeText(text);
    alert("복사되었습니다!");
  };

  return (
    <>
      <div className="clock-container">
        <h1 className="clock-title">{CLOCK_TITLE(selectedYear)}</h1>
        <p className="clock-subtitle">{TARGET_LABEL(targetDate)}</p>
        <YearSelector selectedYear={selectedYear} onChange={changeYear} />
        <CountdownClock timeLeft={timeLeft} />
        <MotivationMessage />
        {isFinished && <h2>수능이 시작되었습니다.</h2>}
        <button onClick={copyTime}>시간 복사하기</button>
      </div>
      <Copyright />
    </>
  );
}