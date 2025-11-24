export interface Coordenadas {
  latitude: number;
  longitude: number;
}

export interface Localizacao {
  endereco: string;
  zona: string;
  coordenadas: Coordenadas;
}

export interface RedesSociais {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  tripadvisor?: string;
  tiktok?: string;
}

export interface Contactos {
  telefone: string;
  telemovel?: string;
  email: string;
  website: string;
  redesSociais: RedesSociais;
}

export interface Precos {
  faixaPreco: number;
  faixaPrecoTexto: string;
  precoMedio: number;
  moeda: string;
  observacao?: string;
}

export interface Prato {
  nome: string;
  descricao: string;
  preco: number;
}

export interface CategoriaMenu {
  categoria: string;
  pratos: Prato[];
}

export interface HorarioFuncionamento {
  segunda: string;
  terca: string;
  quarta: string;
  quinta: string;
  sexta: string;
  sabado: string;
  domingo: string;
}

export interface Horario {
  horarioFuncionamento: HorarioFuncionamento;
  diasEncerrado: string[];
  observacoes?: string;
}

export interface Avaliacao {
  autor: string;
  nota: number;
  comentario: string;
  data: string;
  origem: string;
}

export interface Avaliacoes {
  avaliacao: number;
  numeroAvaliacoes: number;
  avaliacoes: Avaliacao[];
}

export interface Estacionamento {
  temEstacionamento: boolean;
  tipoEstacionamento: string;
  informacaoEstacionamento: string;
  capacidadeEstacionamento: number;
  custoEstacionamento: string;
}

export interface Seguranca {
  dicasSeguranca: string[];
  nivelSeguranca: string;
  temVigilancia: boolean;
}

export interface DicaViajante {
  dica: string;
  autor: string;
  origem: string;
}

export interface Caracteristicas {
  wifi: boolean;
  arCondicionado: boolean;
  acessibilidade: boolean;
  reservasOnline: boolean;
  aceitaCartao: boolean;
  estacionamentoVigiado: boolean;
  vistaMar: boolean;
  espacoExterior: boolean;
  musicaAoVivo: boolean;
  musicaAoVivoInfo?: string;
  aceitaGrupos: boolean;
  salaPrivada: boolean;
  servicoTakeaway: boolean;
  servicoDelivery: boolean;
  peNaAreia?: boolean;
  idealParaFamilias?: boolean;
  piscina?: boolean;
  piscinaInfinity?: boolean;
  spa?: boolean;
  cabanas?: boolean;
  valetParking?: boolean;
  dresscode?: string;
  entradaMinima?: boolean;
  eventosSunset?: boolean;
}

export interface Imagens {
  imagemPrincipal: string;
  galeria: string[];
  creditoImagens?: string;
}

export interface SEO {
  metaTitulo: string;
  metaDescricao: string;
  tags: string[];
}

export interface Restaurant {
  id: string;
  nome: string;
  descricao: string;
  descricaoCompleta: string;
  localizacao: Localizacao;
  contactos: Contactos;
  tipoCozinha: string[];
  especialidades: string[];
  ambiente: string[];
  precos: Precos;
  menu: CategoriaMenu[];
  horario: Horario;
  avaliacoes: Avaliacoes;
  estacionamento: Estacionamento;
  seguranca: Seguranca;
  dicasViajantes: DicaViajante[];
  caracteristicas: Caracteristicas;
  imagens: Imagens;
  seo: SEO;
}
