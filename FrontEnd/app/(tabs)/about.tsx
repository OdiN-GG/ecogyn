import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronRight, Mail, Phone, Globe } from 'lucide-react-native';

import Colors from '@/constants/Colors';

export default function AboutScreen() {
  const insets = useSafeAreaInsets();

  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Sobre o EcoPontos</Text>
      </View>

      <View style={styles.section}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg' }} 
          style={styles.headerImage}
        />
        
        <Text style={styles.sectionTitle}>Nossa Missão</Text>
        <Text style={styles.paragraph}>
          O EcoPontos tem como objetivo facilitar o descarte correto de resíduos em Goiânia, 
          conectando cidadãos a pontos de coleta próximos. Acreditamos que a destinação 
          adequada de resíduos é essencial para construir uma cidade mais sustentável.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Como Funciona</Text>
        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}><Text style={styles.stepNumberText}>1</Text></View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Encontre pontos de coleta</Text>
            <Text style={styles.stepText}>
              Use o mapa ou a lista para encontrar pontos de coleta próximos que aceitam o tipo de resíduo que você precisa descartar.
            </Text>
          </View>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}><Text style={styles.stepNumberText}>2</Text></View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Confira as informações</Text>
            <Text style={styles.stepText}>
              Verifique os tipos de resíduos aceitos, horários de funcionamento e requisitos específicos de cada local.
            </Text>
          </View>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}><Text style={styles.stepNumberText}>3</Text></View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Navegue até o local</Text>
            <Text style={styles.stepText}>
              Use a função de rotas para chegar facilmente ao ponto de coleta escolhido.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipos de Resíduos</Text>
        <Text style={styles.paragraph}>
          Nosso aplicativo mapeia pontos de coleta para diversos tipos de resíduos:
        </Text>
        
        <View style={styles.wasteGrid}>
          <View style={styles.wasteItem}>
            <View style={[styles.wasteIcon, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.wasteType}>Recicláveis</Text>
          </View>
          <View style={styles.wasteItem}>
            <View style={[styles.wasteIcon, { backgroundColor: '#F44336' }]} />
            <Text style={styles.wasteType}>Eletrônicos</Text>
          </View>
          <View style={styles.wasteItem}>
            <View style={[styles.wasteIcon, { backgroundColor: '#9C27B0' }]} />
            <Text style={styles.wasteType}>Baterias</Text>
          </View>
          <View style={styles.wasteItem}>
            <View style={[styles.wasteIcon, { backgroundColor: '#2196F3' }]} />
            <Text style={styles.wasteType}>Óleo</Text>
          </View>
          <View style={styles.wasteItem}>
            <View style={[styles.wasteIcon, { backgroundColor: '#FF9800' }]} />
            <Text style={styles.wasteType}>Orgânicos</Text>
          </View>
          <View style={styles.wasteItem}>
            <View style={[styles.wasteIcon, { backgroundColor: '#795548' }]} />
            <Text style={styles.wasteType}>Entulho</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contato</Text>
        
        <TouchableOpacity 
          style={styles.contactItem}
          onPress={() => openUrl('mailto:contato@ecopontos.com.br')}
        >
          <Mail size={24} color={Colors.primary} />
          <Text style={styles.contactText}>contato@ecopontos.com.br</Text>
          <ChevronRight size={20} color="#AAAAAA" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.contactItem}
          onPress={() => openUrl('tel:+556232345678')}
        >
          <Phone size={24} color={Colors.primary} />
          <Text style={styles.contactText}>(62) 3234-5678</Text>
          <ChevronRight size={20} color="#AAAAAA" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.contactItem}
          onPress={() => openUrl('https://www.ecopontos.com.br')}
        >
          <Globe size={24} color={Colors.primary} />
          <Text style={styles.contactText}>www.ecopontos.com.br</Text>
          <ChevronRight size={20} color="#AAAAAA" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>EcoPontos © 2025</Text>
        <Text style={styles.footerText}>Versão 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 32,
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.primary,
    marginTop: 12,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 12,
  },
  paragraph: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  stepNumberText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  stepText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: '#555555',
  },
  wasteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  wasteItem: {
    width: '33.33%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  wasteIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  wasteType: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333333',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  contactText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333333',
    flex: 1,
    marginLeft: 16,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
});