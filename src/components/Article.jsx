import React, { Component } from 'react';
import Comment from './Comment';
import * as api from '../api';

export default class Article extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true
  };

  componentDidMount() {
    const { article_id } = this.props;

    api.fetchArticle(article_id).then(article => {
      this.setState({ article });
    });
    api.fetchArticleComments(article_id).then(comments => {
      this.setState({ comments });
    });
  }

  render() {
    const {
      title,
      topic,
      author,
      created_at,
      comment_count,
      body
    } = this.state.article;

    const { comments } = this.state;

    return (
      <main>
        <h1>{title}</h1>
        <h2>{topic}</h2>
        <h3>{`${author}, ${created_at}, comments: ${comment_count}`}</h3>
        <p>{body}</p>
        <section></section>
        {comments.length ? (
          <section>
            {comments.map(comment => {
              return <Comment key={comment.comment_id} comment={comment} />;
            })}
          </section>
        ) : (
          <>Yet to load</>
        )}
      </main>
    );
  }
}
