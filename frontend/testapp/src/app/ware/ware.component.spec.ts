import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WareComponent } from './ware.component';

describe('WareComponent', () => {
  let component: WareComponent;
  let fixture: ComponentFixture<WareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
