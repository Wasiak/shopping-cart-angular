import { Injectable, signal, computed } from '@angular/core';
import { Game } from '../interfaces/game.interface';
import { games, baner } from '../../assets/mocks';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private gamesSignal = signal<Game[]>([]);
  private bannerSignal = signal<any>(null);
  private loadingSignal = signal<boolean>(false);

  // Public readonly signals
  public readonly games = this.gamesSignal.asReadonly();
  public readonly banner = this.bannerSignal.asReadonly();
  public readonly loading = this.loadingSignal.asReadonly();

  // Computed signals
  public readonly gamesOnSale = computed(() =>
    this.gamesSignal().filter(game => game.discountInPercent > 0)
  );

  public readonly gamesCount = computed(() => this.gamesSignal().length);

  constructor() {
    this.loadGames();
    this.loadBanner();
  }

  private loadGames(): void {
    this.loadingSignal.set(true);
    // Simulate async loading
    setTimeout(() => {
      this.gamesSignal.set(games);
      this.loadingSignal.set(false);
    }, 100);
  }

  private loadBanner(): void {
    // Simulate async loading
    setTimeout(() => {
      this.bannerSignal.set(baner);
    }, 50);
  }

  // Legacy methods for backward compatibility
  getBaner(): Promise<any> {
    return Promise.resolve(baner);
  }

  getAllGames(): Promise<Game[]> {
    return Promise.resolve(games);
  }
}
