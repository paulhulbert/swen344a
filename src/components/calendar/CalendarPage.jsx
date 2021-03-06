import React, { PureComponent } from 'react';
import { Button, Grid, Container, Header, Icon, Modal, Input, Label, Form } from 'semantic-ui-react';
import '../../../node_modules/fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import FullCalendar from 'fullcalendar-reactwrapper';
import LoadingState from '../common/LoadingState';
import firebase from 'firebase/app';
import 'firebase/database';

export default class CalendarPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      eventsFetching: false,
      events: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    let current = this;
    this.setState({ eventsFetching: true });

    firebase.database().ref('events').on('value', function(snapshot) {
      try {
        const events = snapshot.val();
        if (events) {
          var list = [];
          for (var key in events) {
            if (events[key].start) {
              var line = {
                title: events[key].title,
                start: events[key].start,
                end: events[key].start,
              };
              list.push(line);
            }
          }
          current.setState({
            eventsFetching: false,
            events: list,
          });
        } else {
          current.setState({
            eventsFetching: false,
            events: [],
          });
        }
      }
      catch (err) {
        console.log(err);
      }
    });
  }

  addEvent() {
    var dateStr = prompt('Enter a date in YYYY-MM-DD format');
    var date = new Date(dateStr + 'T00:00:00'); // will be in local time
    var desc = prompt('Enter a title description for your event');
    if ((!isNaN(date.valueOf())) && (desc != '')) { // valid?
      var event = {
        end: date,
        start: date,
        title: desc,
      }
      var newEventKey = firebase.database().ref().child('events').push().key;
      var updates = {};
      updates['/events/' + newEventKey] = event;
      return firebase.database().ref().update(updates);
    } else {
      alert('Invalid input, please try again.');
    }
  }

  handleSubmit(e){
    e.preventDefault();
    const selectedFile = e.target.input.files[0];
    console.log('Selected File', selectedFile);
    fetch(selectedFile.name).then(response => {
      return response.json();
    }).then(data => {
      var event = {
        end: data.start,
        start: data.start,
        title: data.title,
      }
      var newEventKey = firebase.database().ref().child('events').push().key;
      var updates = {};
      updates['/events/' + newEventKey] = event;
      return firebase.database().ref().update(updates);

    }).catch(err => {
      console.log("error reading data" + err);
    });
  }

  render() {
    const { events } = this.state;

    return (
      <Container>
        <Grid
          columns={1}
          stretched={true}
        >
          <Grid.Column>
            <FullCalendar
              id="main-calendar"
              header={{
                left: 'prev, next today',
                center: 'addEventButton',
                right: 'month,basicWeek,basicDay'
              }}
              customButtons={{
                addEventButton: {
                  text: 'add event...',
                  click: this.addEvent
                },
              }}
              navLinks={true}
              editable={true}
              eventLimit={true}
              events={events}
            />
            <Form onSubmit={this.handleSubmit}>
              <Input
                type="file"
                name="input"
                required
                accept=".json"
              />
              <Button type="submit">Upload event</Button>
            </Form>
            Must be a .json file in the public folder of the repository
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
