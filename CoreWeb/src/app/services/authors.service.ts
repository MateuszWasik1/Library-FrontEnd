import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthorsService {
    public apiUrl = environment.apiUrl;
    constructor( private http: HttpClient, private cookiesService: CookieService ) { }

    GetAuthor(AGID: any) : Observable<any>{
        let params = new HttpParams().set("agid", AGID);

        return this.http.get<any>(this.apiUrl + 'api/Authors/GetAuthor', { params: params, headers: GetToken(this.cookiesService) })
    }

    GetAuthors(Skip: number, Take: number) : Observable<any>{
        let params = new HttpParams()
            .set("skip", Skip)
            .set("take", Take);

        return this.http.get<any>(this.apiUrl + 'api/Authors/GetAuthors', { params: params, headers: GetToken(this.cookiesService) })
    }

    AddAuthor(model: any) : Observable<any>{
        console.log(model)
        return this.http.post<any>(this.apiUrl + 'api/Authors/AddAuthor', model, { headers: GetToken(this.cookiesService) })
    }

    UpdateAuthor(model: any) : Observable<any>{
        return this.http.put<any>(this.apiUrl + 'api/Authors/UpdateAuthor', model, { headers: GetToken(this.cookiesService) })
    }

    DeleteAuthor(tgid: any) : Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}api/Authors/DeleteAuthor/${tgid}`, { headers: GetToken(this.cookiesService) })
    }
}