import React from 'react'
import {Image, Text} from 'react-native'
import {tailwind} from '../tailwind'

const Header = ({title}) => {
    return (
        <>
            <Image
                style={{width: 50, height: 50}}
                source={require('../assets/logo.jpg')}
            />
            <Text style={tailwind('mt-3 text-3xl leading-9 font-bold text-gray-900')}>{title}</Text>
        </>
    )
}

export default Header
