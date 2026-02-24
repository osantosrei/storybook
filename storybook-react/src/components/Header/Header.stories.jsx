// src/components/Header/Header.stories.jsx
//
// ─── O QUE É UM ARQUIVO DE STORIES? ────────────────────────────────────────────
//
// Um arquivo ".stories.jsx" descreve os diferentes "estados" (stories) de um
// componente. Cada story é basicamente uma função que retorna o componente com
// um conjunto específico de props — como se fosse um "exemplo vivo" na
// documentação.
//
// Convenção de nome: [NomeDoComponente].stories.jsx
// Localização recomendada: junto ao próprio componente
//
// ────────────────────────────────────────────────────────────────────────────────

import { Header } from "./Header";

// ─── DEFAULT EXPORT: Metadados do componente ────────────────────────────────
//
// O export default é lido pelo Storybook para registrar o componente.
// Aqui você configura:
//   - title:     onde o componente aparece no menu lateral do Storybook
//   - component: qual componente está sendo documentado (usado para gerar
//                a tabela de props automaticamente)
//   - parameters: configurações visuais, backgrounds, etc.
//   - argTypes:   define como cada prop aparece no painel "Controls", permitindo
//                 interatividade em tempo real

const meta = {
  title: "UI/Header",           // Aparece como "UI > Header" no menu lateral
  component: Header,            // Liga as PropTypes ao painel de controles

  // parameters.layout define como o componente é exibido no canvas
  // "fullscreen" é ideal para componentes de largura total como o Header
  parameters: {
    layout: "fullscreen",

    // Documenta o componente de forma legível na aba "Docs"
    docs: {
      description: {
        component: `
O componente **Header** é um cabeçalho de página reutilizável e totalmente configurável.

Suporta quatro variantes visuais (\`default\`, \`dark\`, \`transparent\`, \`colored\`),
navegação com links ativos, e ações de autenticação (entrar / sair / cadastrar).

### Quando usar
- Como cabeçalho principal de aplicações web
- Em landing pages, dashboards ou sistemas internos

### Boas práticas
- Passe sempre um \`logo\` para identidade visual
- Use \`navLinks\` para facilitar a navegação entre seções
- Controle \`isLoggedIn\` via estado global (Context, Redux, Zustand etc.)
        `,
      },
    },
  },

  // argTypes: personaliza cada prop no painel "Controls"
  argTypes: {
    variant: {
      description: "Define o tema visual do Header",
      control: { type: "select" },          // Cria um dropdown no painel Controls
      options: ["default", "dark", "transparent", "colored"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    logo: {
      description: "Texto ou elemento JSX exibido como logotipo",
      control: { type: "text" },
    },
    isLoggedIn: {
      description: "Alterna entre os botões de login e logout",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    sticky: {
      description: "Fixa o header no topo da página ao rolar",
      control: { type: "boolean" },
    },
    navLinks: {
      description:
        "Array de links de navegação. Cada item: `{ label, href, active? }`",
      // navLinks é um array/objeto complexo — desabilitar o controle
      // evita confusão; o usuário edita via código ou args
      control: false,
    },
    onLogin: {
      description: "Função chamada ao clicar em **Entrar**",
      action: "clicou em Entrar",   // "action" registra o clique no painel Actions
    },
    onLogout: {
      description: "Função chamada ao clicar em **Sair**",
      action: "clicou em Sair",
    },
    onSignup: {
      description: "Função chamada ao clicar em **Cadastrar**",
      action: "clicou em Cadastrar",
    },
  },
};

export default meta;


// ─── DADOS COMPARTILHADOS ────────────────────────────────────────────────────
// Centralizamos os navLinks aqui para reutilizar nas stories

const defaultNavLinks = [
  { label: "Início",   href: "#", active: true },
  { label: "Sobre",    href: "#" },
  { label: "Serviços", href: "#" },
  { label: "Contato",  href: "#" },
];


// ─── STORIES ─────────────────────────────────────────────────────────────────
//
// Cada named export abaixo é uma "story" — um estado específico do componente.
// O nome da export vira o nome da story no menu lateral do Storybook.
//
// Existem dois formatos comuns:
//
//   1. Component Story Format (CSF) com "args":
//      Você passa as props via objeto `args`. O Storybook conecta esses args
//      ao painel Controls, permitindo edição em tempo real.
//
//   2. Render function:
//      Você define uma função `render` para ter controle total sobre o JSX
//      (útil quando precisa de contexto, wrappers ou lógica adicional).


// ── Story 1: Padrão ──────────────────────────────────────────────────────────
/**
 * O estado padrão do Header com fundo branco.
 * Ideal para a maioria das páginas com fundo claro.
 */
export const Padrao = {
  name: "Padrão (Default)",

  // args: as props que serão passadas ao componente
  // Você pode alterar qualquer valor em tempo real no painel "Controls"
  args: {
    variant: "default",
    logo: "✦ MeuApp",
    navLinks: defaultNavLinks,
    isLoggedIn: false,
  },
};


// ── Story 2: Tema Escuro ─────────────────────────────────────────────────────
/**
 * Variante com fundo escuro, perfeita para aplicações dark mode
 * ou páginas com tema noturno.
 */
export const TemaEscuro = {
  name: "Tema Escuro (Dark)",

  args: {
    variant: "dark",
    logo: "✦ MeuApp",
    navLinks: defaultNavLinks,
    isLoggedIn: false,
  },

  // Podemos sobrescrever os backgrounds para o canvas desta story específica
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#030712" }],
    },
  },
};


// ── Story 3: Tema Colorido ───────────────────────────────────────────────────
/**
 * Variante com gradiente colorido — ótima para destacar a marca
 * ou criar impacto visual em landing pages.
 */
export const TemaColorido = {
  name: "Tema Colorido (Colored)",

  args: {
    variant: "colored",
    logo: "✦ MeuApp",
    navLinks: defaultNavLinks,
    isLoggedIn: false,
  },
};


// ── Story 4: Transparente ────────────────────────────────────────────────────
/**
 * Variante transparente para sobrepor imagens de fundo ou banners hero.
 * Funciona melhor com position: absolute ou como primeiro elemento da página.
 */
export const Transparente = {
  name: "Transparente (Transparent)",

  args: {
    variant: "transparent",
    logo: "✦ MeuApp",
    navLinks: defaultNavLinks,
    isLoggedIn: false,
  },

  parameters: {
    backgrounds: {
      default: "gradient",
      values: [
        {
          name: "gradient",
          value: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)",
        },
      ],
    },
  },
};


