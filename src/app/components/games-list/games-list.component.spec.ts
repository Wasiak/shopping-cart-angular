import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GamesListComponent } from './games-list.component';
import { CartService } from '../../services/cart.service';
import { HomeGame } from '../../interfaces/game.interface';
import { User } from '../../interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';

describe('GamesListComponent', () => {
  let component: GamesListComponent;
  let fixture: ComponentFixture<GamesListComponent>;
  let cartService: jasmine.SpyObj<CartService>;
  let mockCartSubject: BehaviorSubject<any[]>;

  const mockGames: HomeGame[] = [
    {
      id: 'game-1',
      title: 'Game 1',
      description: 'First game',
      image: 'https://picsum.photos/id/1/200/100',
      thumb: 'https://picsum.photos/id/1/80/40',
      basePrice: 29.99,
      discountInPercent: 0,
      currentPrice: 29.99,
      owned: false,
      inCart: false
    },
    {
      id: 'game-2',
      title: 'Game 2',
      description: 'Second game',
      image: 'https://picsum.photos/id/2/200/100',
      thumb: 'https://picsum.photos/id/2/80/40',
      basePrice: 39.99,
      discountInPercent: 25,
      currentPrice: 29.99,
      owned: true,
      inCart: false
    },
    {
      id: 'game-3',
      title: 'Game 3',
      description: 'Third game',
      image: 'https://picsum.photos/id/3/200/100',
      thumb: 'https://picsum.photos/id/3/80/40',
      basePrice: 19.99,
      discountInPercent: 0,
      currentPrice: 19.99,
      owned: false,
      inCart: true
    }
  ];

  const mockUser: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    collection: ['game-2']
  };

  beforeEach(async () => {
    mockCartSubject = new BehaviorSubject<any[]>([]);

    const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart'], {
      cart$: mockCartSubject.asObservable()
    });

    await TestBed.configureTestingModule({
      imports: [GamesListComponent],
      providers: [
        { provide: CartService, useValue: cartServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesListComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.games).toEqual([]);
    expect(component.user).toBeNull();
  });

  describe('Input properties', () => {
    it('should accept games input', () => {
      component.games = mockGames;
      expect(component.games).toEqual(mockGames);
    });

    it('should accept user input', () => {
      component.user = mockUser;
      expect(component.user).toEqual(mockUser);
    });

    it('should handle empty games array', () => {
      component.games = [];
      expect(component.games).toEqual([]);
    });

    it('should handle null user', () => {
      component.user = null;
      expect(component.user).toBeNull();
    });
  });

  describe('ngOnInit', () => {
    it('should subscribe to cart service on initialization', () => {
      component.ngOnInit();
      expect(component.games).toEqual([]);
    });

    it('should update games inCart status when cart changes', () => {
      component.games = [...mockGames];
      component.ngOnInit();

      // Simulate cart update
      mockCartSubject.next([mockGames[0]]);

      const gameInCart = component.games.find(game => game.id === 'game-1');
      const gameNotInCart = component.games.find(game => game.id === 'game-2');

      expect(gameInCart?.inCart).toBe(true);
      expect(gameNotInCart?.inCart).toBe(false);
    });

    it('should handle multiple cart updates', () => {
      component.games = [...mockGames];
      component.ngOnInit();

      // First cart update
      mockCartSubject.next([mockGames[0]]);
      expect(component.games.find(g => g.id === 'game-1')?.inCart).toBe(true);

      // Second cart update
      mockCartSubject.next([mockGames[0], mockGames[1]]);
      expect(component.games.find(g => g.id === 'game-1')?.inCart).toBe(true);
      expect(component.games.find(g => g.id === 'game-2')?.inCart).toBe(true);
    });

    it('should clear inCart status when cart is empty', () => {
      component.games = [...mockGames];
      component.ngOnInit();

      // Set some games as in cart
      mockCartSubject.next([mockGames[0], mockGames[1]]);

      // Clear cart
      mockCartSubject.next([]);

      component.games.forEach(game => {
        expect(game.inCart).toBe(false);
      });
    });
  });

  describe('addToCart', () => {
    beforeEach(() => {
      component.games = [...mockGames];
      component.ngOnInit();
    });

    it('should add game to cart when not owned and not in cart', () => {
      const gameToAdd = mockGames[0]; // owned: false, inCart: false
      component.addToCart(gameToAdd);
      expect(cartService.addToCart).toHaveBeenCalledWith(gameToAdd);
    });

    it('should not add owned game to cart', () => {
      const ownedGame = mockGames[1]; // owned: true
      component.addToCart(ownedGame);
      expect(cartService.addToCart).not.toHaveBeenCalled();
    });

    it('should not add game that is already in cart', () => {
      const gameInCart = mockGames[2]; // inCart: true
      component.addToCart(gameInCart);
      expect(cartService.addToCart).not.toHaveBeenCalled();
    });

    it('should not add game that is both owned and in cart', () => {
      // Create a game that is both owned and in cart
      const ownedAndInCartGame: HomeGame = {
        ...mockGames[0],
        owned: true,
        inCart: true
      };
      component.addToCart(ownedAndInCartGame);
      expect(cartService.addToCart).not.toHaveBeenCalled();
    });
  });

  describe('cart integration', () => {
    it('should reflect cart changes in real-time', () => {
      component.games = [...mockGames];
      component.ngOnInit();

      // Initially no games in cart
      expect(component.games.every(game => !game.inCart)).toBe(true);

      // Add game to cart
      mockCartSubject.next([mockGames[0]]);
      expect(component.games.find(g => g.id === 'game-1')?.inCart).toBe(true);

      // Remove game from cart
      mockCartSubject.next([]);
      expect(component.games.every(game => !game.inCart)).toBe(true);
    });
  });
});
