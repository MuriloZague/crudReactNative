import React, { useContext, useState } from 'react';
import { Text, TextInput, View, StyleSheet, Image, Button } from 'react-native';
import users from '../data/users.js'
import UsersContext from '../context/UsersContext.js';

export default function UserForm({route, navigation}) {

    const [user, setUser] = useState(route.params ? route.params : {})
    const { dispatch } = useContext(UsersContext)

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Nome</Text>
            <TextInput 
                style={styles.input}
                onChangeText={name => setUser({...user, name})} //atualizar o nome do usuario
                placeholder='Informe o nome'
                value={user.name}
            />

            <Text style={styles.title}>Email</Text>
            <TextInput 
                style={styles.input}
                onChangeText={email => setUser({...user, email})} //atualizar o email do usuario
                placeholder='Informe o E-mail'
                value={user.email}
            />

            <Text style={styles.title}>URL do Avatar</Text>
            <TextInput 
                style={styles.input}
                onChangeText={avatarUrl => setUser({...user, avatarUrl})} //atualizar o email do usuario
                placeholder='Informe a URL do avatar'
                value={user.avatarUrl}
            />
            {user.avatarUrl ? (
                <Image
                    source={{ uri: user.avatarUrl }}
                    style={styles.avatar}
                />
            ) : null}
            <Button
                title='Salvar'
                onPress={() => {
                    dispatch({
                        type: user.id ? 'updateUser' : 'createUser', // se o id do user ja existir ele atualiza, se não ele cria um novo user
                        payload: user,
                    })
                    navigation.goBack()
                }}
            />
        </View>

    );
}

const styles = StyleSheet.create ({
    avatar: {
        marginTop: 25,
        marginBottom: 35,
        marginLeft: '29%',
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    title: {
        fontSize: 18,
        paddingBottom: 5
    },
    form: {
        padding: 12,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 3,
    }
})