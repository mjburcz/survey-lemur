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
  MenuItem,
  InputLabel,
  Select,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    alignContent: "center",
    width: 600,
    [theme.breakpoints.down("sm")] : {
    maxWidth: 345
    }
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
    fontSize: "1.2rem",
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
                type="text"
                value={props.question.text}
              />
            </FormControl>
            <FormControl className={classes.formControl} disabled>
        <InputLabel id="type">Type</InputLabel>
        <Select
          labelId="type"
          id="type"
          value={props.question.answerType}
                label="Type"
                inputProps={{
                  name: "type",
                  id: "type",
                }}
              >
                <MenuItem value="" aria-label="None"> </MenuItem>
                <MenuItem value="single-line">Single Line</MenuItem>
                <MenuItem value="multi-line">Multi Line</MenuItem>
                <MenuItem value="radio">Radio Button</MenuItem>
                <MenuItem value="dropdown">Drop Down</MenuItem>
              </Select>
            </FormControl>
            <br/>
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
