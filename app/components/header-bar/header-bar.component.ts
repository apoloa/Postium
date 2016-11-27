import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "header-bar",
    templateUrl: "./app/components/header-bar/header-bar.component.html",
    styleUrls: ["./app/components/header-bar/header-bar.component.css"]
})
export class HeaderBarComponent {

    constructor(private _router: Router){}

    search(text: string){
        console.log(text);
        this._router.navigate(['/search', text]);
    }
}
