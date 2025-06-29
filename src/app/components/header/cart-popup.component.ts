import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Game } from '../../interfaces/game.interface';

@Component({
  selector: 'app-cart-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-popup.component.html',
  styleUrl: './cart-popup.component.scss'
})
export class CartPopupComponent {
  showPopup = signal(false);

  // Use signals from the service
  cart: any;
  totalPrice: any;
  cartCount: any;

  // Computed signal for cart items
  cartItems: any;

  constructor(private cartService: CartService) {
    // Initialize signals after constructor
    this.cart = this.cartService.cart;
    this.totalPrice = this.cartService.totalPrice;
    this.cartCount = this.cartService.cartCount;
    this.cartItems = computed(() => this.cart());
  }

  togglePopup() {
    this.showPopup.update(current => !current);
  }

  clearCart() {
    this.cartService.clearCart();
    this.showPopup.set(false);
  }

  removeItem(item: Game) {
    this.cartService.removeFromCart(item);
    // Check if cart becomes empty after removing the item
    if (this.cartCount() === 0) {
      this.showPopup.set(false);
    }
  }
}
