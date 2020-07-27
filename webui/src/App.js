import React, { Component } from 'react';
import { Image, Header, Container, Grid, Statistic } from 'semantic-ui-react';
import AppHeader from './AppHeader';
import MeritEntryView from './MeritEntryView';
import MeritHistory from './MeritHistory';
import KarmaStatistics from './KarmaStatistics';

class App extends Component {
  state = {meritEntryMode: null, karma: 0};
  render() {
    return (
      <Container text>
        <Grid centered padded celled='internally' columns={1}>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <AppHeader />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <MeritEntryView
                karma={this.state.karma}
                meritEntryMode={this.state.meritEntryMode}
                onUpdateEntryMode={newMode => this.setState({meritEntryMode: newMode})}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <KarmaStatistics
                goodKarma={10}
                badKarma={8}
                netKarma={2}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Header as='h1' content='Total Karma' />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Statistic size='huge'>
                    <Statistic.Value>2</Statistic.Value>
                      <Statistic.Label>
                        <Image src='https://www.kineticcu.com/sites/www.kineticcu.com/files/checking_piggy_bank.png'  />
                      </Statistic.Label>
                    </Statistic>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
