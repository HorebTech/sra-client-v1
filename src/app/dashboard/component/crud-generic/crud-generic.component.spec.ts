import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudGenericComponent } from './crud-generic.component';

describe('CrudGenericComponent', () => {
  let component: CrudGenericComponent;
  let fixture: ComponentFixture<CrudGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudGenericComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
