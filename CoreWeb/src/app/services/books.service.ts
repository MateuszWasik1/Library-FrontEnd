import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";
import { environment } from "src/environments/environment";
import { GenreEnum } from "../enums/GenreEnum";

@Injectable({
    providedIn: 'root'
})
export class BooksService {
    public apiUrl = environment.apiUrl;
    constructor( private http: HttpClient, private cookiesService: CookieService ) { }

    GetBook(BGID: any) : Observable<any>{
        let params = new HttpParams().set("bgid", BGID);

        return this.http.get<any>(this.apiUrl + 'api/Books/GetBook', { params: params, headers: GetToken(this.cookiesService) })
    }

    GetBooks(Skip: number, Take: number, Genre: GenreEnum, Author: string, Publisher: string) : Observable<any>{
        let params = new HttpParams()
            .set("skip", Skip)
            .set("take", Take)
            .set("genre", Genre)
            .set("agid", Author)
            .set("pgid", Publisher);

        return this.http.get<any>(this.apiUrl + 'api/Books/GetBooks', { params: params, headers: GetToken(this.cookiesService) })
    }

    AddBook(model: any) : Observable<any>{
        console.log(model)
        return this.http.post<any>(this.apiUrl + 'api/Books/AddBook', model, { headers: GetToken(this.cookiesService) })
    }

    UpdateBook(model: any) : Observable<any>{
        return this.http.put<any>(this.apiUrl + 'api/Books/UpdateBook', model, { headers: GetToken(this.cookiesService) })
    }

    DeleteBook(tgid: any) : Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}api/Books/DeleteBook/${tgid}`, { headers: GetToken(this.cookiesService) })
    }
}