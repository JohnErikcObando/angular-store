import { Component, inject, Input, signal } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '@shared/models/product';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [UpperCasePipe, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export default class ProductDetailComponent {
  @Input() id?: string;
  product = signal<Product | null>(null);
  cover = signal('');

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    if (this.id) {
      this.productService.getOne(this.id).subscribe({
        next: (product) => {
          this.product.set(product);
          if (product.images.length > 0) {
            this.cover.set(product.images[0]);
          }
        },
      });
    }
  }

  changeCover(newImg: string) {
    this.cover.set(newImg);
  }

  addTocart() {
    const product = this.product();

    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
