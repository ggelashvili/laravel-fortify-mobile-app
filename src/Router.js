import React, {useState, useEffect, useContext} from "react"
import {View, ActivityIndicator} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {AuthContext} from './AuthProvider'
import * as SecureStore from 'expo-secure-store'
import AuthStack from './stacks/AuthStack'
import AppStack from './stacks/AppStack'

const Router = () => {
    const {user, setUser}       = useContext(AuthContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        SecureStore.getItemAsync('user').then(userString => {
            setUser(JSON.parse(userString))

            setLoading(false)
        }).catch(err => {
            console.log(err)
        })

    }, [])

    if (loading) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Router
