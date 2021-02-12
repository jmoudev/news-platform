import React, { Component } from 'react';
import * as api from '../api';
import * as utils from '../utils';

export default class Comment extends Component {
  state = {
    votesChange: 0
  };

  render() {
    const {
      comment: { author, body, created_at, votes }
    } = this.props;
    const { votesChange } = this.state;
    const commentTimestamp = utils.convertPSQLTimestamp(created_at);

    return (
      <div>
        <p>{body}</p>
        <p>{`author: ${author}, posted: ${commentTimestamp}, votes: ${
          votes + votesChange
        }`}</p>
        <button onClick={() => this.handleClick(1)}>upvote</button>
        <button onClick={() => this.handleClick(-1)}>downvote</button>
      </div>
    );
  }

  handleClick(vote) {
    const {
      comment: { comment_id }
    } = this.props;

    this.setState(currentState => {
      return { votesChange: currentState.votesChange + vote };
    });
    api.patchCommentVotes(comment_id, vote);
  }
}
  