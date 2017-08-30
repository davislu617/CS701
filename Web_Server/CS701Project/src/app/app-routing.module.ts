import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }     from './app.component';
import { LoginComponent }   from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent }    from './edit/edit.component';
//import { AddressBookComponent } from 
		//'./part2/components/address-book/address-book.component';
//import { AddressBookEntryComponent } from 
		//'./part2/components/address-book-entry/address-book-entry.component';
//import { AddressBookAddEditComponent } from 
		//'./part2/components/address-book-add-edit/address-book-add-edit.component';

const routes: Routes = [
  { path: '', 				    component: AppComponent },
  { path: 'login', 				component: LoginComponent},
  { path: 'profile', 			component: ProfileComponent},
  { path: 'edit/:planID', 		component: EditComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
