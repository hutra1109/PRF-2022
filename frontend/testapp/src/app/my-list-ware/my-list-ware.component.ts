import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ConnectionService } from '../utils/connection.service';
import { Ware } from '../ware/Ware';

@Component({
  selector: 'app-my-list-ware',
  templateUrl: './my-list-ware.component.html',
  styleUrls: ['./my-list-ware.component.css']
})
export class MyListWareComponent implements OnInit {

  wares: Map<Ware, number>;

  constructor(private api: ConnectionService, private userService: UserService) { 
    this.wares = new Map<Ware, number>();
  }

  ngOnInit(): void {
    for (let key of this.userService.getUserWares().keys()) {
      this.getWaresFromChart(key)
    }
  }

  removeFromChart(item:Ware) {
    /*this.api.removeWare(id).subscribe(data => {
      console.log('this came from the server: ', data);  
    }, error => {
      console.log('Sorry, we encountered an error: ', error.error);
    });*/
    const newAmount: number = (<number>this.wares.get(item)) - 1;
    if(newAmount == 0) {
      this.wares.delete(item);
    }else {
      this.wares.set(item,newAmount);
    }

  }

  getWaresFromChart(i:string) {
    this.api.getWare(i).subscribe(data => {
      const ware: Ware = {
        _id: i, 
        name: (data as any).name, 
        price: (data as any).price, 
        description: (data as any).description, 
        diameter: (data as any).diameter, 
        imgUrl: (data as any).imgUrl
      };
      this.wares.set(ware,<number>this.userService.getUserWares().get(i));
      console.log('this came from the server: ', data);  
    }, error => {
      console.log('Sorry, we encountered an error: ', error.error);
    });
  }

}
