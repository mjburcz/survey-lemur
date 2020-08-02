import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Collapse,
  Avatar,
  FormControl,
  FormControlLabel,
  Typography,
  TextField,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { dataCall } from "../../Core/DataService";
import { GET_RESPONSES } from "../../Core/queries";
import ResponseDisplay from "./components/ResponseDisplay";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 600,
    maxWidth: 1500,
    display: "inline-block",
    alignContent: "center",
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
    fontSize: 20,
    fontWeight: 800,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
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
  checked: {},
  fab: {
    "& > *": {
      margin: theme.spacing(1),
    },
    alignContent: "center",
  },
}));

function SurveyResults() {
  const classes = useStyles();

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
      console.log(responses);
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
