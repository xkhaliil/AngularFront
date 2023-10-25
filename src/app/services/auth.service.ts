import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../model/User.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from '../model/role.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
 /* users: User[] = [{"username":"admin","password":"123","roles":['ADMIN']},
{"username":"nadhem","password":"123","roles":['USER']} ];*/
public loggedUser?:string;
public isloggedIn: Boolean = false;
public roles?:string[];
private helper = new JwtHelperService();
public ability!: Boolean ;
users: User[] = [];

  

  apiURL: string = 'http://localhost:8081/users';
  token!:string;
  constructor(private router: Router, private http : HttpClient) { }
login(user : User)
{
  return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
}
isLoggedInn():Boolean{
  return localStorage.getItem('jwt') != null;
  }

saveToken(jwt:string){
  localStorage.setItem('jwt',jwt);
  this.token = jwt;
  this.isloggedIn = true;
  this.decodeJWT();
  }
  decodeJWT()
  { if (this.token == undefined)
   return;
  const decodedToken = this.helper.decodeToken(this.token);
  this.roles = decodedToken.roles;
   this.loggedUser = decodedToken.sub;
   this.ability = decodedToken.enabled;
  
  }
  loadToken() {
  this.token = localStorage.getItem('jwt')!;
  this.decodeJWT();
  }
  getToken():string {
    return this.token;
    }
  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token= undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
    }
 
    isAdmin():Boolean{
      if (!this.roles)
      return false;
     return this.roles.indexOf('ADMIN') >=0;
     }
     isTokenExpired(): Boolean
{
return this.helper.isTokenExpired(this.token); }
     


  ListOfusers():Observable<User[]>
  {
    
    return this.http.get<User[]>(this.apiURL+"/all",);
    
    
  }
  consulterUser(id: number): Observable<User> {
    let jwt = this.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.apiURL + '/findUserById'}/${id}`;
    return this.http.get<User>(url,{headers:httpHeaders});
    }

    ListOfRoles():Observable<Role[]>
  {
    let jwt = this.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Role[]>(this.apiURL+"/allRoles", {headers:httpHeaders});
    
    

  }
  

AddRoleForUser(id:number,r:Role):Observable<User>
{
  let jwt = this.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  const url=`${this.apiURL}/addRole/${id}`
  return this.http.post<User>(url,r, {headers:httpHeaders});
  
}

Register(u:User):Observable<User>{

  
  return this.http.post<User>(this.apiURL+'/add', u );

}

deleteUser(id: number) {
  let jwt=this.getToken();
  jwt="Bearer "+jwt;
  let httpHeaders=new HttpHeaders({"Authorization":jwt})
  const url=`${this.apiURL}/deleteUserById/${id}`
  return this.http.delete(url,{headers:httpHeaders});
  }

  removeRoleFromUser(id:number,r:Role):Observable<User>
  {
    let jwt = this.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url=`${this.apiURL}/removeRoleFromUer/${id}`
    return this.http.post<User>(url,r, {headers:httpHeaders});
    
  }
  GetRoleById(id:number):Observable<Role>
  {
    let jwt = this.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url=`${this.apiURL}/findRoleById/${id}`
    return this.http.get<Role>(url, {headers:httpHeaders});
    
  }
  activateUser(name:String ,code:String):Observable<User>
  {
    
    const url=`${this.apiURL}/activateUser/${name}/${code}`
    
    return this.http.get<User>(url);
    
  }
  

}

  
  
