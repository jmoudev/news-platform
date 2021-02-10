import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import * as api from '../api';

export default class ArticleList extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    const { topic } = this.props;

    api.fetchArticles(topic).then(articles => {
      this.setState({ articles });
    });
  }

  // genre is updated in state by router props
  componentDidUpdate(prevProps) {
    const { topic } = this.props;

    if (this.props !== prevProps) {
      api.fetchArticles(topic).then(articles => {
        this.setState({ articles });
      });
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
}
