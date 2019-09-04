import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    from{
        transform: rotate(0deg)
    }
    to{
        transform: rotate(360deg)
    }
`;


export const Loading = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${props => props.issue ? '20vh' : '100vh'};

    svg{
        animation: ${rotate} 2s linear infinite;
    }
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    a{
       color: #7159c1;
       font-size: 16px;
       text-decoration: none; 

       &:hover{
        text-decoration: underline;
       }
    }

    img{
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1{
        font-size: 24px;
        margin-top: 10px;
    }

    p{
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
`;

export const Filters = styled.ul`
    display: flex;
    background: #ddd;
    list-style: none;
    justify-content: space-around;
    border-radius: 4px;
    padding: 5px;
    margin-top: 20px;

    li{
        padding: 10px 20px;
        border-radius: 4px;
        color: #999;
        cursor: pointer;
        font-weight: 600;

        &:nth-child(${props => props.active}){
            color: #333;
        }
    }
`;

export const IssueList = styled.ul`
    margin-top: 20px;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;

        & + li{
            margin-top: 10px;
        }

        img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #eee;
        }

        div{
            flex: 1;
            margin-left: 15px;

            strong{
                font-size: 16px;

                a{
                    text-decoration: none;
                    color: #333;

                    &:hover{
                        color: #7159c1;
                    }
                }

                span{
                    background: #eee;
                    color: #333;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 600;
                    height: 20px;
                    padding: 3px 4px;
                    margin-left: 10px;
                }
            }

            p{
                margin-top: 5px;
                font-size: 12px;
                color: #999;
            }

        }
    }
`;

export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;

    button{
        background: #7159c1;
        color: #fff;
        padding: 15px 30px;
        border: none;
        border-radius: 4px;
        transition: background .3s ease-out;

        & + button {
            margin-left: 10px;
        }

        &:hover{
            background: #3f1cb1;
        }
    }

`;
