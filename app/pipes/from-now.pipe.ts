import {Pipe, PipeTransform} from "@angular/core"
import * as moment from "moment";
import "moment/locale/es";

@Pipe({name: "FromNow"})
export class FromNowPipe implements PipeTransform {
    transform(date: number) {
        return moment(date).fromNow();
    }
}
