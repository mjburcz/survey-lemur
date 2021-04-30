import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    alignContent: "center",
    width: 600,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 345,
    },
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
    fontSize: "1.2rem",
    fontWeight: 800,
  },
  questionanswer: {
    paddingLeft: "1em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0em",
    },
  },
  grid: {
    display: "-webkit-box",
  },
  icon: {
    paddingRight: ".3em"
  },
  question: {
    fontSize: "1.2rem",
    color: "#282c34",
    textAlign: "start",
  },
  answer: {
    fontSize: "1.05rem",
    color: "#282c34",
    textAlign: "start",
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
}));

export default function ResponseDisplay(props) {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  let parsedDate = new Date(Date.parse(props.response.submitDate));
  let year = parsedDate.getFullYear();
  let month = parsedDate.getMonth() + 1;
  let day = parsedDate.getDate();

  //let's make the date readable here
  let formattedDate = `${month}/${day}/${year}`;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="order" className={classes.avatar}>
            {props.response.id}
          </Avatar>
        }
        title={
          <Typography className={classes.title} component="h3" variant="h3">
            {formattedDate}
          </Typography>
        }
      />
      <CardContent>
        <IconButton
          className={!expanded ? classes.expand : classes.expandOpen}
          aria-expanded={expanded}
          aria-label="show more"
          onClick={() => setExpanded(!expanded)}
        >
          <ExpandMoreIcon />
        </IconButton>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {props.response.answerSet.map((a, i) => (
              <div key={a.id} className={classes.questionanswer}>
               <Grid className={classes.grid}>
                  <ChatBubbleOutlineOutlinedIcon color="primary" className={classes.icon} />
                  <Typography className={classes.question} component="h4" variant="h4">
                    {a.question !== null && a.question !== undefined
                      ? a.question.text
                      : null}
                  </Typography>
                </Grid>
                <Grid className={classes.grid}>
                  <CommentOutlinedIcon color="secondary" className={classes.icon} />
                  <Typography
                    component="h5"
                    variant="h5"
                    className={classes.answer}
                  >
                    {a.text}
                  </Typography>
                </Grid>
                <br />
              </div>
            ))}
          </CardContent>
        </Collapse>
      </CardContent>
    </Card>
  );
}
