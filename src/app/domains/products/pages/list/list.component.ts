import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';

import { ProductComponent } from '@products/components/product/product.component';

import { Product } from '@shared/models/product';
import { HeaderComponent } from '@shared/components/header/header.component';

import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export default class ListComponent {
  @Input() category_id?: string;

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  // cart = signal<Product[]>([]);

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  constructor() {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getProducts();
  }

  addToCard(product: Product) {
    this.cartService.addToCart(product);
    // this.cart.update((prevState) => [...prevState, product]);
  }

  private getProducts() {
    this.productService.getProducts(this.category_id).subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: () => {},
    });
  }

  private getCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: () => {},
    });
  }
}
