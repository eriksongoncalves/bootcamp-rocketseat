import styled from 'styled-components';

export const Container = styled.header`
    background-color: #4a90e2;
    padding: 20px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .perfil{
        display: flex;
        align-items: center;

        a{
            margin-right: 10px;
            text-decoration: none;
            color: #fff;
            font-weight: bold;

            &:hover{
                text-decoration: underline;
            }
        }        
    }
`;