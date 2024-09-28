import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private cartService = inject(CartService);

  hideSideMenu = signal(true);
  // @Input({ required: true }) cart: Product[] = [];
  // total = signal(0);

  cart = this.cartService.cart;
  total = this.cartService.total;

  toogleSideMenu() {
    this.hideSideMenu.update((prevState) => !prevState);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   const cart = changes['cart'];
  //   if (cart) {
  //     this.total.set(this.calcTotal());
  //   }
  // }

  // calcTotal() {
  //   return this.cart.reduce((total, product) => total + product.price, 0);
  // }
}
