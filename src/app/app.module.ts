import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { MainDisplayComponent } from './components/main-display/main-display.component';
import { SubDisplayComponent } from './components/sub-display/sub-display.component';
import { KeyboardDirective } from './directives/keyboard.directive';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    MainDisplayComponent,
    SubDisplayComponent,
    KeyboardDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
