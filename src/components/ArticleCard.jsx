import React from 'react';
import { Link } from '@reach/router';

export default function ArticleCard({
  article: { title, topic, body, author, votes, comment_count, article_id }
}) {
  return (
    <div>
      <h2>{title}</h2>
      <h3>{topic}</h3>
      <p className="article--body__hover">
        <Link to={`/articles/${article_id}`}>
          {body.slice(0, 200).split('.').length === 1
            ? body.slice(0, 200).split(' ').slice(0, -1).join(' ')
            : body.slice(0, 200).split('.').slice(0, -1).join('.')}
          ...
        </Link>
      </p>
      <p>
        Author: {author}, Votes: {votes}, Comments: {comment_count}
      </p>
    </div>
  );
}
