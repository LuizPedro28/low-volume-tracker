# Low Volume Tracker

Tracker de musculação feito com HTML, CSS e JavaScript puro — agora também é
um **PWA (Progressive Web App)**: instalável no celular/computador e funciona
offline depois da primeira visita.

## O que mudou nesta versão

- **150 exercícios** na biblioteca (antes 108), cobrindo mais variações de
  peito, costas, ombros, braços, pernas, glúteos, core e condicionamento.
- **Busca ao adicionar exercício**: em vez de um dropdown gigante, agora abre
  uma janela com campo de busca (por nome ou grupo muscular) tanto no "+
  Exercício" quanto em "Editar exercícios".
- **Gráfico de evolução por exercício**: na aba Histórico, escolha um
  exercício e veja um gráfico da carga máxima ao longo das sessões, com a
  variação total desde o primeiro registro.
- **Avaliação física**: em Configurações, informe peso e altura para calcular
  o IMC automaticamente (com a devida ressalva de que IMC não diferencia
  massa muscular de gordura).
- **Assistente de IA**: uma aba de chat onde você pode pedir ajuda para
  montar ou ajustar seus treinos e até enviar fotos do seu físico para
  receber feedback. Funciona com a **sua própria chave de API — Google
  Gemini (grátis) ou Anthropic Claude (pago)**
  (veja a seção específica abaixo — é essencial entender como isso funciona
  antes de usar).
- **Novo visual**, com identidade própria (tipografia condensada nos títulos,
  abas de dia em formato de "etiqueta", grade de séries em estilo caderno de
  treino e uma paleta inspirada em ferro/latão de academia). Inclui modo
  claro/escuro e 5 cores de destaque (Latão, Ferro, Ferrugem, Oliva, Grafite).
- **Edição de dias**: "Editar dias" permite renomear a aba e o título de cada
  dia, reordenar (↑/↓), adicionar, remover e marcar qualquer dia como "dia de
  descanso" — sem mexer em código.
- **Timer de descanso**: botão flutuante com predefinições (30s–3min), alarme
  sonoro, vibração e notificação, com opção de iniciar automaticamente ao
  marcar uma série como feita.
- **App de verdade**: manifest + service worker + ícones, então dá para
  instalar na tela inicial e abrir em tela cheia, sem barra do navegador,
  inclusive sem internet depois de aberto uma vez.
- Indicador de "último registro" de cada dia, no topo da sessão.
- Rascunho de carga/reps/RIR salvo a cada tecla digitada (mais seguro contra
  perda de dados).
- Dados antigos já salvos no navegador são migrados automaticamente para o
  novo formato — nada é perdido ao atualizar o arquivo.

## Recursos

- Treinos organizados por dia, com dias totalmente editáveis
- Registro de carga, repetições e RIR, com timer de descanso
- Histórico de sessões + gráfico de evolução por exercício
- Biblioteca com 150 exercícios, busca, execução e variações
- Avaliação física (IMC) e assistente de IA (com sua própria chave de API)
- Temas de cores e modo claro/escuro
- Instalável (PWA) e funciona offline
- Dados salvos no `localStorage` — sem conta, sem backend
- Responsivo para computador e celular

## Estrutura

```text
low-volume-tracker/
├── index.html         → o app
├── manifest.json       → metadados do PWA (nome, ícone, cor, modo standalone)
├── sw.js                → service worker (cache offline)
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-192.png
│   ├── icon-maskable-512.png
│   ├── apple-touch-icon.png
│   └── favicon-32.png
└── README.md
```

Todos os arquivos ficam na raiz do repositório — isso importa porque o
`manifest.json` e o `sw.js` usam caminhos relativos (`./`), o que é o que
funciona corretamente no GitHub Pages, inclusive quando o site é publicado em
um subcaminho como `https://usuario.github.io/repositorio/`.

## Assistente de IA — como funciona e limitações

