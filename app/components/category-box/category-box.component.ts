import {Component, Input, Output, EventEmitter} from "@angular/core";

import {Category} from "../../models/category";

@Component({
    selector: "category-box",
    templateUrl: "./app/components/category-box/category-box.component.html",
    styleUrls: ["./app/components/category-box/category-box.component.css"]
})
export class CategoryBoxComponent {

    @Input() categories: Category[];
    @Output() categoryFilter: EventEmitter<number> = new EventEmitter();

    postByCategory(categoryId: number): void {
        this.categoryFilter.emit(categoryId);
    }
}
