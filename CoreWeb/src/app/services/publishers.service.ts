import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PublishersService {
    public apiUrl = environment.apiUrl;
    constructor( private http: HttpClient, private cookiesService: CookieService ) { }

    GetPublisher(PGID: any) : Observable<any>{
        let params = new HttpParams().set("pgid", PGID);

        return this.http.get<any>(this.apiUrl + 'api/Publishers/GetPublisher', { params: params, headers: GetToken(this.cookiesService) })
    }

    GetPublishers(Skip: number, Take: number) : Observable<any>{
        let params = new HttpParams()
            .set("skip", Skip)
            .set("take", Take);

        return this.http.get<any>(this.apiUrl + 'api/Publishers/GetPublishers', { params: params, headers: GetToken(this.cookiesService) })
    }

    AddPublisher(model: any) : Observable<any>{
        console.log(model)
        return this.http.post<any>(this.apiUrl + 'api/Publishers/AddPublisher', model, { headers: GetToken(this.cookiesService) })
    }

    UpdatePublisher(model: any) : Observable<any>{
        return this.http.put<any>(this.apiUrl + 'api/Publishers/UpdatePublisher', model, { headers: GetToken(this.cookiesService) })
    }

    DeletePublisher(pgid: any) : Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}api/Publishers/DeletePublisher/${pgid}`, { headers: GetToken(this.cookiesService) })
    }
}