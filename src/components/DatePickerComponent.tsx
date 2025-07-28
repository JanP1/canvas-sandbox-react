import "../styles/DatePicker.css";
import { useEffect, useRef, useState } from "react";

interface DatePickerProps {
  value: Date | null;
  onDateChange: (date: Date) => void;
}



const Dropdown = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: (number | string)[];
  value: number | "";
  onChange: (val: number | "") => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: number) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className="custom-dropdown" ref={ref}>
      <div className="selected-value" onClick={() => setOpen(!open)}>
        <div className="left-grid-column">
          {value || label}
        </div>
        <svg
          className={`dropdown-arrow ${open ? "rotate" : ""}`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L6 6L11 1"  strokeWidth="2" fill="none" />
        </svg>
      </div>
      {open && (
        <div className="dropdown-options">
          {options.map((opt) => (
            <div
              key={opt}
              className="dropdown-option"
              onClick={() => handleSelect(Number(opt))}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



export const DatePickerComponent = ({ value, onDateChange }: DatePickerProps) => {
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
      <Dropdown label="Day" options={days} value={day} onChange={setDay} />
      <Dropdown label="Month" options={months} value={month} onChange={setMonth} />
      <Dropdown label="Year" options={years} value={year} onChange={setYear} />
    </div>
  );
};




// import { useEffect, useState } from "react";
// import "../styles/DatePicker.css"
//
// interface DatePickerProps {
//   value: Date | null;
//   onDateChange: (date: Date) => void;
// }
//
// export const DatePickerComponent = ({value, onDateChange} : DatePickerProps) => {
//   const [day, setDay] = useState<number | "">("");
//   const [month, setMonth] = useState<number | "">("");
//   const [year, setYear] = useState<number | "">("");
//
//   useEffect(() => {
//     if (day !== "" && month !== "" && year !== "") {
//       const newDate = new Date(year, month - 1, day);
//       if (!value || newDate.getTime() !== value.getTime()) {
//         onDateChange(newDate);
//       }
//     }
//   }, [day, month, year]);
//
//   const days = Array.from({ length: 31 }, (_, i) => i + 1);
//   const months = Array.from({ length: 12 }, (_, i) => i + 1);
//   const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
//
//   return (
//     <div className="date-picker-container">
//       <select className="select-field" value={day} onChange={(e) => setDay(Number(e.target.value) || "")}>
//         <option value="">Day</option>
//         {days.map((d) => (
//           <option key={d} value={d}>{d}</option>
//         ))}
//
//
//       </select>
//
//       <select className="select-field" value={month} onChange={(e) => setMonth(Number(e.target.value) || "")}>
//         <option value="">Month</option>
//         {months.map((m) => (
//           <option key={m} value={m}>{m}</option>
//         ))}
//
//
//       </select>
//
//       <select className="select-field" value={year} onChange={(e) => setYear(Number(e.target.value) || "")}>
//         <option value="">Year</option>
//         {years.map((y) => (
//           <option key={y} value={y}>{y}</option>
//         ))}
//
//
//       </select>
//     </div>
//   )
// }
