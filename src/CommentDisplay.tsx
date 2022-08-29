import React, { useCallback, useContext, FormEvent } from "react";
import { useParams } from "react-router-dom";
import useData from "./hooks/useData";
import FormMaker from "./meta/formmaker";
import { UserContext } from "./contexts/UserContext";
import PostsDisplay from "./PostsDisplay";
import { PostInline } from "./styled/postInline.styled";
import { PostContainer } from "./styled/postContainer.styled";

function CommentDisplay() {
  const { id } = useParams();
  const userController = useContext(UserContext);

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
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const body = {
      content: data.get("content") as string,
    };
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

  const comments = useData(getComments);

  return (
    <>
      <FormMaker
        title="Add a comment"
        entries={[
          {
            name: "content",
            type: "textarea",
            label: "Comment",
            required: true,
            minRows: 5,
            maxRows: 10,
          },
        ]}
        onSubmit={submitComment}
      />
      <>
        <h3>Comments:</h3>
        {comments.map((comment) => {
          return (
            <PostContainer key = {comment._id}>
              <div style = {{display: 'grid'}}>
                <h3>{comment.user.username}</h3>
                <p>{comment.content}</p>
              </div>
            </PostContainer>
          );
        })}
      </>
    </>
  );
}

export default CommentDisplay;
