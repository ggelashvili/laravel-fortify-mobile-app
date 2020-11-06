import React, {useContext, useState, useEffect} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {AuthContext} from '../AuthProvider'
import {Button, Text, View} from 'react-native'
import api from '../util/api'
import {tailwind} from '../../tailwind'
import Layout from '../Layout'

const Stack = createStackNavigator()

const HomeScreen = ({navigation}) => {
    const {user, logOut}        = useContext(AuthContext)
    const [tickets, setTickets] = useState(null)

    useEffect(() => {
        api({token: user.token}).get('/tickets').then(({data}) => {
            setTickets(data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <Layout title={`Hello ${user.name}`}>
            {tickets !== null
                ? (
                    <>
                        <Text>Number of Tickets: {tickets.length}</Text>
                        <Text>First Ticket ID: {tickets[0].id}</Text>
                    </>
                ) : null}
            <View style={tailwind('mt-5')}>
                <Button title='Go to Settings' onPress={() => navigation.navigate('AccountSettings')} />
            </View>
            <View style={tailwind('mt-5')}>
                <Button title='Logout' onPress={() => logOut()} />
            </View>
        </Layout>
    )
}

const AccountSettingsScreen = ({navigation}) => {
    const {user, logOut} = useContext(AuthContext)

    return (
        <Layout title='Account Settings'>
            <Text style={tailwind('mb-1')}>Name: {user.name}</Text>
            <Text style={tailwind('mb-1')}>Email: {user.email}</Text>
            <View style={tailwind('mt-5')}>
                <Button title='Go to Dashboard' color='#5850ec' onPress={() => navigation.navigate('Home')} />
            </View>
            <View style={tailwind('mt-5')}>
                <Button title='Logout' color='#5850ec' onPress={() => logOut()} />
            </View>
        </Layout>
    )
}

const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='AccountSettings' component={AccountSettingsScreen} />
        </Stack.Navigator>
    )
}

export default AppStack
