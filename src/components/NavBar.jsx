import React, { Component } from 'react';
import * as api from '../api';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

export default class NavBar extends Component {
  state = {
    topics: [],
    isLoading: true,
    primary: window.location.href.match(
      /^http:\/\/localhost:3000\/topics\/(\w+)$/
    )
      ? window.location.href.match(
          /^http:\/\/localhost:3000\/topics\/(\w+)$/
        )[1]
      : 'all'
  };

  componentDidMount() {
    api.getTopics().then(topics => {
      this.setState({ topics, isLoading: false });
    });
  }

  render() {
    const { topics, isLoading, primary } = this.state;

    console.log(primary);

    return isLoading ? (
      <p>loading...</p>
    ) : (
      <Container className="test">
        <Breadcrumbs
          aria-label="breadcrumb"
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <Link href="/">
            <Typography
              color={primary === 'all' ? 'textPrimary' : 'textSecondary'}
              onClick={this.handleClick}
            >
              All
            </Typography>
          </Link>
          {topics.map((topic, index) => {
            return (
              <Link
                color="inherit"
                key={index}
                href={`/topics/${topic}`}
                onClick={this.handleClick}
              >
                <Typography
                  color={primary === topic ? 'textPrimary' : 'textSecondary'}
                >
                  {topic.slice(0, 1).toUpperCase() + topic.slice(1)}
                </Typography>
              </Link>
            );
          })}
        </Breadcrumbs>
      </Container>
    );
  }

  handleClick = ({
    target: {
      firstChild: { data }
    }
  }) => {
    this.setState({ primary: data.toLowerCase() });
  };
}
