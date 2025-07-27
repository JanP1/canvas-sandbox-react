import { useEffect, useState } from "react";
import "../styles/DatePicker.css"

interface DatePickerProps {
  value: Date | null;
  onDateChange: (date: Date) => void;
}

export const DatePickerComponent = ({value, onDateChange} : DatePickerProps) => {
  const [day, setDay] = useState<number | "">("");
  const [month, setMonth] = useState<number | "">("");
  const [year, setYear] = useState<number | "">("");

  useEffect(() => {
    if (day !== "" && month !== "" && year !== "") {
      const newDate = new Date(year, month - 1, day);
      if (!value || newDate.getTime() !== value.getTime()) {
        onDateChange(newDate);
      }
    }
  }, [day, month, year]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="date-picker-container">
      <select className="select-field" value={day} onChange={(e) => setDay(Number(e.target.value) || "")}>
        <option value="">Day</option>
        {days.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      

      </select>
    
      <select className="select-field" value={month} onChange={(e) => setMonth(Number(e.target.value) || "")}>
        <option value="">Month</option>
        {months.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      

      </select>
      
      <select className="select-field" value={year} onChange={(e) => setYear(Number(e.target.value) || "")}>
        <option value="">Year</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      

      </select>
    </div>
  )
}
