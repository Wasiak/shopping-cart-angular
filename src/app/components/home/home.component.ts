import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { GamesService } from '../../services/games.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { GamesListComponent } from '../games-list/games-list.component';
import { HomeGame, Game } from '../../interfaces/game.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, GamesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // Use signals from services
  games: any;
  user: any;
  banner: any;
  loading: any;

  // Computed signal that combines games with user data
  gamesWithUserData: any;

  constructor(
    private gamesService: GamesService,
    private userService: UserService,
    private router: Router
  ) {
    // Initialize signals after constructor
    this.games = this.gamesService.games;
    this.user = this.userService.user;
    this.banner = this.gamesService.banner;
    this.loading = this.gamesService.loading;

    this.gamesWithUserData = computed(() => {
      const games = this.games();
      const user = this.user();

      if (!user || !games.length) return [];

      return games.map((game: Game) => ({
        ...game,
        owned: user.collection.includes(game.id),
        inCart: false // Will be handled by games-list component
      }));
    });
  }

  navigateToSales() {
    this.router.navigate(['/sales']);
  }
}
