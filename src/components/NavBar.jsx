import React, { Component } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

export default class NavBar extends Component {
  state = {};

  componentDidMount() {
    this.fetchTopics();
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

  fetchTopics() {
    return axios
      .get('https://news-platform.herokuapp.com/api/topics')
      .then(({ data: { topics } }) => {
        const topicsArr = topics.map(topic => topic.slug);

        return topicsArr;
      })
      .then(topics => {
        this.setState({ topics });
      });
  }
}
