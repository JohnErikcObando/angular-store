import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '@shared/models/category.';
import { Product } from '@shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private htt = inject(HttpClient);

  constructor() {}

  getAll() {
    return this.htt.get<Category[]>(
      `https://api.escuelajs.co/api/v1/categories`
    );
  }
}
