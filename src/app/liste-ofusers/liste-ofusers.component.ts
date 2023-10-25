
import { Component, OnInit } from '@angular/core';
import { User } from '../model/User.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-liste-ofusers',
  templateUrl: './liste-ofusers.component.html',
  styleUrls: ['./liste-ofusers.component.css']
})
export class ListeOfusersComponent implements OnInit {

  constructor(private authService:AuthService) { }
  users!:User[]
  role?:string;
  

  ngOnInit(): void {
    this.authService.ListOfusers().subscribe(
      data => {
        this.users = data;
        console.log(data);
  
        
      
        
      },
      err => {
        console.log(err);
      }
    );
  }
  deleteUser(id: number) {
    const confirmed = confirm("Are you sure you want to delete this user?");
  
    if (confirmed) {
      this.authService.deleteUser(id).subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  
  

}  
  
  
  
  
  
