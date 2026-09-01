# Low Volume Tracker

Tracker de musculação feito com HTML, CSS e JavaScript puro.

## Recursos

- Treinos organizados por dia
- Registro de carga, repetições e RIR
- Histórico de sessões
- Biblioteca com dezenas de exercícios
- Descrições detalhadas de execução
- Variações e substituições
- Temas de cores
- Modo claro/escuro
- Dados salvos no `localStorage`
- Responsivo para computador e celular
- Sem framework e sem backend

A biblioteca foi estruturada por grupo muscular, faixa de repetições, descrição e variações, seguindo a ideia comum de bibliotecas de exercícios que permitem pesquisar por músculo/equipamento e consultar instruções de execução. 

## Estrutura

```text
low-volume-tracker/
└── index.html
```

## Como rodar

Basta abrir o `index.html` no navegador.

Para testar com um servidor local:

```bash
python -m http.server 8000
```

Depois abra:

```text
http://localhost:8000
```

## Como colocar no GitHub

No terminal, dentro da pasta:

```bash
git init
git add .
git commit -m "feat: cria low volume tracker"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

## GitHub Pages

Depois do push, no repositório do GitHub:

**Settings → Pages → Build and deployment → Source → Deploy from a branch → main → / (root) → Save**

Como o projeto é um site estático e possui `index.html` na raiz, ele pode ser publicado diretamente pelo GitHub Pages. 

## Observação sobre os dados

O projeto usa `localStorage`. Isso significa que os treinos ficam salvos no navegador/aparelho em que foram registrados. Se você abrir o site em outro computador ou navegador, os dados não aparecem automaticamente.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Web Storage API (`localStorage`)
