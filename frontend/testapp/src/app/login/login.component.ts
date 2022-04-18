import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user-form/User';
import { UserService } from '../user.service';
import { ConnectionService } from '../utils/connection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  result: string = '';

  constructor(private conenctionService: ConnectionService, private formBuilder: FormBuilder, private router: Router, private userService: UserService) { 

    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.userForm.value);
    
    this.conenctionService.loginUser(this.userForm.value).subscribe(data => {
      this.result = 'Sikeres bejelentkezés';
      const user: User = {
        username: (data as any).username,
        password: (data as any).password,
        email: (data as any).email,
        accessLevel: (data as any).accessLevel
      };
      this.userService.loginUser(user);
      console.log('user:', data);
      console.log('login getuser', this.userService.getUser());
      setTimeout(this.navigate.bind(this), 2000);
      console.log('this came from the server: ', data);  
    }, error => {
      this.result = 'Sikertelen bejelentkezés: \n' + error.error;
      this.result = this.result.replace("\n", "<br>");
      console.log('Sorry, we encountered an error: ', error.error);
    });

  }

  navigate() {
    console.log('login getuser', this.userService.getUser());
    this.router.navigate(['/list-wares']);
  }


}
