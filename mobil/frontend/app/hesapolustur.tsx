import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hesap Oluştur</Text>

      <TextInput style={styles.input} placeholder="İsim" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Soyisim" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Memleketim" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Favori Şehrim" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Telefon Numarası" placeholderTextColor="#aaa" keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Şifre" placeholderTextColor="#aaa" secureTextEntry />

      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupText}>Sign Up</Text>
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
