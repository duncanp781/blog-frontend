import { useCallback, useContext, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import useData from "./hooks/useData";
import { UserContext } from "./contexts/UserContext";
import { PostContainer } from "./styled/postContainer.styled";
import { Posts } from "./styled/posts.styled";
import { format, parseISO } from "date-fns";
import uniqid from 'uniqid';
import { Form } from "./styled/form.styled";
import { PageTitle } from "./styled/pageTitle.styled";
import { Button, TextField } from "@mui/material";

function CommentDisplay() {
  const { id } = useParams();
  const userController = useContext(UserContext);
  const [comment, setComment] = useState("");

  const getComments = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3000/api/post/${id}/comments`,
      {
        mode: "cors",
      }
    );
    const data = await response.json();
    return data;
  }, [id]);

  const submitComment = (e: FormEvent<Element>) => {
    e.preventDefault();
    // const form = e.target as HTMLFormElement;
    // const data = new FormData(form);
    const body = {
      content: comment,
    };
    const tempComment = {
      content: comment,
      createdAt: "Just Now",
      user: userController.user,
      _id: uniqid(),
    };
    setComments([...comments, tempComment]);
    fetch(`http://localhost:3000/api/post/${id}`, {
      method: "POST",
      body: JSON.stringify(body),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userController.user.token}`,
      },
    });
  };

  const [comments, setComments] = useData(getComments);

  return (
    <>
      <Form
        onSubmit={submitComment}
        action="">
          <PageTitle>Add A Comment</PageTitle>
          <TextField
            key="content"
            type="textarea"
            label="Comment"
            required={true}
            value={comment}
            onChange={(e)=>{setComment(e.target.value)}}
            />
            <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        </Form>
      <>
        <h3>Comments:</h3>
        <Posts>
          {comments.map((comment) => {
            return (
              <PostContainer key={comment._id}>
                <div style={{ display: "grid" }}>
                  <h3>
                    {comment.user.username}{" "}
                    <span>
                      {comment.createdAt === "Just Now"
                        ? "Just Now"
                        : "on " + format(parseISO(comment.createdAt), "PP")}
                    </span>
                  </h3>
                  <p>{comment.content}</p>
                </div>
              </PostContainer>
            );
          })}
        </Posts>
      </>
    </>
  );
}

export default CommentDisplay;
