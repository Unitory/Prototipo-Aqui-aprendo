# Aqui Aprendo — Spec de Design das Landing Pages

**Arquivo Figma:** [Aqui Aprendo — LP](https://www.figma.com/design/W6PMMtauCSLKV47zj29ZBt/Aqui-Aprendo-%E2%80%94-LP)
**Atualizado em:** 22/04/2026
**Escopo:** 1 LP geral (existente, com alterações) + 4 LPs de nicho (novas)

---

## 1. Paleta de cores por LP

A paleta enviada tem cinco cores-base. A LP geral mistura todas; cada LP de nicho adota uma cor dominante + laranja como detalhe.

| Uso | Hex sugerido | Papel |
|---|---|---|
| Rosa | `#E8508A` | Dominante na LP **Mentoria** |
| Amarelo | `#F2A922` | Dominante na LP **Redação ENEM** |
| Roxo | `#6E2E8E` | Dominante na LP **Concurso Público** |
| Laranja | `#F28B1E` | Detalhe/accent em **todas** as LPs |
| Turquesa | `#00A79A` | Dominante na LP **Medicina (Med)** |
| Preto | `#0E0E0E` | Texto principal e fundo em detalhes |
| Off-white | `#FFF8EF` | Fundo claro padrão |

### Regra de aplicação por nicho

Em cada LP de nicho, aplique assim:
- **Cor dominante**: fundo do Hero, backgrounds de cards principais, headers de seção, selo da área no topo.
- **Laranja**: botões primários (CTA), badges de destaque, ícones de features, sublinhados decorativos, hover states.
- **Preto + off-white**: texto e fundos neutros.
- **As outras três cores da paleta**: NÃO devem aparecer nas LPs de nicho (exceto se usadas no footer padrão com todas). Isso preserva a identidade visual de cada vertente.

---

## 2. Alterações na LP Geral (arquivo atual)

A LP geral já está montada. Segue a lista de edições por seção, com referência aos `nodeId` do Figma pra facilitar.

### 2.1. Remover seção de assinaturas (Planos)

**Motivo:** os cursos passam a ser **valor fixo** (não há assinatura).

Apague integralmente o frame:
- `3:128` — **Seção — Planos** (inclui todos os subelementos `3:129` a `3:175`: Plano Essencial, Plano Evolução, Plano Mentoria)

Após remover, **reposicione verticalmente** todas as seções abaixo pra fechar o espaço em branco (mova-as 650px pra cima, que é a altura da seção removida):
- `3:176` — Seção — FAQ (de y=3322 → **y=2672**)
- `3:193` — Seção — CTA Final (de y=3942 → **y=3292**)
- `3:200` — Footer (de y=4402 → **y=3752**)

### 2.2. Remover "Planos" do menu

No frame `7:33` (Nav), apague o texto `7:37` — **"Planos"**.
Reposicione os itens restantes pra ficarem equidistantes:
- `7:34` Áreas de estudo → mantém em x=440
- `7:35` Como funciona → x=625
- `7:36` Diferenciais → x=810
- `7:38` FAQ → x=995

### 2.3. Substituir "Prática Jurídica" por "Medicina" em toda a LP

Altere **todos** os locais abaixo. Onde houver emoji ⚖️, substituir por 🩺.

**Frame ícones do topo (`3:22`):**
- `7:23` — "Prática " → renomear para **"Med"** (ou "Medicina" se couber). Mover ícone/ilustração de balança da justiça para símbolo médico (estetoscópio, cruz médica ou caduceu).

**Hero (`3:32`):**
- Texto `3:39` — substituir de:
  > "Redação, ENEM, concursos, prática jurídica e mentoria em uma experiência de ensino feita para diferentes objetivos."
  para:
  > "Redação, ENEM, concursos, medicina e mentoria em uma experiência de ensino feita para diferentes objetivos."
- Card `3:49` — HeroCard/Juridica → renomear frame para **HeroCard/Medicina**
- Texto `3:50` — "⚖️ Prática Jurídica" → **"🩺 Medicina"**

**Seção Vertentes (`3:53`):**
- Frame `3:68` — "Card/Prática Jurídica" → renomear para **"Card/Medicina"**
- Texto `3:70` — "Prática Jurídica" → **"Medicina"**
- Texto `3:71` — "Desenvolva argumentação, análise de casos e aplicação prática do conteúdo." → substituir por:
  > "Do básico ao aprofundamento: prepare-se para o vestibular de medicina com conteúdo clínico e estratégia de prova."
- Texto `3:73` — "Ver módulo →" → manter, ou trocar para **"Explorar medicina →"** pra uniformizar com os outros CTAs

**Cor do card:** trocar o header `3:69` (atualmente na cor associada a jurídica) para **turquesa `#00A79A`**, mantendo contraste com o texto.

### 2.4. Ajustar FAQ e CTAs pra refletir "curso com valor fixo"

**FAQ (`3:176`):**
- Item `3:187` — "Os planos servem para diferentes níveis?" → **remover ou substituir** por:
  > "Como funciona o pagamento dos cursos?"

  Resposta sugerida (para quando o acordeon abrir):
  > "Cada curso tem valor fixo e único, sem mensalidade. Você paga uma vez e tem acesso ao conteúdo pelo período indicado na descrição da trilha."

- Item `3:190` — "Como funciona a metodologia?" → manter
- Adicionar novo item (opcional): **"Posso comprar mais de uma área?"**
  > "Sim. Cada curso é vendido separadamente e você pode combinar várias trilhas, inclusive com desconto progressivo."

**Reposicione os itens** do FAQ após o ajuste pra ocupar a altura disponível.

**CTA Final (`3:193`):**
- Botão `3:198` + texto `3:199` "Explorar áreas de estudo →" → manter
- Texto `3:197` — manter

**Nav CTA (`7:40`):**
- Texto "Começar →" → pode manter, ou ajustar para **"Ver cursos →"** se preferir sinalizar compra pontual em vez de cadastro.

### 2.5. (Opcional) Alterar seção "Como Funciona" para refletir compra

O passo 3 atual (`3:93`) diz "Escolha seu plano". Como não há mais planos, sugiro trocar por:
- Texto `3:96` — "Escolha seu plano" → **"Escolha seu curso"**
- Texto `3:97` — "Encontre a opção ideal para a sua rotina." → **"Selecione a trilha que combina com sua meta."**

---

## 3. Template compartilhado das 4 LPs de nicho

Todas as 4 LPs de nicho seguem **a mesma estrutura esqueleto**. O que muda é: cor dominante, copy, ícones e referências ao nicho específico.

### 3.1. Estrutura padrão (mesma largura 1440px)

```
┌─ Nav (72px) ─ logo Aqui Aprendo · link "← Voltar à página principal" · CTA "Inscrever-se"
├─ Hero (620px) ─ badge da área · headline · subheadline · 2 CTAs · ilustração/card lateral
├─ Para quem é este curso (420px) ─ 3 cards com perfis-alvo
├─ O que você vai aprender (560px) ─ grid 2x3 de tópicos/módulos com ícone + título + descrição
├─ Como é a jornada (480px) ─ 4 steps horizontais (similar à LP geral, mas com copy do nicho)
├─ Diferenciais do curso (460px) ─ 4 bullets com ícone e texto curto
├─ Depoimentos (400px) ─ carrossel ou 3 cards fixos de alunos
├─ Sobre o professor/mentor (340px) ─ foto + bio + credenciais
├─ Investimento (420px) ─ card único centralizado com PREÇO FIXO · o que inclui · CTA de compra
├─ FAQ (440px) ─ 4 a 5 perguntas específicas da área
├─ CTA final (320px) ─ headline + botão grande
└─ Footer (80px) ─ igual ao da LP geral
```

**Altura total sugerida:** ~4.660px.

### 3.2. Componentes reutilizáveis

Sugiro criar/usar estes componentes na biblioteca Figma:
- `Btn/Primary` (laranja `#F28B1E`, texto branco, radius 8, padding 14x28)
- `Btn/Outline` (borda 1.5 na cor dominante do nicho, texto na cor dominante, radius 8)
- `Card/Feature` (fundo off-white, radius 16, sombra suave, padding 24)
- `Badge/Area` (pill com cor dominante, texto branco, padding 6x14)
- `Nav/Niche` (versão reduzida da nav principal com botão de voltar)

### 3.3. Tipografia padrão (mantida da LP geral)

- **Headline (H1)**: 56px / bold / line-height 1.1
- **Subheadline (H2)**: 32px / semibold / line-height 1.2
- **Body**: 16px / regular / line-height 1.5
- **Small/legendas**: 14px / medium

---

## 4. LP Redação ENEM — amarelo (#F2A922)

### Nav
- Logo Aqui Aprendo (canto esquerdo)
- "← Voltar" (centro ou canto direito)
- CTA **"Inscrever-se →"** (fundo laranja `#F28B1E`)

### Hero (fundo amarelo `#F2A922`, texto preto)
- **Badge**: "📝 Redação & ENEM"
- **Headline**: "Da folha em branco à nota mil."
- **Subheadline**: "Uma trilha completa de redação: estrutura, repertório, treino e correção com devolutiva individual — sem enrolação."
- **CTAs**:
  - Primário (laranja): "Quero começar a escrever →"
  - Secundário (outline preto): "Ver programa completo"
- **Visual lateral**: card com "+200 redações corrigidas" ou ilustração de folha + caneta.

### Para quem é este curso
- "Estudantes do 3º ano e cursinho que querem nota acima de 900"
- "Vestibulandos que travam na introdução ou conclusão"
- "Quem já se preparou mas nunca teve devolutiva de verdade"

### O que você vai aprender (grid 2x3)
1. **Estrutura dissertativa-argumentativa** — como montar introdução, desenvolvimento e conclusão que funcionam em qualquer tema.
2. **Repertório sociocultural** — banco de referências legítimas (filósofos, dados, obras) que você usa em qualquer tema.
3. **Proposta de intervenção** — a fórmula dos 5 elementos que o ENEM pede.
4. **Competências 1 a 5** — como pontuar em cada uma sem atropelar o texto.
5. **Temas prováveis 2026** — análise de tendências e propostas de treino por eixo.
6. **Correção individualizada** — você envia, recebe devolutiva em áudio + texto em até 48h.

### Como é a jornada (4 steps)
1. **Diagnóstico** — escreve uma redação inicial e recebe um mapa do que precisa evoluir.
2. **Fundamentos** — aulas curtas de estrutura, argumentação e coesão.
3. **Treino semanal** — propostas inéditas toda semana, correção com feedback.
4. **Simulados finais** — 3 simulados oficiais cronometrados antes da prova.

### Diferenciais
- ✍️ Correção humana (não é IA)
- 📚 Banco de 150+ repertórios prontos pra usar
- 🎯 Foco em ENEM + FUVEST + UNICAMP
- 📱 Estude pelo celular, envie a redação por foto

### Depoimentos (placeholders)
- "Saí de 680 pra 920 em 4 meses. A devolutiva em áudio fez toda diferença." — [Nome], aprovada em Medicina UFRJ
- "Nunca tinha entendido a competência 5 até esse curso." — [Nome], 980 no ENEM 2025
- "Os repertórios me salvaram em qualquer tema." — [Nome], FUVEST 2025

### Sobre o professor
- Foto · Nome · Bio curta (ex: "Mestre em Letras pela USP, 10 anos corrigindo redação de ENEM e FUVEST, alunos já aprovados em 4 das 5 mais concorridas do país.")

### Investimento (card centralizado, fundo off-white, borda amarela)
- **De R$ [valor riscado]**
- **Por R$ [valor] à vista** · ou 12x de R$ [valor]
- O que inclui:
  - Acesso por 12 meses
  - +40 aulas gravadas
  - Correção de até 20 redações
  - Simulados + gabaritos comentados
  - Certificado
- CTA grande laranja: **"Quero garantir minha vaga"**

### FAQ
1. Quantas redações posso enviar?
2. A correção é feita por professor ou IA?
3. O curso serve pra outros vestibulares além do ENEM?
4. Tem acesso vitalício?
5. Posso pagar no boleto?

### CTA final (fundo amarelo)
- Headline: "Sua próxima redação pode ser a nota mil."
- Botão: **"Comprar curso →"**

---

## 5. LP Concurso Público — roxo (#6E2E8E)

### Nav
- Idêntica ao padrão, CTA "Inscrever-se →" em laranja.

### Hero (fundo roxo `#6E2E8E`, texto branco)
- **Badge**: "🎯 Concurso Público"
- **Headline**: "Menos acúmulo, mais aprovação."
- **Subheadline**: "A trilha focada em questões e revisão espaçada pra quem não tem 8h por dia pra estudar — mas tem meta de passar."
- **CTAs**:
  - Primário (laranja): "Começar a estudar →"
  - Secundário (outline branco): "Ver edital atendido"
- **Visual lateral**: mockup de questão comentada ou cronograma.

### Para quem é este curso
- "Concurseiros que acumulam PDFs e não rendem"
- "Quem trabalha 8h e estuda só à noite"
- "Aprovados que precisam manter ritmo pra outra prova"

### O que você vai aprender
1. **Português pra concurso** — o que cai 80% das bancas (CESPE, FGV, Vunesp).
2. **Raciocínio lógico-matemático** — atalhos e padrões que resolvem em menos de 2 min.
3. **Direito Constitucional & Administrativo** — o núcleo exigido em 90% dos editais federais.
4. **Informática essencial** — o que realmente cai.
5. **Atualidades** — curadoria semanal, não notícia aleatória.
6. **Técnicas de prova** — gestão de tempo, chute técnico, ordem de resolução.

### Como é a jornada (4 steps)
1. **Diagnóstico do edital** — mapeamos o edital-alvo e cortamos o que não cai.
2. **Bateria de questões** — 50 questões/dia em ciclos, com relatório semanal.
3. **Revisão ativa** — spaced repetition automático dos erros.
4. **Simulados oficiais** — na banca certa, com correção em escala.

### Diferenciais
- 📊 Relatório semanal de desempenho
- 🔁 Revisão automática dos pontos fracos
- ⏱️ Cronograma que cabe em 2h/dia
- 🎯 Mais de 12.000 questões comentadas

### Depoimentos (placeholders)
- "Aprovada em 7 meses estudando 2h por dia." — [Nome], TRF [região]
- "O relatório semanal me tirou do sofá." — [Nome], Polícia Federal
- "Passei na primeira tentativa." — [Nome], INSS

### Sobre o professor/equipe
- Quadro com 3 professores (cada área) ou mentor principal.

### Investimento (card centralizado, borda roxa)
- **Por R$ [valor]** · ou 12x de R$ [valor]
- O que inclui:
  - Acesso por 18 meses
  - +200 videoaulas
  - 12.000 questões comentadas
  - Simulados mensais
  - Grupo fechado de dúvidas
- CTA grande laranja: **"Quero me preparar agora"**

### FAQ
1. O curso atende qualquer banca?
2. Recebo atualização se sair edital novo?
3. Tem material em PDF?
4. Quanto tempo de acesso?
5. Como funciona o grupo de dúvidas?

### CTA final (fundo roxo)
- Headline: "Seu próximo cargo público começa com um plano diferente."
- Botão: **"Comprar curso →"**

---

## 6. LP Medicina (Med) — turquesa (#00A79A)

### Nav
- Idêntica ao padrão, CTA "Inscrever-se →" em laranja.

### Hero (fundo turquesa `#00A79A`, texto branco)
- **Badge**: "🩺 Medicina"
- **Headline**: "A medicina não cabe em decoreba."
- **Subheadline**: "Uma trilha pensada para vestibulares de medicina: conteúdo aprofundado, banco de questões comentadas e simulados cronometrados no padrão dos melhores vestibulares."
- **CTAs**:
  - Primário (laranja): "Começar agora →"
  - Secundário (outline branco): "Ver grade do curso"
- **Visual lateral**: ilustração de estetoscópio ou card com "+8.000 questões comentadas".

### Para quem é este curso
- "Alunos do 3º ano com foco em medicina"
- "Vestibulandos que já fizeram uma tentativa e querem virar o jogo"
- "Quem precisa de aprofundamento em exatas e biológicas sem perder humanas"

### O que você vai aprender
1. **Biologia celular e fisiologia** — o que realmente cai em FUVEST, UNICAMP, UNIFESP.
2. **Química orgânica e bioquímica** — foco em aplicações clínicas.
3. **Física aplicada à medicina** — ótica, fluidos, termodinâmica.
4. **Matemática direcionada** — os tópicos que aparecem nas provas de medicina.
5. **Humanidades + atualidades em saúde** — ética médica, SUS, bioética.
6. **Redação com viés biomédico** — como enquadrar temas de saúde em qualquer proposta.

### Como é a jornada (4 steps)
1. **Trilha diagnóstica** — identificamos onde você está e o gap até a aprovação.
2. **Aulas + resolução guiada** — teoria enxuta + questão logo em seguida.
3. **Simulados cronometrados** — réplicas de FUVEST, UNICAMP, UNIFESP.
4. **Revisão ativa** — sprint de 60 dias antes da prova.

### Diferenciais
- 🧬 Foco em vestibulares de medicina (não é curso genérico)
- 📊 Banco de 8.000+ questões separadas por tema
- 🩺 Conteúdo com aplicação clínica real
- 🎯 Simulados no padrão das bancas-alvo

### Depoimentos (placeholders)
- "Aprovada em Medicina USP em 1 ano de curso." — [Nome]
- "Os simulados eram assustadoramente parecidos com a prova real." — [Nome]
- "Saí de 2ª fase sem chances pra aprovação em UNIFESP." — [Nome]

### Sobre o professor/equipe
- Quadro ou professor principal com formação em Medicina ou áreas afins.

### Investimento (card centralizado, borda turquesa)
- **Por R$ [valor]** · ou 12x de R$ [valor]
- O que inclui:
  - Acesso por 18 meses
  - +150 videoaulas
  - 8.000 questões comentadas
  - 6 simulados oficiais cronometrados
  - Correção de 10 redações temáticas
  - Certificado
- CTA grande laranja: **"Quero minha vaga em medicina"**

### FAQ
1. O curso serve para qualquer vestibular de medicina?
2. Tem preparatório para a 2ª fase?
3. Quanto tempo de acesso?
4. Tem aulas ao vivo?
5. Qual a carga horária semanal sugerida?

### CTA final (fundo turquesa)
- Headline: "A medicina é a carreira. O começo é aqui."
- Botão: **"Comprar curso →"**

---

## 7. LP Mentoria — rosa (#E8508A)

### Nav
- Idêntica ao padrão, CTA "Agendar conversa →" em laranja (nota: aqui o CTA muda, pois mentoria costuma começar com diagnóstico).

### Hero (fundo rosa `#E8508A`, texto branco)
- **Badge**: "✨ Mentoria"
- **Headline**: "Estudar sozinho é possível. Evoluir rápido, nem sempre."
- **Subheadline**: "Mentoria individual com plano de estudos personalizado, acompanhamento semanal e devolutivas feitas pra você — não pra uma turma."
- **CTAs**:
  - Primário (laranja): "Agendar diagnóstico gratuito →"
  - Secundário (outline branco): "Ver como funciona"
- **Visual lateral**: card com foto de mentora + nome, ou ilustração de conversa 1:1.

### Para quem é essa mentoria
- "Quem está travado e não sabe por onde continuar"
- "Quem tem meta mas não tem plano"
- "Alunos em reta final que precisam de direção, não de mais aula"

### O que inclui
1. **Diagnóstico inicial de 60 min** — entendemos seu ponto de partida, meta e restrição de tempo.
2. **Plano de estudos personalizado** — cronograma semanal adaptado à sua rotina.
3. **Sessão 1:1 semanal** — 50 min por semana, com pauta definida.
4. **Grupo de mentorados** — comunidade fechada para trocas e accountability.
5. **Revisão do plano a cada 30 dias** — ajustamos conforme você evolui.
6. **Devolutivas escritas** — feedback detalhado sobre progresso e bloqueios.

### Como é a jornada (4 steps)
1. **Agendamento** — você agenda um diagnóstico gratuito de 30 min.
2. **Alinhamento** — traçamos meta e cronograma em conjunto.
3. **Execução semanal** — sessão 1:1 + acompanhamento em grupo.
4. **Ajustes mensais** — revisão do plano e aceleração conforme resultado.

### Diferenciais
- 👥 Mentoria 1:1 (não em grupo)
- 📅 Plano adaptado à sua rotina real
- 💬 Canal direto entre sessões (WhatsApp ou similar)
- 🔄 Sem contrato mínimo longo — você renova por ciclo de 3 meses

### Depoimentos (placeholders)
- "A mentoria me deu direção quando eu tava perdida entre PDFs." — [Nome]
- "A pauta das sessões já vale o valor do mês." — [Nome]
- "Aprovada em 6 meses de mentoria." — [Nome]

### Sobre a mentora
- Foto grande · Nome · Bio completa · Credenciais · Experiência com mentorias anteriores.

### Investimento (card centralizado, borda rosa)
- **Ciclo trimestral: R$ [valor]** · ou 3x de R$ [valor]
- O que inclui:
  - 12 sessões 1:1 (1 por semana)
  - Plano de estudos personalizado
  - Grupo fechado de mentorados
  - Canal de tira-dúvidas entre sessões
  - Revisões mensais do plano
- CTA grande laranja: **"Agendar meu diagnóstico gratuito"**

### FAQ
1. Como é o diagnóstico gratuito?
2. Posso trocar de mentora se não der match?
3. O que acontece se eu faltar a uma sessão?
4. É pra iniciante ou avançado?
5. Renova automaticamente?

### CTA final (fundo rosa)
- Headline: "Você não precisa descobrir o caminho sozinha."
- Botão: **"Falar com uma mentora →"**

---

## 8. Checklist de execução no Figma

Sugestão de ordem para atacar no arquivo:

1. **Backup** — duplique a página atual antes de editar (`LP — Aqui Aprendo` → `LP Geral`).
2. **Crie uma nova página Figma** para cada nicho: `LP Redação`, `LP Concurso`, `LP Medicina`, `LP Mentoria`.
3. **Edite a LP geral** seguindo a seção 2 deste doc (remoção de planos + substituição de jurídica por medicina + nav + FAQ).
4. **Crie os estilos de cor e componentes reutilizáveis** (seção 3.2) antes de montar as LPs de nicho — economiza muito tempo.
5. **Monte a LP Redação** usando o template (seção 3.1) + conteúdo específico (seção 4). Use-a como base para duplicar e adaptar as outras 3.
6. **Duplique e adapte** para Concurso, Medicina e Mentoria, trocando apenas cor dominante e conteúdo.
7. **Revise consistência** — rode uma passada olhando as 5 LPs lado a lado: mesma grid (1440), mesma tipografia, mesmo padrão de botão, footer idêntico.
8. **Quando for implementar em código** (Webflow, Framer, Next.js, etc.), use as mesmas seções como componentes parametrizáveis por cor/copy.

---

## 9. Placeholders a preencher

Antes de publicar, substitua:
- Preços reais de cada curso (`R$ [valor]`)
- Nome do professor/mentora por LP
- Foto do professor/mentora
- Depoimentos reais (com autorização)
- Número real de aulas, questões, horas
- Link de checkout / pagamento no CTA final
- Link de WhatsApp ou formulário no CTA de mentoria

---

*Este documento é a fonte de verdade para as mudanças. Quando o limite do Figma MCP resetar (ou após upgrade), posso aplicar as edições da seção 2 diretamente no arquivo.*
