import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ConnectionService } from '../utils/connection.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-ware',
  templateUrl: './ware.component.html',
  styleUrls: ['./ware.component.css']
})
export class WareComponent implements OnInit {

  galleryForm: FormGroup;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  result = '';

  constructor(
    private api: ConnectionService,
    private formBuilder: FormBuilder,
    private router: Router) { 
      this.galleryForm = this.formBuilder.group({
        name : ['', Validators.required],
        price : ['', Validators.required],
        description : ['', Validators.required],
        diameter : ['', Validators.required],
        imageFile : [null, Validators.required]
      });
    }

  ngOnInit(): void {
    
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    console.log('file', this.galleryForm.get('imageFile')?.value._files[0]);
    
    this.api.addGallery(this.galleryForm.value, this.galleryForm.get('imageFile')?.value._files[0])
      .subscribe((res: any) => {
        this.isLoadingResults = false;
        //if (res.body) {
        //  this.router.navigate(['/gallery-details', res.body._id]);
        //}
        this.result = 'Sikeres árufelvétel';
        console.log(res);
      }, (err: any) => {
        console.log(err);
        this.result = 'Sikertelen árufelvétel: \n' + err.error;
        this.result = this.result.replace("\n", "<br>");
        this.isLoadingResults = false;
      });
  }

  getWares(): void {
    this.api.getWares().subscribe(data => {
      console.log('this came from the server: ', data);  
    }, error => {
      console.log('Sorry, we encountered an error: ', error.error);
    });
  }

}