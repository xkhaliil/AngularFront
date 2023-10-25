import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-genre',
  templateUrl: './update-genre.component.html',
  styles: [
  ]
})
export class UpdateGenreComponent implements OnInit {
  @Input()
ajout!:boolean;

  @Input()
  genre!:Genre;


  @Output()
  genreupdated=new EventEmitter<Genre>();
 



  constructor() { }

  ngOnInit(): void {
    console.log(this.genre);
  }
  saveCategorie(){
    this.genreupdated.emit(this.genre);
    
    
    }
    

}
