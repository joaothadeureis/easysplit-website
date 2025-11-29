import { FaqItem, PricingPlan } from "./types";

// ============================================================
// CONFIGURAÇÃO DO WORDPRESS - BLOG
// ============================================================
// O WordPress está instalado em: easysplit.com.br/wp
// O site React será hospedado em: easysplit.com.br
// ============================================================

// Domínio do WordPress (onde você instalou o WP)
export const WP_DOMAIN = 'https://easysplit.com.br/wp';

// API REST do WordPress
export const API_URL = `${WP_DOMAIN}/wp-json/wp/v2`;
export const WP_API_URL = `${API_URL}/posts`;
export const WP_ADMIN_URL = `${WP_DOMAIN}/wp-admin`;

// Se true, usa dados de exemplo (para desenvolvimento sem WP)
export const USE_MOCK_DATA = false;

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Funcionalidades', path: '/funcionalidades' },
  { name: 'Preços', path: '/pricing' },
  { name: 'Blog', path: '/blog' },
];

export const PLANS: PricingPlan[] = [
  {
    id: 'annual',
    name: 'Plano Anual',
    price: 'R$149,99',
    period: '/ano',
    description: 'Sempre atualizado, com suporte e novas funcionalidades',
    features: [
      'Inclui tudo da Licença Vitalícia',
      'Todas as atualizações futuras inclusas',
      'Novas funcionalidades exclusivas durante o ano',
      'Suporte prioritário para dúvidas e melhorias'
    ],
    recommended: true,
    promoTag: 'Mais Popular',
    buttonText: 'Assinar Anual',
    link: 'https://pay.kirvano.com/b651425c-3830-4e46-988d-5727e6630fb3',
    footerNote: '👉 Perfeito para quem quer estar sempre à frente.'
  },
  {
    id: 'lifetime',
    name: 'Licença Vitalícia',
    price: 'R$45,99',
    originalPrice: 'R$79,99',
    period: 'pagamento único',
    description: 'Pague uma vez e use para sempre',
    features: [
      'Acesso vitalício ao plugin',
      'Uso ilimitado em todos os seus sites',
      'Testes A/B/n sem restrições',
      'Sem atualizações futuras ou novas funcionalidades'
    ],
    recommended: false,
    promoTag: 'Promoção por tempo limitado',
    buttonText: 'Comprar Vitalício',
    link: 'https://pay.kirvano.com/36433822-1f61-492d-ba85-27cadb7522b3',
    footerNote: '👉 Ideal para começar hoje com o melhor custo-benefício.'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "Qual a diferença entre fazer um teste A/B na plataforma de anúncio e utilizar o EasySplit?",
    answer: "Plataformas de anúncios testam qual ANÚNCIO gera mais cliques. O EasySplit testa qual PÁGINA converte mais depois do clique, melhorando o ROI real e a experiência do usuário na página de destino."
  },
  {
    question: "Qual o diferencial do EasySplit?",
    answer: "O EasySplit roda testes na MESMA URL, sem redirecionamentos que prejudicam o SEO, e possui integração nativa com GA4 e Microsoft Clarity para métricas profundas."
  },
  {
    question: "Já existem ferramentas no mercado que fazem isso. Por que deveria comprar esta solução?",
    answer: "A maioria das ferramentas cobra mensalidades caras em dólar (como VWO ou Optimizely). O EasySplit oferece uma solução vitalícia ou anual acessível, em reais, focada no ecossistema WordPress."
  },
  {
    question: "Onde poderei acompanhar as minhas métricas?",
    answer: "Diretamente no Google Analytics 4 (eventos automáticos) e no Microsoft Clarity (heatmaps e gravações separados por variante). O plugin não possui dashboard próprio para garantir leveza e precisão dos dados nas ferramentas oficiais."
  },
  {
    question: "É difícil instalar?",
    answer: "Não. É um plugin WordPress padrão. Basta instalar, ativar e usar o shortcode nas suas páginas."
  },
  {
    question: "Funciona com Elementor?",
    answer: "Sim! Funciona com Elementor, Gutenberg, Divi, Bricks e até HTML puro. É compatível com qualquer construtor de páginas."
  },
  {
    question: "E se eu não gostar?",
    answer: "Oferecemos uma garantia incondicional de 7 dias. Se não aumentar suas conversões ou não for o que esperava, devolvemos 100% do dinheiro."
  },
  {
    question: "Como funciona?",
    answer: "Você cria versões da sua página, define a porcentagem de tráfego para cada uma e o plugin distribui os visitantes automaticamente, mantendo-os na mesma versão via cookies."
  },
  {
    question: "Posso usar em mais de um site?",
    answer: "Sim! A licença permite uso ilimitado em todos os seus sites."
  },
  {
    question: "Preciso saber programar?",
    answer: "Zero. A configuração é visual e via shortcodes simples."
  },
  {
    question: "Posso usar em campanhas de Google Ads e Meta Ads?",
    answer: "Sim, e é recomendado! Como a URL não muda, você não perde o histórico do anúncio nem o Quality Score."
  },
  {
    question: "Vou precisar pagar atualizações?",
    answer: "No plano Vitalício, não há cobrança extra, mas você não recebe novos recursos futuros. No plano Anual, você tem direito a todas as atualizações e novas funcionalidades."
  }
];

