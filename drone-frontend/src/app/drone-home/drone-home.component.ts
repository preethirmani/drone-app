import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { DroneService } from '../drone.service';
import { IDrone } from '../idrone';
import { CommonModule } from '@angular/common';
import { IQueryResponse } from '../iquery-response';
@Component({
  selector: 'app-drone-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './drone-home.component.html',
  styleUrl: './drone-home.component.css'
})
export class DroneHomeComponent {
  
  droneList : IDrone[] = [];
  query = new FormControl('');
  response : string = '';
  isLoading : boolean = false;

  constructor(private droneService : DroneService ) {
  }

  async ngOnInit() {
    this.droneList = await this.droneService.getAllDroneData();
  }

  async OnSubmitQuery() {

    if(!this.query.value) return;
    this.isLoading = true;
      console.log(this.query); 
      try{
        const result = await this.droneService.getUserQuery(this.query.value);
        if(result) {
          this.response = result.data;
          console.log('Result in component',result);
        }
        this.query.reset();
      } catch(error) {
        console.log('Error handling the query', error);
        this.response = 'Drone Data not available';
      }finally{
        this.isLoading = false;
      }
      
  }

}
