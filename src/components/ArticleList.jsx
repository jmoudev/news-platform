import React, { Component } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';

export default class ArticleList extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    this.fetchArticles().then(articles => {
      console.log({ articles });
      this.setState({ articles });
    });
  }

  render() {
    const { articles } = this.state;

    return (
      <main>
        {articles.map(article => {
          return <ArticleCard />;
        })}
      </main>
    );
  }

  fetchArticles() {
    return axios
      .get('https://news-platform.herokuapp.com/api/articles')
      .then(({ data: { articles } }) => articles);
  }
}
