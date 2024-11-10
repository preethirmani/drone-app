import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { DroneService } from '../drone.service';
import { IDrone } from '../idrone';
import { CommonModule } from '@angular/common';
import { IQueryResponse } from '../iquery-response';
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
  response : '' = ;

  constructor(private droneService : DroneService ) {
  }

  async ngOnInit() {
    this.droneList = await this.droneService.getAllDroneData();
  }

  async OnSubmitQuery() {
    console.log('ButtonClicked!!!')
    console.log(this.query);
    const result = await this.droneService.getUserQuery(this.query);
    console.log('Result in component',result);
    this.response = result.data || 'Drone Data not available';
    console.log(this.response);
  }

}
