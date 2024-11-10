import { Injectable } from '@angular/core';
import { IDrone } from './idrone';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DroneService {

  constructor(private httpclient:HttpClient) { }

  async getAllDroneData() : Promise<IDrone[]>  {
    try{
      const data = await firstValueFrom(
        this.httpclient.get<{default : IDrone[]}>(`http://localhost:3100/api`));
        console.log(data);
      return data.default || [];
    } catch (error) {
      console.error('Error fetching drone data');
      return[];
    }
   
  }


}
