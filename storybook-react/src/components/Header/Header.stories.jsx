import Header from "./Header"

export default {
  title: "Components/Header",
  component: Header,

  parameters: {
    docs: {
      description: {
        component:
          "Header com título e botão de login.",
      },
    },
  },

  argTypes: {
    title: {
      control: "text",
      description: "Texto do cabeçalho",
    },
    showLogin: {
      control: "boolean",
      description: "Define se o botão de login aparece",
    },
    onLogin: {
      action: "clicked",
      description: "Animação ao clicar no login",
    },
  },
}

export const Default = {
  args: {
    title: "Senai",
    showLogin: true,
  },
}

export const WithoutLogin = {
  args: {
    title: "Bem-vindo ao Senai",
    showLogin: false,
  },
}

export const CustomTitle = {
  args: {
    title: "Portal do Aluno",
    showLogin: false,
  },
}