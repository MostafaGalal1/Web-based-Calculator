import { Directive, HostListener } from '@angular/core';
import { AppComponent } from '../app.component';

@Directive({
  selector: '[appKeyboard]'
})
export class KeyboardDirective {
  
  constructor(private appComponent : AppComponent) { }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event : KeyboardEvent){
    var name = event.key;
    var code = event.code;

    if (code.indexOf("Digit") === 0 || code === "Period")
      this.appComponent.Display(name);
    else if (name === '+' || name === '-' || name === '*' || name === '/') {
      if (name === '-')
          name = '−';
      else if (name === '*')
          name = '×';
      else if (name === '/')
          name = '÷';

      if (this.appComponent.bi_operator === '')
        this.appComponent.Operation(name);
      else {
        this.appComponent.Calculate();
        this.appComponent.Operation(name);
      }
    } else if (name === "Enter")
      this.appComponent.Calculate();
    else if (name === "Backspace")
      this.appComponent.Backspace();
  };

}
