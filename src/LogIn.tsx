import React, { FormEvent, useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormMaker from "./meta/formmaker";
import { Card } from "./styled/card.styled";
import { UserContext } from "./contexts/UserContext";
import { Form } from "./styled/form.styled";
import { PageTitle } from "./styled/pageTitle.styled";

function Login() {
  const [error, setError] = React.useState<string | null>(null);
  const userController = React.useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logIn = (e: FormEvent) => {
    e.preventDefault();
    //Get form data
    const data = {
      username: username,
      password: password,
    };
    //Send data to server
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 401) {
          setError("Incorrect username or password");
          return;
        }
        return res.json();
      })
      .then((json) => {
        if (json) {
          //Set User in local storage
          userController.setUser(json);
          //Set user object in local storage
          localStorage.setItem("user", JSON.stringify(json));
          navigate("/");
        }
      });
  };

  return (
    <Card>
      <Form onSubmit={logIn} action="">
        <PageTitle>Log In</PageTitle>
        <TextField
          key="username"
          type="text"
          label="username"
          required={true}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          key="password"
          type="text"
          label="password"
          required={true}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Form>
      {error && <Alert severity="error">{error}</Alert>}
    </Card>
  );
}

export default Login;
