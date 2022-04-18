import { Injectable } from '@angular/core';
import { User } from './user-form/User';
import { ConnectionService } from './utils/connection.service';
import { Ware } from './ware/Ware';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // mivel a service Singleton, ezért alkalmas különböző értékek, adatok megosztására is
  private user: User | null = null;
  private userWares: Map<string, number>;
  constructor(private api: ConnectionService) {
    this.userWares = new Map<string, number>();
  }

  loginUser(user: User) {
    //this.api.getStatus().subscribe(data => {
    //  console.log('statud data', data); 
    //});
    this.user = user;
  }

  logoutUser() {
    this.user = null;
  }

  getUser() {
    return this.user;
  }

  getUserWares() {
    return this.userWares;
  }

  setUserWares(id:string) {
    if(this.userWares.get(id)) {
      console.log('már van ilyen');
      const amount: number = (<number>this.userWares.get(id)) + 1;
      this.userWares.set(id, amount);
    }else {
      this.userWares.set(id, 1);
    }
  }

}
