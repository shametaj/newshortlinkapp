import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ControlPointIcon from "@material-ui/icons/ControlPoint";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Input = () => {
  const classes = useStyles();
  const [inputValue, setinputValue] = useState("");
  const [outputValue, setoutputValue] = useState("");

  const HandleApiSubmit = (e) => {
    const session_url = 'https://urlshortener.smef.io/urls';
    const username = 'abat';
    const password = '5hWDEcFK4FUW';
    let basicAuth = 'Basic ' + window.btoa(username + ':' + password);
    axios.post(session_url, { inputValue: inputValue }, {
           headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': + basicAuth
         }
      })
      .then((res) => {
          console.log(res);
          let result = res["data"];
          setoutputValue(result["id"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="inputcontainer flex-outer">
      <aside>
        {" "}
        <div
          className="close_icon"
          onClick={(e) =>
            document.querySelector("aside").classList.remove("active")
          }
        >
          {" "}
          <CloseIcon />
        </div>
        <nav>
          <li style={{ textDecoration: "none", color: "#fb6227", marginLeft: "50px", marginBottom: "20px"}}>
             <ControlPointIcon />
                ShortLink
          </li>   
          <li>
            <Link to="/">HomePage</Link>
          </li>
          <Divider />
          <li>
            <Link to="/list">AdminPage</Link>
          </li>
        </nav>
      </aside>
      <div className="body-area">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={(e) =>
                document.querySelector("aside").classList.toggle("active")
              }
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link
                to="/"
                style={{ textDecoration: "none", color: "#fff" }}
              >
              ShortLink
              </Link>
            </Typography>
            <Button color="inherit">
              <AccountCircleIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <section className="input-area">
          <div className="pure-input">
            <TextField
              id="outlined-basic"
              label="Input"
              variant="outlined"
              value={inputValue}
              onChange={(e) => setinputValue(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={HandleApiSubmit}
            >
              Get / Holen
            </Button>
          </div>
          <div
            className="pure-input output-input-wrapper"
            style={{ flexDirection: "column" }}
          >
            <TextField
              id="outlined-basic"
              label="Output"
              variant="outlined"
              value={outputValue}
              onChange={(e) => setoutputValue(e.target.value)}
              className="output-input"
            />
            <Button
              variant="contained"
              color="primary"
              className="output-button"
              onClick={(e) => {
                let output = document.querySelector(".output-input input");
                console.log(output);
                output.select();
                output.setSelectionRange(0, 99999);
                navigator.clipboard.writeText(output.value);
              }}
            >
              Copy / Kopieren
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="output-button"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://${outputValue}`}
                style={{
                  color: "#fff",
                  textDecoration: "none",

                  display: "block",
                  width: "100%",
                }}
              >
                Test
              </a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};
