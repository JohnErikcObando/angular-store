import { Component, inject, signal } from '@angular/core';

import { ProductComponent } from '@products/components/product/product.component';

import { Product } from '@shared/models/product';
import { HeaderComponent } from '@shared/components/header/header.component';

import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products = signal<Product[]>([]);
  // cart = signal<Product[]>([]);

  private cartService = inject(CartService);
  private productService = inject(ProductService);

  constructor() {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {},
    });
  }

  addToCard(product: Product) {
    this.cartService.addToCart(product);
    // this.cart.update((prevState) => [...prevState, product]);
  }
}
