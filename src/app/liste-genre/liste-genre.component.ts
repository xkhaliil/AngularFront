import { AuthService } from './../services/auth.service';
import { GameService } from './../services/game.service';
import { Genre } from './../model/genre.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-genre',
  templateUrl: './liste-genre.component.html',
  styles: [
  ]
})
export class ListeGenreComponent implements OnInit {
  ajout:boolean=true;
  Genre=new Genre();

  genre!:Genre[];
  updatedgenre:Genre = {"idLeg":0,"nomGenre":""};


  constructor(private gameservices:GameService,
    public AuthService : AuthService) { }
   

  ngOnInit(): void {
    this.gameservices.ListeGenre().subscribe(genre => {
      this.genre = genre;
      console.log(genre)
    }
    );
    
  }
  genreupdated(genre:Genre){
   // this.updatedgenre=genre;
   this.gameservices.ajoutergenre(genre);
   
   console.log("updated genre",genre);
  }
  updateleg(l : Genre){
    this.updatedgenre=l;
   
    this.ajout=false;
  }
  laegueUpdated(cat:Genre){
    console.log("Cat updated event",cat);
    this.gameservices.ajouterGenre(cat).subscribe( ()=> this.chargerGenre());
     
    }
    chargerGenre(){
      this.gameservices.listeGenre().subscribe(cats => {this.genre =cats;
      
      });
      }
      AjouterGenre(){
        console.log(this.Genre)
          
        this.gameservices.ajouterGenre(this.Genre).subscribe(prod => {
          console.log(prod);
          window.location.reload();
      }
        

        );
        this.Genre=new Genre();
        this.chargerGenre();
        }
      }


    
 

