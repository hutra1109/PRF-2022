import { Component } from '@angular/core';
import { UserService } from './user.service';
import { ConnectionService } from './utils/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private connectionService: ConnectionService, public userService: UserService) {

  }

  hello(): void {
    console.log('appComponent Hello Wrold');
    this.connectionService.getUsers().subscribe(data => {
      console.log('this came from the server: ', data);  
    }, error => {
      console.log('Sorry, we encountered an error: ', error);
    });
  }

  title = 'testapp';

  logout() {
    this.connectionService.logoutUser().subscribe(data => {
      console.log('this came from the server: ', data);  
    }, error => {
      console.log('Sorry, we encountered an error: ', error.error);
    });
    this.userService.logoutUser();
  }

  isAdmin() {
    return this.userService.getUser()?.accessLevel == 'admin';
  }

}
