import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../../contexts/auth';

export default function Home() {
  const { signOut, user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {user?.displayName || 'Usuário'}!</Text>
      <Text style={styles.subtitle}>Você está logado no App.</Text>
      
      <View style={styles.buttonContainer}>
        {/* Futuramente aqui ficará o botão de gravar vídeo */}
        <Button 
            title="Gravar Análise (Em breve)" 
            color="#8B008B"
            disabled
            onPress={() => {}} 
        />
      </View>

      <Button title="Sair do App" onPress={signOut} color="#FF0000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#f0f0f0' 
  },
  title: { 
      fontSize: 24, 
      fontWeight: 'bold', 
      marginBottom: 10,
      color: '#333'
  },
  subtitle: { 
      fontSize: 16, 
      marginBottom: 30,
      color: '#666'
  },
  buttonContainer: {
      marginBottom: 20,
      width: '80%'
  }
});