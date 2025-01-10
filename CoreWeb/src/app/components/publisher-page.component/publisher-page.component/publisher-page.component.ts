import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { Guid } from 'guid-typescript';
import { selectErrorMessage, selectPublisher } from '../publishers-page-state/publishers-page-state.selectors';
import { addPublisher, cleanState, loadPublisher, updatePublisher } from '../publishers-page-state/publishers-page-state.actions';

@Component({
  selector: 'app-publisher-page',
  templateUrl: './publisher-page.component.html',
  styleUrls: ['./publisher-page.component.scss']
})

export class PublisherPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];

  public form: FormGroup = new FormGroup({});
  public pgid: string = "";
  public isNewPublisherView: boolean = true;

  public Publisher$ = this.store.select(selectPublisher);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public route: ActivatedRoute,
    public router: Router,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.pgid = this.route.snapshot.paramMap.get('pgid') ?? "";
    this.isNewPublisherView = this.pgid == "" || this.pgid == "0";

    if(!this.isNewPublisherView)
      this.store.dispatch(loadPublisher({ PGID: this.pgid }));

    this.subscriptions.push(
      this.Publisher$.subscribe(x =>{
        this.form = new FormGroup({
          PGID: new FormControl( x.PGID, { validators: [] }),
          PName: new FormControl( x.PName, { validators: [ Validators.required, Validators.minLength(1), Validators.maxLength(255) ] }),
          PCountry:new FormControl( x.PCountry, { validators: [ Validators.maxLength(255) ] }),
          PCity: new FormControl( x.PCity, { validators: [ Validators.maxLength(255) ] }),
          PEmail: new FormControl( x.PEmail, { validators: [ Validators.maxLength(255) ] }),
          PPhone: new FormControl( x.PPhone, { validators: [ Validators.maxLength(255) ] }),
        })
      })
    );

    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        this.errorHandler.HandleException(error);
      })
    );
  }

  public SavePublisher = () => {
    let model = {
      "PGID": this.form.get("PGID")?.value,
      "PName": this.form.get("PName")?.value,
      "PCountry": this.form.get("PCountry")?.value,
      "PCity": this.form.get("PCity")?.value,
      "PEmail": this.form.get("PEmail")?.value,
      "PPhone": this.form.get("PPhone")?.value,
    }

    if(model.PGID == "0" || model.PGID == ""){
      model.PGID = Guid.create().toString()
      this.store.dispatch(addPublisher({ Publisher: model }));
    }
    else
      this.store.dispatch(updatePublisher({ Publisher: model }));
  }

  public Cancel = () => this.router.navigate(["/publisher"]);

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}