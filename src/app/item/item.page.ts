import { Component, OnInit } from '@angular/core';
import { Item } from '../classes/item';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  private item: Item;
  private editable: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {
    this.item = {
      id: '',
      name: ''
    }
  }

  // constructor 후 화면이 뜨기전 모두 준비가 되었을 때
  ngOnInit() {
    // router에서 item/:id값을 가져온다.
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.itemService.getItems().then(() => {
        this.editable = true;
        this.item = this.itemService.getItem(id);
      });
    }
  }

  saveItem() {
    if (this.editable) {
      this.itemService.saveItems();
    } else {
      this.itemService.addItem(this.item);
    }
  }

}

