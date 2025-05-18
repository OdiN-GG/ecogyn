import { EcoPoint } from '@/types/ecoPoint';
import { wasteTypes } from './wasteTypesData';

export const ecoPoints: EcoPoint[] = [
  {
    id: '1',
    name: 'Ecoponto Parque Atheneu',
    address: 'Av. Parque Atheneu, Unidade 201',
    city: 'Goiânia',
    state: 'GO',
    latitude: -16.6849,
    longitude: -49.2137,
    wasteTypes: [
      wasteTypes[0], // Recicláveis
      wasteTypes[4], // Orgânicos
      wasteTypes[5], // Entulho
    ],
    description: 'Ponto de coleta municipal para materiais recicláveis, orgânicos e entulho de construção civil.',
    openingHours: 'Seg-Sáb: 08h às 18h',
    phone: '(62) 3524-8555',
    imageUrl: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg',
    isMunicipal: true,
  },
  {
    id: '2',
    name: 'Centro de Reciclagem Setor Sul',
    address: 'Rua 104, Setor Sul',
    city: 'Goiânia',
    state: 'GO',
    latitude: -16.6805,
    longitude: -49.2550,
    wasteTypes: [
      wasteTypes[0], // Recicláveis
      wasteTypes[1], // Eletrônicos
      wasteTypes[2], // Baterias
    ],
    description: 'Centro especializado em reciclagem de materiais diversos, incluindo eletrônicos e baterias.',
    openingHours: 'Seg-Sex: 08h às 17h, Sáb: 08h às 12h',
    phone: '(62) 3242-9876',
    website: 'www.reciclagemsetorsul.com.br',
    imageUrl: 'https://images.pexels.com/photos/159751/book-read-literature-pages-159751.jpeg',
    isMunicipal: false,
  },
  {
    id: '3',
    name: 'Ecoponto Jardim Novo Mundo',
    address: 'Av. Novo Mundo, 1500',
    city: 'Goiânia',
    state: 'GO',
    latitude: -16.6699,
    longitude: -49.2200,
    wasteTypes: [
      wasteTypes[0], // Recicláveis
      wasteTypes[3], // Óleo
      wasteTypes[5], // Entulho
    ],
    description: 'Ponto de coleta que aceita material reciclável, óleo de cozinha usado e entulhos.',
    openingHours: 'Seg-Dom: 07h às 19h',
    phone: '(62) 3524-8600',
    imageUrl: 'https://images.pexels.com/photos/2682683/pexels-photo-2682683.jpeg',
    isMunicipal: true,
  },
  {
    id: '4',
    name: 'Cooperativa ReciclaGyn',
    address: 'Rua CP-4, Qd. CP-8, Lt. 1, Chácara do Governador',
    city: 'Goiânia',
    state: 'GO',
    latitude: -16.7050,
    longitude: -49.2234,
    wasteTypes: [
      wasteTypes[0], // Recicláveis
      wasteTypes[1], // Eletrônicos
    ],
    description: 'Cooperativa de catadores que realiza a coleta e triagem de materiais recicláveis e eletrônicos.',
    openingHours: 'Seg-Sex: 08h às 17h',
    phone: '(62) 3565-4321',
    website: 'www.reciclagyyn.org.br',
    imageUrl: 'https://images.pexels.com/photos/5824594/pexels-photo-5824594.jpeg',
    isMunicipal: false,
  },
  {
    id: '5',
    name: 'Ecoponto Jardim América',
    address: 'Av. T-9, Jardim América',
    city: 'Goiânia',
    state: 'GO',
    latitude: -16.7130,
    longitude: -49.2530,
    wasteTypes: [
      wasteTypes[0], // Recicláveis
      wasteTypes[4], // Orgânicos
      wasteTypes[5], // Entulho
    ],
    description: 'Ponto de coleta municipal para materiais recicláveis, resíduos orgânicos e entulho.',
    openingHours: 'Seg-Sáb: 08h às 18h',
    phone: '(62) 3524-8700',
    imageUrl: 'https://images.pexels.com/photos/6593354/pexels-photo-6593354.jpeg',
    isMunicipal: true,
  },
  {
    id: '6',
    name: 'Descarte Legal Eletroeletrônicos',
    address: 'Av. Anhanguera, 5320, Setor Central',
    city: 'Goiânia',
    state: 'GO',
    latitude: -16.6789,
    longitude: -49.2580,
    wasteTypes: [
      wasteTypes[1], // Eletrônicos
      wasteTypes[2], // Baterias
    ],
    description: 'Empresa especializada no descarte correto de equipamentos eletrônicos e baterias.',
    openingHours: 'Seg-Sex: 09h às 18h, Sáb: 09h às 13h',
    phone: '(62) 3225-7788',
    website: 'www.descartelegal.com.br',
    imageUrl: 'https://images.pexels.com/photos/8866800/pexels-photo-8866800.jpeg',
    isMunicipal: false,
  },
  {
    id: '7',
    name: 'Ponto de Coleta Bueno',
    address: 'Rua T-55, 829, Setor Bueno',
    city: 'Goiânia',
    state: 'GO',
    latitude: -16.7050,
    longitude: -49.2780,
    wasteTypes: [
      wasteTypes[0], // Recicláveis
      wasteTypes[2], // Baterias
      wasteTypes[3], // Óleo
    ],
    description: 'Ponto de coleta para recicláveis, baterias e óleo usado no Setor Bueno.',
    openingHours: 'Ter-Dom: 10h às 19h',
    phone: '(62) 3251-4433',
    imageUrl: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg',
    isMunicipal: false,
  },
  {
    id: '8',
    name: 'EcoPonto Universitário',
    address: 'Av. Universitária, próximo ao Campus Samambaia',
    city: 'Goiânia',
    state: 'GO',
    latitude: -16.6010,
    longitude: -49.2667,
    wasteTypes: [
      wasteTypes[0], // Recicláveis
      wasteTypes[4], // Orgânicos
      wasteTypes[5], // Entulho
    ],
    description: 'Ponto de coleta municipal próximo à universidade, ideal para descarte de materiais recicláveis, orgânicos e entulhos.',
    openingHours: 'Seg-Sáb: 08h às 18h',
    phone: '(62) 3524-8999',
    imageUrl: 'https://images.pexels.com/photos/6593354/pexels-photo-6593354.jpeg',
    isMunicipal: true,
  },
  {
    id: '9',
    name: 'Central de Reciclagem Campinas',
    address: 'Rua Senador Jaime, 745, Campinas',
    city: 'Goiânia',
    state: 'GO',
    latitude: -16.6750,
    longitude: -49.2900,
    wasteTypes: [
      wasteTypes[0], // Recicláveis
      wasteTypes[1], // Eletrônicos
      wasteTypes[3], // Óleo
    ],
    description: 'Central de reciclagem no tradicional bairro de Campinas, aceita vários tipos de materiais recicláveis.',
    openingHours: 'Seg-Sex: 08h às 17h, Sáb: 08h às 12h',
    phone: '(62) 3233-5577',
    imageUrl: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg',
    isMunicipal: false,
  },
  {
    id: '10',
    name: 'Eco Ponto Goiânia 2',
    address: 'Av. Goiás Norte, Km 8',
    city: 'Goiânia',
    state: 'GO',
    latitude: -16.6200,
    longitude: -49.2400,
    wasteTypes: [
      wasteTypes[0], // Recicláveis
      wasteTypes[4], // Orgânicos
      wasteTypes[5], // Entulho
    ],
    description: 'Um dos maiores pontos de coleta da região norte da cidade, com ampla área para descarte de diversos materiais.',
    openingHours: 'Seg-Dom: 07h às 19h',
    phone: '(62) 3524-8800',
    imageUrl: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg',
    isMunicipal: true,
  }
];