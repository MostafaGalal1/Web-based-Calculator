import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DisplayService } from 'src/app/services/display.service';

@Component({
  selector: 'app-main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.css']
})
export class MainDisplayComponent implements OnInit {
  @Input() mainText: string = '0';
  private subscription: Subscription = new Subscription;

  constructor(private displayService: DisplayService) { }

  ngOnInit(): void {
    this.subscription = this.displayService.valueO.subscribe(message => this.mainText = message)
  }
}
