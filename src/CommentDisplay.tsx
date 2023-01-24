import React, { useCallback, useContext, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import useData from "./hooks/useData";
import FormMaker from "./meta/formmaker";
import { UserContext } from "./contexts/UserContext";
import PostsDisplay from "./PostsDisplay";
import { PostInline } from "./styled/postInline.styled";
import { PostContainer } from "./styled/postContainer.styled";
import { Posts } from "./styled/posts.styled";
import { format, parseISO } from "date-fns";
import uniqid from 'uniqid';

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
    const tempComment = {
      content: data.get("content") as string,
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
