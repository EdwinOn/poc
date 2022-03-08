import { NgModule } from "@angular/core";
import { FormioAppConfig, FormioModule } from "angular-formio";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppConfig } from "../config";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./home.component";
import { TestComponent } from "./test/test.component";
import { AppRoutingModule } from "./app.routing.module";

@NgModule({
  imports: [BrowserModule, FormioModule, HttpClientModule, AppRoutingModule],
  declarations: [AppComponent, HomeComponent, TestComponent],
  providers: [{ provide: FormioAppConfig, useValue: AppConfig }],
  bootstrap: [AppComponent]
})
export class AppModule {}
