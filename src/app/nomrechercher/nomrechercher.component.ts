import { Genre } from './../model/genre.model';
import { Component, OnInit } from '@angular/core';
import { Game } from '../model/game.model';
import { AuthService } from '../services/auth.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-nomrechercher',
  templateUrl: './nomrechercher.component.html',
  styles: [
  ]
})
export class NomrechercherComponent implements OnInit {

  game!:Game[];
  id! : number;
  nomgame!:string;
  
  genres! : Genre[];
  allgame!:Game[];

  constructor(public  authService:AuthService,
   private gameService:GameService) { }

  ngOnInit(): void {
    
    this.gameService.listeGame().subscribe(game => {
      console.log(game);
      this.game = game;
      });

    
    //this.allgame=this.gameService.listeGame();
  }
  
 
  onkeyUpp(text:String)
  {
    console.log(text);
    this.game=this.allgame.filter(item=>item.nomGame?.toLowerCase().includes(text.toLowerCase()));

  }
  onKeyUp(text:string){
    this.gameService.rechercherParNom(this.nomgame).
    subscribe(game => {
    this.game = game;
    console.log(game)});
    }

}
