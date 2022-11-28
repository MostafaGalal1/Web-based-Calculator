import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { DisplayService } from '../services/display.service';
import { TransmitService } from '../services/transmit.service';
import { KeyboardDirective } from './keyboard.directive';

describe('KeyboardDirective', () => {
  it('should create an instance', () => {
    const directive = new KeyboardDirective(new AppComponent(new DisplayService, new TransmitService));
    expect(directive).toBeTruthy();
  });
});
