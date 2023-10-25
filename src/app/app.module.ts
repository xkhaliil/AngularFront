import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { AddGameComponent } from './add-game/add-game.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';
import { UpdateGameComponent } from './update-game/update-game.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RechercheParCategorieComponent } from './recherche-par-categorie/recherche-par-categorie.component';
import { NomrechercherComponent } from './nomrechercher/nomrechercher.component';
import { ListeGenreComponent } from './liste-genre/liste-genre.component';
import { UpdateGenreComponent } from './update-genre/update-genre.component';
import { HttpClientModule } from '@angular/common/http';
import { ListeOfusersComponent } from './liste-ofusers/liste-ofusers.component';
import { AddRoleForUserComponent } from './add-role-for-user/add-role-for-user.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    AddGameComponent,
    UpdateProduitComponent,
    UpdateGameComponent,
    LoginComponent,
    ForbiddenComponent,
    RechercheParCategorieComponent,
    NomrechercherComponent,
    ListeGenreComponent,
    UpdateGenreComponent,
    ListeOfusersComponent,
    AddRoleForUserComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
