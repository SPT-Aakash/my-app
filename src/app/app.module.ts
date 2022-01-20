import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BillingListComponent } from './billing-list/billing-list.component';
import { BillingEditComponent } from './billing-list/billing-edit/billing-edit.component';
import { FormsModule } from '@angular/forms';
import { BillingListService } from './billing-list.service';

@NgModule({
  declarations: [
    AppComponent,
    BillingListComponent,
    BillingEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [BillingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
