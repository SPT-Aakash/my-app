import { BillingListService } from './../../billing-list.service';
import { Item } from './../../shared/item.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-billing-edit',
  templateUrl: './billing-edit.component.html',
  styleUrls: ['./billing-edit.component.css']
})
export class BillingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') blForm: NgForm;
  editMode: boolean = false;
  subscription: Subscription;
  editedItemIndex: number;
  editedItem: Item;
  totalValue: number;
  grandTotalValue: number=300;
  requiredItem: Item;

  constructor(private blService: BillingListService) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.subscription= this.blService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex= index;
        this.editMode=true;
        this.editedItem=this.blService.getItem(index);
        this.blForm.setValue({
          name: this.editedItem.name,
          quantity: this.editedItem.quantity,
          price: this.editedItem.price,
          // total: this.editedItem.total,
        })
      }
      );
  }

  ngonDestroy() {
    this.subscription.unsubscribe;
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    // if (this.editMode){
    //   this.grandTotalValue=this.grandTotalValue-this.totalValue;
    // }
    this.totalValue=(value.quantity)*(value.price);
    this.grandTotalValue=this.grandTotalValue+this.totalValue;
    // this.blService.findGrandTotal(this.totalValue);
    const newItem = new Item(value.name, value.quantity, value.price,this.totalValue,this.grandTotalValue);
    if (this.editMode){
      this.blService.setAnswer(this.grandTotalValue);
      
      // this.blService.updateItem(this.editedItemIndex, newItem)
      this.blService.addItem(newItem);

    }
    else {
      this.blService.setAnswer(this.grandTotalValue);
      this.blService.addItem(newItem);
    }
    this.editMode=false;
    form.reset();
  }

  onCLear(){
    this.blForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.requiredItem=this.blService.getItem(this.editedItemIndex)
    this.grandTotalValue=this.grandTotalValue-this.requiredItem.total;
    this.blService.setAnswer(this.grandTotalValue);
    this.blService.deleteItem(this.editedItemIndex);
    this.onCLear();

    // this.blService.removeGrandTotal(this.editedItemIndex);
    // this.grandTotalValue=this.grandTotalValue-this.blService.items[this.editedItemIndex].total;
  }

}
