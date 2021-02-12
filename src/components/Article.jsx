import React, { Component } from 'react';
import Comment from './Comment';
import * as api from '../api';
import * as utils from '../utils';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardTwoToneIcon from '@material-ui/icons/ArrowUpwardTwoTone';
import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';

export default class Article extends Component {
  state = {
    article: {},
    comments: [],
    votesChange: 0,
    isLoading: true,
    errorMsg: ''
  };

  componentDidMount() {
    const { article_id } = this.props;

    axios
      .all([api.getArticle(article_id), api.getArticleComments(article_id)])
      .then(
        axios.spread((article, comments) => {
          this.setState({ article, comments, isLoading: false });
        })
      )
      .catch(({ request: { status, statusText } }) => {
        this.setState({ errorMsg: `Error ${status}: ${statusText}` });
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
    const { comments, votesChange, isLoading, errorMsg } = this.state;
    let articleTimestamp;

    if (!isLoading) {
      articleTimestamp = utils.convertPSQLTimestamp(created_at);
    }
    if (errorMsg) return <h2>{errorMsg}</h2>;

    return (
      <main>
        {isLoading ? (
          <p></p>
        ) : (
          <section>
            <Typography variant="h1" style={{ fontSize: 40 }}>
              {title}
            </Typography>
            <Typography variant="h2" style={{ fontSize: 26 }}>
              {topic}
            </Typography>
            <Typography
              variant="h3"
              style={{ fontSize: 20 }}
            >{`author: ${author}, posted: ${articleTimestamp}, comments: ${comment_count}`}</Typography>
            <IconButton>
              <ArrowUpwardTwoToneIcon color="primary" />
            </IconButton>
            <IconButton>
              <ArrowDownwardTwoToneIcon color="secondary" />
            </IconButton>
            <button onClick={() => this.handleClick(1)}>upvote</button>
            <Typography variant="h3">{votes + votesChange}</Typography>
            <button onClick={() => this.handleClick(-1)}>downvote</button>
            <p>{body}</p>
          </section>
        )}
        {isLoading ? (
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
