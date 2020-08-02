import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Avatar,
    FormControl,
    FormControlLabel,
    FormHelperText,
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
}));

export default function DropdownQuestion(props) {
    const classes = useStyles();

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="ddl-answer-label" error={props.question.validationError}>Answer</InputLabel>
                    <Select
                    labelId="ddl-answer-label"
                    id="ddl-answer"
                    value={props.question.answer}
                    onChange={(e) => props.answerQuestion(e.target.value, props.question.id)}
                    className={classes.selectEmpty}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {props.question.questionoptionSet.map((o) => (
                            <MenuItem key={o.id} value={o.text}>{o.text}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText error={props.question.validationError}>
                        {props.question.errorMessage}
                    </FormHelperText>
            </FormControl>
        </div>
    );
}