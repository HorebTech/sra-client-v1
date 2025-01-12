import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent implements OnInit {

  constructor(
    private primeng: PrimeNG,
    private messageService: MessageService,
    private store: Store<{ user: any }>
  ) {
  }

  showSuccess() {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  showInfo() {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showWarn() {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
  }

  showError() {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  }

  showContrast() {
      this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Message Content' });
  }

  showSecondary() {
      this.messageService.add({ severity: 'secondary', summary: 'Secondary', detail: 'Message Content' });
  }

  name: string = '';

  email: string = '';

  accept: boolean = false;


    ngOnInit() {
      this.primeng.ripple.set(true);
    }

}
