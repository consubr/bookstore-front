import { LivroService } from './../livro.service';
import { Livro } from './../livro.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  private id_cat: String = '';

  titulo = new FormControl("", [Validators.minLength(3)]);
  nome_autor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  constructor(
    private service: LivroService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.livro.id = this.route.snapshot.paramMap.get('id')!;
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
    this.findById()
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta
    })
  }

  update(): void {
    this.service.update(this.livro).subscribe((resposta) => {
      //this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.navTelaAnterior();
      this.service.mensagem('Livro Atualizado com sucesso!');
    }, err => {
      this.navTelaAnterior();
      this.service.mensagem('Falha ao atualizar Livro! tente mais tarde');
    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

  navTelaAnterior(): void {
    this.cancel();
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
