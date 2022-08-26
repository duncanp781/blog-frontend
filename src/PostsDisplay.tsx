import React from "react";
import { Post } from "./Home";
import { Link } from "react-router-dom";
import { Posts } from "./styled/posts.styled";
import styled from "styled-components";

type Props = {
  posts: Post[];
};

const PostContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  border: 1px solid black;
  margin: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const PostInline = styled.div`
  display: grid;
  grid-template-columns: max-content max-content 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  align-items: center;
  justify-items: start;
  width: 100%;
  max-width: 500px;
`;

const ElidedSubtext = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-style: italic;
  color: #777;
  width: 100%;
  max-width: 500px;
  `;

function PostsDisplay({ posts }: Props) {
  return (
    <Posts>
      {posts.map((post) => (
        <PostContainer key={post._id}>
          <PostInline>
            <Link to={"/post/" + post._id}>{post.title}</Link>
            <Link to = {"/user/" + post.author._id}>by {post.author.username}</Link>
            <span>{!post.public ? 'Not Published.' : ''} </span>
            <ElidedSubtext style = {{gridColumn: "1/-1"}}>{post.content}</ElidedSubtext>
          </PostInline>
        </PostContainer>
      ))}
    </Posts>
  );
}

export default PostsDisplay;
