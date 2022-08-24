import React, { FormEvent, FormEventHandler } from "react";
import { Alert } from "@mui/material";
import { Card } from "./styled/card.styled";
import { useNavigate } from "react-router-dom";
import FormMaker from "./meta/formmaker";

function SignUp() {
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const signUp = (e: FormEvent) => {
    e.preventDefault();
    //Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    if (formData.get("password") !== formData.get("confirmPassword")) {
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
        //Set User in local storage
        localStorage.setItem("user", JSON.stringify(json));
        navigate("/");
      });
  };

  return (
    <Card>
      <FormMaker
        onSubmit={signUp}
        title="Sign Up"
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
          {
            name: "confirmPassword",
            type: "password",
            label: "Confirm Password",
            required: true,
          },
        ]}
      />
      {error && <Alert severity="error">{error}</Alert>}
    </Card>
  );
}

export default SignUp;
