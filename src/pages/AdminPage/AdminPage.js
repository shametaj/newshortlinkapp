import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";
import Card from "@material-ui/core/Card";
import axios from "axios";
import ControlPointIcon from "@material-ui/icons/ControlPoint";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    flexGrow: 1,
  },
});


export const TableLocal = () => {
  const classes = useStyles();

  const [results, setResults] = useState([]);

  const HandleApiSubmit = (e) => {
    let session_url = `https://urlshortener.smef.io/urls?orderBy=createdAt&orderDir=desc&limit=25`;
    const username = 'abat';
    const password = '5hWDEcFK4FUW';
    let basicAuth = 'Basic ' + window.btoa(username + ':' + password);
    axios.get(session_url, {}, {
           headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': + basicAuth
         }
      })
      .then((res) => {
        console.log(res);
        let result = res["data"];

        setResults(result);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    HandleApiSubmit();
  }, []);

  const deleteRow = (id) => {
    let session_url = `https://urlshortener.smef.io/urls/${id}`;
    const username = 'abat';
    const password = '5hWDEcFK4FUW';
    let basicAuth = 'Basic ' + window.btoa(username + ':' + password);
    axios.delete(session_url, {}, {
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': + basicAuth
         }
      })
      .then((res) => {
        console.log(res);
        HandleApiSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  };


    const editLink = (id) => {
    let session_url = `https://urlshortener.smef.io/urls/${id}`;
    const username = 'abat';
    const password = '5hWDEcFK4FUW';
    let basicAuth = 'Basic ' + window.btoa(username + ':' + password);
    axios.put(session_url, {}, {
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': + basicAuth
         }
      })
      .then((res) => {
        console.log(res);
        HandleApiSubmit();
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
        <section className="table-area">
          {" "}
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Link
                      to="/"
                      style={{
                        color: "#000",
                        textDecoration: "none",
                        display: "flex",
                      }}
                    >
                      <ControlPointIcon />
                      New Link / Neuer Link
                    </Link>
                  </TableCell>

                  <TableCell align="right">Id</TableCell>
                  <TableCell align="right">URL</TableCell>
                  <TableCell align="right">TTL</TableCell>
                  <TableCell align="right">Creation-DateTime</TableCell>
                  <TableCell align="right">Last-Changed-DateTime</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((EachResult) => (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <IconButton
                        aria-label="delete"
                        onClick={(e) => deleteRow(EachResult.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton 
                        aria-label="edit"
                        onClick={(e) => editLink(EachResult.id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">{EachResult.id}</TableCell>
                    <TableCell align="right">{EachResult.url}</TableCell>
                    <TableCell align="right">{EachResult.ttlInSeconds}</TableCell>
                    <TableCell align="right">{EachResult.createdDate}</TableCell>
                    <TableCell align="right">{EachResult.modifiedDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Card className="card-warpper">
            <CardContent className="card-content">
              <WarningIcon />
              <Typography className="text" color="textSecondary" gutterBottom>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                adipisci fuga excepturi libero repellat impedit dolores?
                Necessitatibus sequi ea nisi.
              </Typography>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};
