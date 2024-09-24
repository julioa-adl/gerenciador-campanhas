# Gerenciador de Campanhas

Bem-vindo ao **Gerenciador de Campanhas**, uma aplicação web para gerenciar campanhas de marketing. Esta aplicação permite criar, editar, ativar/inativar e visualizar campanhas, com validações de datas e persistência de dados utilizando o `localStorage`.

## Instalação

Siga os passos abaixo para configurar o projeto localmente:

1. **Clone o repositório**

   ```bash
   git clone git@github.com:julioa-adl/gerenciador-campanhas.git
   ```

## Como rodar

Primeiro, instale as dependências:

```bash
npm install
```
Depois podemos rodar o projeto:

```bash
npm run dev
```

Abra em [http://localhost:3000](http://localhost:3000) no seu navegador.

## Sumário

- [Recursos](#recursos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Executar o Aplicativo](#como-executar-o-aplicativo)
- [Uso](#uso)
- [Configuração Adicional](#configuração-adicional)
- [Considerações de Segurança](#considerações-de-segurança)
- [Licença](#licença)

---

## Recursos

- **Autenticação Simples**: Tela de login para acessar a aplicação.
- **Dashboard**: Visualização gráfica das campanhas ativas, inativas e expiradas.
- **Listagem de Campanhas**: Visualize todas as campanhas com informações detalhadas.
- **Adicionar Campanha**: Crie novas campanhas com validação de dados.
- **Editar Campanha**: Edite campanhas existentes.
- **Ativar/Inativar Campanha**: Controle o status das campanhas.
- **Persistência de Dados**: Utiliza `localStorage` para armazenar campanhas entre sessões.
- **Validações de Data**:
  - `dataFim` deve ser sempre maior que `dataInicio`.
  - `dataInicio` deve ser igual ou posterior à data atual.
  - Campanhas com `dataFim` anterior à data atual são marcadas como **Expirada**.
- **Interface Responsiva**: Compatível com dispositivos móveis e desktops.
- **Skeleton Loader**: Simula requisições com atraso de 3 segundos ao carregar dados.

## Tecnologias Utilizadas

- **Next.js**: Framework React para desenvolvimento web.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Tailwind CSS**: Framework CSS utilitário para estilização.
- **React Icons**: Biblioteca de ícones para React.
- **React Toastify**: Notificações toast para feedback ao usuário.
- **Chart.js e React Chart.js 2**: Gráficos para visualização de dados na dashboard.
- **@headlessui/react**: Componentes UI sem estilo para React.
- **localStorage**: Para persistência de dados no navegador.

## Pré-requisitos

- **Node.js**: Versão 20 ou superior.
- **npm** ou **yarn**: Gerenciador de pacotes.