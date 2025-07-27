import { useState } from "react";
import "../styles/DatePicker.css"

interface DatePickerProps {
  date: Date;
}
export const DatePickerComponent = (props : DatePickerProps) => {
  const [date, setDate] = useState();
  return (
    <div>
      
    </div>
  )
}
