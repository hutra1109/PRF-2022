import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyListWareComponent } from '../my-list-ware/my-list-ware.component';
import { UserService } from '../user.service';
import { ConnectionService } from '../utils/connection.service';
import { Ware } from '../ware/Ware';

@Component({
  selector: 'app-list-wares',
  templateUrl: './list-wares.component.html',
  styleUrls: ['./list-wares.component.css']
})
export class ListWaresComponent implements OnInit {

  gallery: Array<Ware> = [{ _id: '', imgUrl: '', price: '', description: '', diameter: '', name: '' }];
  isLoadingResults = true;

  constructor(private api: ConnectionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.getGalleryDetails();
  }

  getGalleryDetails(): void {
    this.api.getWares()
      .subscribe((data: any) => {
        this.gallery = data;
        console.log(this.gallery);
        this.isLoadingResults = false;
      });
  }

  addToChart(i:string) {
    console.log('hozzáadtam', i);
    this.userService.setUserWares(i);
  }

  removeFromChart(i:string) {
    this.api.removeWare(i).subscribe(data => {
      console.log("sikeresen törölve");     
    }, error => {
      console.log('error', error);
      
    });
  }

  isAdmin() {
    return this.userService.getUser()?.accessLevel == 'admin';
  }

}
