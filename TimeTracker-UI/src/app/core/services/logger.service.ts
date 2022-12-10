import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  printLog(message: string) {
    console.log(message);
  }
}
