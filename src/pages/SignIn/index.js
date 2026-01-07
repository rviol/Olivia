import React, { useState, useContext } from 'react';
import { StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/auth';

import { 
  Background, 
  Container,
  HeaderContainer,
  Logo,
  WelcomeTitle,
  WelcomeSubtitle,
  FormCard,
  Input, 
  SubmitButton, 
  SubmitText,
  Link,
  LinkText,
  AreaInput 
} from './styles';

import LogoImage from '../../assests/icone.2.png';

export default function SignIn(){
  const navigation = useNavigation();
  const { signIn, loadingAuth } = useContext(AuthContext); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(){
    if(email === '' || password === ''){
      alert("Preencha todos os campos"); 
      return;
    }

    signIn(email, password);
  }

  return(
    <Background>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F0FB" />
      
      <Container>
        <HeaderContainer>
          <Logo source={LogoImage} resizeMode="contain" />
          <WelcomeTitle>Prazer, sou a sua assistente de estresse Olívia!</WelcomeTitle>
          <WelcomeSubtitle>Acesse sua conta para continuar</WelcomeSubtitle>
        </HeaderContainer>

        <FormCard>
          <Input
            placeholder="Seu email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={ (text) => setEmail(text) } 
          />
      
          <Input
            placeholder="Sua senha"
            secureTextEntry={true}
            value={password}
            onChangeText={ (text) => setPassword(text) }
          />

          <SubmitButton activeOpacity={0.8} onPress={handleLogin}>
            <SubmitText>
              { loadingAuth ? 'Carregando...' : 'Acessar' }
            </SubmitText>
          </SubmitButton>

          <Link onPress={ () => navigation.navigate('SignUp') } activeOpacity={0.6}>
            <LinkText>
              Não tem uma conta? Crie agora!
            </LinkText>
          </Link>
        </FormCard>

      </Container>
    </Background>
  )
}