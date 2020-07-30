import React, { Component } from 'react';
import { Header, Container, Grid } from 'semantic-ui-react';
import io from 'socket.io-client';
import moment from 'moment';
import AppHeader from './AppHeader';
import SignInView from './SignInView';
import UserBar from './UserBar';
import KarmaEntryView from './KarmaEntryView';
import KarmaStatistics from './KarmaStatistics';
import TotalKarma from './TotalKarma';
import ChildSelector from './ChildSelector';
import KarmaHistory from './KarmaHistory';

const socket = io();
socket.on('utcOffset', (unused, cb) => cb(moment().utcOffset()));

class App extends Component {
  state = {
    karmaEntryMode: null,
    karma: 0,
    loggedIn: false,
    parent: false,
    child: false,
    selectedChild: {id: null},
    childStatisticsId: null,
    loadingKarma: false,
    dailyGoodKarma: 0,
    dailyBadKarma: 0,
    dailyNetKarma: 0,
    totalGoodKarma: 0,
    totalBadKarma: 0,
    totalNetKarma: 0,
  };

  kids = [];

  async onSuccessfulSignIn() {
    var res = await fetch('/api/user');
    if (res.ok) {
      var json = await res.json();
      if (json.isParent) {
        this.kids = json.Children;
        this.setState({loggedIn: true, username: json.firstName || json.username, parent: json.isParent, child: !json.isParent, childStatisticsId: json.Children.length ? json.Children[0].id : null});
        if (this.kids.length) {
          await this.onChildSelect(this.kids[0]);
        }  
      } else {
        this.setState({loggedIn: true, username: json.firstName || json.username, parent: json.isParent, child: !json.isParent, childStatisticsId: json.id});
        await this.onChildSelect(json);
      }
    }
  }

  async onChildSelect(child) {
    this.setState({loadingKarma: true, selectedChild: child});
    var res = await fetch(`/api/children/karma?ChildId=${encodeURIComponent(child.id)}&utcOffset=${encodeURIComponent(-240)}`);
    this.setState({loadingKarma: false});
    if (res.ok) {
      var json = await res.json();
      this.setState({
        dailyGoodKarma: json.daily.good,
        dailyBadKarma: json.daily.bad,
        dailyNetKarma: json.daily.net,
        totalGoodKarma: json.total.good,
        totalBadKarma: json.total.bad,
        totalNetKarma: json.total.net,
      });
    }
  }

  onSignOut() {
    this.setState({
      loggedIn: false,
      username: null,
      parent: false,
      child: false,
      selectedChild: {id: null},
      childStatisticsId: null,
      loadingKarma: false,
      dailyGoodKarma: 0,
      dailyBadKarma: 0,
      dailyNetKarma: 0,
      totalGoodKarma: 0,
      totalBadKarma: 0,
      totalNetKarma: 0,
    });
  }

  async componentDidMount() {
    socket.on('karma', ({ChildId, karma}) => {
      if (ChildId === this.state.selectedChild.id) {
        this.setState({
          loadingKarma: false,
          dailyGoodKarma: karma.daily.good,
          dailyBadKarma: karma.daily.bad,
          dailyNetKarma: karma.daily.net,
          totalGoodKarma: karma.total.good,
          totalBadKarma: karma.total.bad,
          totalNetKarma: karma.total.net,
        });
      }
    });
    var res = await fetch('/api/loggedIn');
    if (res.ok) {
      var json = await res.json();
      if (json.loggedIn) {
        await this.onSuccessfulSignIn();
      }
    }
  }

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
              {this.state.loggedIn ? <UserBar username={this.state.username} onSignOut={() => this.onSignOut()} /> : <SignInView onSuccess={() => this.onSuccessfulSignIn()} />}
            </Grid.Column>
          </Grid.Row>
          {this.state.parent && <Grid.Row>
            <Grid.Column>
              <ChildSelector kids={this.kids} onSelect={child => this.onChildSelect(child)} selectedChild={this.state.selectedChild} />
            </Grid.Column>
          </Grid.Row>}
          {this.state.parent && <Grid.Row>
            <Grid.Column>
              <KarmaEntryView
                childId={this.state.selectedChild.id}
                karma={this.state.karma}
                karmaEntryMode={this.state.karmaEntryMode}
                onUpdateEntryMode={newMode => this.setState({karmaEntryMode: newMode})}
              />
            </Grid.Column>
          </Grid.Row>}
          {this.state.selectedChild.id !== null &&
            <Grid.Row>
              <Grid.Column>
                <KarmaStatistics
                  name={this.state.selectedChild.firstName || this.state.selectedChild.username}
                  loading={this.state.loadingKarma}
                  goodKarma={this.state.dailyGoodKarma}
                  badKarma={this.state.dailyBadKarma}
                  netKarma={this.state.dailyNetKarma}
                />
              </Grid.Column>
            </Grid.Row>}
          {this.state.selectedChild.id !== null && <Grid.Row>
            <Grid.Column textAlign='center'>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Header as='h1' content={`${this.state.selectedChild.firstName || this.state.selectedChild.username}'s Total Karma`} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <TotalKarma
                      loading={this.state.loadingKarma}
                      karma={this.state.totalNetKarma}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>}
          {true && this.state.selectedChild.id !== null && <Grid.Row>
            <Grid.Column textAlign='left'>
              <KarmaHistory childId={this.state.selectedChild.id} />
            </Grid.Column>
          </Grid.Row>}
        </Grid>
      </Container>
    );
  }
}

export default App;
