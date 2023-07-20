
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
//import { environment } from '../../environments/environment';
import {UserModel,UserRegistrer,ImageModel} from 'src/app/core/models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private  url = "https://picssearch.azurewebsites.net";
  isloggedIn = false;

  // store the URL so we can redirect after
  redirectUrl: string;  constructor(private myRoute: Router , private http: HttpClient, public router: Router) { }

  //authenticate(username, password)
  // login(value: UserModel) {
  //   //mode: no-cors
  //   return this.http.post(
  //     this.url + '/api/login?username='+value.email+'&password='+value.password,
  //     { observe : 'response'},
  //     { headers: {
  //        'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  //         "Accept": "application/json"
  //       }}
  //     );
  //   }

  login(value: UserModel) {
    let rawdata = {
      email: value.email,
      password: value.password
    };

    return this.http.post(
      this.url + '/api/login',
      rawdata,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Accept': 'application/json'
        },
        observe: 'response'
      }
    );
  }
  //createUser(value: UserModel)
  register(value: UserRegistrer) {
    let rawdata = {
      email: value.email,
      password: value.password,
      username: value.username
    };

    return this.http.post(
      this.url + '/api/register',
      rawdata,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Accept': 'application/json'
        },
        observe: 'response'
      }
    );
  }

  // register(value: UserRegistrer) {
  //   let rawdata ={
  //     email: value.email,
  //       password: value.password,
  //       name: value.username
  //     }

  //   return this.http.post(
  //     this.url + '/api/register'+rawdata,
  //        rawdata,
  //        {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Access-Control-Allow-Origin': '*',
  //           'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  //           'Accept': 'application/json'
  //       },
  //       observe : 'response',
  //     }

  //   );
  // }

  //apiget all images
  getImages() {
    return this.http.get(this.url + '/api/images',{ observe : 'response'});
  }

  //api add image
  addImage(value: ImageModel) {
    return this.http.post(this.url + '/api/image?image='+value.image+'&name='+value.name+'&description='+value.description+'&tags='+value.tags,{ observe : 'response'});
  }

  //search by tag
  getImagesByTag(tag: string) {
    return this.http.get(this.url + '/api/getImagesByTag?tag='+tag,{ observe : 'response'});
  }

  //search by name
  getImagesByName(name: string) {
    return this.http.get(this.url + '/api/getImagesByName?name='+name,{ observe : 'response'});
  }
  loggout() {
    localStorage.removeItem("token");
    location.reload();
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

}


