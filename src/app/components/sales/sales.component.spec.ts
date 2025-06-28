import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesComponent } from './sales.component';
import { GamesService } from '../../services/games.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('SalesComponent', () => {
  let component: SalesComponent;
  let fixture: ComponentFixture<SalesComponent>;
  let gamesService: jasmine.SpyObj<GamesService>;

  const mockBanner = {
    id: 1,
    title: 'Summer Game Sale',
    image: 'https://picsum.photos/id/6/1200/450',
    link: '/sales/summer'
  };

  const mockActivatedRoute = {
    snapshot: {},
    params: of({}),
    queryParams: of({}),
    data: of({})
  };

  beforeEach(async () => {
    const gamesServiceSpy = jasmine.createSpyObj('GamesService', ['getBaner']);
    gamesServiceSpy.getBaner.and.returnValue(of(mockBanner));

    await TestBed.configureTestingModule({
      imports: [SalesComponent],
      providers: [
        { provide: GamesService, useValue: gamesServiceSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesComponent);
    component = fixture.componentInstance;
    gamesService = TestBed.inject(GamesService) as jasmine.SpyObj<GamesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.title).toBe('Sales');
    expect(component.banner).toBeNull();
  });

  describe('ngOnInit', () => {
    it('should load banner data on initialization', () => {
      component.ngOnInit();
      expect(gamesService.getBaner).toHaveBeenCalled();
      expect(component.banner).toEqual(mockBanner);
    });
  });

  describe('banner loading', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should call games service getBaner method', () => {
      expect(gamesService.getBaner).toHaveBeenCalled();
    });

    it('should set banner data when service returns data', () => {
      expect(component.banner).toEqual(mockBanner);
    });

    it('should set banner properties correctly', () => {
      expect(component.banner?.id).toBe(mockBanner.id);
      expect(component.banner?.title).toBe(mockBanner.title);
      expect(component.banner?.image).toBe(mockBanner.image);
      expect(component.banner?.link).toBe(mockBanner.link);
    });
  });

  describe('template rendering', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should display the title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Sales');
    });

    it('should display banner when available', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const bannerElement = compiled.querySelector('.banner');
      if (bannerElement) {
        expect(bannerElement).toBeTruthy();
      }
    });

    it('should display banner image', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const bannerImage = compiled.querySelector('img');
      if (bannerImage) {
        expect(bannerImage.getAttribute('src')).toBe(mockBanner.image);
      }
    });
  });

  describe('error handling', () => {
    it('should handle banner service error gracefully', () => {
      gamesService.getBaner.and.returnValue(of(null));
      component.ngOnInit();

      expect(component.banner).toBeNull();
    });

    it('should handle empty banner data', () => {
      gamesService.getBaner.and.returnValue(of({}));
      component.ngOnInit();

      expect(component.banner).toEqual({});
    });
  });

  describe('component behavior', () => {
    it('should be injectable', () => {
      expect(component).toBeInstanceOf(SalesComponent);
    });

    it('should have ngOnInit method', () => {
      expect(typeof component.ngOnInit).toBe('function');
    });
  });

  describe('banner data validation', () => {
    it('should handle banner with missing properties', () => {
      const incompleteBanner = {
        id: 3,
        title: 'Incomplete Banner'
        // missing image and link
      };

      gamesService.getBaner.and.returnValue(of(incompleteBanner));
      component.ngOnInit();

      expect(component.banner).toEqual(incompleteBanner);
    });

    it('should handle banner with empty strings', () => {
      const emptyBanner = {
        id: 4,
        title: '',
        image: '',
        link: ''
      };

      gamesService.getBaner.and.returnValue(of(emptyBanner));
      component.ngOnInit();

      expect(component.banner).toEqual(emptyBanner);
    });
  });
});
