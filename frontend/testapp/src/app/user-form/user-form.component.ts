import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionService } from '../utils/connection.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  result: string = '';

  constructor(private conenctionService: ConnectionService, private formBuilder: FormBuilder) { 
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.userForm.value);
    
    this.conenctionService.addUser(this.userForm.value).subscribe(data => {
      this.result = 'Sikeres regisztráció';
      console.log('this came from the server: ', data);  
    }, error => {
      this.result = 'Sikertelen regisztráció: \n' + error.error;
      this.result = this.result.replace("\n", "<br>");
      console.log('Sorry, we encountered an error: ', error.error);
    });
  }

}
