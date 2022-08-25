import React, { FormEvent } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormMaker from "./meta/formmaker";
import { Card } from "./styled/card.styled";
import {UserContext} from "./contexts/UserContext";

function Login() {
  const [error, setError] = React.useState<string | null>(null);
  const userController = React.useContext(UserContext);
  const navigate = useNavigate();

  const logIn = (e: FormEvent) => {
    e.preventDefault();
    //Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
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
      <FormMaker
        onSubmit={logIn}
        title="Log In"
        entries={[
          {
            name: "username",
            type: "text",
            label: "Username",
            required: true,
          },
          {
            name: "password",
            type: "password",
            label: "Password",
            required: true,
          },
        ]}
      />
      {error && <Alert severity="error">{error}</Alert>}
    </Card>
  );
}

export default Login;
