import React, { Component } from 'react';
import { Header, Container, Grid } from 'semantic-ui-react';
import AppHeader from './AppHeader';
import SignInView from './SignInView';
import UserBar from './UserBar';
import MeritEntryView from './MeritEntryView';
import KarmaStatistics from './KarmaStatistics';
import TotalKarma from './TotalKarma';
import ChildSelector from './ChildSelector';

class App extends Component {
  state = {
    meritEntryMode: null,
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
              <MeritEntryView
                childId={this.state.selectedChild.id}
                karma={this.state.karma}
                meritEntryMode={this.state.meritEntryMode}
                onUpdateEntryMode={newMode => this.setState({meritEntryMode: newMode})}
                onUpdate={() => this.onChildSelect({id: this.state.selectedChild.id})}
              />
            </Grid.Column>
          </Grid.Row>}
          {this.state.selectedChild.id !== null &&
            <Grid.Row>
              <Grid.Column>
                <KarmaStatistics
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
                    <Header as='h1' content='Total Karma' />
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
        </Grid>
      </Container>
    );
  }
}

export default App;
