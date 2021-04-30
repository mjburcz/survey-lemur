import React, { useEffect, useState } from "react";
import Question from "./components/Question";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import { dataCall } from "../../Core/DataService";
import {
  ADD_NEW_QUESTION,
  DELETE_QUESTION,
  GET_ALL_QUESTIONS,
  UPDATE_QUESTION,
  UPDATE_QUESTION_OPTION,
} from "../../Core/queries";

const useStyles = makeStyles((theme) => ({
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

export default function EditSurvey() {
  const classes = useStyles();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    dataCall(GET_ALL_QUESTIONS).then((r) =>
      setQuestions(r.data.data.allQuestions)
    );
  }, []);

  function addNewQuestion() {
    dataCall(ADD_NEW_QUESTION).then((r) => {
      setQuestions([
        ...questions,
        {
          ...r.data.data.createQuestion.question,
          editing: true,
        },
      ]);
    });
  }

  function deleteQuestion(id) {
    dataCall(DELETE_QUESTION.replace("$id", id));

    let copiedQuestions = [...questions];
    let index = copiedQuestions.findIndex((q) => q.id === id);
    copiedQuestions.splice(index, 1);

    copiedQuestions.forEach((e, i) => {
      let newOrder = i + 1;

      e.order = newOrder;
      dataCall(
        UPDATE_QUESTION.replace("$id", e.id)
          .replace("$text", '"' + e.text + '"')
          .replace("$required", e.required)
          .replace("$answerType", '"' + e.answerType + '"')
          .replace("$order", newOrder)
      );
    });

    setQuestions(copiedQuestions);
  }

  //react-beatuiful-dnd implimentation & reorder of question number
  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    let questionId = Number(draggableId.split("-")[1]);

    let copiedQuestions = [...questions];

    let index = copiedQuestions.findIndex((q) => Number(q.id) === questionId);

    let q = copiedQuestions.splice(index, 1)[0];

    copiedQuestions.splice(destination.index - 1, 0, q);

    copiedQuestions.forEach((e, i) => {
      let newOrder = i + 1;

      e.order = newOrder;
      dataCall(
        UPDATE_QUESTION.replace("$id", e.id)
          .replace("$text", '"' + e.text + '"')
          .replace("$required", e.required)
          .replace("$answerType", '"' + e.answerType + '"')
          .replace("$order", newOrder)
      );
    });

    setQuestions(copiedQuestions);
  }

  function toggleQuestionEditing(id) {
    //find the question that is being updated
    let copiedQuestions = [...questions];

    let index = copiedQuestions.findIndex((q) => q.id === id);
    //update
    copiedQuestions[index] = {
      ...copiedQuestions[index],
      editing: !copiedQuestions[index].editing,
    };
    //replace & set state
    setQuestions(copiedQuestions);
  }

  function updateQuestion(text, type, required, options, id) {
    // find the question that needs updating
    let copiedQuestions = [...questions];

    let index = copiedQuestions.findIndex((q) => q.id === id);

    copiedQuestions[index] = {
      ...copiedQuestions[index],
      text: text,
      answerType: type,
      required: required,
      questionoptionSet: options,
      editing: !copiedQuestions[index].editing,
    };

    dataCall(
      UPDATE_QUESTION.replace("$id", id)
        .replace("$text", '"' + text + '"')
        .replace("$required", required)
        .replace("$answerType", '"' + type + '"')
        .replace("$order", copiedQuestions[index].order)
    );

    if (type === "radio" || type === "dropdown") {
      options.forEach((o) => {
        dataCall(
          UPDATE_QUESTION_OPTION.replace("$optionId", o.id).replace(
            "$text",
            '"' + o.text + '"'
          )
        );
      });
    }
    // UPDATE STATE
    setQuestions(copiedQuestions);
  }

  let questionsDisplay = questions.map((q) => (
    <div key={q.id}>
      {
        <Question
          question={q}
          toggleEditing={toggleQuestionEditing}
          updateQuestion={updateQuestion}
          deleteQuestion={deleteQuestion}
        />
      }
    </div>
  ));

  return (
    <div>
      <h1>Edit Survey</h1>
      <div className={classes.stay}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {questionsDisplay}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div>
        <br />
        <Tooltip title="Add Question" placement="top">
          <Fab
            className={classes.fab}
            color="primary"
            aria-label="add"
            onClick={(r) => addNewQuestion(r)}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
}
