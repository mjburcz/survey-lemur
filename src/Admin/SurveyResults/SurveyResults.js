import React, { useEffect, useState } from "react";
import { dataCall } from "../../Core/DataService";
import { GET_RESPONSES } from "../../Core/queries";
import ResponseDisplay from "./components/ResponseDisplay";

function SurveyResults() {

  const [responses, setResponses] = useState([]);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
      {responses.map((r) => (
        <div key={r.id}>
          <ResponseDisplay response={r} />
        </div>
      ))}
    </div>
  );
}

export default SurveyResults;
