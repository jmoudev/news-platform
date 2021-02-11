import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';

export default class NavBar extends Component {
  state = {
    topics: [],
    isLoading: true
  };

  componentDidMount() {
    api.getTopics().then(topics => {
      this.setState({ topics, isLoading: false });
    });
  }

  render() {
    const { topics, isLoading } = this.state;

    return (
      <nav className="nav">
        <Link to="/">All</Link>
        {isLoading ? (
          <p>loading...</p>
        ) : (
          topics.map((topic, index) => {
            return (
              <Link key={index} to={`/topics/${topic}`}>
                {topic.slice(0, 1).toUpperCase() + topic.slice(1)}
              </Link>
            );
          })
        )}
      </nav>
    );
  }
}
