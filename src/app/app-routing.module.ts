import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MessagehubComponent } from './messagehub/messagehub.component';


const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"messagehub",component:MessagehubComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
