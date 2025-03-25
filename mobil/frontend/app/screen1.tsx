import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

export default function screen1() {const router = useRouter();
  return (
    <View style={styles.container}>
     

      <Image
        source={require('../assets/travelingo.png')}
        style={styles.image}
        resizeMode="contain"
      />

      

      <TextInput
        style={styles.input}
        placeholder="Telefon Numarası"
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        placeholderTextColor="#666"
      />

      <Text style={styles.forgot}>Şifremi Unuttum</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Giriş →</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/hesapolustur')}>
  <Text style={styles.link}>Hesap oluştur</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2fefa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  image: {
    width: 200,
    height: 120,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 32,
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  forgot: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    color: '#666',
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  bottomText: {
    fontSize: 14,
    color: '#444',
  },
  link: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
