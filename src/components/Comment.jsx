import React from 'react';
import * as utils from '../utils';

export default function Comments({
  comment: { author, body, created_at, votes }
}) {
  const commentTimestamp = utils.convertPSQLTimestamp(created_at);

  return (
    <div>
      <p>{body}</p>
      <p>{`author: ${author}, posted: ${commentTimestamp}, votes: ${votes}`}</p>
    </div>
  );
}
