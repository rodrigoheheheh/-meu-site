# Landing Page Profissional - Desenvolvedor

Uma landing page moderna e profissional para desenvolvedores, com design em tons de cinza e preto fosco, integração com WhatsApp para captura de leads.

## 🚀 Características

- **Design Moderno**: Interface limpa e profissional com cores cinza e preto fosco
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Integração WhatsApp**: Botão flutuante e formulário que redireciona para WhatsApp
- **Animações Suaves**: Efeitos de scroll, hover e transições elegantes
- **SEO Otimizado**: Meta tags e estrutura semântica
- **Performance**: Código otimizado e carregamento rápido

## 📁 Estrutura do Projeto

```
landing-page/
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos CSS com design moderno
├── script.js           # Funcionalidades JavaScript
└── README.md           # Este arquivo
```

## ⚙️ Configuração

### 1. Personalizar Informações de Contato

Edite o arquivo `script.js` e altere as seguintes variáveis:

```javascript
const WHATSAPP_PHONE = '5511999999999'; // Seu número do WhatsApp
const WHATSAPP_MESSAGE = 'Olá! Vi seu site e gostaria de conversar sobre um projeto.';
```

### 2. Personalizar Conteúdo

#### Informações Pessoais
- Nome da marca (atualmente "DevPro")
- Descrição profissional
- Experiência e habilidades
- Links das redes sociais

#### Portfólio
- Substituir imagens placeholder por seus projetos reais
- Atualizar descrições dos projetos
- Adicionar tecnologias utilizadas

#### Serviços
- Personalizar serviços oferecidos
- Ajustar descrições conforme sua especialidade

### 3. Personalizar Cores (Opcional)

As cores principais estão definidas no arquivo `styles.css`:

```css
:root {
    --primary-color: #1a1a1a;      /* Preto fosco */
    --secondary-color: #2a2a2a;    /* Cinza escuro */
    --accent-color: #4a4a4a;       /* Cinza médio */
    --text-primary: #ffffff;       /* Branco */
    --text-secondary: #cccccc;     /* Cinza claro */
    --text-muted: #999999;         /* Cinza mais claro */
}
```

## 🎨 Personalizações Recomendadas

### 1. Adicionar Sua Foto
Substitua o ícone de usuário por sua foto real:

```html
<div class="profile-avatar">
    <img src="sua-foto.jpg" alt="Seu Nome">
</div>
```

### 2. Adicionar Projetos Reais
Substitua as imagens placeholder por screenshots dos seus projetos:

```html
<img src="projeto-1.jpg" alt="Nome do Projeto">
```

### 3. Personalizar Redes Sociais
Atualize os links das redes sociais no footer:

```html
<a href="https://github.com/seu-usuario"><i class="fab fa-github"></i></a>
<a href="https://linkedin.com/in/seu-perfil"><i class="fab fa-linkedin"></i></a>
```

## 📱 Funcionalidades

### WhatsApp Integration
- Botão flutuante sempre visível
- Formulário de contato que redireciona para WhatsApp
- Mensagem pré-formatada com dados do lead

### Animações
- Efeito de digitação no código
- Animações de scroll
- Barras de habilidades animadas
- Efeitos hover nos cards

### Responsividade
- Menu mobile com toggle
- Layout adaptativo para diferentes telas
- Otimização para touch devices

## 🚀 Como Usar

1. **Clone ou baixe** os arquivos para seu servidor
2. **Personalize** as informações conforme suas necessidades
3. **Configure** seu número do WhatsApp no `script.js`
4. **Substitua** as imagens placeholder por suas próprias
5. **Teste** em diferentes dispositivos

## 📞 Suporte

Para dúvidas ou sugestões:
- Abra uma issue no repositório
- Entre em contato via email ou WhatsApp

## 📄 Licença

Este projeto está sob licença MIT. Sinta-se livre para usar e modificar conforme suas necessidades.

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com CSS Grid e Flexbox
- **JavaScript**: Funcionalidades interativas
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia Inter

## 📈 SEO

A página está otimizada para SEO com:
- Meta tags apropriadas
- Estrutura semântica
- Alt text em imagens
- URLs amigáveis
- Schema markup (pode ser adicionado)

## 🎯 Próximas Melhorias

- [ ] Adicionar blog section
- [ ] Integração com Google Analytics
- [ ] Sistema de newsletter
- [ ] Testimonials section
- [ ] Dark/Light mode toggle
- [ ] PWA capabilities

---

**Desenvolvido com ❤️ para a comunidade de desenvolvedores** 