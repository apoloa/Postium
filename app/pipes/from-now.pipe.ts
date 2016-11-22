import {Pipe, PipeTransform} from "@angular/core"
import * as moment from "moment";
import "moment/locale/es";

@Pipe({name: "FromNow"})
export class FromNowPipe implements PipeTransform {
    transform(date: number) {
        console.log(date);
        console.log(moment(date).fromNow());
        console.log('Entramos');
        return moment(date).fromNow();
    }
}
