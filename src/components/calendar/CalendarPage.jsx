import React from 'react';
import ReactDOM from 'react-dom';
import '../../../node_modules/fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import FullCalendar from 'fullcalendar-reactwrapper';

class CalendarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events:[
        {
          title: 'All Day Event',
          start: '2017-05-01'
        },
        {
          title: 'Long Event',
          start: '2017-05-07',
          end: '2017-05-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2017-05-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2017-05-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2017-05-11',
          end: '2017-05-13'
        },
        {
          title: 'Meeting',
          start: '2017-05-12T10:30:00',
          end: '2017-05-12T12:30:00'
        },
        {
          title: 'Birthday Party',
          start: '2017-05-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2017-05-28'
        }
      ],
    }
  }

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
          events={this.state.events}
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
