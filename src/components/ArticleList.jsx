import React, { Component } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';

export default class ArticleList extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    const { topic } = this.props;

    this.fetchArticles(topic);
  }

  // genre is updated in state by router props
  componentDidUpdate(prevProps) {
    const { topic } = this.props;

    if (this.props !== prevProps) {
      this.fetchArticles(topic);
    }
  }

  render() {
    const { articles } = this.state;

    return (
      <main className="article-list">
        {articles ? (
          articles.map(article => {
            return (
              <ArticleCard
                className="article"
                key={article.article_id}
                article={article}
              />
            );
          })
        ) : (
          <p>no articles</p>
        )}
      </main>
    );
  }

  fetchArticles(topic) {
    return axios
      .get('https://news-platform.herokuapp.com/api/articles')
      .then(({ data: { articles } }) => {
        if (topic) return articles.filter(article => article.topic === topic);
        else return articles;
      })
      .then(articles => {
        this.setState({ articles });
      });
  }
}
