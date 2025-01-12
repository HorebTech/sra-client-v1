import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NettoyagesComponent } from './nettoyages.component';

describe('NettoyagesComponent', () => {
  let component: NettoyagesComponent;
  let fixture: ComponentFixture<NettoyagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NettoyagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NettoyagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
