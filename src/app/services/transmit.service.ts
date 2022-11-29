import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransmitService {
  private url:string = "https://web-based-calculator.herokuapp.com/workout/";
  private local_url:string = "http://localhost:8080/workout/";
  private global:boolean = false;

  constructor() { }

  uniaryRequest(first_val:number, un_operator:string){
    var un_url: string = this.url + "un_operator";
    var un_local_url: string = this.local_url + "un_operator";
    var pack: string;

    var un_data: any;
    un_data = {
        "operand": String(first_val),
        "operator": String(un_operator)
    };

    pack =  Object.keys(un_data).map(function (key) { return [key, un_data[key]].map(encodeURIComponent).join("="); }).join("&");

    un_url = un_url + '?' + pack;
    un_local_url = un_local_url + '?' + pack;
    var xhr = new XMLHttpRequest();

    if (this.global){
      xhr.open("GET", un_url, false);
      xhr.send();
    } else {
      try {
        xhr.open("GET", un_local_url, false);
        if (xhr.send() == undefined)
          this.global = true;
      } catch(e:unknown){
        this.global = true;
        xhr.open("GET", un_url, false);
        xhr.send();
      }
    }

    return xhr.responseText;
  }

  binaryRequest(first_val:number, second_val:number, bi_operator:string){
    var bi_url: string = this.url + "bi_operator";
    var bi_local_url: string = this.local_url + "bi_operator";
    var pack: string;

    var bi_data :any;
    bi_data = {
        "first_operand": String(first_val),
        "operator": String(bi_operator),
        "second_operand": String(second_val)
    };

    pack = Object.keys(bi_data).map(function (key) { return [key, bi_data[key]].map(encodeURIComponent).join("="); }).join("&");
    
    bi_url = bi_url + '?' + pack;
    bi_local_url = bi_local_url+ '?' + pack;
    var xhr = new XMLHttpRequest();

    if (this.global){
      xhr.open("GET", bi_url, false);
      xhr.send();
    } else {
      try {
        xhr.open("GET", bi_local_url, false);
        if (xhr.send() == undefined)
          this.global = true;
      } catch(e:unknown) {
        this.global = true;
        xhr.open("GET", bi_url, false);
        xhr.send();
      }
    }

    return xhr.responseText;
  }
}
