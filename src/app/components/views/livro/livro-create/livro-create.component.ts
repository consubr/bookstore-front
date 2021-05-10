import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { empty } from 'rxjs';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  titulo = new FormControl("", [Validators.minLength(3)]);
  nome_autor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);

  livro: Livro = {
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  id_cat: string = '';

  constructor(
    private service: LivroService, 
    private router: Router, 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!; 
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Livro criado com sucesso!');
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Erro na criaçao do Livro, Tente Mais Tarde!');
    })
  }
 
  cancel() {
    this.router.navigate([`categorias`])
  }

  getMessage() {
    if (this.titulo.invalid) {
      return "TITULO deve ter entre 3 e 100 caracteres "
    } else if (this.nome_autor.invalid) {
      return true
    } else if (this.texto.invalid) {
      return true
    }

    return false;
  }

}