O app **não tem servidor/backend**, então o assistente de IA não é um serviço
pronto embutido — ele chama a API de IA **diretamente do seu navegador**,
usando uma chave que você mesmo cria e cola em Configurações → Assistente de
IA. Tem dois provedores para escolher:

### Google Gemini — opção gratuita (recomendada)

- Crie uma chave em [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
  — é grátis, não pede cartão de crédito.
- O nível gratuito do Google AI Studio tem um limite generoso pra uso
  pessoal (dezenas de mensagens por minuto, centenas por dia, dependendo do
  modelo escolhido), mais do que suficiente pra conversar sobre treino e
  mandar fotos ocasionalmente.
- Entende texto e imagem (fotos do físico), então dá pra usar a função de
  avaliação normalmente.

### Anthropic Claude — opção paga

- Crie uma chave em [console.anthropic.com](https://console.anthropic.com/settings/keys).
- Ganha uns créditos iniciais na criação da conta, mas eles expiram em
  poucas semanas — depois disso é cobrado por uso, conforme a tabela de
  preços da API (cobrança separada da assinatura do site claude.ai).
- Pode valer a pena se você já tiver uma chave da Anthropic por outro
  motivo, ou preferir a qualidade de resposta do Claude.

### Vale para os dois provedores

- A chave fica **só no `localStorage` do seu navegador** — não passa por
  nenhum servidor além do provedor escolhido (Google ou Anthropic), e não
  fica visível para outras pessoas que acessem o site publicado (cada
  visitante usaria a própria chave).
- Como a chave fica salva no navegador, **não publique prints com ela
  visível** nem use isso em um computador compartilhado sem depois apagá-la
  em Configurações.
- Fotos enviadas ao assistente são redimensionadas no próprio navegador antes
  de serem enviadas, para economizar dados e custo/cota.
- Se um dia o nome do modelo escolhido parar de funcionar (provedores
  descontinuam modelos de tempos em tempos), veja o nome atual no site do
  provedor (Google AI Studio ou console da Anthropic) e ajuste a opção
  correspondente no arquivo `index.html`, na função `applyAppearance` /
  nos `<select>` de modelo em Configurações.

## Como rodar localmente

Service workers só funcionam em `https://` ou em `http://localhost`, então
para testar o comportamento de PWA (não só o app em si) use um servidor
local em vez de abrir o arquivo direto com duplo clique:

```bash
python -m http.server 8000
```

Depois abra:

```text
http://localhost:8000
```

## Como colocar no GitHub

No terminal, dentro da pasta que contém `index.html`, `manifest.json`,
`sw.js` e `icons/`:

```bash
git init
git add .
git commit -m "feat: cria low volume tracker (PWA)"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

## GitHub Pages

No repositório do GitHub:

**Settings → Pages → Build and deployment → Source → Deploy from a branch → main → / (root) → Save**

Espere alguns instantes e acesse a URL que o GitHub Pages mostrar
(algo como `https://SEU_USUARIO.github.io/SEU_REPOSITORIO/`).

## Instalando como app

- **Android / Chrome / Edge**: abra o site publicado e vá em Configurações
  dentro do app → "Instalar app" (o botão só aparece quando o navegador
  permite instalação). Também é possível instalar pelo menu do navegador
  (⋮ → "Instalar app" / "Adicionar à tela inicial").
- **iPhone / iPad (Safari)**: abra o site, toque em Compartilhar → "Adicionar
  à Tela de Início". O iOS não expõe um evento de "instalar", por isso não há
  botão automático nesse caso.
- **Desktop (Chrome/Edge)**: ícone de instalação na barra de endereço, ou o
  mesmo botão "Instalar app" dentro de Configurações.

Depois de instalado, o app abre em tela cheia (sem a barra do navegador) e
continua funcionando mesmo sem internet, porque o `sw.js` guarda uma cópia do
app no dispositivo na primeira visita.

## Timer de descanso e limitações com a tela apagada

O timer flutuante toca alarme, vibra e manda notificação quando o descanso
termina. Ele tenta continuar funcionando em segundo plano tocando um áudio
quase inaudível em loop (truque que evita que o Android suspenda a aba), mas
nenhum app feito em navegador consegue garantir 100% de precisão com a tela
apagada por muito tempo — isso é uma limitação do sistema operacional, não
do app. Para máxima confiabilidade, ative "Manter a tela ligada" no painel do
timer.

## Atualizando o site depois de publicado

Como o service worker guarda uma cópia offline, navegadores que já instalaram
o app podem continuar vendo a versão antiga por um tempo. Sempre que você
alterar `index.html`, `manifest.json` ou os ícones e publicar de novo, edite
o topo do `sw.js` e mude o número da versão, por exemplo:

```js
const CACHE_NAME = "lvt-cache-v3";
```

para `"lvt-cache-v4"` (e assim por diante). Isso faz o service worker
descartar o cache antigo e buscar os arquivos novos na próxima abertura.

## Observação sobre os dados

O projeto usa `localStorage`. Os treinos, o histórico, a chave de API e a
conversa com o assistente ficam salvos no navegador/aparelho em que foram
registrados. Se você abrir o site em outro computador, navegador ou perfil,
os dados não aparecem automaticamente — não há sincronização entre
dispositivos.

## Observação sobre a fonte

Os títulos usam a fonte Oswald via Google Fonts (carregada pela internet na
primeira vez). Sem conexão, o app funciona normalmente com a fonte de
sistema como alternativa.

## Tecnologias

- HTML5
- CSS3
- JavaScript (gráficos em SVG nativo, sem biblioteca externa)
- Web Storage API (`localStorage`)
- Web App Manifest + Service Worker (PWA)
- API do Google Gemini e/ou da Anthropic (Claude), chamada diretamente do
  navegador com chave própria do usuário

## Ideias para próximas versões

Nenhuma dessas está implementada ainda — é só um roteiro de possibilidades,
organizado por área, para quando quiser continuar evoluindo o app:

**Treino**
- Superset/circuito: agrupar exercícios para fazer em sequência, sem descanso
- Tempo de descanso configurável por exercício (não só um valor global)
- Calculadora de anilhas: mostrar quais anilhas colocar na barra pra bater o
  peso desejado
- Reordenar exercícios dentro do dia (arrastar ou botões ↑/↓, igual já existe
  para os dias)
- Modelos prontos de treino (push/pull/legs, upper/lower, full body) para
  importar com um toque em vez de montar do zero
- Sugestão automática de progressão de carga (ex.: "bateu RIR 0 nas duas
  últimas sessões, tente +2,5 kg")

**Histórico e evolução**
- Volume total por grupo muscular por semana, não só carga máxima por
  exercício
- Recordes pessoais (PRs) destacados automaticamente quando batidos
- Exportar/importar os dados em um arquivo (JSON) — útil como backup ou para
  levar o histórico para outro aparelho, já que hoje tudo fica só no
  navegador local
- Calendário estilo "heatmap" mostrando os dias em que você treinou

**Avaliação física**
- Fotos de progresso ao longo do tempo, com comparação lado a lado por data
- Medidas corporais além de peso/altura (braço, cintura, coxa etc.)
- Gráfico do peso corporal ao longo do tempo, junto com o gráfico de carga

**Assistente de IA**
- Geração de um treino completo a partir de um objetivo em uma frase (ex.:
  "monta um ABC de 4 dias focado em hipertrofia") direto para dentro do plano
- O assistente sugerir progressão de carga com base no histórico real
- Mais provedores, incluindo opções que rodam localmente no navegador sem
  precisar de internet ou chave nenhuma (com menos qualidade que os modelos
  em nuvem, mas 100% grátis e privado)

**Geral / PWA**
- Sincronizar entre aparelhos (por exemplo exportando/importando o backup
  em JSON manualmente, já que o app não tem conta nem servidor próprio)
- Lembrete/notificação programada para o dia de treino
- Suporte a mais de um perfil no mesmo aparelho
