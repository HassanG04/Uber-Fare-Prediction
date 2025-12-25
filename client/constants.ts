
import { CreditItem } from './types';

export const CREDIT_DATA: CreditItem[] = [
  {
    id: 'ossama',
    name: 'Prof. Ossama Badaway',
    role: 'Supervisor',
    category: 'Supervisor',
    details: ['Special thanks to the professor for important input and how to improve our work']
  },
  {
    id: 'mazen',
    name: 'Eng. Mazen Aziz',
    role: 'Supervisor',
    category: 'Supervisor',
    link: 'https://www.linkedin.com/in/mazen-aziz-233902262/',
    details: ['Special thanks to the PA for providing great video on how to create this project and giving a strong project to work on.']
  },
  {
    id: 'ziad',
    name: 'Eng. Ziad Keshk',
    role: 'Creator',
    category: 'Creator',
    link: 'https://www.linkedin.com/in/ziad-kishk-89b5522a3/',
    details: ['Worked on the ERD', 'Created the Atlas account']
  },
  {
    id: 'hassan',
    name: 'Eng. Hassan Gebril',
    role: 'Creator',
    category: 'Creator',
    link: 'https://www.linkedin.com/in/hassang04/',
    details: ['Got the dataset', 'Created the front-end skeleton']
  },
  {
    id: 'ahmed',
    name: 'Eng. Ahmed el Shazly',
    role: 'Creator',
    category: 'Creator',
    link: 'https://www.linkedin.com/in/ahmed-elshazly-513456249/',
    details: ['Implemented the back-end', 'Enhanced the front-end']
  },
  {
    id: 'cellula',
    name: "Cellula's Technology",
    role: 'Organization',
    category: 'Organization',
    link: 'https://www.linkedin.com/company/cellula-technologies/',
    details: ['Provided the dataset from collecting data from previous Uber employees']
  },
  {
    id: 'aastmt',
    name: 'Arab Academy for Science, Technology and Maritime Transport',
    role: 'Organization',
    category: 'Organization',
    details: ['Provided the amazing curriculum']
  }
];

export const MOCK_CHART_DATA = [
  { name: 'Mon', fare: 12.5, distance: 3.2 },
  { name: 'Tue', fare: 15.0, distance: 4.1 },
  { name: 'Wed', fare: 10.2, distance: 2.8 },
  { name: 'Thu', fare: 18.7, distance: 5.5 },
  { name: 'Fri', fare: 22.1, distance: 6.2 },
  { name: 'Sat', fare: 25.4, distance: 7.0 },
  { name: 'Sun', fare: 14.8, distance: 3.9 },
];
