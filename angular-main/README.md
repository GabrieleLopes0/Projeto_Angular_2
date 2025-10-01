# 🏢 Sistema de Gerenciamento de Consultores

Um sistema completo de gerenciamento de consultores desenvolvido em Angular com autenticação, controle de acesso baseado em perfis e operações CRUD.

## 🚀 Funcionalidades

### 🔐 Sistema de Autenticação

- Login com validação de credenciais
- Dois perfis de usuário (Admin e Usuário Comum)
- Persistência de sessão com localStorage
- Proteção de rotas com AuthGuard

### 👥 Gerenciamento de Consultores

- **Visualizar**: Lista completa de consultores com informações detalhadas
- **Adicionar**: Formulário para cadastrar novos consultores (apenas Admin)
- **Editar**: Atualizar informações de consultores existentes (apenas Admin)
- **Excluir**: Remover consultores do sistema (apenas Admin)
- **Buscar**: Pesquisa em tempo real por nome, email ou especialidade
- **Filtrar**: Filtro por status (Ativo/Inativo)

### 🎨 Interface e UX

- Design moderno e responsivo
- Animações suaves
- Feedback visual em todas as ações
- Cards interativos para visualização de consultores
- Validação de formulários em tempo real

## 👤 Credenciais de Acesso

### Administrador

- **Email**: admin@empresa.com
- **Senha**: admin123
- **Permissões**: Todas (visualizar, adicionar, editar, excluir)

### Usuário Comum

- **Email**: user@empresa.com
- **Senha**: user123
- **Permissões**: Apenas visualização e busca

## 🛠️ Tecnologias Utilizadas

- **Angular 17**: Framework principal
- **TypeScript**: Linguagem de programação
- **RxJS**: Programação reativa
- **Reactive Forms**: Formulários reativos com validação
- **Angular Router**: Navegação entre páginas
- **Services & Dependency Injection**: Gerenciamento de estado e lógica de negócio
- **Guards**: Proteção de rotas

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos para executar

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd angular
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute o servidor de desenvolvimento**

```bash
npm start
```

4. **Acesse a aplicação**
   Abra seu navegador e acesse: `http://localhost:4200`

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── components/           # Componentes da aplicação
│   │   ├── login/           # Tela de login
│   │   ├── navbar/          # Barra de navegação
│   │   ├── consultant-list/ # Lista de consultores
│   │   ├── consultant-card/ # Card individual (componente filho)
│   │   ├── consultant-form/ # Formulário de cadastro/edição
│   │   └── about/           # Página sobre
│   ├── services/            # Serviços
│   │   ├── auth.service.ts         # Autenticação
│   │   └── consultant.service.ts   # Gerenciamento de consultores
│   ├── guards/              # Guards de rota
│   │   └── auth.guard.ts    # Proteção de rotas
│   ├── models/              # Interfaces e tipos
│   │   ├── user.model.ts
│   │   └── consultant.model.ts
│   ├── app.component.ts     # Componente raiz
│   ├── app.config.ts        # Configuração do app
│   └── app.routes.ts        # Configuração de rotas
├── index.html               # HTML principal
├── main.ts                  # Ponto de entrada
└── styles.css               # Estilos globais
```

## 🏛️ Arquitetura Angular

### Services

- **AuthService**: Gerencia autenticação, login/logout e verificação de permissões
- **ConsultantService**: CRUD de consultores com BehaviorSubject para estado reativo

### Guards

- **AuthGuard**: Protege rotas requerendo autenticação e verificando permissões de role

### Comunicação entre Componentes

- **@Input()**: Passa dados do componente pai (list) para filho (card)
- **@Output()**: Emite eventos do componente filho (card) para pai (list)
- **Services**: Estado centralizado compartilhado entre componentes

### Reactive Forms

- Validação em tempo real
- Feedback visual de erros
- Formatação automática (ex: telefone)

## 📱 Páginas da Aplicação

1. **Login** (`/login`)

   - Autenticação de usuários
   - Botões de preenchimento rápido para teste

2. **Lista de Consultores** (`/consultants`)

   - Visualização em cards
   - Busca e filtros
   - Ações disponíveis conforme perfil

3. **Novo Consultor** (`/consultant/new`)

   - Formulário de cadastro (apenas Admin)
   - Validação completa

4. **Editar Consultor** (`/consultant/edit/:id`)

   - Formulário de edição (apenas Admin)
   - Pré-preenchido com dados atuais

5. **Sobre** (`/about`)
   - Informações do sistema
   - Documentação de funcionalidades

## 🎯 Funcionalidades Implementadas

✅ Sistema de autenticação com dados mocados  
✅ Controle de acesso baseado em perfis (Admin/User)  
✅ CRUD completo de consultores  
✅ Navegação entre páginas com Angular Router  
✅ Guards para proteção de rotas  
✅ Services para gerenciamento de estado  
✅ Comunicação Pai → Filho com @Input()  
✅ Comunicação Filho → Pai com @Output()  
✅ Reactive Forms com validação  
✅ Busca e filtros em tempo real  
✅ Interface responsiva e moderna  
✅ Persistência de dados com localStorage

## 🚀 Deploy

### Vercel

```bash
npm install -g vercel
vercel
```

### GitHub Pages

```bash
npm run build:prod
# Configure o GitHub Pages para apontar para a pasta dist/projeto_angular_2
```

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais.

## 👨‍💻 Autor

Desenvolvido como parte do módulo de Angular.

---
