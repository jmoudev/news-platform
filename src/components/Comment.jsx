import React from 'react';

export default function Comments({
  comment: { author, body, created_at, votes }
}) {
  return (
    <div>
      <p>{body}</p>
      <p>
        {author}, {created_at}, {votes}
      </p>
    </div>
  );
}
