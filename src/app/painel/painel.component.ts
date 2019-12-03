import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { Frases } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = Frases
  public instrucao: string = "Traduza a frase"
  public resposta: string = ""
  public rodada: number = 0
  public rodadaFrase: Frase

  public progresso: number = 0

  public tentativas: number = 3

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit() {
  }

  public atualizarResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
    //O typescript não reconhece resposta.target como um elemento válido dentro do tipo EvenTarget, para arrumarmos precisamos indicar 
    //que esse trecho corresponde a um HTMLInputElement, inserindo a instrução: <HTMLInputElement>
  }

  public verificarResposta(): void {
    if (this.rodadaFrase.frasePortugues == this.resposta) {

      //trocar pergunta da rodada
      this.rodada++

      //incrementar o progresso
      this.progresso = this.progresso + (100 / this.frases.length)

      if (this.rodada == 4) {
        this.encerrarJogo.emit('Vitória')
      }

      //atualiza o objeto rodadaFrase
      this.atualizaRodada()
    }
    else {
      //Decrementar a variável tentativas
      this.tentativas--
      if (this.tentativas <= -1) {
        this.encerrarJogo.emit('Derrota')
      }
    }

  }

  public atualizaRodada(): void {
    //define a frase da rodada com base em alguma lógica
    this.rodadaFrase = this.frases[this.rodada]

    //limpar a resposta
    this.resposta = ''
  }

}
