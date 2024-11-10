import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { DroneService } from '../drone.service';
import { IDrone } from '../idrone';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-drone-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drone-home.component.html',
  styleUrl: './drone-home.component.css'
})
export class DroneHomeComponent {
  
  droneList : IDrone[] = [];
  query : string = '';

  constructor(private droneService : DroneService ) {
  }

  async ngOnInit() {
    this.droneList = await this.droneService.getAllDroneData();
  }

  OnSubmitQuery() {
    console.log('ButtonClicked!!!')
    console.log(this.query);
    this.droneService.getUserQuery(this.query);
    
  }

}
