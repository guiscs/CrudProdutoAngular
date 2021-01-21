import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    nome: '',
    valor: 0.00,
    imagemUpload: null
  }

  cardImageBase64: string;

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {

  }

  onFileSelected(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.cardImageBase64 = reader.result as string;

      };

      this.product.imagemUpload = <File>event.target.files[0];
    }
  }

  createProduct(): void {

    if (this.product.nome.length == 0 || this.product.valor.toString().length == 0) {
      this.productService.showMessage("Preencha todo os campos", true);
      return;
    }

    if (this.product.imagemUpload == null) {
      this.productService.showMessage("Selecione uma imagem", true);
      return;
    }

    this.productService.create(this.product).subscribe(res => {
      if (res.success) {
        this.productService.showMessage('Produto Criado!')
        this.goToProducts();
      } else {
        console.log('error')
        res.errors.forEach(error => {
          this.productService.showMessage(error, true);
        });
      }
    })

  }

  cancel(): void {
    this.goToProducts();
  }

  private goToProducts(): void {
    this.router.navigate(['/products'])
  }

}

import { Component, OnInit } from '@angular/core';