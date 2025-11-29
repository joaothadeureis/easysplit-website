import React from 'react';
import { Split, Cookie, BarChart2, Code, Activity, Layers, Zap, Shield, Target, Settings } from 'lucide-react';

export interface FeatureData {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  heroImage: string;
  benefits: {
    title: string;
    description: string;
  }[];
  howItWorksIntro: string;
  steps: {
    title: string;
    description: string;
  }[];
  useCases?: {
    title: string;
    description: string;
    example?: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  metaTitle: string;
  metaDescription: string;
}

export const FEATURES_DATA: FeatureData[] = [
  {
    slug: 'teste-ab',
    title: 'Testes A/B/C Reais',
    shortDescription: 'Teste quantas variações quiser na mesma URL, sem prejudicar SEO.',
    description: 'O EasySplit permite criar testes A/B, A/B/C ou até mais variantes na mesma URL. Diferente de outras ferramentas, não usamos redirecionamentos que prejudicam seu SEO e Quality Score do Google Ads.',
    icon: <Split className="w-8 h-8 text-brand-yellow" />,
    badge: 'Core Feature',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    benefits: [
      {
        title: 'Sem Redirecionamentos',
        description: 'O conteúdo é injetado na mesma URL, mantendo seu SEO intacto e o Quality Score do Google Ads alto.'
      },
      {
        title: 'Variantes Ilimitadas',
        description: 'Teste A/B, A/B/C, A/B/C/D... quantas variantes precisar para encontrar a versão campeã.'
      },
      {
        title: 'Distribuição Flexível',
        description: 'Defina exatamente qual porcentagem do tráfego vai para cada variante.'
      },
      {
        title: 'Resultados Confiáveis',
        description: 'Cada visitante sempre vê a mesma variante, garantindo dados consistentes.'
      },
      {
        title: 'Compatível com Ads',
        description: 'Funciona perfeitamente com Google Ads, Facebook Ads e outras plataformas.'
      },
      {
        title: 'Performance Intacta',
        description: 'Carregamento rápido sem impacto na velocidade da página.'
      }
    ],
    howItWorksIntro: 'Configure um teste A/B em minutos, sem precisar de conhecimento técnico.',
    steps: [
      {
        title: 'Crie as Variantes',
        description: 'Crie páginas WordPress ou HTML com as versões que deseja testar.'
      },
      {
        title: 'Configure o Shortcode',
        description: 'Use o shortcode [abx] para definir as variantes e pesos.'
      },
      {
        title: 'Ative o Teste',
        description: 'Publique a página e o EasySplit começa a distribuir automaticamente.'
      },
      {
        title: 'Analise os Dados',
        description: 'Acompanhe os resultados no GA4 e descubra qual versão converte mais.'
      }
    ],
    useCases: [
      {
        title: 'Landing Pages de Vendas',
        description: 'Teste diferentes páginas completas para maximizar conversões.',
        example: '[abx exp="teste_vendas" v1="wp:123:50" v2="wp:456:50"]'
      },
      {
        title: 'Páginas de Captura',
        description: 'Compare páginas WordPress diferentes ou versões HTML estáticas.',
        example: '[abx exp="captura" v1="wp:10:70" v2="html:/landing-b/:30"]'
      },
      {
        title: 'Testes Multi-Variante',
        description: 'Teste até 6 variantes simultâneas (A, B, C, D, E, F).',
        example: '[abx exp="multi" v1="wp:1:33" v2="wp:2:33" v3="wp:3:34"]'
      },
      {
        title: 'Páginas HTML Estáticas',
        description: 'Use páginas HTML prontas como variantes do teste.',
        example: '[abx exp="html_test" v1="html:/promo-a/:50" v2="html:/promo-b/:50"]'
      }
    ],
    faqs: [
      {
        question: 'Quantas variantes posso testar simultaneamente?',
        answer: 'O EasySplit suporta até 6 variantes simultâneas (v1 até v6, correspondendo a A, B, C, D, E, F). Porém, recomendamos no máximo 4 variantes por teste para resultados estatisticamente significativos.'
      },
      {
        question: 'O teste A/B afeta meu SEO?',
        answer: 'Não! O EasySplit entrega o conteúdo na mesma URL sem redirecionamentos. O documento completo da variante é servido diretamente, mantendo seu SEO e Quality Score intactos.'
      },
      {
        question: 'Qual o formato do shortcode?',
        answer: 'O formato é [abx exp="nome" v1="tipo:valor:peso"]. Tipo pode ser "wp" (ID do post) ou "html" (caminho). Peso é a porcentagem de tráfego. Ex: [abx exp="teste" v1="wp:123:50" v2="html:/promo/:50"]'
      }
    ],
    metaTitle: 'Testes A/B/C Reais no WordPress | EasySplit',
    metaDescription: 'Crie testes A/B ilimitados na mesma URL sem prejudicar SEO. O EasySplit é a ferramenta mais simples para otimizar conversões no WordPress.'
  },
  {
    slug: 'stickiness-cookies',
    title: 'Stickiness via Cookies',
    shortDescription: 'Visitantes sempre veem a mesma variante em todas as visitas.',
    description: 'O EasySplit usa cookies inteligentes para garantir que cada visitante sempre veja a mesma variante do teste. Isso garante consistência na experiência do usuário e dados confiáveis para análise.',
    icon: <Cookie className="w-8 h-8 text-brand-purple" />,
    heroImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
    benefits: [
      {
        title: 'Experiência Consistente',
        description: 'Visitantes nunca verão a página "piscar" entre variantes diferentes.'
      },
      {
        title: 'Dados Confiáveis',
        description: 'Cada usuário é contado apenas uma vez por variante, eliminando duplicações.'
      },
      {
        title: 'Jornada Completa',
        description: 'Acompanhe o usuário desde o primeiro clique até a conversão final.'
      },
      {
        title: 'Sem Confusão',
        description: 'Evite que o usuário veja ofertas diferentes em visitas consecutivas.'
      },
      {
        title: 'Cross-Session',
        description: 'A variante persiste mesmo se o usuário fechar o navegador e voltar depois.'
      },
      {
        title: 'LGPD Friendly',
        description: 'Cookies técnicos necessários para funcionamento, sem rastreamento invasivo.'
      }
    ],
    howItWorksIntro: 'O sistema de cookies funciona automaticamente, sem configuração adicional.',
    steps: [
      {
        title: 'Primeira Visita',
        description: 'O visitante acessa a página e é sorteado para uma variante.'
      },
      {
        title: 'Cookie Salvo',
        description: 'Um cookie é criado no navegador do visitante com a variante atribuída.'
      },
      {
        title: 'Visitas Futuras',
        description: 'Em todas as próximas visitas, o mesmo conteúdo é exibido.'
      },
      {
        title: 'Dados Precisos',
        description: 'O GA4 recebe eventos consistentes para análise confiável.'
      }
    ],
    useCases: [
      {
        title: 'Funis de Vendas',
        description: 'Garanta que o usuário veja a mesma oferta durante toda a jornada de compra.',
        example: 'Usuário vê oferta A na landing → mesmo desconto no checkout → consistência total.'
      },
      {
        title: 'Testes de Longo Prazo',
        description: 'Execute testes por semanas sem perder a consistência dos dados.',
        example: 'Teste de 30 dias com milhares de visitantes mantendo integridade dos resultados.'
      }
    ],
    faqs: [
      {
        question: 'Por quanto tempo o cookie persiste?',
        answer: 'Por padrão, o cookie persiste por 30 dias. Isso significa que o visitante verá a mesma variante por até 30 dias, mesmo em dispositivos diferentes (se estiver logado).'
      },
      {
        question: 'E se o usuário limpar os cookies?',
        answer: 'Se o usuário limpar os cookies, ele será sorteado novamente na próxima visita. Isso é raro e não afeta significativamente os resultados do teste.'
      }
    ],
    metaTitle: 'Stickiness via Cookies - Experiência Consistente | EasySplit',
    metaDescription: 'Garanta que visitantes sempre vejam a mesma variante do teste A/B. Cookies inteligentes para dados confiáveis e experiência consistente.'
  },
  {
    slug: 'integracao-ga4',
    title: 'Integração GA4',
    shortDescription: 'Eventos automáticos para Google Analytics 4 sem configuração.',
    description: 'O EasySplit envia automaticamente eventos personalizados para o Google Analytics 4, permitindo que você crie segmentos, audiências e relatórios baseados nas variantes do teste A/B.',
    icon: <BarChart2 className="w-8 h-8 text-blue-500" />,
    badge: 'Popular',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    benefits: [
      {
        title: 'Eventos Automáticos',
        description: 'Eventos ab_experiment e ab_variant enviados automaticamente para o GA4.'
      },
      {
        title: 'Segmentos por Variante',
        description: 'Crie segmentos de audiência baseados em qual variante o usuário viu.'
      },
      {
        title: 'Relatórios Customizados',
        description: 'Construa relatórios comparando conversões entre variantes A, B, C...'
      },
      {
        title: 'Integração Nativa',
        description: 'Funciona com qualquer instalação do GA4 via gtag.js ou GTM.'
      },
      {
        title: 'Remarketing Inteligente',
        description: 'Crie audiências no Google Ads baseadas nas variantes para remarketing.'
      },
      {
        title: 'Sem Código Extra',
        description: 'Zero configuração técnica necessária - funciona out of the box.'
      }
    ],
    howItWorksIntro: 'A integração é automática. Basta ter o GA4 instalado no site.',
    steps: [
      {
        title: 'Detecta o GA4',
        description: 'O EasySplit detecta automaticamente sua instalação do GA4.'
      },
      {
        title: 'Envia Eventos',
        description: 'Eventos personalizados são disparados quando o usuário vê uma variante.'
      },
      {
        title: 'Crie Segmentos',
        description: 'No GA4, crie segmentos filtrando pelo parâmetro ab_variant.'
      },
      {
        title: 'Analise Conversões',
        description: 'Compare taxas de conversão entre variantes diretamente no GA4.'
      }
    ],
    useCases: [
      {
        title: 'Comparar Conversões',
        description: 'Veja qual variante gera mais vendas ou leads no relatório de conversões.',
        example: 'Variante A: 2.3% conversão | Variante B: 3.1% conversão (+35%)'
      },
      {
        title: 'Remarketing Segmentado',
        description: 'Crie audiências no Google Ads apenas para usuários que viram a variante vencedora.',
        example: 'Audiência: Usuários variante B que não converteram → Remarketing agressivo'
      },
      {
        title: 'Funis por Variante',
        description: 'Construa funis separados para entender onde cada variante perde usuários.',
        example: 'Funil Variante A vs Funil Variante B → Identifique gargalos específicos'
      }
    ],
    faqs: [
      {
        question: 'Preciso configurar algo no GA4?',
        answer: 'Não! Os eventos são enviados automaticamente. Você só precisa criar os segmentos e relatórios que desejar usando os parâmetros ab_experiment e ab_variant.'
      },
      {
        question: 'Funciona com Google Tag Manager?',
        answer: 'Sim! Se você usa GTM para instalar o GA4, o EasySplit detecta e envia os eventos corretamente através do dataLayer.'
      },
      {
        question: 'Quais eventos são enviados?',
        answer: 'O EasySplit envia o evento "ab_experiment" com os parâmetros: experiment_id, variant (a, b, c...) e page_url.'
      }
    ],
    metaTitle: 'Integração GA4 Automática para Testes A/B | EasySplit',
    metaDescription: 'Eventos automáticos para Google Analytics 4. Crie segmentos e relatórios de conversão por variante sem configuração técnica.'
  },
  {
    slug: 'microsoft-clarity',
    title: 'Microsoft Clarity',
    shortDescription: 'Heatmaps e gravações de tela por variante do teste.',
    description: 'Integração nativa com Microsoft Clarity permite ver heatmaps e gravações de tela separados por variante. Entenda exatamente como os usuários interagem com cada versão da sua página.',
    icon: <Activity className="w-8 h-8 text-orange-500" />,
    heroImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop',
    benefits: [
      {
        title: 'Heatmaps por Variante',
        description: 'Veja onde os usuários clicam em cada versão da página.'
      },
      {
        title: 'Gravações Segmentadas',
        description: 'Assista sessões reais filtradas por variante A, B ou C.'
      },
      {
        title: '100% Gratuito',
        description: 'Microsoft Clarity é gratuito, sem limites de sessões.'
      },
      {
        title: 'Scroll Depth',
        description: 'Entenda até onde os usuários rolam em cada variante.'
      },
      {
        title: 'Dead Clicks',
        description: 'Identifique cliques frustrados que não levam a lugar nenhum.'
      },
      {
        title: 'Rage Clicks',
        description: 'Detecte quando usuários clicam repetidamente por frustração.'
      }
    ],
    howItWorksIntro: 'O EasySplit envia tags personalizadas para o Clarity automaticamente.',
    steps: [
      {
        title: 'Instale o Clarity',
        description: 'Adicione o código do Microsoft Clarity ao seu site (é grátis).'
      },
      {
        title: 'EasySplit Tageia',
        description: 'Cada sessão recebe uma tag com a variante visualizada.'
      },
      {
        title: 'Filtre no Clarity',
        description: 'Use os filtros do Clarity para ver apenas sessões de uma variante.'
      },
      {
        title: 'Compare Comportamento',
        description: 'Entenda visualmente por que uma variante converte mais.'
      }
    ],
    useCases: [
      {
        title: 'Diagnóstico de Baixa Conversão',
        description: 'Descubra por que a variante B converte menos assistindo gravações.',
        example: 'Sessões mostram usuários confusos com o novo layout do botão de compra.'
      },
      {
        title: 'Validação de Hipóteses',
        description: 'Confirme se as mudanças tiveram o efeito esperado no comportamento.',
        example: 'Heatmap mostra que novo CTA recebe 40% mais atenção que o original.'
      }
    ],
    faqs: [
      {
        question: 'Preciso pagar pelo Microsoft Clarity?',
        answer: 'Não! O Microsoft Clarity é 100% gratuito, sem limites de sessões ou páginas. Você só precisa criar uma conta gratuita.'
      },
      {
        question: 'A integração é automática?',
        answer: 'Sim! Se você tem o Clarity instalado, o EasySplit envia as tags automaticamente. Você só precisa usar os filtros no painel do Clarity.'
      }
    ],
    metaTitle: 'Integração Microsoft Clarity | Heatmaps por Variante | EasySplit',
    metaDescription: 'Veja heatmaps e gravações de tela por variante do teste A/B. Integração gratuita com Microsoft Clarity para análise visual.'
  },
  {
    slug: 'shortcodes',
    title: 'Shortcode [abx]',
    shortDescription: 'Configure testes A/B com um único shortcode simples.',
    description: 'O EasySplit usa o shortcode [abx] para configurar testes A/B de páginas completas. Defina variantes WordPress (por ID) ou páginas HTML estáticas com pesos personalizados.',
    icon: <Code className="w-8 h-8 text-green-500" />,
    heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    benefits: [
      {
        title: 'Sintaxe Clara',
        description: 'Formato: [abx exp="nome" v1="tipo:valor:peso" v2="tipo:valor:peso"]'
      },
      {
        title: 'Páginas WordPress',
        description: 'Use type "wp" com o ID do post: v1="wp:123:50"'
      },
      {
        title: 'Páginas HTML',
        description: 'Use type "html" com o caminho: v1="html:/promo/:50"'
      },
      {
        title: 'Até 6 Variantes',
        description: 'Suporta v1 até v6 (variantes A, B, C, D, E, F).'
      },
      {
        title: 'Pesos Flexíveis',
        description: 'Defina a porcentagem de tráfego para cada variante.'
      },
      {
        title: 'QA Fácil',
        description: 'Force variantes via URL: ?variant=A ou ?variant=B'
      }
    ],
    howItWorksIntro: 'Um único shortcode configura todo o experimento.',
    steps: [
      {
        title: 'Crie as Páginas',
        description: 'Crie as páginas WordPress ou HTML que serão as variantes.'
      },
      {
        title: 'Escreva o Shortcode',
        description: 'Use [abx exp="nome" v1="wp:ID:peso" v2="wp:ID:peso"]'
      },
      {
        title: 'Publique a Página',
        description: 'Publique a página do experimento com o shortcode.'
      },
      {
        title: 'Teste com QA',
        description: 'Use ?variant=A ou ?variant=B para testar cada versão.'
      }
    ],
    useCases: [
      {
        title: 'Teste A/B Simples',
        description: 'Compare duas páginas WordPress com tráfego 50/50.',
        example: '[abx exp="teste_landing" v1="wp:123:50" v2="wp:456:50"]'
      },
      {
        title: 'Teste com HTML Estático',
        description: 'Compare página WordPress com versão HTML.',
        example: '[abx exp="wp_vs_html" v1="wp:10:60" v2="html:/landing-b/:40"]'
      },
      {
        title: 'Teste Multi-Variante',
        description: 'Teste 3 ou mais versões simultaneamente.',
        example: '[abx exp="multi" v1="wp:1:40" v2="wp:2:30" v3="wp:3:30"]'
      },
      {
        title: 'Reset de Cookie',
        description: 'Limpe o cookie do teste adicionando ?abreset à URL.',
        example: 'https://seusite.com/pagina/?abreset'
      }
    ],
    faqs: [
      {
        question: 'Qual o formato correto do shortcode?',
        answer: 'O formato é [abx exp="nome_experimento" v1="tipo:valor:peso"]. Tipo pode ser "wp" (ID do post WordPress) ou "html" (caminho relativo). Peso é a porcentagem de tráfego (ex: 50).'
      },
      {
        question: 'Como testar uma variante específica?',
        answer: 'Adicione ?variant=A (ou B, C, D, E, F) na URL para forçar uma variante específica durante o QA.'
      },
      {
        question: 'Como resetar o cookie do teste?',
        answer: 'Adicione ?abreset na URL para limpar o cookie e ser sorteado novamente.'
      }
    ],
    metaTitle: 'Shortcode [abx] para Testes A/B WordPress | EasySplit',
    metaDescription: 'Configure testes A/B com um único shortcode. Suporta páginas WordPress e HTML estático com pesos personalizados.'
  },
  {
    slug: 'compatibilidade-wordpress',
    title: 'Compatibilidade Universal',
    shortDescription: 'Funciona com qualquer tema, builder ou plugin WordPress.',
    description: 'O EasySplit foi desenvolvido para funcionar com qualquer instalação WordPress. Compatível com todos os temas, page builders e plugins populares do mercado.',
    icon: <img src="https://agenciamaximum.com/wp-content/uploads/2025/10/wordpress.svg" alt="WordPress" className="w-8 h-8" />,
    badge: 'Universal',
    heroImage: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=2036&auto=format&fit=crop',
    benefits: [
      {
        title: 'Todos os Themes',
        description: 'Funciona com Astra, GeneratePress, Divi, OceanWP, Avada e qualquer outro.'
      },
      {
        title: 'Page Builders',
        description: 'Compatível com Elementor, Divi Builder, Beaver Builder, Oxygen, Bricks.'
      },
      {
        title: 'WooCommerce',
        description: 'Teste páginas de produto, checkout, carrinho e upsells.'
      },
      {
        title: 'Gutenberg',
        description: 'Funciona perfeitamente com o editor de blocos nativo do WordPress.'
      },
      {
        title: 'Plugins de Cache',
        description: 'Compatível com WP Rocket, LiteSpeed Cache, W3 Total Cache e outros.'
      },
      {
        title: 'Multisite',
        description: 'Funciona em instalações WordPress Multisite sem problemas.'
      }
    ],
    howItWorksIntro: 'Instale o plugin e comece a usar. Sem configurações complexas.',
    steps: [
      {
        title: 'Instale o Plugin',
        description: 'Faça upload do .zip ou instale pelo painel do WordPress.'
      },
      {
        title: 'Ative a Licença',
        description: 'Insira sua chave de licença nas configurações.'
      },
      {
        title: 'Use em Qualquer Página',
        description: 'Adicione shortcodes em qualquer editor ou builder.'
      },
      {
        title: 'Funciona Automaticamente',
        description: 'O plugin detecta seu ambiente e se adapta.'
      }
    ],
    useCases: [
      {
        title: 'Lojas WooCommerce',
        description: 'Teste descrições, imagens e preços de produtos para aumentar vendas.',
        example: 'Compare diferentes layouts de página de produto.'
      },
      {
        title: 'Sites Elementor',
        description: 'Use o widget de shortcode para testar seções inteiras.',
        example: 'Teste hero sections, CTAs e formulários de captura.'
      },
      {
        title: 'Blogs e Portais',
        description: 'Teste layouts de artigos, posicionamento de ads e CTAs.',
        example: 'Compare sidebar vs sem sidebar para aumentar tempo na página.'
      }
    ],
    faqs: [
      {
        question: 'Funciona com meu tema premium?',
        answer: 'Sim! O EasySplit é compatível com qualquer tema WordPress, gratuito ou premium. Se encontrar algum problema, nosso suporte resolve.'
      },
      {
        question: 'E se eu usar plugin de cache?',
        answer: 'Funciona perfeitamente! O EasySplit usa cookies no lado do cliente, então o cache não interfere na distribuição das variantes.'
      },
      {
        question: 'Preciso desativar outros plugins?',
        answer: 'Não! O EasySplit foi desenvolvido para conviver harmoniosamente com outros plugins. Não há conflitos conhecidos.'
      }
    ],
    metaTitle: 'Compatibilidade WordPress Universal | EasySplit',
    metaDescription: 'EasySplit funciona com qualquer tema, builder ou plugin WordPress. Elementor, Divi, WooCommerce, Gutenberg e mais.'
  }
];
