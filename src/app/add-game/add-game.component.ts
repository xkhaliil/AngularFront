import { Genre } from './../model/genre.model';

import { Component, OnInit } from '@angular/core';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';


@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  newGame = new Game();
  uploadedImage!: File;
imagePath: any;

  genre!: Genre[] 
  newid!:number;
  newgenre!:Genre;
  constructor(private gameservices: GameService,
    private router :Router) { }
  ngOnInit(): void {
    this.gameservices.ListeGenre().
    subscribe(cats => {this.genre = cats;
    console.log("aaaa"+cats);
    console.log(this.genre);
    });
    }
    onImageUpload(event: any) {
      this.uploadedImage = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = (_event) => { this.imagePath = reader.result; }
      }
 
  addGame(){
    this.gameservices.uploadImage(this.uploadedImage, this.uploadedImage.name).subscribe((img:Image) => {
this.newGame.image=img;
    this.newGame.genre = this.genre.find(cat => cat.idLeg == this.newid)!;
    console.log(this.newGame)
    this.gameservices.ajouterGame(this.newGame)
    .subscribe(prod => {
    console.log(prod);
    this.router.navigate(['game']).then(()=>{window.location.reload();});
    });
    }
    );
  }
    
      
    
  
  

    
    

}
