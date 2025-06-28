import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Game } from '../interfaces/game.interface';

describe('CartService', () => {
  let service: CartService;
  let mockGame: Game;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);

    mockGame = {
      id: 'test-game',
      title: 'Test Game',
      description: 'A test game for testing',
      image: 'https://picsum.photos/id/1/200/100',
      thumb: 'https://picsum.photos/id/1/80/40',
      basePrice: 29.99,
      discountInPercent: 0,
      currentPrice: 29.99
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty cart', () => {
    expect(service.cart).toEqual([]);
  });

  describe('addToCart', () => {
    it('should add a game to cart when cart is empty', () => {
      service.addToCart(mockGame);
      expect(service.cart).toContain(mockGame);
      expect(service.cart.length).toBe(1);
    });

    it('should add a game to cart when cart has other items', () => {
      const secondGame: Game = {
        ...mockGame,
        id: 'second-game',
        title: 'Second Game'
      };

      service.addToCart(mockGame);
      service.addToCart(secondGame);

      expect(service.cart).toContain(mockGame);
      expect(service.cart).toContain(secondGame);
      expect(service.cart.length).toBe(2);
    });

    it('should not add duplicate games to cart', () => {
      service.addToCart(mockGame);
      service.addToCart(mockGame);

      expect(service.cart).toContain(mockGame);
      expect(service.cart.length).toBe(1);
    });

    it('should emit new cart value when adding item', (done) => {
      service.cart$.subscribe(cart => {
        if (cart.length === 1) {
          expect(cart).toContain(mockGame);
          done();
        }
      });

      service.addToCart(mockGame);
    });
  });

  describe('removeFromCart', () => {
    it('should remove a game from cart', () => {
      service.addToCart(mockGame);
      expect(service.cart.length).toBe(1);

      service.removeFromCart(mockGame);
      expect(service.cart).not.toContain(mockGame);
      expect(service.cart.length).toBe(0);
    });

    it('should not affect cart when removing non-existent game', () => {
      const nonExistentGame: Game = {
        ...mockGame,
        id: 'non-existent'
      };

      service.addToCart(mockGame);
      expect(service.cart.length).toBe(1);

      service.removeFromCart(nonExistentGame);
      expect(service.cart).toContain(mockGame);
      expect(service.cart.length).toBe(1);
    });

    it('should emit new cart value when removing item', (done) => {
      service.addToCart(mockGame);

      service.cart$.subscribe(cart => {
        if (cart.length === 0) {
          expect(cart).not.toContain(mockGame);
          done();
        }
      });

      service.removeFromCart(mockGame);
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', () => {
      const secondGame: Game = {
        ...mockGame,
        id: 'second-game',
        title: 'Second Game'
      };

      service.addToCart(mockGame);
      service.addToCart(secondGame);
      expect(service.cart.length).toBe(2);

      service.clearCart();
      expect(service.cart).toEqual([]);
      expect(service.cart.length).toBe(0);
    });

    it('should emit empty array when clearing cart', (done) => {
      service.addToCart(mockGame);

      service.cart$.subscribe(cart => {
        if (cart.length === 0) {
          expect(cart).toEqual([]);
          done();
        }
      });

      service.clearCart();
    });

    it('should work when cart is already empty', () => {
      expect(service.cart.length).toBe(0);
      service.clearCart();
      expect(service.cart.length).toBe(0);
    });
  });

  describe('cart getter', () => {
    it('should return current cart value', () => {
      expect(service.cart).toEqual([]);

      service.addToCart(mockGame);
      expect(service.cart).toContain(mockGame);
      expect(service.cart.length).toBe(1);
    });

    it('should return updated cart value after modifications', () => {
      service.addToCart(mockGame);
      expect(service.cart.length).toBe(1);

      service.removeFromCart(mockGame);
      expect(service.cart.length).toBe(0);
    });
  });

  describe('cart$ observable', () => {
    it('should emit initial empty array', (done) => {
      service.cart$.subscribe(cart => {
        expect(cart).toEqual([]);
        done();
      });
    });

    it('should emit updated cart when items are added', (done) => {
      let emissionCount = 0;

      service.cart$.subscribe(cart => {
        emissionCount++;
        if (emissionCount === 2) {
          expect(cart).toContain(mockGame);
          expect(cart.length).toBe(1);
          done();
        }
      });

      service.addToCart(mockGame);
    });
  });
});
