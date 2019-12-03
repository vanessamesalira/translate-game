import { Component, OnChanges,OnInit, Input } from '@angular/core';
import { Coracao } from '../shared/coracao.model';

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.scss']
})
export class TentativasComponent implements OnInit, OnChanges {

 @Input() public tentativas: number
  
  public coracoes: Array<Coracao> = [
    new Coracao(true),
    new Coracao(true),
    new Coracao(true)
  ]

  constructor() {}

  ngOnChanges(): void {
    //Comparar o numero de tentativas com o tamanho do array de corações.
    if (this.tentativas !== this.coracoes.length){
      let indice = this.coracoes.length - this.tentativas
      this.coracoes[indice - 1].cheio = false
    }
  }

  ngOnInit() {
   
  }

}
