import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentpinsComponent } from './recentpins.component';

describe('RecentpinsComponent', () => {
  let component: RecentpinsComponent;
  let fixture: ComponentFixture<RecentpinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentpinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentpinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
