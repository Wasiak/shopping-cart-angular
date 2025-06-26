import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GamesService } from '../../services/games.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { GamesListComponent } from '../games-list/games-list.component';
import { HeaderComponent } from '../header/header.component';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeGame } from '../../interfaces/game.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, GamesListComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  title = 'Welcome to Shopping Cart';
  games: HomeGame[] = [];
  user: User | null = null;
  banner: any = null;
  loading = true;

  constructor(
    private gamesService: GamesService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    // Combine games and user, and mark owned
    combineLatest([
      this.gamesService.getAllGames(),
      this.userService.getLoggedUser()
    ]).pipe(
      map(([games, user]) => {
        this.user = user;
        return games.map(game => ({
          ...game,
          owned: user.collection.includes(game.id),
          inCart: false // TODO: Replace with cart logic
        }));
      })
    ).subscribe((games: HomeGame[]) => {
      console.log(games);
      this.games = games;
    });

    // Load banner
    this.gamesService.getBaner().subscribe(banner => {
      this.banner = banner;
      this.loading = false;
    });
  }
}
