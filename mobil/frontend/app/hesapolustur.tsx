import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
  const router = useRouter();
 
  const [isim, setIsim] = useState('');
  const [soyisim, setSoyisim] = useState('');
  const [memleket, setMemleket] = useState('');
  const [favoriSehir, setFavoriSehir] = useState('');
  const [telefon, setTelefon] = useState('');
  const [sifre, setSifre] = useState('');

  const handleSignUp = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
  
      const response = await fetch('http://192.168.1.101:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isim, soyisim, memleket, favoriSehir, telefon, sifre }),
        signal: controller.signal
      });
  
      clearTimeout(timeoutId); 
  
      const data = await response.json();
  
      if (response.status === 201) {
        Alert.alert('Başarılı', 'Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
        router.replace('/');
      } else {
        Alert.alert('Hata', data.error || 'Kayıt başarısız oldu.');
      }
    } catch (error) {
      console.error('İstek hatası:', error);
      Alert.alert('Sunucu Hatası', 'Sunucuya ulaşılamadı. Lütfen internet bağlantını kontrol et.');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hesap Oluştur</Text>

      <TextInput style={styles.input} placeholder="İsim" placeholderTextColor="#aaa" onChangeText={setIsim} />
      <TextInput style={styles.input} placeholder="Soyisim" placeholderTextColor="#aaa" onChangeText={setSoyisim} />
      <TextInput style={styles.input} placeholder="Memleketim" placeholderTextColor="#aaa" onChangeText={setMemleket} />
      <TextInput style={styles.input} placeholder="Favori Şehrim" placeholderTextColor="#aaa" onChangeText={setFavoriSehir} />
      <TextInput style={styles.input} placeholder="Telefon Numarası" placeholderTextColor="#aaa" keyboardType="phone-pad" onChangeText={setTelefon} />
      <TextInput style={styles.input} placeholder="Şifre" placeholderTextColor="#aaa" secureTextEntry onChangeText={setSifre} />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupText}>Kayıt Ol</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginRedirect} onPress={() => router.replace('/')}>
        <Text style={styles.loginRedirectText}>Zaten hesabın var mı?</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff007f',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#ff007f',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginRedirect: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ff007f',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  loginRedirectText: {
    color: '#ff007f',
    fontWeight: 'bold',
  },
});
