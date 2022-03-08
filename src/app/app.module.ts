import { NgModule } from "@angular/core";
import { FormioAppConfig, FormioModule } from "angular-formio";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppConfig } from "../config";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [BrowserModule, FormioModule, HttpClientModule],
  declarations: [AppComponent],
  providers: [{ provide: FormioAppConfig, useValue: AppConfig }],
  bootstrap: [AppComponent]
})
export class AppModule {}
