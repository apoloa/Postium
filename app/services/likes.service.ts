import {Injectable} from "@angular/core";

import {LocalStorageService} from "./local-storage.service";

@Injectable()
export class LikesService {

    localStorage: LocalStorageService;
    likesId: string = 'likes';

    constructor() {
        this.localStorage = new LocalStorageService();
    }

    saveLikeId(id: number): void {
        let ids = this.localStorage.getInLocalStorage(this.likesId);
        ids = `${ids},${id}`;
        this.localStorage.setInLocalStorage(this.likesId, ids);
    }

    checkLikeId(id: number): boolean {
        let ids = this.localStorage.getInLocalStorage(this.likesId);
        if (ids) {
            const arrIds = ids.split(',');
            const filtered = arrIds.filter((element:string) => {
                let idNumber = Number.parseInt(element);
                return idNumber == id;
            });
            return filtered.length > 0;
        } else {
            return false;
        }
    }
}
