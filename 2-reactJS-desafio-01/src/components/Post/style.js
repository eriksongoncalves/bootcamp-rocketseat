import styled from 'styled-components';

export const Container = styled.article`
    background: #fff;
    box-shadow: 1px 1px 10px #ccc;
    border-radius: 5px;
    margin-bottom: 30px;
    padding: 20px;
`;

export const PostHeader = styled.header`
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 20px;
    margin-bottom: 20px;

    .user{
        display: flex;

        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }

        .info{
            display: flex;
            flex-direction: column;
            justify-content: center;
            

            span{
                color: #ccc;
                font-size: 12px;
            }
        }

    }
`;