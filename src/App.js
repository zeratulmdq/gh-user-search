import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchProfile from './components/SearchProfile';
import ProfileCard from './components/ProfileCard';
import { Motion, spring } from 'react-motion';




class App extends Component {

  constructor() {
    super();
    this.state = {
      username: 'zeratulmdq',
      name: '',
      avatar: '',
      location: '',
      repos: '',
      followers: '',
      following: '',
      homeUrl: '',
      notFound: '',
      my_repos: [],
    }
  }

  fetchProfile(username) {
    let url = `https://api.github.com/users/${username}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          username: data.login,
          name: data.name,
          avatar: data.avatar_url,
          location: data.location,
          repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          homeUrl: data.html_url,
          notFound: data.message
        })
      })
      .catch((error) => console.log('Oops! There was a problem'))
  }

  fetchRepos() {
    const username = this.state.username;
    let url = `https://api.github.com/users/${username}/repos`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ my_repos: data })
      })
      .catch((error) => console.log('Oops! . repos problem  '))
  }

  componentDidMount() {
    this.fetchProfile(this.state.username)
  }

  /**
   * Reander a animation with react motion
   * @param {*} element
   */
  animation(element) {
    return (
      <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1, { stiffness: 120, damping: 80 }) }}>
        {interpolatingStyle =>
          <div style={interpolatingStyle} >
            {element}
          </div>}
      </Motion>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Github user search using React</h2>
        </header>
        {this.animation(
          <main className="App__main">
            <SearchProfile onSearch={this.fetchProfile.bind(this)}></SearchProfile>
            <ProfileCard profile={this.state}
              fetchRepos={this.fetchRepos.bind(this)}></ProfileCard>
          </main>
        )}
        <footer className="App__footer">
          <a href="https://github.com/zeratulmdq" target="_blank"> @zeratulmdq</a>
        </footer>

      </div>

    );
  }
}

export default App;
