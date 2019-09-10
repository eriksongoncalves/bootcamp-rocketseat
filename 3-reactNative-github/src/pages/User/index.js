import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import { Container, Header, Avatar, Name, Bio, Stars, Starred, OwnerAvatar, Info, Title, Author } from './styles';

export default class User extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('user').name
    });

    static propTypes = {
        navigation: PropTypes.shape({
            getParam: PropTypes.func
        }).isRequired
    }

    state = {
        stars: [],
        loading: true,
        page: 1,
        refreshing: false
    }

    async componentDidMount() {
        await this.loadMore();
    }

    loadMore = async () => {
        const { navigation } = this.props;
        const { page, stars } = this.state;
        const user = navigation.getParam('user');

        const response = await api.get(`/users/${user.login}/starred`, {
            params: {
                page
            }
        });

        this.setState({
            stars: [...stars, ...response.data],
            loading: false,
            page: page + 1,
            refreshing: false,
        })
    }

    refreshList = async () => {
        this.setState({
            page: 1,
            refreshing: true,
            stars: [],
        });

        await this.loadMore();
    }

    render() {
        const { navigation } = this.props;
        const { stars, loading, refreshing } = this.state;
        const user = navigation.getParam('user');

        return (
            <Container>
                <Header>
                    <Avatar source={{ uri: user.avatar }} />
                    <Name>{user.name}</Name>
                    <Bio>{user.bio}</Bio>
                </Header>

                {
                    loading
                        ? <ActivityIndicator />
                        : <Stars
                            data={stars}
                            keyExtractor={star => String(star.id)}
                            onEndReachedThreshold={0.2}
                            onEndReached={this.loadMore}
                            onRefresh={this.refreshList}
                            refreshing={refreshing}
                            renderItem={({ item }) => (
                                <Starred onPress={() => navigation.navigate('Repository', { repository: item })}>
                                    <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                                    <Info>
                                        <Title>{item.name}</Title>
                                        <Author>{item.owner.login}</Author>
                                    </Info>
                                </Starred>
                            )
                            }
                        />
                }
            </Container >
        )
    }
}