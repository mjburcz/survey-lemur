import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  FormControl,
  CardActions,
  FormControlLabel,
  Typography,
  TextField,
  Checkbox,
  InputLabel,
  Select,
  IconButton,
  Button,
  Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import { dataCall } from '../../../Core/DataService';
import { ADD_QUESTION_OPTION, DELETE_QUESTION_OPTION } from '../../../Core/queries';


// NEED TO GET ALL THIS JUNK OUT OF HERE AND SOMEWHERE ELSE.
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 600,
    maxWidth: 1500,
    display: "inline-block",
    alignContent: "center",
  },
  avatar: {
    backgroundColor: "#009ca7",
  },
  title: {
    fontSize: 20,
    fontWeight: 800,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function QuestionEdit(props) {
  const classes = useStyles();
  const [questionText, setQuestionText] = useState(props.question.text);
  const [questionType, setQuestionType] = useState(props.question.answerType);
  const [questionRequired, setQuestionRequired] = useState(props.question.required);
  const [questionOptions, setQuestionOptions] = useState(props.question.questionoptionSet);

  function saveEdit() {
    props.updateQuestion(
      questionText,
      questionType,
      questionRequired,
      questionOptions,
      props.question.id
    );
  }

  function addNewOption() {
    dataCall(ADD_QUESTION_OPTION
      .replace('$questionId', props.question.id))
      .then(r => {
          setQuestionOptions([
              ...questionOptions,
              r.data.data.createQuestionOption.QuestionOption
          ]);
      });
  }

  function deleteOption(id) {
    let copiedOptions = [...questionOptions];

    let index = copiedOptions.findIndex(o => o.id === id);

    dataCall(DELETE_QUESTION_OPTION
        .replace('$optionId', copiedOptions[index].id));

    copiedOptions.splice(index, 1);

    setQuestionOptions(copiedOptions);
  }

  function editOption(text, id) {
    let copiedOptions = [...questionOptions];

    let index = copiedOptions.findIndex((o) => o.id === id);

    copiedOptions[index] = {
      ...copiedOptions[index],
      text: text,
    };

    setQuestionOptions(copiedOptions);
  }

  let optionEditing = null;
  if (questionType === "radio" || questionType === "dropdown") {
    optionEditing = (
      <div>
        {questionOptions.map((o) => (
          <div key={o.id}>
            <FormControl className={classes.option}>
              <TextField
                type="text"
                value={o.text}
                label="Option"
                onChange={(e) => editOption(e.target.value, o.id)}
              />
              <Tooltip title="Delete" placement="bottom">
                <IconButton
                  className="MuiIconButton-colorTertiary"
                  aria-label="Delete"
                  onClick={() => deleteOption(o.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </FormControl>
            <br />
          </div>
        ))}
        <Tooltip title="Add" placement="right">
          <IconButton
            color="primary"
            aria-label="Add"
            onClick={() => addNewOption()}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </div>
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
          action={
            <CardActions>
              <Tooltip title="Delete" placement="right">
                <IconButton
                  className="MuiIconButton-colorTertiary"
                  aria-label="Delete"
                  onClick={() => props.deleteQuestion(props.question.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          }
          title={
            <Typography className={classes.title} component="h3" variant="h3">
              Edit Question
            </Typography>
          }
        />
        <CardContent>
          <form noValidate autoComplete="off">
            <FormControl className={classes.input}>
              <TextField
                id="standard-basic"
                label="Question"
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="type">Type</InputLabel>
              <Select
                native
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                label="Type"
                inputProps={{
                  name: "type",
                  id: "type",
                }}
              >
                <option aria-label="None" value="" />
                <option value="single-line"> Single Line</option>
                <option value="multi-line"> Multi Line</option>
                <option value="radio"> Radio Button</option>
                <option value="dropdown"> Drop Down</option>
              </Select>
            </FormControl>
            {optionEditing}
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  value={questionRequired}
                  name="required"
                  type="checkbox"
                  checked={questionRequired}
                  onChange={(e) => setQuestionRequired(e.target.checked)}
                />
              }
              label="Required"
            />
          </form>
        </CardContent>
        <Button
          type="submit"
          variant="contained"
          className={classes.btn}
          color="primary"
          onClick={() => saveEdit()}
        >
          Save
        </Button>
      </Card>
    </div>
  );
}
