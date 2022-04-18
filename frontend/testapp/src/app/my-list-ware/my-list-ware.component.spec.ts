import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListWareComponent } from './my-list-ware.component';

describe('MyListWareComponent', () => {
  let component: MyListWareComponent;
  let fixture: ComponentFixture<MyListWareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyListWareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListWareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
