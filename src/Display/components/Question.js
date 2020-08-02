import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  FormControl,
  FormControlLabel,
  Typography,
  TextField,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DropdownQuestion from './DropdownQuestion';
import MultiLineQuestion from './MultiLineQuestion';
import RadioQuestion from './RadioQuestion';
import SingleLineQuestion from './SingleLineQuestion';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 600,
    maxWidth: 1500,
    display: "inline-block",
    alignContent: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    "& > *": {
      width: "25ch",
    },
    margin: theme.spacing(1),
    minWidth: 120,
  },
  avatar: {
    backgroundColor: "#5dbcd2",
  },
  title: {
    fontSize: 20,
    display: "flex",
  },
  option: {
    display: "inline-block",
    marginBottom: ".5em",
  },
  btn: {
    marginBottom: 10,
  },
  pos: {
    marginBottom: 12,
  },
  checked: {},
  fab: {
    "& > *": {
      margin: theme.spacing(1),
    },
    alignContent: "center",
  },
  required: {
    color: 'red'
  }
}));

export default function Question(props) {
  const classes = useStyles();

  let answerType = props.question.answerType;

  let optionsDisplay = null;
  // THIS IS THE TEXT DISPLAY
  if (answerType === "single-line") {
    optionsDisplay = (
      <SingleLineQuestion question={props.question} answerQuestion={props.answerQuestion} />
    );
  } else if (answerType === "multi-line") {
    optionsDisplay = (
      <MultiLineQuestion question={props.question} answerQuestion={props.answerQuestion} />
    );
    // THIS IS THE OPTIONS DISPLAY
  } else if (answerType === "radio") {
    optionsDisplay = (
      <RadioQuestion question={props.question} answerQuestion={props.answerQuestion} />
    );
  } else if (answerType === "dropdown") {
    optionsDisplay = (
      <DropdownQuestion question={props.question} answerQuestion={props.answerQuestion} />
    );
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="order" className={classes.avatar}>
              {props.question.order}
            </Avatar>
          }
          title={
            <Typography component="h3" variant="h3" className={classes.title}>
              {props.question.text}
              {props.question.required ? (<InputLabel required={true} className={classes.required} />) : (null)}
            </Typography>
          }
        />
        <CardContent>
          <form noValidate autoComplete="off">
            {optionsDisplay}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
