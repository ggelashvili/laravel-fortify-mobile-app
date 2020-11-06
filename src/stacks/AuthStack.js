import React, {useContext, useState} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {AuthContext} from '../AuthProvider'
import {Button, Text, View, TextInput, Image} from 'react-native'
import {tailwind} from '../../tailwind'
import Layout from '../Layout'

const Stack = createStackNavigator()

const LoginScreen = ({navigation}) => {
    const {logIn, error}          = useContext(AuthContext)
    const [email, setEmail]       = useState('')
    const [password, setPassword] = useState('')

    return (
        <Layout title='Sign In'>
            <View style={tailwind('p-5 w-full')}>
                {error && <Text style={tailwind('text-red-800 bg-red-200 p-3 mb-5 rounded-md')}>{error}</Text>}
                <TextInput
                    style={tailwind('mb-2 relative px-3 py-2 border border-gray-300 text-gray-900 rounded-md')}
                    onChangeText={text => setEmail(text)}
                    placeholder='Email'
                    textContentType='emailAddress'
                    autoCapitalize='none'
                />
                <TextInput
                    style={tailwind('mb-4 relative px-3 py-2 border border-gray-300 text-gray-900 rounded-md')}
                    onChangeText={text => setPassword(text)}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <Button
                    title='Login'
                    color='#5850ec'
                    onPress={() => logIn(email, password)}
                />
                <Text
                    style={tailwind('text-lg text-indigo-600 text-center mt-2')}
                    onPress={() => navigation.navigate('Register')}
                >
                    Create New Account
                </Text>
                <Text
                    style={tailwind('text-lg text-indigo-600 text-center mt-2')}
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    Forgot Password
                </Text>
            </View>
        </Layout>
    )
}

const RegisterScreen = ({navigation}) => {
    return (
        <Layout title='Create Your New Account'>
            <View style={tailwind('mt-5')}>
                <Button title='Go to Login' color='#5850ec' onPress={() => navigation.navigate('Login')} />
            </View>
        </Layout>
    );
}

const ForgotPasswordScreen = ({navigation}) => {
    return (
        <Layout title='Reset Password'>
            <View style={tailwind('mt-5')}>
                <Button title='Go to Login' color='#5850ec' onPress={() => navigation.navigate('Login')} />
            </View>
        </Layout>
    );
}

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
            <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack
