import { WasteType } from '@/types/ecoPoint';
import Colors from '@/constants/Colors';

export const wasteTypes: WasteType[] = [
  {
    id: 'recyclable',
    name: 'Recicláveis',
    color: Colors.wasteRecyclable,
    icon: 'recycle',
  },
  {
    id: 'electronic',
    name: 'Eletrônicos',
    color: Colors.wasteElectronic,
    icon: 'smartphone',
  },
  {
    id: 'battery',
    name: 'Baterias',
    color: Colors.wasteBattery,
    icon: 'battery-charging',
  },
  {
    id: 'oil',
    name: 'Óleo',
    color: Colors.wasteOil,
    icon: 'droplet',
  },
  {
    id: 'poda',
    name: 'Resíduos de poda',
    color: Colors.wasteOrganic,
    icon: 'leaf',
  },
  {
    id: 'construction',
    name: 'Entulho',
    color: Colors.wasteConstruction,
    icon: 'hammer',
  }
];