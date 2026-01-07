import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const AuthStack = createNativeStackNavigator(); 

function AuthRoutes() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="SignIn"
                component={SignIn} 
                options={{headerShown: false,}}
            />
                
            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                        headerStyle:{
                        backgroundColor: '#c77df5ff', 
                        borderBottomWidth: 1,
                        borderBottomColor: '#8B008B'},

                        headerTintColor: '#fff', 
                        headerTitleAlign: 'center',
                        headerTitle: 'Cadastre-se',
                    }}
            />
        
        </AuthStack.Navigator>      
    )
}
export default AuthRoutes;


