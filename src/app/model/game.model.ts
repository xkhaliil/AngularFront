import { Genre } from "./genre.model";
import { Image } from "./image.model";

export class Game {
    idGame? : number;
    nomGame? : string;
    paysGame?: string;
    
    dateFound? : Date ;
    genre!: Genre;
    image! : Image
    imageStr!:string;
    }