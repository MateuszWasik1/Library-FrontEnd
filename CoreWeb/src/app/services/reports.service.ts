import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ReportsService {
    public apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient, 
        private cookiesService: CookieService 
    ) { }

    GetReports(Skip: number, Take: number) : Observable<any>{
        let params = new HttpParams()
            .set("skip", Skip)
            .set("take", Take);

        return this.http.get<any>(this.apiUrl + 'api/Reports/GetReports', { params: params, headers: GetToken(this.cookiesService) })
    }

    DeleteReport(rgid: any) : Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}api/Reports/DeleteReport/${rgid}`, { headers: GetToken(this.cookiesService) })
    }
}