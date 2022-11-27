import { Expression } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  expressionB: BehaviorSubject<string> = new BehaviorSubject('');
  valueB: BehaviorSubject<string> = new BehaviorSubject('0');
  expressionO = this.expressionB.asObservable();
  valueO = this.valueB.asObservable();
  
  constructor() { }

  getValue() {
    return this.valueO;
  }

  setValue(value : string) {
    this.valueB.next(value);
  }

  getExpression() {
    return this.expressionO;
  }

  setExpression(expression : string) {
    this.expressionB.next(expression);
  }
}
