import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TestService {
    public apiUrl = environment.apiUrl;
    constructor( private http: HttpClient, private cookiesService: CookieService ) { }

    GetTests() : Observable<any>{
        let params = new HttpParams();

        return this.http.get<any>(this.apiUrl + 'api/Tests/GetTestsData', { params: params, headers: GetToken(this.cookiesService) })
    }
}