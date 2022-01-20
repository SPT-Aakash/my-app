import { Item } from './../shared/item.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BillingListService } from '../billing-list.service';

@Component({
  selector: 'app-billing-list',
  templateUrl: './billing-list.component.html',
  styleUrls: ['./billing-list.component.css']
})
export class BillingListComponent implements OnInit, OnDestroy {
  items: Item[];
  private igChangeSub: Subscription;
  finalAnswer:number;
  // grandClicked:boolean = false;
  clickedHere:boolean = false;


  constructor(private blService: BillingListService) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  onEditItem(index:number){
    this.blService.startedEditing.next(index);
    this.blService.grandClicked=false;
    this.clickedHere=this.blService.grandClicked;

  }

  ngOnInit() {
    this.items = this.blService.getItems();
    this.igChangeSub= this.blService.itemsChanged
      .subscribe(
        (items: Item[]) => {
          this.items = items;
        }
      );
      // this.finalAnswer=this.grandTotalValue

      // this.finalAnswer=this.blService.grandTotalValue;
  }

  ngonDestroy() {
     this.igChangeSub.unsubscribe;
   }

   onGrandTotal(){
     this.finalAnswer=this.blService.myAnswer;
     this.blService.grandClicked=true;
     this.clickedHere=this.blService.grandClicked;
   }
  }



