import { Component } from '@angular/core';
import { CartPopupComponent } from './cart-popup.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CartPopupComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {}
