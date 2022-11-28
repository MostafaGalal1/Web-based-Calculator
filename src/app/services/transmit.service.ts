import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransmitService {

  constructor() { }

  uniaryRequest(first_val:number, un_operator:string){
    
    return '0';
  }

  binaryRequest(first_val:number, second_val:number, bi_operator:string){
    
    return '0';
  }
}
