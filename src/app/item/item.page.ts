import { Component, OnInit } from '@angular/core';
import { Item } from '../classes/item';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  public item: Item;
  private editable: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private navCtrl: NavController
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
    console.log(this.item);
    if (this.editable)
      this.itemService.saveItems();
    else
      this.itemService.addItem(this.item);

    this.navCtrl.navigateBack('/home');
  }
}
