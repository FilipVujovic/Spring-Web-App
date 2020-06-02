import { AuthorComponent } from './components/core/author/author.component';
import { AboutComponent } from './components/core/about/about.component';
import { HomeComponent } from './components/core/home/home.component';
import { LigaComponent } from './components/liga/liga.component';
import { IgracComponent } from './components/igrac/igrac.component';
import { TimComponent } from './components/tim/tim.component';
import { NacionalnostComponent } from './components/nacionalnost/nacionalnost.component';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';


const Routes = [
  { path: 'nacionalnost', component: NacionalnostComponent},
  { path: 'tim', component: TimComponent},
  { path: 'igrac', component: IgracComponent},
  { path: 'liga', component: LigaComponent},
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'author', component: AuthorComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'} //Prazna ruta sluzi u slucaju da neko promasi rutu, router ga redirektuje na home
];

@NgModule({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
