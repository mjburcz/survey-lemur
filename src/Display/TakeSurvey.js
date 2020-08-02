import React, { useEffect, useState } from "react";
import Question from "./components/Question";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { dataCall } from "../Core/DataService";
import {
  GET_ALL_QUESTIONS,
  CREATE_RESPONSE,
  CREATE_ANSWER,
} from "../Core/queries";

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
    backgroundColor: "#5dbcd2",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: 800,
  },
  option: {},
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
    position: "initial",
  },
  stay: {
    paddingBottom: "1em",
    marginBottom: "1em",
  },
}));

export default function TakeSurvey() {
  const classes = useStyles();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    dataCall(GET_ALL_QUESTIONS).then((r) =>
      setQuestions(r.data.data.allQuestions)
    );
  }, []);

  function answerQuestion(answer, id) {
    // get the question that is being answered
    let currentQuestions = [...questions];

    let index = currentQuestions.findIndex((q) => q.id === id);

    currentQuestions[index] = {
      ...currentQuestions[index],
      answer: answer,
    };

    setQuestions(currentQuestions, answer);
  }

  function submitSurvey() {
    console.log(questions);

    let currentQuestions = [...questions];

    let errors = false;
    currentQuestions.forEach((q) => {
      if (
        q.required &&
        (q.answer === undefined || q.answer === null || q.answer === "")
      ) {
        q.errorMessage = "This question is required";
        q.validationError = true;
        errors = true;
      } else {
        q.errorMessage = "";
        q.validationError = false;
      }
    });

    if (errors) {
      setQuestions(currentQuestions);
      return;
    } else {
      dataCall(CREATE_RESPONSE).then((r) => {
        questions.forEach((q) => {
          dataCall(
            CREATE_ANSWER.replace(
              "$responseId",
              r.data.data.createResponse.Response.id
            )
              .replace("$questionId", q.id)
              .replace("$text", '"' + q.answer + '"')
          );
        });
      });
    }
  }

  let questionsDisplay = questions.map((q) => (
    <div key={q.id}>
      {<Question question={q} answerQuestion={answerQuestion} />}
    </div>
  ));

  return (
    <div>
      <h1>Survey</h1>
      <div className={classes.stay}>{questionsDisplay}</div>
      <div>
        <br />
        <Button
          type="submit"
          variant="contained"
          className={classes.btn}
          color="primary"
          onClick={() => submitSurvey()}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
