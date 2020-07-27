import Respostas from "./resposta"
export default interface Questao {
  ID: string,
  Pergunta: string
  Descricao:string
  Dificuldade: string
  TipoTema: string
  SubTema: string
  SubTema2: string
  Inativo: boolean,
  Imagem: string,
  Respostas: Respostas[]
}