export const MOCK_BLOG_POSTS = [
  {
    id: 1,
    date: '2023-10-24T10:00:00',
    modified: '2023-10-24T10:00:00',
    slug: 'como-fazer-teste-ab-wordpress',
    link: '#/blog/como-fazer-teste-ab-wordpress',
    title: { rendered: 'Como fazer Teste A/B no WordPress sem gastar uma fortuna' },
    excerpt: { rendered: '<p>Descubra estratégias simples para aumentar suas conversões usando ferramentas nativas...</p>' },
    content: { 
      rendered: `
        <p>Os testes A/B são fundamentais para qualquer estratégia de otimização de conversão. No WordPress, existem diversas formas de implementá-los, mas nem todas são acessíveis ou fáceis de usar.</p>
        
        <h2>Por que fazer Testes A/B?</h2>
        <p>Testes A/B permitem que você compare duas versões de uma página para descobrir qual converte melhor. Ao invés de adivinhar o que funciona, você deixa os dados guiarem suas decisões.</p>
        
        <h2>O Problema das Ferramentas Tradicionais</h2>
        <p>Ferramentas como Optimizely e VWO são poderosas, mas cobram mensalidades em dólar que podem ser proibitivas para negócios brasileiros. Além disso, muitas exigem conhecimento técnico avançado.</p>
        
        <h2>A Solução: EasySplit</h2>
        <p>O EasySplit foi criado pensando no ecossistema WordPress brasileiro. Com ele, você pode:</p>
        <ul>
          <li>Criar testes A/B sem código</li>
          <li>Manter a mesma URL (sem prejudicar SEO)</li>
          <li>Integrar com GA4 e Clarity</li>
          <li>Pagar em reais, uma única vez</li>
        </ul>
        
        <h2>Conclusão</h2>
        <p>Não deixe que o custo das ferramentas impeça você de otimizar suas conversões. Com as opções certas, qualquer site WordPress pode se beneficiar de testes A/B profissionais.</p>
      `,
      protected: false 
    },
    categories: [1],
    tags: [1, 2],
    _embedded: {
      'wp:featuredmedia': [{ source_url: 'https://picsum.photos/800/600?random=1' }],
      'author': [{ id: 1, name: 'Equipe EasySplit' }],
      'wp:term': [
        [{ id: 1, name: 'CRO', slug: 'cro', taxonomy: 'category' }],
        [{ id: 1, name: 'WordPress', slug: 'wordpress', taxonomy: 'post_tag' }, { id: 2, name: 'Teste A/B', slug: 'teste-ab', taxonomy: 'post_tag' }]
      ]
    }
  },
  {
    id: 2,
    date: '2023-10-20T10:00:00',
    modified: '2023-10-20T10:00:00',
    slug: 'ga4-para-iniciantes',
    link: '#/blog/ga4-para-iniciantes',
    title: { rendered: 'Google Analytics 4: Configurando eventos de conversão' },
    excerpt: { rendered: '<p>O guia definitivo para rastrear vendas e leads no novo GA4 integrado ao seu site.</p>' },
    content: { 
      rendered: `
        <p>O Google Analytics 4 representa uma mudança significativa na forma como rastreamos e analisamos dados de websites. Neste guia, vamos explorar como configurar eventos de conversão corretamente.</p>
        
        <h2>Entendendo o GA4</h2>
        <p>Diferente do Universal Analytics, o GA4 é baseado em eventos. Tudo é um evento: pageviews, cliques, scrolls, e conversões.</p>
        
        <h2>Configurando Eventos</h2>
        <p>Para configurar um evento de conversão no GA4:</p>
        <ol>
          <li>Acesse Admin > Eventos</li>
          <li>Crie um novo evento ou marque um existente como conversão</li>
          <li>Configure os parâmetros necessários</li>
        </ol>
        
        <h2>Integrando com Testes A/B</h2>
        <p>Ao usar o EasySplit, os eventos são enviados automaticamente para o GA4, permitindo que você analise qual variante gera mais conversões.</p>
      `,
      protected: false 
    },
    categories: [2],
    tags: [3],
    _embedded: {
      'wp:featuredmedia': [{ source_url: 'https://picsum.photos/800/600?random=2' }],
      'author': [{ id: 2, name: 'Ana Silva' }],
      'wp:term': [
        [{ id: 2, name: 'Analytics', slug: 'analytics', taxonomy: 'category' }],
        [{ id: 3, name: 'GA4', slug: 'ga4', taxonomy: 'post_tag' }]
      ]
    }
  },
  {
    id: 3,
    date: '2023-10-15T10:00:00',
    modified: '2023-10-15T10:00:00',
    slug: 'cro-landing-pages',
    link: '#/blog/cro-landing-pages',
    title: { rendered: '5 Elementos de Landing Pages que matam sua conversão' },
    excerpt: { rendered: '<p>Se sua página não converte, verifique se você não está cometendo estes erros clássicos.</p>' },
    content: { 
      rendered: `
        <p>Landing pages são cruciais para qualquer campanha de marketing digital. No entanto, muitos profissionais cometem erros que podem destruir suas taxas de conversão.</p>
        
        <h2>1. Headlines Fracas</h2>
        <p>Sua headline é a primeira coisa que os visitantes veem. Se não for clara e impactante, eles vão embora.</p>
        
        <h2>2. Formulários Longos Demais</h2>
        <p>Cada campo adicional no seu formulário reduz a taxa de conversão. Peça apenas o essencial.</p>
        
        <h2>3. Falta de Prova Social</h2>
        <p>Depoimentos, logos de clientes e números de usuários aumentam a confiança.</p>
        
        <h2>4. CTAs Genéricos</h2>
        <p>"Clique aqui" ou "Enviar" são fracos. Use CTAs que mostrem o valor: "Começar grátis" ou "Aumentar minhas vendas".</p>
        
        <h2>5. Página Lenta</h2>
        <p>Cada segundo de delay reduz conversões em até 7%. Otimize suas imagens e scripts.</p>
        
        <h2>Como Descobrir Seus Problemas</h2>
        <p>Use testes A/B para validar mudanças. O EasySplit permite testar diferentes versões da sua landing page sem complicação.</p>
      `,
      protected: false 
    },
    categories: [1],
    tags: [1, 4],
    _embedded: {
      'wp:featuredmedia': [{ source_url: 'https://picsum.photos/800/600?random=3' }],
      'author': [{ id: 3, name: 'Carlos Dev' }],
      'wp:term': [
        [{ id: 1, name: 'CRO', slug: 'cro', taxonomy: 'category' }],
        [{ id: 1, name: 'WordPress', slug: 'wordpress', taxonomy: 'post_tag' }, { id: 4, name: 'Landing Pages', slug: 'landing-pages', taxonomy: 'post_tag' }]
      ]
    }
  }
];