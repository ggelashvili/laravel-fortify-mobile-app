import React from 'react'
import Header from './Header'
import {View} from 'react-native'

const Layout = ({children, title}) => (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF'}}>
        <Header title={title} />
        {children}
    </View>
)

export default Layout
