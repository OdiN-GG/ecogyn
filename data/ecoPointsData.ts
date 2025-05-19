import { EcoPoint } from '@/types/ecoPoint';
import { wasteTypes } from './wasteTypesData';

export const ecoPoints: EcoPoint[] = [
  {
    id: '1',
    name: 'Ecoponto Guanabara',
    address: 'Rua GB-5 com Rua GB-6, Jardim Guanabara II.',
    city: 'Goiânia',
    state: 'GO',
    latitude: -16.612975912440497, 
    longitude: -49.214191250496704,
    wasteTypes: [
      wasteTypes[0], // Recicláveis
      wasteTypes[4], // Resíduos de poda
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
    latitude:-16.741230404198586, 
    longitude: -49.31566529772009,
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
  
];