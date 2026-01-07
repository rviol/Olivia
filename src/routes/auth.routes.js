import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Stack = createNativeStackNavigator();

function AuthRoutes(){
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="SignIn" 
        component={SignIn} 
        options={{ headerShown: false }} 
      />
      
      <Stack.Screen 
        name="SignUp" 
        component={SignUp} 
        options={{ 
          headerStyle:{
            backgroundColor: '#3b3dbf', 
            borderBottomWidth: 1, 
            borderBottomColor: '#00b94a' 
          },
          headerTintColor: '#FFF', 
          headerBackTitleVisible: false, 
          headerTitle: 'Voltar'
        }} 
      />
    </Stack.Navigator>
  )
}

export default AuthRoutes;