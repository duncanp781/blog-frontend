import React from "react";
import { Post } from "./types/Post";
import { Link } from "react-router-dom";
import { Posts } from "./styled/posts.styled";
import {ElidedSubtext} from "./styled/elidedSubtext.styled";
import {PostInline} from './styled/postInline.styled';
import {PostContainer} from './styled/postContainer.styled';

type Props = {
  posts: Post[];
};

function PostsDisplay({ posts }: Props) {
  return (
    <Posts>
      {posts.length > 0 ? posts.map((post) => (
        <PostContainer key={post._id}>
          <PostInline>
            <Link to={"/post/" + post._id}>{post.title}</Link>
            <Link to = {"/user/" + post.author._id}>by {post.author.username}</Link>
            <span>{!post.public ? 'Not Published.' : ''} </span>
            <ElidedSubtext style = {{gridColumn: "1/-1"}}>{post.content}</ElidedSubtext>
          </PostInline>
        </PostContainer>
      )) : (<h2>No Posts Yet</h2>)}
    </Posts>
  );
}

export default PostsDisplay;
