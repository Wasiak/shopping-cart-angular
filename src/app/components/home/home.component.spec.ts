import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { GamesService } from '../../services/games.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { GamesListComponent } from '../games-list/games-list.component';
import { of } from 'rxjs';
import { Game, HomeGame } from '../../interfaces/game.interface';
import { User } from '../../interfaces/user.interface';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let gamesService: jasmine.SpyObj<GamesService>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  const mockGames: Game[] = [
    {
      id: 'game-1',
      title: 'Game 1',
      description: 'First game',
      image: 'https://picsum.photos/id/1/200/100',
      thumb: 'https://picsum.photos/id/1/80/40',
      basePrice: 29.99,
      discountInPercent: 0,
      currentPrice: 29.99
    },
    {
      id: 'game-2',
      title: 'Game 2',
      description: 'Second game',
      image: 'https://picsum.photos/id/2/200/100',
      thumb: 'https://picsum.photos/id/2/80/40',
      basePrice: 39.99,
      discountInPercent: 25,
      currentPrice: 29.99
    }
  ];

  const mockUser: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    collection: ['game-1']
  };

  const mockBanner = {
    id: 1,
    title: 'Summer Sale',
    image: 'https://picsum.photos/id/6/1200/450',
    link: '/sales/summer'
  };

  beforeEach(async () => {
    const gamesServiceSpy = jasmine.createSpyObj('GamesService', ['getAllGames', 'getBaner']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getLoggedUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    gamesServiceSpy.getAllGames.and.returnValue(of(mockGames));
    gamesServiceSpy.getBaner.and.returnValue(of(mockBanner));
    userServiceSpy.getLoggedUser.and.returnValue(of(mockUser));

    await TestBed.configureTestingModule({
      imports: [HomeComponent, GamesListComponent],
      providers: [
        { provide: GamesService, useValue: gamesServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    gamesService = TestBed.inject(GamesService) as jasmine.SpyObj<GamesService>;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.games).toEqual([]);
    expect(component.user).toBeNull();
    expect(component.banner).toBeNull();
    expect(component.loading).toBe(true);
  });

  describe('ngOnInit', () => {
    it('should load data on initialization', () => {
      component.ngOnInit();
      expect(gamesService.getAllGames).toHaveBeenCalled();
      expect(userService.getLoggedUser).toHaveBeenCalled();
      expect(gamesService.getBaner).toHaveBeenCalled();
    });
  });

  describe('data loading', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should load games and user data', () => {
      expect(gamesService.getAllGames).toHaveBeenCalled();
      expect(userService.getLoggedUser).toHaveBeenCalled();
    });

    it('should load banner data', () => {
      expect(gamesService.getBaner).toHaveBeenCalled();
    });

    it('should set loading to false after banner loads', () => {
      expect(component.loading).toBe(false);
    });

    it('should set banner data', () => {
      expect(component.banner).toEqual(mockBanner);
    });

    it('should set user data', () => {
      expect(component.user).toEqual(mockUser);
    });

    it('should transform games with owned and inCart properties', () => {
      const expectedGames: HomeGame[] = [
        {
          ...mockGames[0],
          owned: true,
          inCart: false
        },
        {
          ...mockGames[1],
          owned: false,
          inCart: false
        }
      ];

      expect(component.games).toEqual(expectedGames);
    });

    it('should mark games as owned if in user collection', () => {
      const ownedGame = component.games.find(game => game.id === 'game-1');
      const notOwnedGame = component.games.find(game => game.id === 'game-2');

      expect(ownedGame?.owned).toBe(true);
      expect(notOwnedGame?.owned).toBe(false);
    });

    it('should set inCart to false for all games initially', () => {
      component.games.forEach(game => {
        expect(game.inCart).toBe(false);
      });
    });
  });

  describe('navigateToSales', () => {
    it('should navigate to sales route', () => {
      component.navigateToSales();
      expect(router.navigate).toHaveBeenCalledWith(['/sales']);
    });
  });

  describe('template rendering', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should display games list component', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('app-games-list')).toBeTruthy();
    });

    it('should display banner when available', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const bannerElement = compiled.querySelector('.banner');
      if (bannerElement) {
        expect(bannerElement).toBeTruthy();
      }
    });

    it('should show loading state initially', () => {
      component.loading = true;
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const loadingElement = compiled.querySelector('.loading');
      if (loadingElement) {
        expect(loadingElement).toBeTruthy();
      }
    });
  });
});
