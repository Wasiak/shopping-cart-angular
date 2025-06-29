import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGame, Game } from '../../interfaces/game.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss'
})
export class GamesListComponent {
  @Input() set games(value: HomeGame[]) {
    this.gamesSignal.set(value);
  }

  @Input() set user(value: any) {
    this.userSignal.set(value);
  }

  private gamesSignal = signal<HomeGame[]>([]);
  private userSignal = signal<any>(null);

  // Computed signal that combines games with cart status
  gamesWithCartStatus = computed(() => {
    const games = this.gamesSignal();
    const cartIds = this.cartService.cart().map(item => item.id);

    return games.map(game => ({
      ...game,
      inCart: cartIds.includes(game.id)
    }));
  });

  constructor(private cartService: CartService) {}

  addToCart(game: HomeGame) {
    if (!(game.owned || game.inCart)) {
      this.cartService.addToCart(game);
    }
  }
}
