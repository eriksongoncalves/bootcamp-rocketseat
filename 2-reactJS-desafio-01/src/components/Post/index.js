import React from 'react';
import { Container, PostHeader } from './style';
import Comment from '../Comment';

const Post = ({ data }) => (
    <Container>
        <PostHeader>
            <div className="user">
                <img src={data.author.avatar} alt={data.author.name} />
                <div className="info">
                    <strong>{data.author.name}</strong>
                    <span>{data.date}</span>
                </div>
            </div>
        </PostHeader>
        <p>{data.content}</p>
        {data.comments.map(comment => <Comment key={comment.id} data={comment} />)}
    </Container>
)

export default Post;