import styled from 'styled-components/native';

export const Background = styled.View`
  flex:1;
  background-color: #c77df5ff;
`;

export const Container = styled.KeyboardAvoidingView`
  flex:1;
  align-items: center;
  justify-content: flex-start;
  padding-top: -10px;
`;

export const Logo = styled.Image`
  width: 600px;
  height: 500px;
  
`;

export const AreaInput = styled.View`
  flex-direction: row;

`;

export const Input = styled.TextInput`
  background-color: #e9b3ffff;
  width: 90%;
  font-size: 17px;
  padding: 20px;
  border-radius: 8px;
  color: #121212;
  margin-bottom: 15px;
`;


export const SubmitButton = styled.TouchableOpacity`
  width: 90%;
  height: 45px;
  border-radius: 8px;
  background-color: #8B008B;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

export const SubmitText = styled.Text`
  font-size: 20px;
  color: #FFF;
`;

export const Link = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const LinkText = styled.Text`
  color: #171717;
`;
