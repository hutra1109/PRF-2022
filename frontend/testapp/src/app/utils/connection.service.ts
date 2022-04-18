import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ware } from '../ware/Ware';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(environment.hostUrl + 'users');
  }

  addUser(body: any) {
    return this.http.post(environment.hostUrl + 'regist', body);
  }

  loginUser(body: any) {
    return this.http.post("http://localhost:3000/" + 'login', body, {withCredentials: true});//{withCredentials: true}
  }

  logoutUser() {
    return this.http.post("http://localhost:3000/"  + 'logout', {}, {withCredentials: true}); //{withCredentials: true}
  }

  getStatus() {
    return this.http.get("http://localhost:3000/"  + 'status');
  }

  putWare(body: any, file: File) {
    console.log('file', file);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', body.name);
    formData.append('price', body.price);
    formData.append('description', body.description);
    formData.append('diameter', body.diameter);
    console.log('formData', formData.get('file'));

    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    
    return this.http.post(environment.hostUrl + 'wares', formData, options);
  }

  addGallery(ware: Ware, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', ware.name);
    formData.append('price', ware.price);
    formData.append('description', ware.description);
    formData.append('diameter', ware.diameter);
    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    const req = new HttpRequest('POST', environment.hostUrl + 'wares', formData, options);
    return this.http.request(req);
  }

  getWares() {
    return this.http.get(environment.hostUrl + 'wares');
  }

  getWare(id:string) {
    return this.http.get(environment.hostUrl+ 'wares/' + id, {});
  }

  removeWare(id:string) {
    return this.http.delete("http://localhost:3000/" + 'wares/' + id, {});
  }

}
