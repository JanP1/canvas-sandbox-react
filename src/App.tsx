import './App.css'
import { useState } from 'react';
import { DatePickerComponent } from './components/DatePickerComponent'

function App() {

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected date:", date.toISOString());
  };

  return (
    <>
      <div className='spa-layout-container'>
        <DatePickerComponent value={selectedDate} onDateChange={handleDateChange}/>

        <div className='test-div'></div>
        

      </div>
    </>
  )
}

export default App
