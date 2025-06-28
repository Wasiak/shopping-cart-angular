import { Component } from '@angular/core';
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
  cart: Game[] = [];
  showPopup = false;

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe(cart => {
      console.log('cart in cart-popup', cart);
      this.cart = cart;
    });
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  get totalPrice(): number {
    return this.cart.reduce((sum, item) => sum + item.currentPrice, 0);
  }

  clearCart() {
    this.cartService.clearCart();
    this.showPopup = false;
  }

  removeItem(item: Game) {
    this.cartService.removeFromCart(item);
    // Check if cart becomes empty after removing the item
    if (!this.cart.length) {
      this.showPopup = false;
    }
  }
}
