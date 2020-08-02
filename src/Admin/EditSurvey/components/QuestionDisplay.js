import React from "react";
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
  IconButton,
  Tooltip,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

// NEED TO GET ALL THIS JUNK OUT OF HERE AND SOMEWHERE ELSE.
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
    fontWeight: 800,
  },
  options: {
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

export default function QuestionDisplay(props) {
  const classes = useStyles();
  let optionsDisplay = null;
  if (
    props.question.answerType === "radio" ||
    props.question.answerType === "dropdown"
  ) {
    optionsDisplay = props.question.questionoptionSet.map((o) => (
      <div key={o.id}>
        <FormControl className={classes.options}>
          <TextField type="text" value={o.text} label="Option" disabled />
        </FormControl>
        <br />
      </div>
    ));
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
              <Tooltip title="Edit" placement="bottom">
                <IconButton
                  color="secondary"
                  aria-label="Edit"
                  onClick={() => props.toggleEditing()}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" placement="bottom">
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
              View Question
            </Typography>
          }
        />
        <CardContent>
          <form noValidate autoComplete="off">
            <FormControl className={classes.input}>
              <TextField
                disabled
                id="standard-disabled"
                label="Question"
                value={props.question.text}
              />
            </FormControl>
            <FormControl className={classes.formControl} disabled>
              <TextField
                disabled
                id="standard-disabled"
                label="Type"
                value={props.question.answerType}
              />
            </FormControl>
            <br />
            {optionsDisplay}
            <FormControlLabel
              disabled
              control={
                <Checkbox
                  checked={props.question.required}
                  value={props.question.required}
                  name="required"
                />
              }
              label="Required"
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
