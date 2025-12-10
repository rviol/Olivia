import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";

import AuthRoutes from "./auth.routes"; // Suas rotas antigas de Login/Cadastro
import Home from "../pages/Home";       // A nova tela Home
import { AuthContext } from "../contexts/auth";

function Routes() { 
    const { signed, loading } = useContext(AuthContext);

    if(loading){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#c77df5ff'}}>
                <ActivityIndicator size={50} color="#121212" />
            </View>
        )
    }

    // Se estiver logado (signed), mostra a Home.
    // Se não, mostra o fluxo de Login/Cadastro (AuthRoutes).
    return (
        signed ? <Home /> : <AuthRoutes />
    )
}

export default Routes;