import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext({});

function AuthProvider({ children }){
  const [user, setUser] = useState(null); 
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadStorage(){
      const storageUser = await AsyncStorage.getItem('@olivia:user');
      const storageToken = await AsyncStorage.getItem('@olivia:token');

      if(storageUser && storageToken){
        api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;
        setUser(JSON.parse(storageUser));
      }

      setLoading(false);
    }

    loadStorage();
  }, [])

  async function signIn(email, password){
    setLoadingAuth(true);

    try{
      const response = await api.post('/login', {
        email: email,
        password: password
      })

      const { id, name, token } = response.data;

      const data = {
        id,
        name,
        email, 
        token
      };

      await AsyncStorage.setItem('@olivia:user', JSON.stringify(data));
      await AsyncStorage.setItem('@olivia:token', token);

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setUser(data);
      setLoadingAuth(false);

    }catch(err){
      console.log("ERRO AO LOGAR", err);
      
      let titulo = "Ops! Algo deu errado";
      let mensagem = "Não foi possível entrar. Verifique sua conexão.";

      if(err.response && err.response.data){
         const errorBackend = err.response.data.error; 

         if(errorBackend === "Email/Password incorret"){
           titulo = "Acesso Negado";
           mensagem = "E-mail ou senha incorretos. Tente novamente!";
         } else {
           mensagem = errorBackend || "Erro desconhecido no servidor.";
         }
      }

      Alert.alert(titulo, mensagem);
      
      setLoadingAuth(false);
    }
  }

  async function signUp(nome, email, password){
    setLoadingAuth(true);
    try{
      await api.post('/users', {
       name: nome,
       email: email,
       password: password,
      })
      setLoadingAuth(false);
      navigation.goBack();

      Alert.alert("Sucesso!", "Sua conta foi criada. Agora faça o login.");

    }catch(err){
      console.log("ERRO AO CADASTRAR", err)
      setLoadingAuth(false);
      Alert.alert("Erro no cadastro", "Verifique se o e-mail já está em uso.");
    }
  }

  async function signOut(){
    await AsyncStorage.clear();
    setUser(null);
  }

  return(
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signUp, signOut, loadingAuth, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;