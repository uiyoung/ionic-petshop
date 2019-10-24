import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Item } from '../classes/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  public items: Item[] = [];

  constructor(
    private storage: Storage
  ) {

  }

  getItems() {
    return new Promise((resolve) => {
      this.storage.get('items').then((items) => {
        if (items)
          this.items = items;

        resolve(true);
      });
    });
  }

  saveItems() {
    this.storage.set('items', this.items);
  }

  getItem(id: String) {
    return this.items.find(item => item.id == id);
  }

  addItem(item: Item) {
    this.items.push(item);
  }

  deleteItem(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
    this.saveItems();
  }





}
