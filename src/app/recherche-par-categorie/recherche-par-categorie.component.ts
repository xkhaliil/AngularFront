import { GameService } from './../services/game.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Game } from '../model/game.model';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-recherche-par-categorie',
  templateUrl: './recherche-par-categorie.component.html',
  styles: [
  ]
})
export class RechercheParCategorieComponent implements OnInit {
  game!:Game[];
  id! : number;
genres! : Genre[];

  constructor(public  authService:AuthService,
   private gameService:GameService) { }

  ngOnInit(): void {
    //this.genres=this.gameService.listerGenre();
    //this.game=this.gameService.listeGame();
    this.gameService.listeGame().subscribe(game => {
      this.game = game;

    }
    );
    this.gameService.ListeGenre().subscribe(genres => {
      this.genres = genres;
      console.log(genres)

    }
    );
  }
  onChange()
  {
    this.gameService.rechercherParGenre(this.id).subscribe(game => {
      this.game = game;

    }
    )

  }
 
  

}
