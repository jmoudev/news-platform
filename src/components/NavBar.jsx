import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';

export default class NavBar extends Component {
  state = {};

  componentDidMount() {
    api.fetchTopics().then(topics => {
      this.setState({ topics });
    });
  }

  render() {
    const { topics } = this.state;

    return (
      <nav className="nav">
        <Link to="/">All</Link>
        {topics ? (
          topics.map((topic, index) => {
            return (
              <Link key={index} to={`/topics/${topic}`}>
                {topic.slice(0, 1).toUpperCase() + topic.slice(1)}
              </Link>
            );
          })
        ) : (
          <p>loading...</p>
        )}
      </nav>
    );
  }
}
