import { Component } from '@angular/core';
import { DisplayService } from './services/display.service';
import { TransmitService } from './services/transmit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Web-Based-Calculator';

  private mainText:string = '0';
  private subText:string = '';
  private replaceable:boolean = false;
  private updated:boolean = false;
  private precalculated:boolean = false;
  private error:boolean = false;
  private un_operator:string = '';
  private bi_operator:string = '';
  private first_val:number = 0;
  private second_val:number = 0;

  constructor(private displayService: DisplayService, private transmitService: TransmitService){
    document.addEventListener('keydown', (event) => {
      var name = event.key;
      var code = event.code;

      if (code.indexOf("Digit") === 0 || code === "Period")
        this.Display(name);
      else if (name === '+' || name === '-' || name === '*' || name === '/') {
        if (name === '-')
            name = '−';
        else if (name === '*')
            name = '×';
        else if (name === '/')
            name = '÷';

        if (this.bi_operator === '')
          this.Operation(name);
        else {
          this.Calculate();
          this.Operation(name);
        }
      } else if (name === "Enter")
        this.Calculate();
      else if (name === "Backspace")
        this.Backspace();
    }, false);
  }

  Display(val:string) {
    if (this.precalculated)
      this.Clear();

    if (!this.updated) {
      this.mainText = '0';
      this.displayService.setValue(this.mainText);
      this.updated = true;
      this.precalculated = false;
    }

    if ((val === '.' && this.mainText.length < 14) || (val !== '.' && this.mainText.length < 15)) {
      if (this.mainText.indexOf('.') === -1 && val !== '.'){
        this.mainText = parseFloat(this.mainText + val).toString();
        this.displayService.setValue(this.mainText);
      } else if (this.mainText.indexOf('.') !== -1 && val === '.'){
        return;
      } else {
        this.mainText += val;
        this.displayService.setValue(this.mainText);
      }
    }
  }

  ClearEntity() {
    this.mainText = '0';
    this.displayService.setValue(this.mainText);
    if (this.precalculated)
      this.Clear();

    if (!this.updated)
      this.updated = true;
  }

  Clear() {
    this.subText = '';
    this.displayService.setExpression(this.subText);
    this.mainText = '0';
    this.displayService.setValue(this.mainText);
    this.replaceable = false; this.updated = false; this.precalculated = false;
    this.un_operator = ''; this.bi_operator = '';
    this.first_val = 0; this.second_val = 0;
    this.error = false;
  }

  Backspace() {
    if (this.updated) {
      var text = this.mainText;
      if ((text[0] === '-' && text.length == 2) || (text[0] !== '-' && text.length == 1)) {
        this.mainText = '0';
        this.displayService.setValue(this.mainText);
      } else {
        this.mainText = text.substring(0, text.length - 1);
        this.displayService.setValue(this.mainText);
      }
    } else if (this.precalculated && !this.replaceable){
      this.subText = '';
      this.displayService.setExpression(this.subText);
    }
  }

  Operation(op:string) {
    if (this.error) {
      this.Clear();
      this.error = false;
    }

    if (this.updated && this.bi_operator != ''){
      this.Calculate();
      this.Operation(op);
    } else {
      if (this.replaceable) {
        this.subText = this.first_val.toString();
        this.displayService.setExpression(this.subText);
      } else {
        this.first_val = parseFloat(this.mainText);
        this.subText = this.first_val.toString();
        this.displayService.setExpression(this.subText);
        this.replaceable = true;
      }

      switch (op) {
        case '+':
          this.subText += ' +';
          this.displayService.setExpression(this.subText);
          break;
        case '−':
          this.subText += ' −';
          this.displayService.setExpression(this.subText);
          break;
        case '×':
          this.subText += ' ×';
          this.displayService.setExpression(this.subText);
          break;
        case '÷':
          this.subText += ' ÷';
          this.displayService.setExpression(this.subText);
          break;
        default:
      }

      this.bi_operator = op;
      this.updated = false;
      this.precalculated = false;
    }
  }

  Request(type: number){

    return '0';
  }

  Calculate() {
    if (this.error) {
      this.Clear();
      this.error = false;
    }

    if (this.bi_operator === '')
      return;

    if (this.precalculated)
      this.first_val = parseFloat(this.mainText);
    else
      this.second_val = parseFloat(this.mainText);
 
    this.subText = this.first_val + ' ' + this.bi_operator + ' ' + this.second_val + ' =';
    this.displayService.setExpression(this.subText);
    this.mainText = this.Request(1).toString();
    this.displayService.setValue(this.mainText);
  }

  Plus_Minus() {
    if (this.error) {
      this.Clear();
      this.error = false;
    }

    var text = this.mainText;
    if (text === '0')
      return;

    if (text[0] === '-') {
      this.mainText = text.substring(1, text.length);
      this.displayService.setValue(this.mainText);
    } else {
      this.mainText = '-' + text;
      this.displayService.setValue(this.mainText);
    }
  }

  Squaring(){
    if (this.error) {
      this.Clear();
      this.error = false;
    }
    
    this.first_val = parseFloat(this.mainText);
    this.un_operator = 'sqri';
    this.subText = 'sqr(' + this.mainText + ')';
    this.displayService.setExpression(this.subText);

    this.mainText = this.Request(0).toString();
    this.displayService.setValue(this.mainText);
  }

  Square_Root(){
    if (this.error) {
      this.Clear();
      this.error = false;
    }

    this.first_val = parseFloat(this.mainText);
    this.un_operator = 'sqrt';
    this.subText = '√(' + this.mainText + ')';
    this.displayService.setExpression(this.subText);

    this.mainText = this.Request(0).toString();
    this.displayService.setValue(this.mainText);
  }

  Percentage(){
    if (this.error) {
      this.Clear();
      this.error = false;
    }

    this.first_val = parseFloat(this.mainText);
    this.un_operator = 'perc';
    this.subText = this.mainText + '%';
    this.displayService.setExpression(this.subText);

    this.mainText = this.Request(0).toString();
    this.displayService.setValue(this.mainText);
  }

  Reciprocal(){
    if (this.error) {
      this.Clear();
      this.error = false;
    }

    this.first_val = parseFloat(this.mainText);
    this.un_operator = 'reci';
    this.subText = '1/(' + this.mainText + ')';
    this.displayService.setExpression(this.subText);

    this.mainText = this.Request(0).toString();
    this.displayService.setValue(this.mainText);
  }
}