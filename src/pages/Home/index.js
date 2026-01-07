import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Image,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import type { CameraOptions } from 'react-native-image-picker';
import notifee, { AndroidImportance } from '@notifee/react-native';
import RNFS from 'react-native-fs';

// Definindo a paleta de cores "fofa" e padronizada
const COLORS = {
  background: '#F8F0FB', // Lilás clarinho para o fundo
  primary: '#9B80AC',    // Roxo suave para títulos
  button: '#FF9EB5',     // Rosa acolhedor para o botão principal
  buttonText: '#FFFFFF',
  cardBg: '#FFFFFF',
  textDark: '#5A4D61',   // Cinza escuro para texto corrido
  accent: '#FFC1E3',     // Rosa claro para detalhes
  success: '#81C784',    // Verde suave para o botão "Entendi"
};

const Home = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  // Função para mostrar notificação com Notifee
  const showNotification = async () => {
    // Criar canal de notificação (Android)
    const channelId = await notifee.createChannel({
      id: 'olivia_instructions',
      name: 'Instruções de Gravação',
      importance: AndroidImportance.HIGH,
    });

    // Exibir notificação
    await notifee.displayNotification({
      title: '📋 Orientações de Gravação',
      body: 'Cubra a câmera traseira e o flash completamente com o dedo. Aguarde 30s. A tela deve ficar avermelhada durante a gravação.',
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        sound: 'default',
      },
    });
  };

  // Função para abrir modal de instruções
  const handleBeginFlow = async () => {
    // Mostrar notificação
    await showNotification();
    
    // Mostrar modal também
    setShowInstructions(true);
  };

  // Quando o botão "Entendi" é clicado, começa a gravar
  const handleUnderstood = () => {
    setShowInstructions(false);
    startRecording();
  };

  // Inicia a gravação do vídeo
  const startRecording = () => {
    const options: CameraOptions = {
      mediaType: 'video',
      videoQuality: 'high',
      durationLimit: 30, // Limite de 30 segundos
      saveToPhotos: false, // NÃO salva na galeria (vamos salvar em pasta específica)
      cameraType: 'back', // Câmera traseira
      includeBase64: false, // Não precisa de base64 por enquanto (economiza memória)
    };

    launchCamera(options, async (response) => {
      if (response.didCancel) {
        Alert.alert('Cancelado', 'Gravação cancelada pelo usuário.');
      } else if (response.errorCode) {
        Alert.alert('Erro', `Erro ao gravar: ${response.errorMessage}`);
      } else if (response.assets && response.assets.length > 0) {
        const video = response.assets[0];
        
        // Salvar vídeo em pasta específica
        try {
          await saveVideoToFolder(video.uri);
        } catch (error) {
          console.error('Erro ao salvar vídeo:', error);
          Alert.alert('Erro', 'Não foi possível salvar o vídeo.');
        }
      }
    });
  };

  // Salvar vídeo em pasta específica do app
  const saveVideoToFolder = async (videoUri: string) => {
    try {
      // Pasta privada do app (NÃO aparece na galeria)
      // Android: /data/data/com.olivia/files/Videos
      // iOS: Library/Application Support/Videos
      const folderPath = `${RNFS.DocumentDirectoryPath}/Videos`;
      
      const folderExists = await RNFS.exists(folderPath);
      
      if (!folderExists) {
        await RNFS.mkdir(folderPath);
        console.log('📁 Pasta Videos criada:', folderPath);
      }

      // Gerar nome único para o vídeo com timestamp
      const timestamp = new Date().getTime();
      const dateStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const fileName = `olivia_${dateStr}_${timestamp}.mp4`;
      const destPath = `${folderPath}/${fileName}`;

      // Copiar vídeo para a pasta
      await RNFS.copyFile(videoUri, destPath);
      
      console.log('✅ Vídeo salvo em:', destPath);
      
      // Obter informações do arquivo
      const fileInfo = await RNFS.stat(destPath);
      
      Alert.alert(
        'Sucesso! 🎉',
        `Vídeo salvo no app!\n\n📄 Arquivo: ${fileName}\n💾 Tamanho: ${(fileInfo.size / 1024 / 1024).toFixed(2)}MB\n\n⚠️ O vídeo NÃO foi salvo na galeria.`
      );

      // Retornar o caminho para uso posterior
      return destPath;
      
    } catch (error) {
      console.error('❌ Erro ao salvar vídeo:', error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.container}>
        
        {/* CABEÇALHO COM A PERSONAGEM OLIVIA */}
        <View style={styles.headerContainer}>
          <Text style={styles.greetingText}>Olá! Eu sou a Olivia.</Text>
          <Text style={styles.subText}>Vamos verificar como você está?</Text>
          
          {/* CAMINHO CORRIGIDO BASEADO NA SUA ESTRUTURA DE PASTAS */}
          <Image
            source={require('../../assests/image3.png')}
            style={styles.charImage}
            resizeMode="contain"
          />
        </View>

        {/* CARD DE INSTRUÇÕES VISUAIS */}
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Como funciona a medição:</Text>
          
          {/* Passos Visuais */}
          <View style={styles.stepItem}>
            <View style={styles.stepNumberBox}><Text style={styles.stepNumber}>1</Text></View>
            <Text style={styles.stepText}>Vá para um local iluminado.</Text>
          </View>
          
          <View style={styles.stepItem}>
            <View style={styles.stepNumberBox}><Text style={styles.stepNumber}>2</Text></View>
            <Text style={styles.stepText}>Cubra a câmera traseira e o flash completamente com o dedo.</Text>
          </View>
          
          <View style={styles.stepItem}>
            <View style={styles.stepNumberBox}><Text style={styles.stepNumber}>3</Text></View>
            <Text style={styles.stepText}>Aguarde 30s. A tela deve ficar avermelhada durante a gravação.</Text>
          </View>
        </View>

        {/* BOTÃO PRINCIPAL */}
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={handleBeginFlow}
            activeOpacity={0.8}
          >
            <Text style={styles.mainButtonText}>Começar Medição</Text>
          </TouchableOpacity>
        </View>

        {/* MODAL DE CONFIRMAÇÃO */}
        <Modal
          visible={showInstructions}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowInstructions(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeaderAccent} />
              <Text style={styles.modalTitle}>Quase pronto!</Text>
              <Text style={styles.modalText}>
                Ao clicar em "Entendi", a câmera abrirá.
                {'\n\n'}
                💡 Ligue o flash do seu dispositivo. Mantenha o dedo cobrindo a lente até o fim dos 30 segundos.
                {'\n\n'}
                A gravação começará automaticamente!
              </Text>
              <TouchableOpacity
                style={styles.understoodButton}
                onPress={handleUnderstood}
                activeOpacity={0.9}
              >
                <Text style={styles.understoodButtonText}>Entendi, vamos lá!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'android' ? 24 : 0,
  },
  // --- Estilos do Cabeçalho e Imagem ---
  headerContainer: {
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 70 : 70,
    marginBottom: 10,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: COLORS.textDark,
    marginTop: 10,
    textAlign: 'center',
  },
  charImage: {
    width: 200,
    height: 200,
    marginTop: 50,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: COLORS.accent,
    backgroundColor: 'transparent', 
  },
  // --- Estilos do Card de Instruções ---
  cardContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 25,
    padding: 22,
    marginTop: 50,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    flexShrink: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 15,
    textAlign: 'center',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumberBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumber: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepText: {
    fontSize: 15,
    color: COLORS.textDark,
    flex: 1,
    lineHeight: 22,
  },
  // --- Área do Rodapé/Botão ---
  footerContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginTop: 20,
  },
  mainButton: {
    backgroundColor: COLORS.button,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: COLORS.button,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    width: '100%',
  },
  mainButtonText: {
    color: COLORS.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  // --- Estilos do Modal ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(90, 77, 97, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 30,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 10,
  },
  modalHeaderAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 12,
    backgroundColor: COLORS.accent,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: COLORS.textDark,
    lineHeight: 24,
    marginBottom: 25,
    textAlign: 'center',
  },
  understoodButton: {
    backgroundColor: COLORS.success,
    borderRadius: 25,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
  },
  understoodButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;


/*
# Listar vídeos
adb shell ls /data/data/com.olivia/files/Videos/

# Copiar vídeo para o computador
adb pull /data/data/com.olivia/files/Videos/olivia_2025-12-10_1733865432123.mp4
 */