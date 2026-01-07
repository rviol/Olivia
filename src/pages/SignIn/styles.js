import styled from 'styled-components/native';
import { Platform } from 'react-native';

// Definindo a paleta de cores
const COLORS = {
  background: '#F8F0FB', // Lilás clarinho fundo
  primaryDark: '#9B80AC', // Roxo para títulos
  textSecondary: '#7A6E80', // Cinza/Roxo para textos secundários
  cardBg: '#FFFFFF',      // Fundo branco do card
  inputBg: '#F3E5F5',     // Fundo bem clarinho para os inputs
  buttonPink: '#FF9EB5',  // Rosa do botão principal
  buttonText: '#FFFFFF',
};

export const Background = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.background};
`;

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height'
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const HeaderContainer = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

export const Logo = styled.Image`
  width: 500px;
  height: 350px;
  border-radius: 75px; 
  margin-bottom: 15px;
`;

export const WelcomeTitle = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: ${COLORS.primaryDark};
  text-align: center;
`;

export const WelcomeSubtitle = styled.Text`
  font-size: 16px;
  color: ${COLORS.textSecondary};
  text-align: center;
  marginTop: 5px;
`;

export const FormCard = styled.View`
  background-color: ${COLORS.cardBg};
  width: 100%;
  padding: 25px;
  border-radius: 25px;

  shadow-color: #9B80AC;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 10px;
  elevation: 5; 
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: COLORS.textSecondary
})`
  background-color: ${COLORS.inputBg};
  width: 100%;
  font-size: 17px;
  padding: 18px 20px;
  border-radius: 30px; 
  color: ${COLORS.primaryDark};
  margin-bottom: 15px;
  border-width: 1px;
  border-color: transparent; 
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 55px;
  border-radius: 30px; 
  background-color: ${COLORS.buttonPink};
  margin-top: 10px;
  align-items: center;
  justify-content: center;

  shadow-color: ${COLORS.buttonPink};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 5px;
  elevation: 3;
`;

export const SubmitText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${COLORS.buttonText};
`;

export const Link = styled.TouchableOpacity`
  margin-top: 20px;
  margin-bottom: 10px;
  align-self: center;
`;

export const LinkText = styled.Text`
  color: ${COLORS.textSecondary};
  font-size: 16px;
`;