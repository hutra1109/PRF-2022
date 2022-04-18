import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWaresComponent } from './list-wares.component';

describe('ListWaresComponent', () => {
  let component: ListWaresComponent;
  let fixture: ComponentFixture<ListWaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
