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
    backgroundColor: "#009ca7",
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
}));

export default function SurveyQuestions(props) {
  const classes = useStyles();
  const [singleText, setSingleTextAnswer] = useState(props.question.answer);
  const [multiText, setMultiTextAnswer] = useState(props.question.answer);
  const [radioText, setRadioeTextAnswer] = useState(props.question.answer);
  const [dropText, setDropTextAnswer] = useState(props.question.answer);

  function saveAnswers() {
    props.updateQuestion(
      singleText,
      multiText,
      radioText,
      dropText,
      props.question.id
    );
  }

  let answerType = props.question.type;
  let questionOptions = props.question.options;
  let optionsDisplay = null;
  // THIS IS THE TEXT DIDSPLAY
  if (props.question.type === "single-line") {
    optionsDisplay = (
      <FormControl className={classes.input}>
        <TextField
          id="standard-basic"
          label="Answer"
          type="text"
          value={singleText}
          onChange={(e) => setSingleTextAnswer(e.target.value)}
        />
      </FormControl>
    );
  } else if (answerType === "multi-line") {
    optionsDisplay = (
      <FormControl className={classes.input}>
        <TextField
          id="standard-multiline-static"
          label="Answer"
          multiline
          rows={4}
          value={multiText}
          C
          onChange={(e) => setMultiTextAnswer(e.target.value)}
        />
      </FormControl>
    );
    // THIS IS THE OPTIONS DISPLAY
  } else if (answerType === "radio") {
    optionsDisplay = (
      <FormControl component="fieldset">
        {questionOptions.map((o) => (
          <div key={o.id}>
            <RadioGroup
              row
              aria-label="radio"
              name="radio"
              onChange={(e) => setRadioeTextAnswer(e.target.checked)}
            >
              <FormControlLabel
                value={radioText}
                control={<Radio />}
                label={o.text}
              />
            </RadioGroup>
          </div>
        ))}
      </FormControl>
    );
  } else if (answerType === "dropdown") {
    optionsDisplay = (
      <FormControl className={classes.formControl}>
        <InputLabel id="ddl-answer-label">Answer</InputLabel>
        <Select
          labelId="ddl-answer-label"
          id="ddl-answer"
          value={dropText}
          onChange={(e) => setDropTextAnswer(e.target.value)}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {questionOptions.map((o) => (
            <div key={o.id}>
              <MenuItem value={o.text}>{o.text}</MenuItem>
            </div>
          ))}
        </Select>
      </FormControl>
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
