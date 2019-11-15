import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '5em',
    textAlign: 'center'
  }
}));

export default function CircularIndeterminate(props) {
  const classes = useStyles();

  if (props.inProgress)
    return (
      <div className={classes.root}>
        <CircularProgress color='primary' />
      </div>
    );
  else return null;
}
