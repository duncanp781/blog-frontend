import React, { FormEvent, FormEventHandler, useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import { Card } from "./styled/card.styled";
import { useNavigate } from "react-router-dom";
import { Form } from "./styled/form.styled";
import { PageTitle } from "./styled/pageTitle.styled";

function SignUp() {
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = (e: FormEvent) => {
    e.preventDefault();
    //Get form data
    const data = {
      username: username,
      password: password,
    };
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    //Send data to server
    fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message) {
          setError(json.message);
          return;
        }
        //If no error, then JSON is the token. Set User in local storage
        localStorage.setItem("user", JSON.stringify(json));
        navigate("/");
      });
  };

  return (
    <Card>
      <Form onSubmit={signUp} action="">
        <PageTitle>Sign Up</PageTitle>
        <TextField
          key="username"
          type="text"
          label="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          key="password"
          type="text"
          label="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          key="confirmPassword"
          type="text"
          label="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Form>
     
      {error && <Alert severity="error">{error}</Alert>}
    </Card>
  );
}

export default SignUp;
