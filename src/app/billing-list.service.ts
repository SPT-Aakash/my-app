import { Subject } from 'rxjs';
import { Item } from './shared/item.model';

export class BillingListService {
  myAnswer:number = 300;
  grandClicked:boolean = false;


  itemsChanged = new Subject<Item[]>();
  startedEditing = new Subject<number>();
  public items: Item[] = [
    new Item('Apples', 5, 40, 200,200),
    new Item('Tomatoes', 10, 10, 100,300),
  ];
//   grandTotalValue: number=0;
//   inputValue: number;
//   inputValuej: number;


  getItems() {
    return this.items.slice();
  }

  getItem(index: number) {
    return this.items[index];
  }

  addItem(item: Item) {
    this.items.push(item);
    this.itemsChanged.next(this.items.slice());
  }

  addItems(items: Item[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.items.push(...items);
    this.itemsChanged.next(this.items.slice());
  }

  // updateItem(index: number, newItem: Item) {
  //     this.items[index]=newItem;
  //     this.itemsChanged.next(this.items.slice());
  //   }

  updateItem(index: number, newItem: Item) {
    this.items[index]=newItem;
    this.itemsChanged.next(this.items.slice());
  }

  deleteItem(index: number) {
      this.items.splice(index, 1);
      this.itemsChanged.next(this.items.slice());
  }

  setAnswer(answer:number) {
    this.myAnswer=answer;
  }

//   findGrandTotal(_inputValuej: number){
//     this.grandTotalValue=this.grandTotalValue+this.inputValuej;
// }

// removeGrandTotal(inputValue: number){
//     this.grandTotalValue=this.grandTotalValue-this.items[inputValue].total;
// }

}
