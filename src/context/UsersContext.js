import React, { createContext, useReducer } from "react";
import users from '../data/users'

const initialState = { users }
const UsersContext = createContext({})

const actions = {
    createUser(state, action) {
        const user = action.payload
        user.id = Math.random()
            return {
                ...state,
                users: [...state.users, user],
            }
    },
    updateUser(state, action) {
        const updated = action.payload
        return {
            ...state,
            users: state.users.map(u => u.id === updated.id ? updated : u) // se o id do elemento atualizado for igual ao id de outro user o proprio será atualizado
        }
    },
    deleteUser(state, action){
        const user = action.payload
        return {
            ...state, // (apenas definir isso se houver mais atributos, no caso existe apenas o user então não é necessário)
            users: state.users.filter(u => u.id !== user.id) // se o id do usuario for igual ao id excluido ele desaparece da lista
        }
    }
}


export function UsersProvider(props) {

    function reducer(state, action) {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UsersContext.Provider value={{ state, dispatch }}>
            {props.children}
        </UsersContext.Provider>
    )
}

export default UsersContext