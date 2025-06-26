import { User } from '../app/interfaces/user.interface';
import { Game } from '../app/interfaces/game.interface';
import { Baner } from '../app/interfaces/baner.interface';

export const loggedUser: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  collection: ['space-explorer']
};

export const games: Game[] = [
  {
    id: 'cyberpunk-adventure',
    title: 'Cyberpunk Adventure 2: The New World',
    description: 'An immersive cyberpunk RPG with stunning graphics and deep storytelling.',
    image: 'https://picsum.photos/id/1/200/100',
    thumb: 'https://picsum.photos/id/1/80/40',
    basePrice: 59.99,
    discountInPercent: 50,
    currentPrice: 29.99
  },
  {
    id: 'space-explorer',
    title: 'Space Explorer',
    description: 'Explore vast galaxies and discover new worlds in this space simulation game.',
    image: 'https://picsum.photos/id/2/200/100',
    thumb: 'https://picsum.photos/id/2/80/40',
    basePrice: 39.99,
    discountInPercent: 0,
    currentPrice: 39.99
  },
  {
    id: 'medieval-quest',
    title: 'Medieval Quest: The Return of the King',
    description: 'Embark on epic quests in a medieval fantasy world filled with magic and monsters.',
    image: 'https://picsum.photos/id/3/200/100',
    thumb: 'https://picsum.photos/id/3/80/40',
    basePrice: 49.99,
    discountInPercent: 50,
    currentPrice: 24.99
  },
  {
    id: 'racing-legends',
    title: 'Racing Legends',
    description: 'High-speed racing action with realistic physics and stunning car models.',
    image: 'https://picsum.photos/id/4/200/100',
    thumb: 'https://picsum.photos/id/4/80/40',
    basePrice: 29.99,
    discountInPercent: 0,
    currentPrice: 29.99
  },
  {
    id: 'puzzle-master',
    title: 'Puzzle Master: director\'s cut',
    description: 'Challenge your mind with hundreds of brain-teasing puzzles and logic games.',
    image: 'https://picsum.photos/id/5/200/100',
    thumb: 'https://picsum.photos/id/5/80/40',
    basePrice: 19.99,
    discountInPercent: 0,
    currentPrice: 19.99
  }
];

export const baner: Baner = {
  id: 1,
  title: 'Summer Game Sale',
  image: 'https://picsum.photos/id/6/1200/450',
  link: '/sales/summer'
};

