import React from "react";
import {
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    "& > *": {
      width: "25ch",
    },
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
export default function SingleLineQuestion(props) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.input}>
        <TextField
          label="Answer"
          type="text"
          value={props.question.answer}
          onChange={(e) =>
            props.answerQuestion(e.target.value, props.question.id)
          }
          error={props.question.validationError}
          helperText={props.question.errorMessage}
        />
      </FormControl>
    </div>
  );
}
