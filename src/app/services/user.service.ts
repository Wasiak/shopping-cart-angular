import { Injectable, signal, computed } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { loggedUser } from '../../assets/mocks';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSignal = signal<User | null>(null);
  private loadingSignal = signal<boolean>(false);

  // Public readonly signals
  public readonly user = this.userSignal.asReadonly();
  public readonly loading = this.loadingSignal.asReadonly();

  // Computed signals
  public readonly isLoggedIn = computed(() => this.userSignal() !== null);
  public readonly userCollection = computed(() => this.userSignal()?.collection || []);

  constructor() {
    this.loadUser();
  }

  private loadUser(): void {
    this.loadingSignal.set(true);
    // Simulate async loading
    setTimeout(() => {
      this.userSignal.set(loggedUser);
      this.loadingSignal.set(false);
    }, 100);
  }

  // Legacy method for backward compatibility
  getLoggedUser(): Promise<User> {
    return Promise.resolve(loggedUser);
  }
}
