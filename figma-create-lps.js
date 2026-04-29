// =============================================================
// Aqui Aprendo — Figma LP Builder
// Roda via Figma MCP (use_figma) ou no Figma Plugin Console
// Parte 1 — Modifica LP Geral
// Parte 2 — Cria 4 LPs de nicho NA MESMA PÁGINA (sem criar páginas novas)
//           Cada LP = frame separado, posicionado à direita da LP Geral
//           Layout: [LP Geral] [LP Redação] [LP Concurso] [LP Medicina] [LP Mentoria]
//           Espaçamento horizontal entre frames: 160px
// =============================================================

(async () => {

  // ─── CORES ────────────────────────────────────────────────
  const C = {
    laranja:  { r: 0.949, g: 0.545, b: 0.118 }, // #F28B1E
    amarelo:  { r: 0.949, g: 0.663, b: 0.133 }, // #F2A922
    roxo:     { r: 0.431, g: 0.180, b: 0.557 }, // #6E2E8E
    turquesa: { r: 0.000, g: 0.655, b: 0.604 }, // #00A79A
    rosa:     { r: 0.910, g: 0.314, b: 0.541 }, // #E8508A
    preto:    { r: 0.055, g: 0.055, b: 0.055 }, // #0E0E0E
    offwhite: { r: 1.000, g: 0.973, b: 0.937 }, // #FFF8EF
    branco:   { r: 1.000, g: 1.000, b: 1.000 },
    cinza:    { r: 0.960, g: 0.960, b: 0.960 },
    cinzaTexto: { r: 0.500, g: 0.500, b: 0.500 },
    cinzaClaro: { r: 0.800, g: 0.800, b: 0.800 },
  };

  // ─── FONTES ───────────────────────────────────────────────
  // Tenta Syne, fallback para Inter
  let FONT = 'Syne';
  const fontStyles = ['Regular', 'Medium', 'Semi Bold', 'Bold', 'Extra Bold'];
  try {
    await figma.loadFontAsync({ family: 'Syne', style: 'Bold' });
    for (const s of fontStyles) {
      try { await figma.loadFontAsync({ family: 'Syne', style: s }); } catch (_) {}
    }
  } catch (_) {
    FONT = 'Inter';
    for (const s of fontStyles) {
      try { await figma.loadFontAsync({ family: 'Inter', style: s }); } catch (_2) {}
    }
  }

  const F = (w = 'Regular') => {
    const map = { ExtraBold: 'Extra Bold', SemiBold: 'Semi Bold', Bold: 'Bold', Medium: 'Medium', Regular: 'Regular' };
    return { family: FONT, style: map[w] || w };
  };

  // ─── HELPERS ──────────────────────────────────────────────

  const solid = (color, opacity = 1) => [{ type: 'SOLID', color, opacity }];

  async function mkText(str, opts = {}) {
    const fn = F(opts.weight || 'Regular');
    try { await figma.loadFontAsync(fn); } catch (_) {}
    const t = figma.createText();
    t.fontName = fn;
    t.fontSize = opts.size || 16;
    t.characters = str;
    t.fills = solid(opts.color || C.preto);
    if (opts.align) t.textAlignHorizontal = opts.align;
    if (opts.lineHeight) t.lineHeight = { value: opts.lineHeight, unit: 'PERCENT' };
    if (opts.width) {
      t.textAutoResize = 'HEIGHT';
      t.resize(opts.width, 100);
    } else {
      t.textAutoResize = 'WIDTH_AND_HEIGHT';
    }
    return t;
  }

  function mkRect(w, h, color, radius = 0, opacity = 1) {
    const r = figma.createRectangle();
    r.resize(w, h);
    r.fills = solid(color, opacity);
    r.cornerRadius = radius;
    return r;
  }

  function mkFrame(name, w, h, color, opacity = 1) {
    const f = figma.createFrame();
    f.name = name;
    f.resize(w, h);
    f.clipsContent = false;
    if (color) f.fills = solid(color, opacity);
    else f.fills = [];
    return f;
  }

  // ─── PARTE 1: MODIFICAR LP GERAL ─────────────────────────

  // Backup: duplicar a página atual antes de editar
  const originalPage = figma.root.children.find(p => p.name.includes('LP') || p.name === 'Page 1');
  if (originalPage) {
    const backup = originalPage.clone();
    backup.name = 'LP Geral — BACKUP';
    console.log('✓ Backup criado: LP Geral — BACKUP');
  }

  // 1a. Remover Seção Planos (3:128)
  const planosSection = figma.getNodeById('3:128');
  if (planosSection) {
    planosSection.remove();
    console.log('✓ Seção Planos removida (3:128)');
  }

  // 1b. Remover item "Planos" do nav (7:37)
  const planosNav = figma.getNodeById('7:37');
  if (planosNav) {
    planosNav.remove();
    console.log('✓ Item Planos removido do nav (7:37)');
  }

  // 1c. Reposicionar seções (subir 650px)
  const reposicionar = [
    { id: '3:176', y: 2672 }, // FAQ
    { id: '3:193', y: 3292 }, // CTA Final
    { id: '3:200', y: 3752 }, // Footer
  ];
  for (const { id, y } of reposicionar) {
    const node = figma.getNodeById(id);
    if (node) { node.y = y; console.log(`✓ Reposicionado ${id} → y=${y}`); }
  }

  // 1d. Reposicionar itens do nav
  const navItems = [
    { id: '7:34', x: 440 }, // Áreas de estudo
    { id: '7:35', x: 625 }, // Como funciona
    { id: '7:36', x: 810 }, // Diferenciais
    { id: '7:38', x: 995 }, // FAQ
  ];
  for (const { id, x } of navItems) {
    const node = figma.getNodeById(id);
    if (node) { node.x = x; console.log(`✓ Nav item ${id} → x=${x}`); }
  }

  // 1e. Substituir textos "Prática Jurídica" → "Medicina"
  const textUpdates = [
    { id: '7:23',  text: 'Med' },
    { id: '3:39',  text: 'Redação, ENEM, concursos, medicina e mentoria em uma experiência de ensino feita para diferentes objetivos.' },
    { id: '3:50',  text: '🩺 Medicina' },
    { id: '3:70',  text: 'Medicina' },
    { id: '3:71',  text: 'Do básico ao aprofundamento: prepare-se para o vestibular de medicina com conteúdo clínico e estratégia de prova.' },
    { id: '3:73',  text: 'Explorar medicina →' },
    { id: '3:96',  text: 'Escolha seu curso' },
    { id: '3:97',  text: 'Selecione a trilha que combina com sua meta.' },
    { id: '7:40',  text: 'Ver cursos →' },
  ];
  for (const { id, text } of textUpdates) {
    const node = figma.getNodeById(id);
    if (node && node.type === 'TEXT') {
      try {
        await figma.loadFontAsync(node.fontName);
        node.characters = text;
        console.log(`✓ Texto atualizado: ${id}`);
      } catch (e) {
        console.log(`⚠ Erro ao atualizar ${id}: ${e.message}`);
      }
    }
  }

  // 1f. Renomear frames
  const renames = [
    { id: '3:49', name: 'HeroCard/Medicina' },
    { id: '3:68', name: 'Card/Medicina' },
  ];
  for (const { id, name } of renames) {
    const node = figma.getNodeById(id);
    if (node) { node.name = name; console.log(`✓ Renomeado ${id} → ${name}`); }
  }

  // 1g. Cor do header do card Medicina → turquesa
  const cardHeader = figma.getNodeById('3:69');
  if (cardHeader) {
    cardHeader.fills = solid(C.turquesa);
    console.log('✓ Card header → turquesa #00A79A');
  }

  // 1h. FAQ: substituir pergunta de planos
  const faqItem = figma.getNodeById('3:187');
  if (faqItem) {
    const textNodes = faqItem.findAll(n => n.type === 'TEXT');
    for (const tn of textNodes) {
      if (tn.characters.toLowerCase().includes('plano')) {
        try {
          await figma.loadFontAsync(tn.fontName);
          tn.characters = 'Como funciona o pagamento dos cursos?';
          console.log('✓ FAQ atualizado: pergunta de planos → pagamento');
          break;
        } catch (e) {}
      }
    }
  }

  console.log('\n✅ LP GERAL — Modificações aplicadas com sucesso.\n');

  // ─── PARTE 2: BUILDER DAS LPs DE NICHO (mesma página) ────────────────────
  // Calcula onde a LP Geral termina para posicionar os novos frames à direita
  // LP Geral ocupa ~1440px de largura; começa em x=0 por convenção
  // Cada nicho LP tem 1440px largura + 160px de gap entre frames

  const LP_CONFIGS = [
    {
      pageName: 'LP Redação ENEM',
      dominantColor: C.amarelo,
      heroText: C.preto,
      badge: '📝 Redação & ENEM',
      headline: 'Da folha em branco\nà nota mil.',
      subheadline: 'Uma trilha completa de redação: estrutura, repertório, treino e correção com devolutiva individual — sem enrolação.',
      ctaPrimario: 'Quero começar a escrever →',
      ctaSecundario: 'Ver programa completo',
      ctaNav: 'Inscrever-se →',
      statValue: '+200',
      statLabel: 'redações corrigidas\ntodo mês',
      paraQuem: [
        'Estudantes do 3º ano e cursinho que querem nota acima de 900',
        'Vestibulandos que travam na introdução ou conclusão',
        'Quem já se preparou mas nunca teve devolutiva de verdade',
      ],
      modulos: [
        { num: '01', titulo: 'Estrutura dissertativa-argumentativa', desc: 'Como montar introdução, desenvolvimento e conclusão em qualquer tema.' },
        { num: '02', titulo: 'Repertório sociocultural', desc: 'Banco de referências legítimas: filósofos, dados e obras prontos para usar.' },
        { num: '03', titulo: 'Proposta de intervenção', desc: 'A fórmula dos 5 elementos que o ENEM pede — sem esquecer nenhum.' },
        { num: '04', titulo: 'Competências 1 a 5', desc: 'Como pontuar em cada critério sem atropelar o texto.' },
        { num: '05', titulo: 'Temas prováveis 2026', desc: 'Análise de tendências e propostas de treino por eixo.' },
        { num: '06', titulo: 'Correção individualizada', desc: 'Envie, receba devolutiva em áudio + texto em até 48h.' },
      ],
      jornada: [
        { num: '01', titulo: 'Diagnóstico', desc: 'Redação inicial → mapa de evolução personalizado.' },
        { num: '02', titulo: 'Fundamentos', desc: 'Aulas curtas de estrutura, argumentação e coesão.' },
        { num: '03', titulo: 'Treino semanal', desc: 'Propostas inéditas toda semana + correção com feedback.' },
        { num: '04', titulo: 'Simulados finais', desc: '3 simulados cronometrados antes da prova.' },
      ],
      diferenciais: [
        '✍️  Correção humana — não é IA',
        '📚  Banco de 150+ repertórios prontos para usar',
        '🎯  Foco em ENEM + FUVEST + UNICAMP',
        '📱  Envie por foto, receba feedback direto no app',
      ],
      depoimentos: [
        { texto: '"Saí de 680 pra 920 em 4 meses. A devolutiva em áudio fez toda diferença."', autor: 'Ana C.', cargo: 'Aprovada em Medicina UFRJ' },
        { texto: '"Nunca tinha entendido a competência 5 até esse curso."', autor: 'Pedro M.', cargo: '980 no ENEM 2025' },
        { texto: '"Os repertórios me salvaram em qualquer tema."', autor: 'Luísa T.', cargo: 'FUVEST 2025' },
      ],
      investimentoInclui: [
        'Acesso por 12 meses',
        '+40 aulas gravadas',
        'Correção de até 20 redações (humana)',
        'Simulados + gabaritos comentados',
        'Banco de 150+ repertórios',
        'Certificado de conclusão',
      ],
      ctaInvestimento: 'Quero garantir minha vaga',
      faq: [
        { p: 'Quantas redações posso enviar?' },
        { p: 'A correção é feita por professor ou IA?' },
        { p: 'O curso serve para outros vestibulares além do ENEM?' },
        { p: 'Tem acesso vitalício?' },
        { p: 'Posso pagar no boleto?' },
      ],
      ctaFinalHeadline: 'Sua próxima redação pode ser a nota mil.',
      ctaFinalBtn: 'Comprar curso →',
    },
    {
      pageName: 'LP Concurso Público',
      dominantColor: C.roxo,
      heroText: C.branco,
      badge: '🎯 Concurso Público',
      headline: 'Menos acúmulo,\nmais aprovação.',
      subheadline: 'A trilha focada em questões e revisão espaçada pra quem não tem 8h por dia pra estudar — mas tem meta de passar.',
      ctaPrimario: 'Começar a estudar →',
      ctaSecundario: 'Ver edital atendido',
      ctaNav: 'Inscrever-se →',
      statValue: '12.000+',
      statLabel: 'questões comentadas\npor banca',
      paraQuem: [
        'Concurseiros que acumulam PDFs e não rendem',
        'Quem trabalha 8h e estuda só à noite',
        'Aprovados que precisam manter ritmo para outra prova',
      ],
      modulos: [
        { num: '01', titulo: 'Português para concurso', desc: 'O que cai em 80% das bancas: CESPE, FGV, Vunesp.' },
        { num: '02', titulo: 'Raciocínio lógico-matemático', desc: 'Atalhos que resolvem questões em menos de 2 minutos.' },
        { num: '03', titulo: 'Direito Constitucional & Administrativo', desc: 'Núcleo exigido em 90% dos editais federais.' },
        { num: '04', titulo: 'Informática essencial', desc: 'Só o que realmente cai — sem enrolação.' },
        { num: '05', titulo: 'Atualidades com curadoria semanal', desc: 'Curadoria focada, não notícia aleatória.' },
        { num: '06', titulo: 'Técnicas de prova', desc: 'Gestão de tempo, chute técnico e ordem de resolução.' },
      ],
      jornada: [
        { num: '01', titulo: 'Diagnóstico do edital', desc: 'Mapeamento do edital-alvo + corte do que não cai.' },
        { num: '02', titulo: 'Bateria de questões', desc: '50 questões/dia em ciclos com relatório semanal.' },
        { num: '03', titulo: 'Revisão ativa', desc: 'Spaced repetition automático dos erros.' },
        { num: '04', titulo: 'Simulados oficiais', desc: 'Na banca certa, com correção em escala.' },
      ],
      diferenciais: [
        '📊  Relatório semanal de desempenho por matéria',
        '🔁  Revisão automática dos pontos fracos',
        '⏱️  Cronograma que cabe em 2h/dia',
        '🎯  12.000+ questões comentadas por banca',
      ],
      depoimentos: [
        { texto: '"Aprovada em 7 meses estudando 2h por dia."', autor: 'Marina R.', cargo: 'TRF 3ª Região' },
        { texto: '"O relatório semanal me tirou do sofá."', autor: 'Carlos A.', cargo: 'Polícia Federal' },
        { texto: '"Passei na primeira tentativa."', autor: 'Fernanda O.', cargo: 'INSS' },
      ],
      investimentoInclui: [
        'Acesso por 18 meses',
        '+200 videoaulas por área',
        '12.000 questões comentadas por banca',
        'Simulados mensais',
        'Grupo fechado de dúvidas (respostas em 24h)',
        'Relatório semanal de desempenho',
      ],
      ctaInvestimento: 'Quero me preparar agora',
      faq: [
        { p: 'O curso atende qualquer banca?' },
        { p: 'Recebo atualização se sair edital novo?' },
        { p: 'Tem material em PDF para imprimir?' },
        { p: 'Quanto tempo de acesso?' },
        { p: 'Como funciona o grupo de dúvidas?' },
      ],
      ctaFinalHeadline: 'Seu próximo cargo público começa\ncom um plano diferente.',
      ctaFinalBtn: 'Comprar curso →',
    },
    {
      pageName: 'LP Medicina',
      dominantColor: C.turquesa,
      heroText: C.branco,
      badge: '🩺 Medicina',
      headline: 'A medicina não\ncabe em decoreba.',
      subheadline: 'Uma trilha pensada para vestibulares de medicina: conteúdo aprofundado, banco de questões comentadas e simulados cronometrados no padrão dos melhores vestibulares.',
      ctaPrimario: 'Começar agora →',
      ctaSecundario: 'Ver grade do curso',
      ctaNav: 'Inscrever-se →',
      statValue: '8.000+',
      statLabel: 'questões comentadas\npor tema',
      paraQuem: [
        'Alunos do 3º ano com foco em medicina',
        'Vestibulandos que já fizeram uma tentativa e querem virar o jogo',
        'Quem precisa de aprofundamento em exatas e biológicas sem perder humanas',
      ],
      modulos: [
        { num: '01', titulo: 'Biologia celular e fisiologia', desc: 'O que realmente cai em FUVEST, UNICAMP e UNIFESP.' },
        { num: '02', titulo: 'Química orgânica e bioquímica', desc: 'Foco em aplicações clínicas.' },
        { num: '03', titulo: 'Física aplicada à medicina', desc: 'Ótica, fluidos e termodinâmica com contexto clínico.' },
        { num: '04', titulo: 'Matemática direcionada', desc: 'Os tópicos que aparecem nas provas de medicina.' },
        { num: '05', titulo: 'Humanidades + atualidades em saúde', desc: 'Ética médica, SUS e bioética.' },
        { num: '06', titulo: 'Redação com viés biomédico', desc: 'Como enquadrar temas de saúde em qualquer proposta.' },
      ],
      jornada: [
        { num: '01', titulo: 'Trilha diagnóstica', desc: 'Gap entre seu ponto atual e a aprovação na banca-alvo.' },
        { num: '02', titulo: 'Aulas + resolução guiada', desc: 'Teoria enxuta + questão logo em seguida.' },
        { num: '03', titulo: 'Simulados cronometrados', desc: 'Réplicas de FUVEST, UNICAMP e UNIFESP.' },
        { num: '04', titulo: 'Revisão ativa', desc: 'Sprint de 60 dias antes da prova.' },
      ],
      diferenciais: [
        '🧬  Foco em vestibulares de medicina — não é curso genérico',
        '📊  8.000+ questões separadas por tema e vestibular',
        '🩺  Conteúdo com aplicação clínica real',
        '🎯  Simulados no padrão exato das bancas-alvo',
      ],
      depoimentos: [
        { texto: '"Aprovada em Medicina USP em 1 ano de curso."', autor: 'Julia M.', cargo: 'FUVEST 2025' },
        { texto: '"Os simulados eram parecidos com a prova real. Assustadoramente."', autor: 'Rafael S.', cargo: 'FUVEST 2025' },
        { texto: '"Saí de 2ª fase sem chances para aprovação em UNIFESP."', autor: 'Beatriz N.', cargo: 'UNIFESP 2026' },
      ],
      investimentoInclui: [
        'Acesso por 18 meses',
        '+150 videoaulas',
        '8.000 questões comentadas por tema',
        '6 simulados cronometrados (FUVEST, UNICAMP, UNIFESP)',
        'Correção de 10 redações temáticas de saúde',
        'Certificado de conclusão',
      ],
      ctaInvestimento: 'Quero minha vaga em medicina',
      faq: [
        { p: 'O curso serve para qualquer vestibular de medicina?' },
        { p: 'Tem preparatório para a 2ª fase?' },
        { p: 'Quanto tempo de acesso?' },
        { p: 'Tem aulas ao vivo?' },
        { p: 'Qual a carga horária semanal sugerida?' },
      ],
      ctaFinalHeadline: 'A medicina é a carreira.\nO começo é aqui.',
      ctaFinalBtn: 'Comprar curso →',
    },
    {
      pageName: 'LP Mentoria',
      dominantColor: C.rosa,
      heroText: C.branco,
      badge: '✨ Mentoria',
      headline: 'Estudar sozinho é possível.\nEvoluir rápido, nem sempre.',
      subheadline: 'Mentoria individual com plano de estudos personalizado, acompanhamento semanal e devolutivas feitas pra você — não pra uma turma.',
      ctaPrimario: 'Agendar diagnóstico gratuito →',
      ctaSecundario: 'Ver como funciona',
      ctaNav: 'Agendar conversa →',
      statValue: '1:1',
      statLabel: 'sessão individual por semana\nciclo de 3 meses',
      paraQuem: [
        'Quem está travado e não sabe por onde continuar',
        'Quem tem meta mas não tem plano',
        'Alunos em reta final que precisam de direção, não de mais aula',
      ],
      modulos: [
        { num: '01', titulo: 'Diagnóstico inicial de 60 min', desc: 'Ponto de partida, meta e rotina mapeados no primeiro encontro.' },
        { num: '02', titulo: 'Plano de estudos personalizado', desc: 'Cronograma semanal adaptado à sua rotina real.' },
        { num: '03', titulo: 'Sessão 1:1 semanal', desc: '50 min por semana, com pauta definida antes de cada encontro.' },
        { num: '04', titulo: 'Grupo de mentorados', desc: 'Comunidade fechada para trocas e accountability.' },
        { num: '05', titulo: 'Revisão do plano a cada 30 dias', desc: 'Ajustamos conforme você evolui.' },
        { num: '06', titulo: 'Devolutivas escritas', desc: 'Feedback detalhado sobre progresso e bloqueios.' },
      ],
      jornada: [
        { num: '01', titulo: 'Agendamento', desc: 'Diagnóstico gratuito de 30 min, sem compromisso.' },
        { num: '02', titulo: 'Alinhamento', desc: 'Traçamos meta e cronograma em conjunto.' },
        { num: '03', titulo: 'Execução semanal', desc: 'Sessão 1:1 + acompanhamento no grupo.' },
        { num: '04', titulo: 'Ajustes mensais', desc: 'Revisão do plano e aceleração conforme resultado.' },
      ],
      diferenciais: [
        '👥  Mentoria 1:1 — não é live para 300 pessoas',
        '📅  Plano adaptado à sua rotina real, não à ideal',
        '💬  Canal direto entre sessões (WhatsApp ou similar)',
        '🔄  Sem contrato longo — renova por ciclo de 3 meses',
      ],
      depoimentos: [
        { texto: '"A mentoria me deu direção quando eu estava perdida entre PDFs."', autor: 'Camila F.', cargo: 'Aprovada em Direito USP' },
        { texto: '"A pauta das sessões já vale o valor do mês."', autor: 'Mariana L.', cargo: 'ENEM 2025' },
        { texto: '"Aprovada em 6 meses de mentoria."', autor: 'Sofia T.', cargo: 'Medicina UNESP' },
      ],
      investimentoInclui: [
        '12 sessões 1:1 (1 por semana durante 3 meses)',
        'Plano de estudos personalizado',
        'Grupo fechado de mentorados',
        'Canal direto de tira-dúvidas entre sessões',
        'Revisões mensais do plano',
        'Devolutivas escritas detalhadas',
      ],
      ctaInvestimento: 'Agendar meu diagnóstico gratuito',
      faq: [
        { p: 'Como é o diagnóstico gratuito?' },
        { p: 'Posso trocar de mentora se não der match?' },
        { p: 'O que acontece se eu faltar a uma sessão?' },
        { p: 'É para iniciante ou avançado?' },
        { p: 'Renova automaticamente?' },
      ],
      ctaFinalHeadline: 'Você não precisa descobrir\no caminho sozinha.',
      ctaFinalBtn: 'Falar com uma mentora →',
    },
  ];

  // ─── BUILDER DE LP ────────────────────────────────────────
  // frameX: posição horizontal do frame na página (cada LP é deslocada 1600px)

  async function buildLP(cfg, frameX) {
    const page = figma.currentPage;

    const W = 1440;
    const PX = 80; // padding horizontal
    let Y = 0;

    // Frame pai que contém toda a LP
    const lpFrame = figma.createFrame();
    lpFrame.name = cfg.pageName;
    lpFrame.resize(W, 4660); // altura total provisória; ajustada no fim
    lpFrame.x = frameX;
    lpFrame.y = 0;
    lpFrame.fills = [{ type: 'SOLID', color: C.offwhite }];
    lpFrame.clipsContent = false;
    page.appendChild(lpFrame);

    function addSection(name, height, bgColor, opacity = 1) {
      const f = figma.createFrame();
      f.name = name;
      f.resize(W, height);
      f.x = 0;
      f.y = Y;
      f.clipsContent = true;
      if (bgColor) f.fills = solid(bgColor, opacity);
      else f.fills = [{ type: 'SOLID', color: C.offwhite }];
      lpFrame.appendChild(f);
      Y += height;
      return f;
    }

    // ── NAV ───────────────────────────────────────────────────
    {
      const nav = addSection('Nav', 72, C.branco);

      const logo = await mkText('Aqui Aprendo', { size: 20, weight: 'Bold', color: C.preto });
      logo.x = PX; logo.y = (72 - 24) / 2;
      nav.appendChild(logo);

      const back = await mkText('← Voltar à página principal', { size: 14, color: C.preto });
      back.x = W / 2 - 100; back.y = (72 - 18) / 2;
      nav.appendChild(back);

      const btnBg = mkFrame('NavCTA', 180, 40, C.laranja);
      btnBg.cornerRadius = 8;
      btnBg.x = W - PX - 180; btnBg.y = 16;
      const btnTxt = await mkText(cfg.ctaNav, { size: 14, weight: 'SemiBold', color: C.branco, align: 'CENTER', width: 180 });
      btnTxt.y = 11;
      btnBg.appendChild(btnTxt);
      nav.appendChild(btnBg);

      // linha separadora
      const line = mkRect(W, 1, C.cinza);
      line.x = 0; line.y = 71;
      nav.appendChild(line);
    }

    // ── HERO ─────────────────────────────────────────────────
    {
      const hero = addSection('Hero', 620, cfg.dominantColor);

      // Badge
      const badgeBg = mkFrame('Badge', 200, 34, C.preto, 0.15);
      badgeBg.cornerRadius = 17;
      badgeBg.x = PX; badgeBg.y = 80;
      const badgeTxt = await mkText(cfg.badge, { size: 13, weight: 'SemiBold', color: cfg.heroText, align: 'CENTER', width: 200 });
      badgeTxt.y = 8;
      badgeBg.appendChild(badgeTxt);
      hero.appendChild(badgeBg);

      // Headline
      const hl = await mkText(cfg.headline, { size: 64, weight: 'ExtraBold', color: cfg.heroText, width: 680, lineHeight: 110 });
      hl.x = PX; hl.y = 136;
      hero.appendChild(hl);

      // Subheadline
      const sub = await mkText(cfg.subheadline, { size: 18, color: cfg.heroText, width: 560, lineHeight: 155 });
      sub.x = PX; sub.y = 360;
      hero.appendChild(sub);

      // CTA Primário
      const cta1 = mkFrame('CTA-Primary', 240, 52, C.laranja);
      cta1.cornerRadius = 8;
      cta1.x = PX; cta1.y = 498;
      const cta1Txt = await mkText(cfg.ctaPrimario, { size: 15, weight: 'SemiBold', color: C.branco, align: 'CENTER', width: 240 });
      cta1Txt.y = 15;
      cta1.appendChild(cta1Txt);
      hero.appendChild(cta1);

      // CTA Outline
      const cta2 = mkFrame('CTA-Outline', 200, 52, null);
      cta2.cornerRadius = 8;
      cta2.strokes = solid(cfg.heroText);
      cta2.strokeWeight = 1.5;
      cta2.x = PX + 256; cta2.y = 498;
      const cta2Txt = await mkText(cfg.ctaSecundario, { size: 15, weight: 'SemiBold', color: cfg.heroText, align: 'CENTER', width: 200 });
      cta2Txt.y = 15;
      cta2.appendChild(cta2Txt);
      hero.appendChild(cta2);

      // Stat Card
      const statBg = mkFrame('StatCard', 260, 130, C.preto, 0.1);
      statBg.cornerRadius = 16;
      statBg.x = W - PX - 260; statBg.y = 200;
      const statVal = await mkText(cfg.statValue, { size: 48, weight: 'ExtraBold', color: cfg.heroText, align: 'CENTER', width: 260 });
      statVal.y = 20;
      statBg.appendChild(statVal);
      const statLbl = await mkText(cfg.statLabel, { size: 13, color: cfg.heroText, align: 'CENTER', width: 220, lineHeight: 140 });
      statLbl.x = 20; statLbl.y = 76;
      statBg.appendChild(statLbl);
      hero.appendChild(statBg);
    }

    // ── PARA QUEM É ───────────────────────────────────────────
    {
      const sec = addSection('Para quem é', 400, C.offwhite);

      const title = await mkText('Para quem é este curso', { size: 40, weight: 'Bold', color: C.preto, align: 'CENTER', width: W });
      title.y = 56;
      sec.appendChild(title);

      const cardW = 360;
      const totalW = 3 * cardW + 2 * 32;
      const startX = (W - totalW) / 2;

      for (let i = 0; i < cfg.paraQuem.length; i++) {
        const card = mkFrame(`Card-${i + 1}`, cardW, 170, C.branco);
        card.cornerRadius = 16;
        card.effects = [{ type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.07 }, offset: { x: 0, y: 4 }, radius: 20, spread: 0, visible: true, blendMode: 'NORMAL' }];
        card.x = startX + i * (cardW + 32); card.y = 150;
        sec.appendChild(card);

        const bar = mkRect(36, 4, cfg.dominantColor, 2);
        bar.x = 24; bar.y = 24;
        card.appendChild(bar);

        const txt = await mkText(cfg.paraQuem[i], { size: 16, weight: 'Medium', color: C.preto, width: cardW - 48, lineHeight: 150 });
        txt.x = 24; txt.y = 48;
        card.appendChild(txt);
      }
    }

    // ── O QUE VAI APRENDER ────────────────────────────────────
    {
      const sec = addSection('O que vai aprender', 560, C.preto);

      const title = await mkText('O que você vai aprender', { size: 40, weight: 'Bold', color: C.branco, align: 'CENTER', width: W });
      title.y = 56;
      sec.appendChild(title);

      const colW = Math.floor((W - 2 * PX - 2 * 20) / 3);

      for (let i = 0; i < cfg.modulos.length; i++) {
        const m = cfg.modulos[i];
        const col = i % 3;
        const row = Math.floor(i / 3);

        const card = mkFrame(`Modulo-${m.num}`, colW, 152, null);
        card.fills = [{ type: 'SOLID', color: C.branco, opacity: 0.07 }];
        card.cornerRadius = 12;
        card.x = PX + col * (colW + 20); card.y = 144 + row * 172;
        sec.appendChild(card);

        const num = await mkText(m.num, { size: 12, weight: 'Bold', color: cfg.dominantColor });
        num.x = 20; num.y = 16;
        card.appendChild(num);

        const tit = await mkText(m.titulo, { size: 15, weight: 'SemiBold', color: C.branco, width: colW - 40, lineHeight: 130 });
        tit.x = 20; tit.y = 36;
        card.appendChild(tit);

        const desc = await mkText(m.desc, { size: 13, color: C.cinzaClaro, width: colW - 40, lineHeight: 145 });
        desc.x = 20; desc.y = 84;
        card.appendChild(desc);
      }
    }

    // ── JORNADA ───────────────────────────────────────────────
    {
      const sec = addSection('Como é a jornada', 480, C.preto);
      sec.fills = [{ type: 'SOLID', color: { r: 0.08, g: 0.08, b: 0.08 } }];

      const title = await mkText('Como é a jornada', { size: 40, weight: 'Bold', color: C.branco, align: 'CENTER', width: W });
      title.y = 56;
      sec.appendChild(title);

      const stepW = Math.floor((W - 2 * PX - 3 * 24) / 4);

      for (let i = 0; i < cfg.jornada.length; i++) {
        const step = cfg.jornada[i];

        const card = mkFrame(`Step-${step.num}`, stepW, 220, null);
        card.fills = [{ type: 'SOLID', color: C.branco, opacity: 0.05 }];
        card.cornerRadius = 12;
        card.x = PX + i * (stepW + 24); card.y = 160;
        sec.appendChild(card);

        // Número em círculo
        const numBg = mkFrame(`Num-${i}`, 40, 40, cfg.dominantColor);
        numBg.cornerRadius = 20;
        numBg.x = 20; numBg.y = 20;
        const numTxt = await mkText(step.num, { size: 14, weight: 'Bold', color: C.branco, align: 'CENTER', width: 40 });
        numTxt.y = 11;
        numBg.appendChild(numTxt);
        card.appendChild(numBg);

        const tit = await mkText(step.titulo, { size: 16, weight: 'Bold', color: C.branco, width: stepW - 40, lineHeight: 130 });
        tit.x = 20; tit.y = 76;
        card.appendChild(tit);

        const desc = await mkText(step.desc, { size: 13, color: { r: 0.65, g: 0.65, b: 0.65 }, width: stepW - 40, lineHeight: 148 });
        desc.x = 20; desc.y = 118;
        card.appendChild(desc);
      }
    }

    // ── DIFERENCIAIS ──────────────────────────────────────────
    {
      const sec = addSection('Diferenciais', 440, C.offwhite);

      const title = await mkText('Por que o Aqui Aprendo?', { size: 40, weight: 'Bold', color: C.preto, align: 'CENTER', width: W });
      title.y = 56;
      sec.appendChild(title);

      for (let i = 0; i < cfg.diferenciais.length; i++) {
        const row = mkFrame(`Dif-${i + 1}`, W - 2 * PX, 68, null);
        row.x = PX; row.y = 152 + i * 72;
        sec.appendChild(row);

        const bar = mkRect(4, 40, cfg.dominantColor, 2);
        bar.y = 14;
        row.appendChild(bar);

        const txt = await mkText(cfg.diferenciais[i], { size: 18, weight: 'Medium', color: C.preto });
        txt.x = 24; txt.y = 20;
        row.appendChild(txt);
      }
    }

    // ── DEPOIMENTOS ───────────────────────────────────────────
    {
      const sec = addSection('Depoimentos', 380, C.cinza);

      const title = await mkText('O que dizem os alunos', { size: 40, weight: 'Bold', color: C.preto, align: 'CENTER', width: W });
      title.y = 40;
      sec.appendChild(title);

      const cardW = Math.floor((W - 2 * PX - 2 * 24) / 3);

      for (let i = 0; i < cfg.depoimentos.length; i++) {
        const dep = cfg.depoimentos[i];
        const card = mkFrame(`Dep-${i + 1}`, cardW, 200, C.branco);
        card.cornerRadius = 16;
        card.effects = [{ type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.06 }, offset: { x: 0, y: 4 }, radius: 16, spread: 0, visible: true, blendMode: 'NORMAL' }];
        card.x = PX + i * (cardW + 24); card.y = 120;
        sec.appendChild(card);

        // Aspas decorativas
        const quote = await mkText('❝', { size: 28, color: cfg.dominantColor });
        quote.x = 20; quote.y = 14;
        card.appendChild(quote);

        const txt = await mkText(dep.texto, { size: 14, color: C.preto, width: cardW - 40, lineHeight: 155 });
        txt.x = 20; txt.y = 52;
        card.appendChild(txt);

        const autor = await mkText(dep.autor, { size: 13, weight: 'Bold', color: C.preto });
        autor.x = 20; autor.y = 156;
        card.appendChild(autor);

        const cargo = await mkText(dep.cargo, { size: 12, color: C.cinzaTexto });
        cargo.x = 20; cargo.y = 174;
        card.appendChild(cargo);
      }
    }

    // ── INVESTIMENTO ──────────────────────────────────────────
    {
      const sec = addSection('Investimento', 420, C.preto);

      const title = await mkText('Investimento', { size: 40, weight: 'Bold', color: C.branco, align: 'CENTER', width: W });
      title.y = 40;
      sec.appendChild(title);

      const card = mkFrame('InvestCard', 600, 300, C.offwhite);
      card.cornerRadius = 20;
      card.strokes = solid(cfg.dominantColor);
      card.strokeWeight = 2;
      card.x = (W - 600) / 2; card.y = 96;
      sec.appendChild(card);

      const price = await mkText('R$ [valor] à vista', { size: 32, weight: 'ExtraBold', color: C.preto, align: 'CENTER', width: 600 });
      price.y = 24;
      card.appendChild(price);

      const inclui = await mkText('O que inclui:', { size: 13, weight: 'SemiBold', color: C.preto });
      inclui.x = 40; inclui.y = 80;
      card.appendChild(inclui);

      for (let i = 0; i < cfg.investimentoInclui.length; i++) {
        const item = await mkText(`✓  ${cfg.investimentoInclui[i]}`, { size: 13, color: C.preto });
        item.x = 40; item.y = 100 + i * 22;
        card.appendChild(item);
      }

      const ctaBg = mkFrame('CTA', 520, 48, C.laranja);
      ctaBg.cornerRadius = 8;
      ctaBg.x = 40; ctaBg.y = 240;
      const ctaTxt = await mkText(cfg.ctaInvestimento, { size: 15, weight: 'SemiBold', color: C.branco, align: 'CENTER', width: 520 });
      ctaTxt.y = 13;
      ctaBg.appendChild(ctaTxt);
      card.appendChild(ctaBg);
    }

    // ── FAQ ───────────────────────────────────────────────────
    {
      const sec = addSection('FAQ', 440, C.offwhite);

      const title = await mkText('Perguntas frequentes', { size: 40, weight: 'Bold', color: C.preto, align: 'CENTER', width: W });
      title.y = 40;
      sec.appendChild(title);

      for (let i = 0; i < cfg.faq.length; i++) {
        const row = mkFrame(`FAQ-${i + 1}`, W - 2 * PX, 52, C.branco);
        row.cornerRadius = 8;
        row.effects = [{ type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.04 }, offset: { x: 0, y: 2 }, radius: 8, spread: 0, visible: true, blendMode: 'NORMAL' }];
        row.x = PX; row.y = 124 + i * 60;
        sec.appendChild(row);

        const q = await mkText(cfg.faq[i].p, { size: 15, weight: 'SemiBold', color: C.preto });
        q.x = 24; q.y = 16;
        row.appendChild(q);

        const chev = await mkText('+', { size: 22, color: cfg.dominantColor });
        chev.x = W - 2 * PX - 40; chev.y = 11;
        row.appendChild(chev);
      }
    }

    // ── CTA FINAL ─────────────────────────────────────────────
    {
      const sec = addSection('CTA Final', 300, cfg.dominantColor);

      const hl = await mkText(cfg.ctaFinalHeadline, { size: 40, weight: 'ExtraBold', color: cfg.heroText, align: 'CENTER', width: W, lineHeight: 120 });
      hl.y = 64;
      sec.appendChild(hl);

      const btnBg = mkFrame('CTA-Btn', 260, 52, C.laranja);
      btnBg.cornerRadius = 8;
      btnBg.x = (W - 260) / 2; btnBg.y = 220;
      const btnTxt = await mkText(cfg.ctaFinalBtn, { size: 16, weight: 'SemiBold', color: C.branco, align: 'CENTER', width: 260 });
      btnTxt.y = 14;
      btnBg.appendChild(btnTxt);
      sec.appendChild(btnBg);
    }

    // ── FOOTER ────────────────────────────────────────────────
    {
      const sec = addSection('Footer', 80, C.preto);

      const copy = await mkText('© 2026 Aqui Aprendo. Todos os direitos reservados.', { size: 13, color: C.cinzaTexto, align: 'CENTER', width: W });
      copy.y = (80 - 18) / 2;
      sec.appendChild(copy);
    }

    // Ajusta altura real do frame pai
    lpFrame.resize(W, Y);
    console.log(`✅ ${cfg.pageName} — altura: ${Y}px | x: ${frameX}px`);
    return lpFrame;
  }

  // ─── EXECUTAR BUILDER PARA CADA LP NA MESMA PÁGINA ────────
  // LP Geral ocupa x=0..1439; LPs de nicho começam a partir de x=1600
  const GAP = 160;
  const LP_W = 1440;
  let currentX = LP_W + GAP; // começa logo após a LP Geral

  for (const cfg of LP_CONFIGS) {
    await buildLP(cfg, currentX);
    currentX += LP_W + GAP;
  }

  // Zoom para mostrar todos os frames
  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);

  return `\n🎉 Concluído! Todos os frames criados na mesma página.
  ✓ LP Geral atualizada (Jurídica → Medicina, Planos removidos)
  ✓ LP Redação ENEM — x=1600 (amarelo #F2A922)
  ✓ LP Concurso Público — x=3200 (roxo #6E2E8E)
  ✓ LP Medicina — x=4800 (turquesa #00A79A)
  ✓ LP Mentoria — x=6400 (rosa #E8508A)

  Pressione Shift+1 no Figma para ver todos os frames juntos.`;

})();
