import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 600,
    maxWidth: 1000,
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
    backgroundColor: "#5dbcd2",
  },
  title: {
    fontSize: 20,
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
  },
}));

function AdminStyles() {
  const classes = useStyles();
  return (<>{classes}</>);
}

export default AdminStyles;
