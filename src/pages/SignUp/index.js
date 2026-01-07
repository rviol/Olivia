import React, { useContext, useState } from 'react';
import { Platform, ActivityIndicator, StatusBar, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Background,
  Container,
  HeaderContainer,
  WelcomeTitle,
  WelcomeSubtitle,
  FormCard,
  Input,
  SubmitButton,
  SubmitText,
  Link,
  LinkText
} from '../SignIn/styles';

import { AuthContext } from '../../contexts/auth';

export default function SignUp(){
  const navigation = useNavigation();
  const { signUp, loadingAuth } = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignUp(){
    if (nome === '' || email === '' || password === ''){
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    signUp(nome,email,password );
  }

  return(
    <Background>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F0FB" />

      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <HeaderContainer>
          <WelcomeTitle>Crie sua conta</WelcomeTitle>
          <WelcomeSubtitle>Preencha os dados para começar!</WelcomeSubtitle>
        </HeaderContainer>

        <FormCard>
          <Input
            placeholder="Seu nome"
            value={nome}
            onChangeText={ (text) => setNome(text) }
            autoCapitalize="words"
          />

          <Input
            placeholder="Seu email"
            value={email}
            onChangeText={ (text) => setEmail(text) }
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            placeholder="Sua senha"
            value={password}
            onChangeText={ (text) => setPassword(text) }
            secureTextEntry={true}
          />

          <SubmitButton onPress={handleSignUp} activeOpacity={0.8}>
            { loadingAuth ? (
              <ActivityIndicator size={25} color="#FFF" />
            ) : (
              <SubmitText>Cadastrar</SubmitText>
            ) }
          </SubmitButton>

          <Link onPress={ () => navigation.goBack() } activeOpacity={0.6}>
            <LinkText>
               Já possui uma conta? <Text style={{fontWeight: 'bold', color: '#9B80AC'}}>Faça login</Text>
            </LinkText>
          </Link>

        </FormCard>

      </Container>
    </Background>
  )
}