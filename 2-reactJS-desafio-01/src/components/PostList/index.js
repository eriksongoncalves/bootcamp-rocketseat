import React, { useState } from 'react';
import Post from '../Post';
import { Container } from './style';

export default function PostList() {
    const [posts] = useState([
        {
            id: 1,
            author: {
                name: 'Francis Wheeler',
                avatar: 'https://randomuser.me/api/portraits/men/16.jpg'
            },
            date: '04 Jun 2019',
            content: 'Pessoal, alguém sabe se a Rocketseat está contratando?',
            comments: [
                {
                    id: 1,
                    author: {
                        name: 'Brent Cooper',
                        avatar: 'https://randomuser.me/api/portraits/men/86.jpg'
                    },
                    content: "Conteúdo do comentário"
                }
            ],
        },
        {
            id: 2,
            author: {
                name: 'Mattie Rose',
                avatar: 'https://randomuser.me/api/portraits/women/91.jpg'
            },
            date: '14 Jun 2019',
            content: 'Fala Dev, blz ?',
            comments: [
                {
                    id: 2,
                    author: {
                        name: '3048 Northaven Rd',
                        avatar: 'https://randomuser.me/api/portraits/women/14.jpg'
                    },
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur massa elementum magna scelerisque, at tempus mi accumsan. Curabitur viverra, lorem sed condimentum volutpat, nulla enim sollicitudin ipsum, in pulvinar nisi enim ut eros. Donec id augue ut quam porttitor finibus vitae eu lectus. Aenean id faucibus urna. Integer euismod, nisi eu placerat hendrerit, arcu urna semper nulla, in pretium ex justo non sem. Proin tristique, ipsum a condimentum vestibulum, orci dolor malesuada nulla, eu bibendum enim ex et dui. Cras ac nulla neque. Vestibulum in interdum ante, quis mattis massa. Integer ut leo dignissim, fermentum arcu volutpat, dictum libero. Vivamus in gravida arcu. Cras ac fermentum arcu."
                },
                {
                    id: 3,
                    author: {
                        name: 'Jessica Young',
                        avatar: 'https://randomuser.me/api/portraits/women/82.jpg'
                    },
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                }
            ],
        }
    ])

    return (
        <Container>
            {posts.map(post => <Post key={post.id} data={post} />)}
        </Container>
    );
}