import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';


export default class Main extends Component {

    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        inputError: false
    }

    handleInputChange = e => {
        this.setState({
            newRepo: e.target.value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();

        try {
            this.setState({ loading: true });

            const { newRepo, repositories } = this.state;

            if (!newRepo) {
                throw new Error('Repositório inválido');
            }

            const repositoryExists = repositories.filter(r => r.name.toLowerCase() === newRepo.toLowerCase());

            if (repositoryExists.length > 0) {
                throw new Error('Repositório duplicado');
            }

            const response = await api.get(`/repos/${newRepo}`);
            const { full_name: name, description, owner } = response.data;

            const data = {
                name,
                description,
                login: owner.login,
                avatar_url: owner.avatar_url,
                issues: []
            }

            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
                loading: false,
            });
        }
        catch (err) {
            this.setState({
                loading: false,
                inputError: true
            });

            console.error("Erro", err.message);
        }
    }

    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if (repositories) {
            this.setState({
                repositories: JSON.parse(repositories)
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { repositories } = this.state;

        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories))
        }
    }

    render() {
        const { newRepo, repositories, loading, inputError } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit} error={inputError}>
                    <input
                        type="text"
                        placeholder="Adicionar repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />
                    <SubmitButton loading={loading.toString()}>
                        {
                            loading
                                ? (<FaSpinner color="#fff" size={14} />)
                                : (<FaPlus color="#fff" size={14} />)
                        }
                    </SubmitButton>
                </Form>

                <List>
                    {
                        repositories.map(repository => (
                            <li key={repository.name}>
                                <span>{repository.name}</span>
                                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                            </li>
                        ))
                    }
                </List>
            </Container>
        )
    }
}