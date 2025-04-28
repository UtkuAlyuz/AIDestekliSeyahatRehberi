import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';

export default function HomeScreen() {
  const [selectedCity, setSelectedCity] = useState('Şehir Seç');
  const [cityModalVisible, setCityModalVisible] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('Gezi Tercihi Seç');
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const cities = ['İstanbul', 'Ankara', 'Malatya'];
  const categories = [
    'Tarihi Yerler',
    'Müzeler ve Sanat Galerileri',
    'Doğal Güzellikler',
    'Turistik Caddeler ve Semtler',
    'Plajlar ve Deniz Kenarı',
    'Etkinlik ve Eğlence Alanları',
    'Gastronomi Noktaları',
    'Dini Yapılar',
    'Manzara Noktaları',
    'Spor ve Macera Aktiviteleri',
  ];

  return (
    <View style={styles.container}>
      {/* Harita Alanı */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Harita Burada Gözükecek 📍</Text>
      </View>

      {/* Şehir Seçimi */}
      <TouchableOpacity style={styles.dropdown} onPress={() => setCityModalVisible(true)}>
        <Text style={styles.dropdownText}>{selectedCity}</Text>
      </TouchableOpacity>

      {/* Gezi Tercihi Seçimi */}
      <TouchableOpacity style={styles.dropdown} onPress={() => setCategoryModalVisible(true)}>
        <Text style={styles.dropdownText}>{selectedCategory}</Text>
      </TouchableOpacity>

      {/* Şehir Modalı */}
      <Modal visible={cityModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            data={cities}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setSelectedCity(item);
                  setCityModalVisible(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      </Modal>

      {/* Gezi Tercihi Modalı */}
      <Modal visible={categoryModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setSelectedCategory(item);
                  setCategoryModalVisible(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  mapPlaceholder: {
    width: '100%',
    height: 250,
    backgroundColor: '#b2ebf2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  mapText: {
    color: '#00796b',
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 100,
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
