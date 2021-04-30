import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { dataCall } from "../../Core/DataService";
import { GET_RESPONSES } from "../../Core/queries";
import ResponseDisplay from "./components/ResponseDisplay";

const useStyles = makeStyles((theme) => ({
  stay: {
    paddingBottom: "1em",
    marginBottom: "1em",
  },
}));


function SurveyResults() {
  const classes = useStyles();
  const [responses, setResponses] = useState([]);

  //api call to get responses and set them so we can see them!
  useEffect(() => {
    dataCall(GET_RESPONSES).then((r) => {
      setResponses(
        r.data.data.allResponses.map((response) => ({
          ...response,
          expanded: false,
        }))
      );
    });
  }, []);

  return (
    <div>
      <h1>Survey Results</h1>
      <div className={classes.stay}>
      {responses.map((r) => (
        <div key={r.id}>
          <ResponseDisplay response={r} />
        </div>
      ))}
       </div>
    </div>
  );
}

export default SurveyResults;
