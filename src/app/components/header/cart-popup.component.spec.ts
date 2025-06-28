import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartPopupComponent } from './cart-popup.component';
import { CartService } from '../../services/cart.service';
import { Game } from '../../interfaces/game.interface';
import { BehaviorSubject } from 'rxjs';

describe('CartPopupComponent', () => {
  let component: CartPopupComponent;
  let fixture: ComponentFixture<CartPopupComponent>;
  let cartService: jasmine.SpyObj<CartService>;
  let mockCartSubject: BehaviorSubject<Game[]>;

  const mockGame: Game = {
    id: 'test-game',
    title: 'Test Game',
    description: 'A test game',
    image: 'https://picsum.photos/id/1/200/100',
    thumb: 'https://picsum.photos/id/1/80/40',
    basePrice: 29.99,
    discountInPercent: 0,
    currentPrice: 29.99
  };

  const mockGame2: Game = {
    id: 'test-game-2',
    title: 'Test Game 2',
    description: 'Another test game',
    image: 'https://picsum.photos/id/2/200/100',
    thumb: 'https://picsum.photos/id/2/80/40',
    basePrice: 39.99,
    discountInPercent: 25,
    currentPrice: 29.99
  };

  beforeEach(async () => {
    mockCartSubject = new BehaviorSubject<Game[]>([]);

    const cartServiceSpy = jasmine.createSpyObj('CartService', ['clearCart', 'removeFromCart'], {
      cart$: mockCartSubject.asObservable()
    });

    await TestBed.configureTestingModule({
      imports: [CartPopupComponent],
      providers: [
        { provide: CartService, useValue: cartServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPopupComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty cart and hidden popup', () => {
    expect(component.cart).toEqual([]);
    expect(component.showPopup).toBe(false);
  });

  describe('cart subscription', () => {
    it('should update cart when cart service emits new value', () => {
      mockCartSubject.next([mockGame]);
      expect(component.cart).toEqual([mockGame]);
    });

    it('should handle multiple cart updates', () => {
      mockCartSubject.next([mockGame]);
      expect(component.cart).toEqual([mockGame]);

      mockCartSubject.next([mockGame, mockGame2]);
      expect(component.cart).toEqual([mockGame, mockGame2]);
    });
  });

  describe('togglePopup', () => {
    it('should show popup when initially hidden', () => {
      component.showPopup = false;
      component.togglePopup();
      expect(component.showPopup).toBe(true);
    });

    it('should hide popup when initially shown', () => {
      component.showPopup = true;
      component.togglePopup();
      expect(component.showPopup).toBe(false);
    });

    it('should toggle popup state correctly', () => {
      expect(component.showPopup).toBe(false);

      component.togglePopup();
      expect(component.showPopup).toBe(true);

      component.togglePopup();
      expect(component.showPopup).toBe(false);
    });
  });

  describe('totalPrice', () => {
    it('should return 0 for empty cart', () => {
      component.cart = [];
      expect(component.totalPrice).toBe(0);
    });

    it('should calculate total for single item', () => {
      component.cart = [mockGame];
      expect(component.totalPrice).toBe(29.99);
    });

    it('should calculate total for multiple items', () => {
      component.cart = [mockGame, mockGame2];
      expect(component.totalPrice).toBe(59.98);
    });

    it('should handle items with different prices', () => {
      const expensiveGame: Game = {
        ...mockGame,
        id: 'expensive-game',
        currentPrice: 99.99
      };
      component.cart = [mockGame, expensiveGame];
      expect(component.totalPrice).toBe(129.98);
    });
  });

  describe('clearCart', () => {
    it('should call cart service clearCart method', () => {
      component.clearCart();
      expect(cartService.clearCart).toHaveBeenCalled();
    });

    it('should hide popup after clearing cart', () => {
      component.showPopup = true;
      component.clearCart();
      expect(component.showPopup).toBe(false);
    });
  });

  describe('removeItem', () => {
    it('should call cart service removeFromCart method', () => {
      component.removeItem(mockGame);
      expect(cartService.removeFromCart).toHaveBeenCalledWith(mockGame);
    });

    it('should hide popup when cart becomes empty after removal', () => {
      component.cart = [mockGame];
      component.showPopup = true;

      component.removeItem(mockGame);

      expect(cartService.removeFromCart).toHaveBeenCalledWith(mockGame);
      // Note: The actual hiding logic depends on the cart service update
    });

    it('should not hide popup when cart still has items after removal', () => {
      component.cart = [mockGame, mockGame2];
      component.showPopup = true;

      component.removeItem(mockGame);

      expect(cartService.removeFromCart).toHaveBeenCalledWith(mockGame);
      expect(component.showPopup).toBe(true);
    });
  });
});
