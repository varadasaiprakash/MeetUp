import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupVideoComponent } from './meetup-video.component';

describe('MeetupVideoComponent', () => {
  let component: MeetupVideoComponent;
  let fixture: ComponentFixture<MeetupVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetupVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
