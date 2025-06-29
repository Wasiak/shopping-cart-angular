import { Injectable, signal, computed } from '@angular/core';
import { Game } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSignal = signal<Game[]>([]);

  // Public readonly signal for components to subscribe to
  public readonly cart = this.cartSignal.asReadonly();

  // Computed signal for cart count
  public readonly cartCount = computed(() => this.cartSignal().length);

  // Computed signal for total price
  public readonly totalPrice = computed(() =>
    this.cartSignal().reduce((sum, item) => sum + item.currentPrice, 0)
  );

  addToCart(item: Game): void {
    const currentCart = this.cartSignal();
    if (!currentCart.find(g => g.id === item.id)) {
      this.cartSignal.set([...currentCart, item]);
    }
  }

  removeFromCart(item: Game): void {
    const currentCart = this.cartSignal();
    this.cartSignal.set(currentCart.filter(g => g.id !== item.id));
  }

  clearCart(): void {
    this.cartSignal.set([]);
  }

  isInCart(gameId: string): boolean {
    return this.cartSignal().some(game => game.id === gameId);
  }
}
