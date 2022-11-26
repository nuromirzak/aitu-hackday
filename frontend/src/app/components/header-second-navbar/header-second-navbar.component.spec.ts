import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSecondNavbarComponent } from './header-second-navbar.component';

describe('HeaderSecondNavbarComponent', () => {
  let component: HeaderSecondNavbarComponent;
  let fixture: ComponentFixture<HeaderSecondNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSecondNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSecondNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
