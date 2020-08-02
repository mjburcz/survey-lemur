import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Collapse,
    Avatar,
    FormControl,
    FormControlLabel,
    IconButton,
    Typography,
    TextField,
    RadioGroup,
    Radio,
    Select,
    MenuItem,
    InputLabel,
  } from "@material-ui/core";
  import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
  import { makeStyles } from "@material-ui/core/styles";


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
    }
  }));

export default function ResponseDisplay(props) {
    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);

    let parsedDate =  new Date(Date.parse(props.response.submitDate));
    let year = parsedDate.getFullYear();
    let month = parsedDate.getMonth() + 1;
    let day = parsedDate.getDate();
    let hours = parsedDate.getHours();
    let minutes = parsedDate.getMinutes();

    let formattedDate = `${month}/${day}/${year}`;

    console.log(props.response);

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="order" className={classes.avatar}>
                    {props.response.id}
                    </Avatar>
                }
                title={
                    <Typography
                        className={classes.title}
                        component="h3"
                        variant="h3"
                    >
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
                      <div>
                            <p>answer: {a.text}</p>
                            <p>question: {a.question !== null && a.question !== undefined ? a.question.text : null}</p>
                      </div>
                  ))}
                </CardContent>
              </Collapse>
            </CardContent>
        </Card>
    );
}