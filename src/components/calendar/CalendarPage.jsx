import React from 'react';
import ReactDOM from 'react-dom';
import '../../../node_modules/fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import FullCalendar from 'fullcalendar-reactwrapper';

class CalendarComponent extends React.Component {
  render() {
    return (
      <div id="calendar-component">
        <FullCalendar
          id="main-calendar"
          header={{
            left: 'prev, next today myCustomButton',
            center: 'title',
            right: 'month,basicWeek,basicDay'
          }}
          defaultDate={'2019-03-03'}
          navLinks={true}
          editable={true}
          eventLimit={true}
        />
      </div>
    )
  }
}


export default function CalendarPage() {
  return (
    <div id="calendar-page">
      <CalendarComponent/>
    </div>
  )
}
