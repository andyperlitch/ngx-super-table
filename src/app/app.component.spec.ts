import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo.component';
import { InstrumentComponent } from './instrument.component';

import { SuperTableModule } from '../lib';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DemoComponent,
        InstrumentComponent
      ],
      imports: [
        SuperTableModule
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [
            InstrumentComponent
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create', async(() => {
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  }));

  it('should contain nav', () => {
    expect(fixture.debugElement.query(By.css('nav'))).toBeTruthy();
  });
});
