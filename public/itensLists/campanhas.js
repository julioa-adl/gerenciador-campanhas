import veraoImage from "../assets/campanha-verao.png";
import natalImage from "../assets/campanha-natal.png";
import fridayImage from "../assets/black-friday.png";
import invernoImage from "../assets/liquidacao-inverno.png";

const campanhasExemplo = [
  {
    id: 1,
    nome: "Campanha de Verão",
    dataInicio: "2024-01-01",
    dataFim: "2024-02-15",
    status: "Ativa",
    descricao: "Promoções de verão.",
    imagem: veraoImage
  },
  {
    id: 2,
    nome: "Black Friday",
    dataInicio: "2024-11-20",
    dataFim: "2024-11-30",
    status: "Ativa",
    descricao: "Descontos da Black Friday.",
    imagem: fridayImage
  },
  {
    id: 3,
    nome: "Campanha de Natal",
    dataInicio: "2024-12-01",
    dataFim: "2024-12-25",
    status: "Ativa",
    descricao: "Promoções de Natal.",
    imagem: natalImage
  },
  {
    id: 4,
    nome: "Liquidação de Inverno",
    dataInicio: "2024-07-01",
    dataFim: "2024-08-15",
    status: "Encerrada",
    descricao: "Ofertas de inverno.",
    imagem: invernoImage
  }
];

export default campanhasExemplo;