import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';

import { Loading, Owner, IssueList, Filters, Pagination } from './styles';

export default class Repository extends Component {

    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string
            })
        }).isRequired
    };

    state = {
        repository: {},
        issues: [],
        loading: true,
        loadingIssue: false,
        issueStates: [
            { id: "all", description: "Todas" },
            { id: "open", description: "Abertas" },
            { id: "closed", description: "Fechadas" }
        ],
        issueActive: 1,
        page: 1,
        totalPages: 0
    }

    loadIssues(page = 1, issueActive = 1) {
        const qtdPage = 5;
        const pagAtual = (page - 1) * qtdPage;
        const limit = pagAtual + qtdPage;
        const { issueStates } = this.state;
        let { issues } = this.state.repository;

        if (issueActive > 1) {
            issues = issues.filter(i => i.state === issueStates[issueActive - 1].id);
        }

        let totalPages = Math.round(issues.length / 5);

        issues = issues.slice(pagAtual, limit);

        this.setState({
            issueActive,
            issues,
            page,
            totalPages
        });
    }

    async componentDidMount() {
        const { match } = this.props;
        const repoName = decodeURIComponent(match.params.repository);

        const repositories = JSON.parse(await localStorage.getItem('repositories'));
        const [repository] = repositories.filter(r => r.name === repoName);

        const issues = await api.get(`/repos/${repoName}/issues`, { params: { state: 'all' } });
        repository.issues = issues.data;

        this.setState({
            repository,
            issues: issues.data.slice(0, 5),
            loading: false,
            totalPages: Math.round(issues.data.length / 5)
        });
    }

    render() {
        const { repository, loading, loadingIssue, issues, issueStates, issueActive } = this.state;

        if (loading) {
            return <Loading><FaSpinner color="#fff" size={30} /></Loading>
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar aos repositórios</Link>
                    <img src={repository.avatar_url} alt={repository.login} />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>
                <Filters active={issueActive}>
                    {
                        issueStates.map((state, idx) => (
                            <li
                                key={idx}
                                onClick={() => this.loadIssues(1, idx + 1)}
                            >
                                {state.description}
                            </li>
                        ))
                    }
                </Filters>

                {
                    loadingIssue
                        ? <Loading issue><FaSpinner color="#333" size={30} /></Loading>
                        : <IssueList>{issues.map(issue => (
                            <li key={String(issue.id)}>
                                <img src={issue.user.avatar_url} alt={issue.user.login} />
                                <div>
                                    <strong>
                                        <a href={issue.html_url} target="_blank">{issue.title}</a>
                                        {issue.labels.map(label => (
                                            <span key={String(label.id)}>{label.name}</span>
                                        ))}
                                    </strong>
                                    <p>{issue.user.login}</p>
                                </div>
                            </li>
                        ))}</IssueList>
                }
                <Pagination>
                    {
                        this.state.page > 1
                        && <button onClick={() => this.loadIssues(this.state.page - 1, this.state.issueActive)}>Anterior</button>
                    }
                    {
                        this.state.page < this.state.totalPages &&
                        <button onClick={() => this.loadIssues(this.state.page + 1, this.state.issueActive)}>Próxima</button>
                    }
                </Pagination>
            </Container>
        )
    }
};