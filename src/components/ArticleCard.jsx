import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default function ArticleCard({
  article: { title, topic, body, author, votes, comment_count, article_id }
}) {
  return (
    <Grid item xs={10}>
      <Paper>
        <Typography variant="h2" style={{ fontSize: 26 }}>
          {title}
        </Typography>
        <Typography variant="h3" style={{ fontSize: 20 }}>
          {topic.slice(0, 1).toUpperCase() + topic.slice(1)}
        </Typography>
        <Typography variant="body1">
          {
            <Link href={`/articles/${article_id}`}>
              {body.slice(0, 200).split('.').length === 1
                ? body.slice(0, 200).split(' ').slice(0, -1).join(' ')
                : body.slice(0, 200).split('.').slice(0, -1).join('.')}
              ...
            </Link>
          }
        </Typography>
        <Typography variant="body1">
          Author: {author}, Votes: {votes}, Comments: {comment_count}
        </Typography>
      </Paper>
    </Grid>
  );
}
