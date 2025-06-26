import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGame, Game } from '../../interfaces/game.interface';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss'
})
export class GamesListComponent implements OnInit, OnDestroy {
  @Input() games: HomeGame[] = [];
  @Input() user: any = null;

  constructor(private cartService: CartService) {}

  private cartSub: Subscription | undefined;

  ngOnInit() {
    this.cartSub = this.cartService.cart$.subscribe(cart => {
      const cartIds = cart.map(item => item.id);
      this.games = this.games.map(game => ({
        ...game,
        inCart: cartIds.includes(game.id)
      }));
    });
  }

  ngOnDestroy() {
    this.cartSub?.unsubscribe();
  }

  addToCart(game: HomeGame) {
    if (!(game.owned || game.inCart)) {
      this.cartService.addToCart(game);
    }
  }
}
