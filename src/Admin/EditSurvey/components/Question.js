import React from "react";
import QuestionDisplay from "./QuestionDisplay";
import QuestionEdit from "./QuestionEdit";
import { Draggable } from "react-beautiful-dnd";

//pass the props object to function
//assign prop data from parent to be passed to which ever child component
export default function Question(props) {
  let q = null;
  //triggers question edit component
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
     //triggers question display component
    q = (
      <QuestionDisplay
        question={props.question}
        toggleEditing={() => props.toggleEditing(props.question.id)}
        deleteQuestion={props.deleteQuestion}
      />
    );
  }

  return (
     //import to sort question list by click & drag
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
