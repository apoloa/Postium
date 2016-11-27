import {Injectable} from "@angular/core";

@Injectable()
export class LocalStorageService {

    works: boolean;

    constructor() {
        this.works = typeof(Storage) !== "undefined";
    };

    setInLocalStorage(identifier, information): boolean {
        debugger;
        if (this.works) {
            localStorage.setItem(identifier, information);
            return true;
        } else {
            return false;
        }
    };

    getInLocalStorage(identifier): string {
        if (this.works) {
            return localStorage.getItem(identifier) || "";
        } else {
            return null;
        }
    };
}
