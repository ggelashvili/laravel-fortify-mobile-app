import React, {useEffect, useState} from 'react'
import * as SecureStore from 'expo-secure-store'
import api from './util/api'

export const AuthContext = React.createContext({})

export const AuthProvider = ({children}) => {
    const [user, setUser]   = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null)
            }, 2500)

            return () => clearTimeout(timer)
        }
    }, [error])

    const logIn = (email, password) => {
        api().post('/auth/token', {
            email,
            password,
            device_name: 'mobile',
        }).then(response => {
            const userResponse = {
                email: response.data.user.email,
                name: response.data.user.name,
                token: response.data.token,
            }

            setUser(userResponse)
            setError(null)

            SecureStore.setItemAsync('user', JSON.stringify(userResponse))
        }).catch(({errors}) => {
            setError(errors[0])
        })
    }

    const logOut = () => {
        api({token: user.token}).delete('/auth/token').then(() => {
            setUser(null)

            SecureStore.deleteItemAsync('user')
        }).catch(({errors}) => {
            setError(errors[0])
        })
    }

    return (
        <AuthContext.Provider value={{user, setUser, error, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}
