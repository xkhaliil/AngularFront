import { Genre } from "./genre.model";
export class GenreWrapper{
_embedded!: { Genre: Genre[]};
}