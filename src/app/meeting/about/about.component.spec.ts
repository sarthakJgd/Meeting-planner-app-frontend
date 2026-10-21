import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EventService } from '../../event.service';
import { AppService } from '../../app.service';
import { SocketService } from '../../socket.service';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from '../../notification.service';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [
        { provide: EventService, useValue: {} },
        { provide: AppService, useValue: { getUserInfoFromLocalstorage: () => ({ firstName: 'Local', lastName: 'User' }) } },
        { provide: SocketService, useValue: {} },
        { provide: CookieService, useValue: { get: () => '' } },
        { provide: NotificationService, useValue: {} },
      ],
      declarations: [ AboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
