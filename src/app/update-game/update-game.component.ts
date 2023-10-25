import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { Game} from '../model/game.model';
import { Genre } from '../model/genre.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
  styles: [
  ]
})
export class UpdateGameComponent implements OnInit {
  currentGame = new Game();
  genre!:Genre[];
  updatedid!:number;
  myImage! : string;
  uploadedImage!: File;
isImageUpdated: Boolean=false;

 
  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
    private gameService: GameService) { }

  ngOnInit(): void {
    //this.genre=this.gameService.listerGenre();
    this.gameService.ListeGenre().subscribe(genres => {
      this.genre = genres;
    });
    this.gameService.consulterGame(this.activatedRoute.snapshot.params['id']).subscribe((game) => {
      console.log(game);
      this.currentGame = game;
      this.updatedid=this.currentGame.genre.idLeg;
    
    this.gameService.loadImage(this.currentGame.image.idImage).subscribe((img:Image) => {
this.myImage = 'data:' + img.type + ';base64,' + img.image;
console.log("aaaa"+this.myImage);
}); 
    });
    
  
  
  }
  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
    this.uploadedImage = event.target.files[0];
    this.isImageUpdated =true;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.myImage = reader.result as string; };
    }
    }
  updateGame() {
    this.currentGame.genre = this.genre.
    find(cat => cat.idLeg == this.updatedid)!;
    if (this.isImageUpdated)
{
this.gameService
.uploadImage(this.uploadedImage, this.uploadedImage.name)
.subscribe((img: Image) => {
this.currentGame.image = img;
this.gameService
.updateGame(this.currentGame)
.subscribe((prod) => {
this.router.navigate(['game']);
});
});
}
else{
   this.gameService.updateGame(this.currentGame).subscribe(prod => {
   this.router.navigate(['game']); }
   );
   

}
}
}

