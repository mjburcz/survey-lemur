import React from "react";
import QuestionDisplay from "./QuestionDisplay";
import QuestionEdit from "./QuestionEdit";
import { Draggable } from "react-beautiful-dnd";

export default function Question(props) {
  let q = null;
  if (props.question.editing) {
    q = (
      <QuestionEdit
        question={props.question}
        toggleEditing={() => props.toggleEditing(props.question.id)}
        updateQuestion={props.updateQuestion}
        deleteQuestion={props.deleteQuestion}
      />
    );
  } else {
    q = (
      <QuestionDisplay
        question={props.question}
        toggleEditing={() => props.toggleEditing(props.question.id)}
        deleteQuestion={props.deleteQuestion}
      />
    );
  }

  return (
    <Draggable
      draggableId={"draggable-" + props.question.id}
      index={props.question.order}
    >
      {(provided) => (
        <div
          className="Container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {q}
        </div>
      )}
    </Draggable>
  );
}
