import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../interfaces/game.interface';
import { games, baner } from '../../assets/mocks';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor() { }

  getBaner(): Observable<any> {
    return of(baner);
  }

  getAllGames(): Observable<Game[]> {
    return of(games);
  }
}
