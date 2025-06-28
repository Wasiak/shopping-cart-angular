import { TestBed } from '@angular/core/testing';
import { GamesService } from './games.service';
import { Game } from '../interfaces/game.interface';
import { Baner } from '../interfaces/baner.interface';
import { games, baner } from '../../assets/mocks';

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBaner', () => {
    it('should return banner data as observable', (done) => {
      service.getBaner().subscribe(result => {
        expect(result).toEqual(baner);
        expect(result.id).toBe(baner.id);
        expect(result.title).toBe(baner.title);
        expect(result.image).toBe(baner.image);
        expect(result.link).toBe(baner.link);
        done();
      });
    });

    it('should return banner with correct structure', (done) => {
      service.getBaner().subscribe(result => {
        expect(result.hasOwnProperty('id')).toBe(true);
        expect(result.hasOwnProperty('title')).toBe(true);
        expect(result.hasOwnProperty('image')).toBe(true);
        expect(result.hasOwnProperty('link')).toBe(true);
        expect(typeof result.id).toBe('number');
        expect(typeof result.title).toBe('string');
        expect(typeof result.image).toBe('string');
        expect(typeof result.link).toBe('string');
        done();
      });
    });

    it('should emit banner data immediately', (done) => {
      let emissionCount = 0;

      service.getBaner().subscribe(() => {
        emissionCount++;
        expect(emissionCount).toBe(1);
        done();
      });
    });
  });

  describe('getAllGames', () => {
    it('should return games array as observable', (done) => {
      service.getAllGames().subscribe(result => {
        expect(result).toEqual(games);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(games.length);
        done();
      });
    });

    it('should return games with correct structure', (done) => {
      service.getAllGames().subscribe(result => {
        if (result.length > 0) {
          const firstGame = result[0];
          expect(firstGame.hasOwnProperty('id')).toBe(true);
          expect(firstGame.hasOwnProperty('title')).toBe(true);
          expect(firstGame.hasOwnProperty('description')).toBe(true);
          expect(firstGame.hasOwnProperty('image')).toBe(true);
          expect(firstGame.hasOwnProperty('thumb')).toBe(true);
          expect(firstGame.hasOwnProperty('basePrice')).toBe(true);
          expect(firstGame.hasOwnProperty('discountInPercent')).toBe(true);
          expect(firstGame.hasOwnProperty('currentPrice')).toBe(true);

          expect(typeof firstGame.id).toBe('string');
          expect(typeof firstGame.title).toBe('string');
          expect(typeof firstGame.description).toBe('string');
          expect(typeof firstGame.image).toBe('string');
          expect(typeof firstGame.thumb).toBe('string');
          expect(typeof firstGame.basePrice).toBe('number');
          expect(typeof firstGame.discountInPercent).toBe('number');
          expect(typeof firstGame.currentPrice).toBe('number');
        }
        done();
      });
    });

    it('should return all games from mock data', (done) => {
      service.getAllGames().subscribe(result => {
        expect(result).toContain(games[0]);
        expect(result).toContain(games[1]);
        expect(result).toContain(games[2]);
        expect(result).toContain(games[3]);
        expect(result).toContain(games[4]);
        done();
      });
    });

    it('should emit games data immediately', (done) => {
      let emissionCount = 0;

      service.getAllGames().subscribe(() => {
        emissionCount++;
        expect(emissionCount).toBe(1);
        done();
      });
    });

    it('should return games with valid price data', (done) => {
      service.getAllGames().subscribe(result => {
        result.forEach(game => {
          expect(game.basePrice).toBeGreaterThan(0);
          expect(game.currentPrice).toBeGreaterThan(0);
          expect(game.discountInPercent).toBeGreaterThanOrEqual(0);
          expect(game.discountInPercent).toBeLessThanOrEqual(100);
        });
        done();
      });
    });

    it('should return games with valid URLs', (done) => {
      service.getAllGames().subscribe(result => {
        result.forEach(game => {
          expect(game.image).toMatch(/^https?:\/\//);
          expect(game.thumb).toMatch(/^https?:\/\//);
        });
        done();
      });
    });
  });

  describe('Service Integration', () => {
    it('should return both banner and games data', (done) => {
      let bannerReceived = false;
      let gamesReceived = false;

      const checkComplete = () => {
        if (bannerReceived && gamesReceived) {
          done();
        }
      };

      service.getBaner().subscribe(() => {
        bannerReceived = true;
        checkComplete();
      });

      service.getAllGames().subscribe(() => {
        gamesReceived = true;
        checkComplete();
      });
    });
  });
});
