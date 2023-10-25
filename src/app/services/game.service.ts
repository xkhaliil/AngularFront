import { AuthService } from './auth.service';

import { Injectable } from '@angular/core';
import { Game } from '../model/game.model';
import { Genre } from '../model/genre.model';
import { Image } from '../model/image.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
providedIn: 'root'
})
export class GameService {
  apiURL: string = ' http://localhost:8090/games/api';
  apiURLCat: string = 'http://localhost:8090/games/api/leg';
game!: Game[]; //un tableau de game
genres!: Genre[] ;

gameRecherche!: Game[];
gameRecherche2!: Game[];
constructor(private http: HttpClient,private authService:AuthService) { }
  /*this.genres=[{id:1,legue:"ligue1"},{id:2,legue:"Bundesliga"},{id:3,legue:"Premier Genre"},{id:4,legue:"Serie A"}];
this.game = [
  { id : 1, nom: "juvents", classement:1, datematch
: new Date("01/14/2011"),genre:this.genres[3]},
{ id : 2, nom: "paris saint german", classement:6, datematch
: new Date("01/14/2011"),genre:this.genres[0]},
{ id: 3, nom: "bayern munich", classement: 2, datematch
 : new Date("12/17/2010"),genre:this.genres[1]},
{ id: 4, nom:"Manchester-city", classement: 3, datematch
 : new Date("02/20/2020"),genre:this.genres[2]},
 { id : 5, nom: "Milan", classement:7, datematch
: new Date("01/14/2011"),genre:this.genres[3]},
{ id : 5, nom: "Monaco", classement:5, datematch
: new Date("01/14/2011"),genre:this.genres[0]},

  
];
}*/
listeGamee():Game[] {
  return this.game;
}
ajoutergame( e: Game){
  this.game.push(e);
  }
  supprimergame( prod: Game){
    //supprimer le produit prod du tableau game
    const index = this.game.indexOf(prod, 0);
    if (index > -1) {
    this.game.splice(index, 1);
    }
    //ou Bien
    /* this.game.forEach((cur, index) => {
    if(prod.idProduit === cur.idProduit) {
    this.game.splice(index, 1);
    }
    }); */
    }
    gamee!:Game;
    

updateGamee(p:Game)
{

this.supprimergame(p);
this.ajoutergame(p);
}
listerGenre():Genre[]{
  return this.genres;


}



 ajoutergenre(l:Genre){
  this.genres.push(l);
 }
 // api
 
  ajouterGamee( game: Game):Observable<Game>{
    return this.http.post<Game>(this.apiURL, game, httpOptions);
    }
    supprimerGamee(id : number) {
      const url = `${this.apiURL}/${id}`;
      return this.http.delete(url, httpOptions);
      }
      consulterGamee(id : number): Observable<Game>{
        const url = `${this.apiURL}/${id}`;
        return this.http.get<Game>(url);
      }
      updateGameee(game :Game) : Observable<Game>
{
return this.http.put<Game>(this.apiURL, game, httpOptions);
}

listeGenre():Observable<Genre[]>{
  return this.http.get<Genre[]>(this.apiURL+"/genres");
  }
  
      consulterGenree(id : number): Observable<Genre>{
        const url = `${this.apiURL}/${id}`;
        return this.http.get<Genre>(url);
      }
      rechercherParGenree(id: number):Observable< Game[]> {
        const url = `${this.apiURL}/prodscat/${id}`;
        return this.http.get<Game[]>(url);
        }
        rechercherParNome(nom: string):Observable< Game[]> {
          const url = `${this.apiURL}/gameByName/${nom}`;
          return this.http.get<Game[]>(url);
          }
          ajouterGenree( genre: Genre):Observable<Genre>{
            return this.http.post<Genre>(this.apiURL+"/genres", genre, httpOptions);
           }
          
           listeGame(): Observable<Game[]>{
            let jwt=this.authService.getToken();
            jwt="Bearer "+jwt;
            let headers: HttpHeaders = new HttpHeaders({"Authorization": jwt});
            
            return this.http.get<Game[]>(this.apiURL+"/all", {headers: headers});

          }
          ListeGenre(): Observable<Genre[]>{
            let jwt=this.authService.getToken();
            jwt="Bearer "+jwt;
            let headers: HttpHeaders = new HttpHeaders({"Authorization": jwt});
            return this.http.get<Genre[]>(this.apiURLCat, {headers: headers});
            }

          ajouterGame( e: Game):Observable<Game>{
            let jwt = this.authService.getToken();
            jwt = "Bearer "+jwt;
            let httpHeaders = new HttpHeaders({"Authorization":jwt})
            return this.http.post<Game>(this.apiURL+"/addgame", e, {headers:httpHeaders});
            
           
            
        }
        supprimerGame(id : number) {
          const url = `${this.apiURL}/deletegame/${id}`;
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return this.http.delete(url, {headers:httpHeaders});
          }
          consulterGame(id: number): Observable<Game> {
            const url = `${this.apiURL}/getbyid/${id}`;
            let jwt = this.authService.getToken();
            jwt = "Bearer "+jwt;
            let httpHeaders = new HttpHeaders({"Authorization":jwt})
            return this.http.get<Game>(url,{headers:httpHeaders});
            }
            updateGame(e :Game) : Observable<Game> {
              let jwt = this.authService.getToken();
              jwt = "Bearer "+jwt;
              let httpHeaders = new HttpHeaders({"Authorization":jwt})
              return this.http.put<Game>(this.apiURL+"/updategame", e, {headers:httpHeaders});
              }
              ajouterGenre( e: Genre):Observable<Genre>{
                let jwt = this.authService.getToken();
                jwt = "Bearer "+jwt;
                let httpHeaders = new HttpHeaders({"Authorization":jwt})
                return this.http.post<Genre>(this.apiURL+"/addleg", e, {headers:httpHeaders});
                
                }
                rechercherParGenre(idCat: number): Observable<Game[]> {
                  let jwt = this.authService.getToken();
                  jwt = "Bearer "+jwt;
                  let httpHeaders = new HttpHeaders({"Authorization":jwt})
                  return this.http.get<Game[]>(this.apiURL+"/eqlg/"+idCat, {headers:httpHeaders});
                  
                  } 
                  rechercherParNom(nom: string): Observable<Game[]> {
                    let jwt = this.authService.getToken();
                    jwt = "Bearer "+jwt;
                    let httpHeaders = new HttpHeaders({"Authorization":jwt})
                    return this.http.get<Game[]>(this.apiURL+"/game/"+nom, {headers:httpHeaders});
                  }
                  uploadImage(file: File, filename: string): Observable<Image>{
                    let jwt = this.authService.getToken();
                    jwt = "Bearer "+jwt;
                    let httpHeaders = new HttpHeaders({"Authorization":jwt})
                    const imageFormData = new FormData();
                    imageFormData.append('image', file, filename);
                    const url = `${this.apiURL + '/image/upload'}`;
                    return this.http.post<Image>(url, imageFormData,{headers:httpHeaders});
                    }
                    loadImage(id: number): Observable<Image> {
                      let jwt = this.authService.getToken();
                    jwt = "Bearer "+jwt;
                    let httpHeaders = new HttpHeaders({"Authorization":jwt})

                    const url = `${this.apiURL + '/image/get/info'}/${id}`;
                    return this.http.get<Image>(url,{headers:httpHeaders});
                    }
                    
                    
          
      }
          //with jwt
         
 





  
  
