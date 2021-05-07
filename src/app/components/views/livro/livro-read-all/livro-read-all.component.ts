import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LivroService } from '../livro.service';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  id_cat: String = '';

  livros: Livro[] = [];

  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acoes'];

  constructor(private service: LivroService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!; 
    this.findAll();

  }

  findAll(): void {
    this.service.findAllByCategoria(this.id_cat).subscribe((resposta) => {
      this.livros = resposta
      console.log(this.livros)
    });

  }

}