// ── Story 5: Usuário Logado ──────────────────────────────────────────────────
/**
 * Estado quando o usuário já está autenticado.
 * O botão "Entrar / Cadastrar" é substituído por um botão "Sair".
 *
 * 💡 Dica: Alterne a prop `isLoggedIn` no painel Controls para ver
 *          a transição entre os dois estados de autenticação.
 */
export const UsuarioLogado = {
  name: "Usuário Logado",

  args: {
    variant: "default",
    logo: "✦ MeuApp",
    navLinks: defaultNavLinks,
    isLoggedIn: true,   // ← Aqui está a diferença!
  },
};


// ── Story 6: Sem Navegação ───────────────────────────────────────────────────
/**
 * Header minimalista, sem links de navegação.
 * Útil em páginas de autenticação, onboarding ou formulários
 * onde você não quer distrair o usuário.
 */
export const SemNavegacao = {
  name: "Sem Navegação",

  args: {
    variant: "default",
    logo: "✦ MeuApp",
    navLinks: [],         // Array vazio = sem nav
    isLoggedIn: false,
  },
};


// ── Story 7: Sticky (fixo no topo) ───────────────────────────────────────────
/**
 * Demonstra o comportamento sticky do Header.
 * Nesta story, criamos uma página longa para que você possa
 * rolar e ver o header fixo no topo.
 *
 * 💡 Dica: Use a função `render` quando precisar de mais contexto
 *          do que apenas as props do componente.
 */
export const Sticky = {
  name: "Fixo no Topo (Sticky)",

  args: {
    variant: "default",
    logo: "✦ MeuApp",
    navLinks: defaultNavLinks,
    sticky: true,
  },

  // render: sobrescreve o comportamento padrão de renderização
  // Aqui adicionamos um wrapper com conteúdo longo para testar o scroll
  render: (args) => (
    <div style={{ height: "200vh", background: "#f8fafc" }}>
      <Header {...args} />
      <div style={{ padding: "2rem", color: "#6b7280", fontSize: "1rem" }}>
        <p>👆 Role a página para ver o Header fixado no topo.</p>
        <p style={{ marginTop: "80vh" }}>Você chegou quase ao fim da página!</p>
      </div>
    </div>
  ),
};


// ── Story 8: Com Logo em JSX ─────────────────────────────────────────────────
/**
 * A prop `logo` aceita qualquer elemento JSX.
 * Você pode passar uma tag <img>, um SVG ou qualquer componente React.
 *
 * 💡 Dica: Isso torna o Header muito flexível — não fica preso
 *          a apenas texto como logotipo.
 */
export const LogoPersonalizado = {
  name: "Logo como JSX",

  // Quando o args contém JSX, é melhor usar render
  render: () => (
    <Header
      variant="default"
      logo={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Simulando um ícone SVG inline */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="#6366f1" />
            <path d="M8 20 L14 8 L20 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 16 H18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.03em" }}>
            Acme Corp
          </span>
        </div>
      }
      navLinks={defaultNavLinks}
      isLoggedIn={false}
    />
  ),
};