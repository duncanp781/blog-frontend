import React from "react";
import { UserContext } from "./contexts/UserContext";
import { useEffect, useState, useContext } from "react";
import FormMaker from "./meta/formmaker";
import { useNavigate, useLocation, useParams } from "react-router";
import { Switch, FormControlLabel } from "@mui/material";
import { Post } from "./types/Post";
import MDEditor from "@uiw/react-md-editor";

export default function PostForm() {
  const location = useLocation();
  const params = useParams();
  // Check if we are updating a post - if the url is on a specific post, we are.
  const [isUpdate, setIsUpdate] = useState(!!params.id);
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();
  const userController = useContext(UserContext);
  const [isMD, setIsMD] = useState(false);
  const [MDContent, setMDContent] = useState("");
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
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      public: formData.get("public") === "on",
    };
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
    <FormMaker
      title={isUpdate ? "Update Post" : "New Post"}
      entries={[
        {
          name: "title",
          type: "text",
          label: "Title",
          required: true,
          value: post ? post.title : "",
        },
        {
          name: "content",
          type: "textarea",
          label: "Body",
          required: true,
          minRows: 5,
          maxRows: 10,
          value: post ? post.content : "",
          include: !isMD,
        },
      ]}
      onSubmit={submit}
    >
      {
        <>
          {isMD ? (
            <MDEditor
              value={MDContent}
              onChange={setMDContent as any}
            />
          ) : (
            <></>
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
      }
    </FormMaker>
  );
}
