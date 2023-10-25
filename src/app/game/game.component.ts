import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {Game} from '../model/game.model'

import { GameService } from '../services/game.service';
import { Genre } from '../model/genre.model';
import { Image } from '../model/image.model';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  game?:Game[];
  genre!:Genre[];
  constructor(private gameservices: GameService,
    public authService:AuthService) {

    //this.game = gameservices.listeGame();
   }

   ngOnInit(): void {
    console.log(this.authService.decodeJWT());
    
    this.gameservices.listeGame().subscribe(game => {
    console.log(game);
     this.game = game;
    // this.gameservices
    //   .loadImage(game[5].image.idImage)
    //   .subscribe((img: Image) => {
    //   game[5].imageStr = 'data:' + img.type + ';base64,' + img.image;
    //   console.log(game[5].imageStr);
    //   });
      
    this.game.forEach((prod) => {
        console.log(prod.image)
      this.gameservices
      .loadImage(prod.image.idImage)
      .subscribe((img: Image) => {
      prod.imageStr = 'data:' + img.type + ';base64,' + img.image;
      console.log(prod.imageStr);
      });
      });
      });
      console.log(this.game);
    
      
    }
  supprimergame(p: Game)
{
  let conf=confirm("etes vous sur");
  if(conf)
this.gameservices.supprimerGame(p.idGame!).subscribe(() => {});
//this.router.navigate(['game']).then(() => {
  window.location.reload();
}

}
