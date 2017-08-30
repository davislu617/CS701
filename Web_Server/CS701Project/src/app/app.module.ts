import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule }     from './app-routing.module';

import { LoginService } from './services/login-service.service';
import { TravelPlanProvider } from './services/travel-plan-provider.service';
import { SearchByYelpService } from './services/search-by-yelp.service';
import { DraggableDirective } from './services/draggable.directive';
import { DropTargetDirective } from './services/drop-target.directive';
import { DragService } from './services/drag.service';

import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    EditComponent,
    DraggableDirective,
    DropTargetDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule
  ],
  providers: [LoginService,
              TravelPlanProvider,
              SearchByYelpService,
              DragService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
