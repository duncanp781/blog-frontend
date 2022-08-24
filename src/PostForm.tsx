import React from 'react'
import { UserContext } from './contexts/UserContext'
import { useEffect, useState, useContext } from 'react'
import FormMaker from './meta/formmaker'
import { useNavigate } from 'react-router'
import {Switch, FormControlLabel} from '@mui/material'

export default function PostForm() {
  const navigate = useNavigate();
  const userController = useContext(UserContext);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    //Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      title: formData.get("title"),
      content: formData.get("content"),
      public: formData.get("public") === "on",
    };
    //Send data to server
    if (userController.user) {
    fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${userController.user.token}` },
      body: JSON.stringify(data),
    })
      .then(() => {
        navigate("/");
      });
    }
  }
  return (
    <FormMaker title = 'Make a post' entries = {
      [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Body',
          required: true,
          minRows: 5,
          maxRows: 10,
        },
      ]
    }
      onSubmit = {submit}
     >
      {<FormControlLabel control={<Switch name="public" defaultChecked/>} label="Post Publicly?" />}
      </FormMaker>
  )
}