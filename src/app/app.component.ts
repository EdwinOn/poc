import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { first } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private http: HttpClient) {}
  title = "CodeSandbox";
  withComments = false;
  withAttachments = false;
  scheme: any;
  log(data) {
    console.log(data);
  }
  ngOnInit() {
    this.http
      .get(" https://jlhoihrgfvgavqi.form.io/kontrolaformalnorachunkowa")
      .pipe(first())
      .subscribe((data) => {
        this.scheme = data as any;
        let extraFieldsComponent = data.components[data.components.length - 1];
        if (extraFieldsComponent.label === "Extra fields") {
          if (extraFieldsComponent.defaultValue.indexOf("comments") !== -1) {
            this.withComments = true;
          }
          if (extraFieldsComponent.defaultValue.indexOf("attachments") !== -1) {
            this.withAttachments = true;
          }
        }
        this.log(data);
      });
  }
}
