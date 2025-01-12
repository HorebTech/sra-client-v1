import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasseComponent } from './passe.component';

describe('PasseComponent', () => {
  let component: PasseComponent;
  let fixture: ComponentFixture<PasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
