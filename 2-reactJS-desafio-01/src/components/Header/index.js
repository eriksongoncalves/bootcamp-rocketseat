import React from 'react';

import logoFacebook from '../../assets/logo-facebook.png';
import iconUser from '../../assets/icon-user.png';
import { Container } from './style';

const Header = () => (
    <Container>
        <img src={logoFacebook} alt="Facebook" />

        <div className="perfil">
            <a href={null}>Meu perfil</a>
            <img src={iconUser} alt="Meu perfil" />
        </div>
    </Container>
);

export default Header;