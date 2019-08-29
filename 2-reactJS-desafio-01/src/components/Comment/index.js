import React from 'react';
import { Container } from './style';

const Comment = ({ data }) => (
    <Container>
        <img src={data.author.avatar} alt={data.author.name} />
        <p>
            <strong>{data.author.name}</strong> {data.content}
        </p>
    </Container>
)

export default Comment;