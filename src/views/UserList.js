import React, { useContext } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { Avatar, Button, Icon, ListItem, Image } from 'react-native-elements';
import UsersContext from '../context/UsersContext.js';

export default function UserList(props) {

    const { state, dispatch } = useContext(UsersContext)

    function confirmUserDeletion(user) {
        Alert.alert('Atenção!', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getActions(item){
        return (
            <>
            <Button
                onPress={() => props.navigation.navigate('UserForm', item)}
                type='clear'
                icon={<Icon name='edit' size={25} color={'orange'}/>}
            />
            <Button
                onPress={() => confirmUserDeletion(item)}
                type='clear'
                icon={<Icon name='delete' size={25} color={'red'}/>}
            />
            </>
        )
    }

    const getUserItem = ({ item }) => {

        return (
          <ListItem bottomDivider onPress={() => props.navigation.navigate('UserForm' , item)}>

            <Avatar rounded source={ { uri: item.avatarUrl } } />
            <ListItem.Content>
              <ListItem.Title>{ item.name }</ListItem.Title>
              <ListItem.Subtitle>{ item.email }</ListItem.Subtitle>
            </ListItem.Content>
            {getActions(item)}
          </ListItem>
        );
      };

      return (
        <View>
          <FlatList
            data={ state.users }
            keyExtractor={ user => user.id.toString() }
            renderItem={ getUserItem }
          />
        </View>
      );
}