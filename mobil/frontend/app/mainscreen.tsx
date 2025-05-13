import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Dimensions, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default function HomeScreen() {
  const [selectedCity, setSelectedCity] = useState('Şehir Seç');
  const [cityModalVisible, setCityModalVisible] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('Gezi Tercihi Seç');
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const [mapApiKey, setMapApiKey] = useState<string | null>(null);

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

  const cityCoords: Record<string, { latitude: number; longitude: number }> = {
    İstanbul: { latitude: 41.0082, longitude: 28.9784 },
    Ankara: { latitude: 39.9208, longitude: 32.8541 },
    Malatya: { latitude: 38.3552, longitude: 38.3095 },
  };

  useEffect(() => {
    fetch('http://192.168.1.104:5000/api/map/key')
      .then((res) => res.json())
      .then((data) => {
        setMapApiKey(data.apiKey); // dikkat: backend'de key adı apikey mi yoksa apiKey mi?
        console.log('Map API Key:', data.apiKey);
      })
      .catch((err) => {
        console.error('API anahtarı alınamadı:', err);
      });
  }, []);

  const region = selectedCity !== 'Şehir Seç' && cityCoords[selectedCity]
    ? {
        ...cityCoords[selectedCity],
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : {
        latitude: 39.9208,
        longitude: 32.8541,
        latitudeDelta: 10,
        longitudeDelta: 10,
      };

  return (
    <View style={styles.container}>
      {/* Harita Alanı */}
      <View style={styles.mapPlaceholder}>
        {mapApiKey ? (
          <MapView
            style={StyleSheet.absoluteFillObject}
            region={region}
            showsUserLocation={true}
          >
            {selectedCity !== 'Şehir Seç' && (
              <Marker coordinate={cityCoords[selectedCity]} title={selectedCity} />
            )}
          </MapView>
        ) : (
          <Text style={styles.mapText}>API Anahtarı alınıyor...</Text>
        )}
      </View>
<TouchableOpacity
  onPress={async () => {
    try {
      const response = await fetch('http://192.168.1.104:5000/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: selectedCity }) // dilersen seçilebilir yaparız
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('✅ Başarılı', data.message);
      } else {
        Alert.alert('❌ Hata', data.error || 'Bilinmeyen hata');
      }
    } catch (error) {
      Alert.alert('❌ Hata', 'Sunucuya bağlanılamadı');
      console.error(error);
    }
  }}
  style={{
    backgroundColor: '#00796b',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  }}
>
  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Gemini API'yi Çalıştır</Text>
</TouchableOpacity>

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
    overflow: 'hidden',
    marginBottom: 20,
  },
  mapText: {
    color: '#00796b',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
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
 