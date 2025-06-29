import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {
  title = 'Sales';

  // Use signals from the service
  banner: any;
  gamesOnSale: any;

  constructor(private gamesService: GamesService) {
    // Initialize signals after constructor
    this.banner = this.gamesService.banner;
    this.gamesOnSale = this.gamesService.gamesOnSale;
  }
}
