import { Component, OnInit } from '@angular/core';
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
export class SalesComponent implements OnInit {
  title = 'Sales';
  banner: any = null;

  constructor(private gamesService: GamesService) {}

  ngOnInit() {
    this.loadBanner();
  }

  private loadBanner() {
    this.gamesService.getBaner().subscribe(banner => {
      this.banner = banner;
    });
  }
}
