# Igreja CVV

Site institucional da Igreja Apostólica Caminho Verdade e Vida, com uma landing page para a sede em Lorena-SP e uma página complementar para a congregação CVV Industrial.

## Visão geral

Este projeto foi desenvolvido para apresentar a igreja de forma moderna, acolhedora e funcional, com informações sobre:

- cultos e horários
- valores e missão
- posts e novidades
- calendário de eventos
- contatos e redes sociais
- acesso à congregação industrial

## Páginas

- `index.html` — página principal da igreja sede
- `industrial/index.html` — página da congregação CVV Industrial
- `styles.css` — estilos globais do site
- `script.js` — lógica do calendário, carrossel e interações
- `assets/` — imagens, logos e materiais visuais

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Integração com feed do Instagram via Elfsight

## Como executar localmente

Como o projeto é estático, basta abrir o arquivo `index.html` no navegador ou rodar um servidor local:

```bash
cd /home/matheus/Documentos/projetos/cvv_site
python3 -m http.server 8000
```

Depois abra no navegador:

```text
http://localhost:8000
```

## Estrutura do projeto

```text
cvv_site/
├── index.html
├── script.js
├── styles.css
├── README.md
├── assets/
│   ├── logo-cvv.jpeg
│   ├── igreja-cvv.jpg
│   └── ...
├── industrial/
│   └── index.html
└── .git/
```

## Funcionalidades

- Página principal com hero section e navegação
- Seções de cultos, missão e redes sociais
- Calendário anual com eventos da igreja
- Página específica para a congregação Industrial
- Layout responsivo para desktop e mobile

## Observações

O site usa recursos estáticos e pode ser hospedado em plataformas como:

- GitHub Pages
- Vercel
- Netlify
- hospedagem tradicional de arquivos estáticos

## Autor

Projeto desenvolvido para a Igreja Apostólica Caminho Verdade e Vida.
