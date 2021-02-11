import React, { Component } from 'react';
import Comment from './Comment';
import * as api from '../api';
import * as utils from '../utils';

export default class Article extends Component {
  state = {
    article: {},
    comments: [],
    votesChange: 0,
    isLoading: { article: true, comments: true }
  };

  componentDidMount() {
    const { article_id } = this.props;

    api.getArticle(article_id).then(article => {
      this.setState({ article, isLoading: { article: false } });
    });
    api.getArticleComments(article_id).then(comments => {
      this.setState({ comments, isLoading: { comments: false } });
    });
  }

  render() {
    const {
      title,
      topic,
      author,
      created_at,
      comment_count,
      body,
      votes
    } = this.state.article;
    const { comments, votesChange, isLoading } = this.state;
    let articleTimestamp;

    if (isLoading) {
      articleTimestamp = utils.convertPSQLTimestamp(created_at);
    }

    return (
      <main>
        {isLoading.article ? (
          <p></p>
        ) : (
          <section>
            <h1>{title}</h1>
            <h2>{topic}</h2>
            <h3>{`author: ${author}, posted: ${articleTimestamp}, comments: ${comment_count}`}</h3>
            <div className="voting-buttons">
              <button onClick={() => this.handleClick(1)}>upvote</button>
              <h3 className="voting-counter">{votes + votesChange}</h3>
              <button onClick={() => this.handleClick(-1)}>downvote</button>
            </div>
            <p>{body}</p>
          </section>
        )}
        {isLoading.comments ? (
          <p>loading...</p>
        ) : (
          <section>
            {comments.map(comment => {
              return <Comment key={comment.comment_id} comment={comment} />;
            })}
          </section>
        )}
      </main>
    );
  }

  handleClick = vote => {
    const { article_id } = this.props;

    this.setState(currentState => {
      return { votesChange: currentState.votesChange + vote };
    });
    // if error or bad request might want to change state to know vote nt counted
    api.patchArticleVotes(article_id, vote);
  };
}
