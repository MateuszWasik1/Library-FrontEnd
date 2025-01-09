import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { Guid } from 'guid-typescript';
import { selectAuthor, selectErrorMessage } from '../authors-page-state/authors-page-state.selectors';
import { addAuthor, cleanState, loadAuthor, updateAuthor } from '../authors-page-state/authors-page-state.actions';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss']
})

export class AuthorPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];

  public form: FormGroup = new FormGroup({});
  public agid: string = "";
  public isNewAuthorView: boolean = true;

  public Author$ = this.store.select(selectAuthor);
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
    this.agid = this.route.snapshot.paramMap.get('agid') ?? "";
    this.isNewAuthorView = this.agid == "" || this.agid == "0";

    if(!this.isNewAuthorView)
      this.store.dispatch(loadAuthor({ AGID: this.agid }));

    this.subscriptions.push(
      this.Author$.subscribe(x =>{
        this.form = new FormGroup({
          AGID: new FormControl( x.AGID, { validators: [] }),
          AFirstName: new FormControl( x.AFirstName, { validators: [ Validators.required, Validators.minLength(1), Validators.maxLength(255) ] }),
          AMiddleName:new FormControl( x.AMiddleName, { validators: [ Validators.maxLength(255) ] }),
          ALastName: new FormControl( x.ALastName, { validators: [ Validators.required, Validators.minLength(1), Validators.maxLength(255) ] }),
          ANickName: new FormControl( x.ANickName, { validators: [ Validators.maxLength(255) ] }),
          ANationality: new FormControl( x.ANationality, { validators: [ Validators.maxLength(255) ] }),
        })
      })
    );

    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        this.errorHandler.HandleException(error);
      })
    );
  }

  public SaveAuthor = () => {
    let model = {
      "AGID": this.form.get("AGID")?.value,
      "AFirstName": this.form.get("AFirstName")?.value,
      "AMiddleName": this.form.get("AMiddleName")?.value,
      "ALastName": this.form.get("ALastName")?.value,
      "ANickName": this.form.get("ANickName")?.value,
      "ANationality": this.form.get("ANationality")?.value,
    }

    if(model.AGID == "0" || model.AGID == ""){
      model.AGID = Guid.create().toString()
      this.store.dispatch(addAuthor({ Author: model }));
    }
    else
      this.store.dispatch(updateAuthor({ Author: model }));
  }

  public Cancel = () => this.router.navigate(["/authors"]);

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}