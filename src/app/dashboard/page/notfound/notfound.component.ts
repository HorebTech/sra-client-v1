import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notfound',
  standalone: false,
  
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back(); // Retourne à la page précédente
  }

}
