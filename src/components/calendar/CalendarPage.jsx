import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import '../../../node_modules/fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import FullCalendar from 'fullcalendar-reactwrapper';

export default function CalendarPage() {
  return (
    <Container>
      <Grid
        columns={1}
        stretched
      >
        <Grid.Column>
          <FullCalendar
            id="main-calendar"
            header={{
              left: 'prev, next today myCustomButton',
              center: 'title',
              right: 'month,basicWeek,basicDay',
            }}
            navLinks
            editable
            eventLimit
          />
        </Grid.Column>
      </Grid>
    </Container>
  );
}
