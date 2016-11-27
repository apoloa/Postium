import {Injectable} from "@angular/core";

import {LocalStorageService} from "./local-storage.service";

@Injectable()
export class LikesService {

    likesId: string = 'likes';

    constructor( private _localStorage: LocalStorageService) {
    }

    saveLikeId(id: number): void {
        let ids = this._localStorage.getInLocalStorage(this.likesId);
        if(ids == ""){
            ids = `${id}`;
        }else{
            ids = `${ids},${id}`;
        }
        this._localStorage.setInLocalStorage(this.likesId, ids);
    }

    checkLikeId(id: number): boolean {
        let ids = this._localStorage.getInLocalStorage(this.likesId);
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
