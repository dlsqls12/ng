import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { MenuComponent } from './main/menu/menu.component';
import { ContentComponent } from './main/container/content/content.component';
import { InfoComponent } from './main/container/info/info.component';
import { PopupRegisterComponent } from './main/container/popup-register/popup-register.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    InfoComponent,
    PopupRegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
