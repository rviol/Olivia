import React, {useState} from 'react';
import { StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Importando os estilos (certifique-se que o arquivo styles.js está na mesma pasta)
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
  LinkText
} from './styles';

// Caminho da imagem corrigido com base na sua estrutura
import LogoImage from '../../assests/icone.2.png';

export default function SignIn(){
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return(
    <Background>
      {/* Configura a barra de status para combinar com o fundo claro */}
      <StatusBar barStyle="dark-content" backgroundColor="#F8F0FB" />
      
      <Container>
        
        {/* Cabeçalho com Logo e Textos */}
        <HeaderContainer>
          <Logo 
            source={LogoImage}
            resizeMode="contain"
          />
          <WelcomeTitle>Prazer, sou a sua assistente de estresse Olívia!</WelcomeTitle>
          <WelcomeSubtitle>Acesse sua conta para continuar</WelcomeSubtitle>
        </HeaderContainer>

        <FormCard>
          <AreaInput> 
          <Input
            placeholder="Seu email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(setEmail) => setEmail(text)}
          />
          </AreaInput>
      
          <AreaInput>
          <Input
            placeholder="Sua senha"
            secureTextEntry={true} // Esconde a senha
            value={password}
            onChangeText={(setPassword) => setPassword(text)}
          />
          </AreaInput>

          <SubmitButton activeOpacity={0.8}>
            <SubmitText>Acessar</SubmitText>
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