import React, { Component } from 'react';
import * as api from '../api';
import * as utils from '../utils';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardTwoToneIcon from '@material-ui/icons/ArrowUpwardTwoTone';
import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';

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
      <>
        <p>{body}</p>
        <p>{`author: ${author}, posted: ${commentTimestamp}, votes: ${
          votes + votesChange
        }`}</p>
        <IconButton onClick={() => this.handleClick(1)}>
          <ArrowUpwardTwoToneIcon color="primary" />
        </IconButton>
        <IconButton onClick={() => this.handleClick(-1)}>
          <ArrowDownwardTwoToneIcon color="secondary" />
        </IconButton>
      </>
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
