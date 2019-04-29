import React, { PureComponent } from 'react';
import { Button, Grid, Container, Header, Icon, Modal, Input } from 'semantic-ui-react';
import '../../../node_modules/fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import FullCalendar from 'fullcalendar-reactwrapper';
import LoadingState from '../common/LoadingState';

export default class CalendarPage extends PureComponent {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  componentWillMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.setState({
      eventsFetching: true,
    })
    // use mock data
    this.eventsFetched([
      {
        title: 'test event',
        start: '2019-04-29'
      },
    ]);
  }

  eventsFetched(events) {
    this.setState({
      eventsFetching: false,
      events: events
    })
  }

  state = { open: false }
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  submit() {
    console.log('Submitted');
    this.setState({ open: false })
  }

  render() {
    if (this.state.eventsFetching) {
      return <LoadingState />;
    }

    const { open } = this.state

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
                left: 'prev, next today myCustomButton',
                center: 'title',
                right: 'month,basicWeek,basicDay'
              }}
              navLinks={true}
              editable={true}
              eventLimit={true}
              events={this.state.events}
            />

            <Modal
              open={open}
              onOpen={this.open}
              onClose={this.close}
              size='small'
              trigger={<Button primary={true}><Icon name='plus' circular />Create Event</Button>}
            >
              <Modal.Header>Event Creation</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Input label='Title' placeholder='Your event title here...' />
                  <Input label='Date' placeholder='YYYY-MM-DD' value={this.state.date}/>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button icon='x' content='Cancel' onClick={this.close} />
                <Button color='green' icon='plus' content='Create' onClick={this.submit} />
            </Modal.Actions>
            </Modal>
            <Button icon='upload' content='Upload Event' />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
