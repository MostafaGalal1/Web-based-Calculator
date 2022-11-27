import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DisplayService } from 'src/app/services/display.service';

@Component({
  selector: 'app-sub-display',
  templateUrl: './sub-display.component.html',
  styleUrls: ['./sub-display.component.css']
})
export class SubDisplayComponent implements OnInit {
  @Input() subText: string = '';
  private subscription: Subscription = new Subscription;

  constructor(private displayService : DisplayService) { }

  ngOnInit(): void { 
    this.subscription = this.displayService.expressionO.subscribe(message => this.subText = message)
  }
}
