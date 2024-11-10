import { Component } from '@angular/core';
import { DroneService } from '../drone.service';
import { IDrone } from '../idrone';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-drone-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drone-home.component.html',
  styleUrl: './drone-home.component.css'
})
export class DroneHomeComponent {
  
  droneList : IDrone[] = [];

  constructor(private droneService : DroneService ) {
  }

  async ngOnInit() {
    this.droneList = await this.droneService.getAllDroneData();
  }

}
