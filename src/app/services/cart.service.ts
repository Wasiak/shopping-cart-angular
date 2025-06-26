import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Game[]>([]);
  public cart$: Observable<Game[]> = this.cartSubject.asObservable();

  get cart(): Game[] {
    return this.cartSubject.value;
  }

  addToCart(item: Game): void {
    if (!this.cart.find(g => g.id === item.id)) {
      this.cartSubject.next([...this.cart, item]);
    }
  }

  removeFromCart(item: Game): void {
    this.cartSubject.next(this.cart.filter(g => g.id !== item.id));
  }
}
