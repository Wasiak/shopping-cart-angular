import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';
import { loggedUser } from '../../assets/mocks';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLoggedUser', () => {
    it('should return logged user data as observable', (done) => {
      service.getLoggedUser().subscribe(result => {
        expect(result).toEqual(loggedUser);
        expect(result.id).toBe(loggedUser.id);
        expect(result.firstName).toBe(loggedUser.firstName);
        expect(result.lastName).toBe(loggedUser.lastName);
        expect(result.collection).toEqual(loggedUser.collection);
        done();
      });
    });

    it('should return user with correct structure', (done) => {
      service.getLoggedUser().subscribe(result => {
        expect(result.hasOwnProperty('id')).toBe(true);
        expect(result.hasOwnProperty('firstName')).toBe(true);
        expect(result.hasOwnProperty('lastName')).toBe(true);
        expect(result.hasOwnProperty('collection')).toBe(true);

        expect(typeof result.id).toBe('number');
        expect(typeof result.firstName).toBe('string');
        expect(typeof result.lastName).toBe('string');
        expect(Array.isArray(result.collection)).toBe(true);
        done();
      });
    });

    it('should return user with valid data types', (done) => {
      service.getLoggedUser().subscribe(result => {
        expect(result.id).toBeGreaterThan(0);
        expect(result.firstName.length).toBeGreaterThan(0);
        expect(result.lastName.length).toBeGreaterThan(0);
        expect(result.collection.length).toBeGreaterThanOrEqual(0);
        done();
      });
    });

    it('should return user collection as array of strings', (done) => {
      service.getLoggedUser().subscribe(result => {
        result.collection.forEach(item => {
          expect(typeof item).toBe('string');
          expect(item.length).toBeGreaterThan(0);
        });
        done();
      });
    });

    it('should emit user data immediately', (done) => {
      let emissionCount = 0;

      service.getLoggedUser().subscribe(() => {
        emissionCount++;
        expect(emissionCount).toBe(1);
        done();
      });
    });

    it('should return the same user data on multiple calls', (done) => {
      let callCount = 0;
      const expectedCalls = 3;

      const checkComplete = () => {
        callCount++;
        if (callCount === expectedCalls) {
          done();
        }
      };

      service.getLoggedUser().subscribe(result => {
        expect(result).toEqual(loggedUser);
        checkComplete();
      });

      service.getLoggedUser().subscribe(result => {
        expect(result).toEqual(loggedUser);
        checkComplete();
      });

      service.getLoggedUser().subscribe(result => {
        expect(result).toEqual(loggedUser);
        checkComplete();
      });
    });

    it('should return user with specific collection items', (done) => {
      service.getLoggedUser().subscribe(result => {
        expect(result.collection).toContain('space-explorer');
        done();
      });
    });

    it('should return user with valid name format', (done) => {
      service.getLoggedUser().subscribe(result => {
        expect(result.firstName).toMatch(/^[A-Za-z]+$/);
        expect(result.lastName).toMatch(/^[A-Za-z]+$/);
        done();
      });
    });
  });

  describe('Service Behavior', () => {
    it('should be injectable', () => {
      expect(service).toBeInstanceOf(UserService);
    });

    it('should have getLoggedUser method', () => {
      expect(typeof service.getLoggedUser).toBe('function');
    });

    it('should return observable from getLoggedUser', () => {
      const result = service.getLoggedUser();
      expect(result).toBeDefined();
      expect(typeof result.subscribe).toBe('function');
    });
  });
});
