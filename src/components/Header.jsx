import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Header() {
  return (
    <header className="title">
      <Typography variant="h1" style={{ fontSize: 50 }}>
        News Platform
      </Typography>
    </header>
  );
}
