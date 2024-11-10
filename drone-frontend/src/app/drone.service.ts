import { Injectable } from '@angular/core';
import { IDrone } from './idrone';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom,Observable } from 'rxjs';
import { IQueryResponse } from './iquery-response';


@Injectable({
  providedIn: 'root'
})
export class DroneService {

  constructor(private httpclient:HttpClient) { }

  async getAllDroneData() : Promise<IDrone[]>  {
    try{
        const data = await firstValueFrom(
        this.httpclient.get<{default : IDrone[]}>(`http://localhost:3100/api`));
       
      return data.default || [];
    } catch (error) {
      console.error('Error fetching drone data');
      return[];
    }
  }

  async getUserQuery(query : string) : Promise<any> {
    console.log('query::', query);
    try{
      const data = await firstValueFrom(
        this.httpclient.post<IQueryResponse>(
          `http://localhost:3100/api/drone/mockQuery/`,
          {query}
        )
      );
      console.log('data::',data);
      return data;

    }catch (error) {
      console.error('Error proceesing the query!')
    }
  }
  
}
