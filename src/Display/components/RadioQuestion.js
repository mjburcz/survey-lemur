import React from "react";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormHelperText,
} from "@material-ui/core";

export default function RadioQuestion(props) {
  return (
    <div>
      <FormControl
        component="fieldset"
        error={props.question.validationError}
        helperText={props.question.errorMessage}
      >
        <FormHelperText error={props.question.validationError}>
          {props.question.errorMessage}
        </FormHelperText>
        <RadioGroup
          row
          aria-label="radio"
          name={"radio-" + props.question.id}
          onChange={(e) =>
            props.answerQuestion(e.target.value, props.question.id)
          }
        >
          {props.question.questionoptionSet.map((o) => (
            <div key={o.id}>
              <FormControlLabel
                value={o.text}
                control={<Radio />}
                label={o.text}
              />
            </div>
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
