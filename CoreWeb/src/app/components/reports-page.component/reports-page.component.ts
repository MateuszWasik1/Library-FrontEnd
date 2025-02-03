import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TranslationService } from 'src/app/services/translate.service';
import { Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { selectCount, selectFilters, selectReports } from './reports-page-state/reports-page-state.selectors';
import { cleanState, deleteReport, loadReports, updatePaginationDataReports } from './reports-page-state/reports-page-state.actions';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];

  public count: number = 0;

  public Filters$ = this.store.select(selectFilters);
  public Reports$ = this.store.select(selectReports);
  public Count$ = this.store.select(selectCount);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public router: Router,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadReports())));
    this.subscriptions.push(this.Count$.subscribe(count => this.count = count));
  }

    public DownloadReport = (RBase64: string, RName: string) =>{
      const downloadElement = document.createElement('a');
  
      downloadElement.href = 'data:application/octet-stream;base64,' + RBase64;
      downloadElement.download = RName;
      downloadElement.click();
    }
  
    public DeleteReport = (rgid: string) => this.store.dispatch(deleteReport({ RGID: rgid }));

  public UpdatePaginationData = (PaginationData: any) => this.store.dispatch(updatePaginationDataReports({ PaginationData: PaginationData }));

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}