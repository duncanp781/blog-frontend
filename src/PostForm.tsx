import React from "react";
import { UserContext } from "./contexts/UserContext";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { Switch, FormControlLabel, TextField, Button } from "@mui/material";
import { Post } from "./types/Post";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { Form } from "./styled/form.styled";
import { PageTitle } from "./styled/pageTitle.styled";

export default function PostForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const userController = useContext(UserContext);

  // Check if we are updating a post - if the url is on a specific post, we are.
  const [isUpdate, setIsUpdate] = useState(!!params.id);
  //If there is a post, this is its information, otherwise null
  const [post, setPost] = useState<Post | null>(null);

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isMD, setIsMD] = useState(false);

  // Want title and body to be the same as post if there is an update to it - i.e. if is update
  useEffect(() => {
    if (post) {
      setBody(post.content);
      setTitle(post.title);
    }
  }, [post]);

  //If isUpdate, fetch post from API
  useEffect(() => {
    if (isUpdate) {
      fetch("http://localhost:3000/api/post/" + params.id, { mode: "cors" })
        .then((res) => res.json())
        .then((json) => {
          setPost(json);
        });
    }
  }, [isUpdate, params.id]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    //Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      title: title,
      content: body,
      public: formData.get("public") === "on",
      isMD: formData.get("markdown") === "on",
    };
    console.log(data);
    //Send data to server
    if (userController.user) {
      if (isUpdate) {
        setPost((prevPost) => {
          if (!prevPost) {
            return null;
          }
          let newPost = { ...prevPost, ...data };
          fetch("http://localhost:3000/api/post/" + params.id, {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(newPost),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + userController.user.token,
            },
          }).then(() => navigate("/"));
          return newPost;
        });
      } else {
        fetch("http://localhost:3000/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userController.user.token}`,
          },
          body: JSON.stringify(data),
        }).then(() => {
          navigate("/");
        });
      }
    }
  };
  return (
    <>
      <Form
        onSubmit={submit}
        action=""
      >
        <PageTitle>{isUpdate ? "Update Post" : "New Post"}</PageTitle>
        <TextField
          key="title"
          type="text"
          label="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <>
          {isMD ? (
            <MDEditor
              value={body}
              onChange={setBody as any}
              previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
            />
          ) : (
            <TextField
              key="content"
              type="textarea"
              label="Body"
              required={true}
              value={body}
              minRows={5}
              maxRows={10}
              onChange={(e) => setBody(e.target.value)}
            />
          )}
          <FormControlLabel
            control={<Switch name="markdown" />}
            label="Post with Markdown?"
            onChange={(e, checked) => setIsMD(checked)}
          />
          <FormControlLabel
            control={<Switch name="public" defaultChecked />}
            label="Post Publicly?"
          />
        </>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
