import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { first } from "rxjs/operators";

@Component({
  selector: "app-test",
  template: `
    <div class="text-center">
      <h1 class="display-1">
        Proof of concept
      </h1>
      <p>
        Weryfikacja możliwości zastosowania formio dla generowania dynamicznych
        formularzy dla aplikacji DMS.
      </p>
    </div>
    <div class="row">
      <div class="col-8 mx-auto">
        <formio
          src="https://jlhoihrgfvgavqi.form.io/kontrolaformalnorachunkowa"
        ></formio>
        <ng-container *ngIf="withComments">
          <formio src="https://jlhoihrgfvgavqi.form.io/komentarze"></formio>
        </ng-container>
        <ng-container *ngIf="withAttachments">
          <formio src="https://jlhoihrgfvgavqi.form.io/attachments"></formio>
        </ng-container>
      </div>
    </div>
  `
})
export class HomeComponent {
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
