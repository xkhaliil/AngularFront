import { AuthService } from './../services/auth.service';
import { User } from './../model/User.model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth:AuthService) { }

  
  User=new User();
  passConf!:string;


  ngOnInit(): void {
  }

  register(){
    if(this.User.password!=this.passConf){
      Swal.fire({
        icon: 'error',
        title: 'Password not match',
      });
      return;
    }
    console.log(this.User)
    
    
    this.auth.Register(this.User).subscribe(
      data=>{
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'User added successfully you must confirme your email',
          timer: 5000
        });
        
        
       
      },
      err=>{
        console.log(err);
      }
    )
    
  }

}
