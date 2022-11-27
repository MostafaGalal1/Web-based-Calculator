import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransmitService {
  private url:string = "http://localhost:8080/workout/";

  constructor() { }

  uniaryRequest(first_val:number, un_operator:string){
    var un_url: string = this.url + "un_operator";
    var un_data: any;
    un_data = {
        "operand": String(first_val),
        "operator": String(un_operator)
    };

    un_url =  un_url + '?' + Object.keys(un_data).map(function (key) { return [key, un_data[key]].map(encodeURIComponent).join("="); }).join("&");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", un_url, false);
    xhr.send();

    return xhr.responseText;
  }

  binaryRequest(first_val:number, second_val:number, bi_operator:string){
    var bi_url:string = this.url + "bi_operator";
    var bi_data :any;
    bi_data = {
        "first_operand": String(first_val),
        "operator": String(bi_operator),
        "second_operand": String(second_val)
    };

    bi_url =  bi_url + '?' + Object.keys(bi_data).map(function (key) { return [key, bi_data[key]].map(encodeURIComponent).join("="); }).join("&");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", bi_url, false);
    xhr.send();

    return xhr.responseText;
  }
}
