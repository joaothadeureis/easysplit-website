import React from 'react';
import { Link } from 'react-router-dom';

export const TermsOfUse: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-brand-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8">Termos de Uso</h1>
        <p className="text-neutral-400 mb-12">Última atualização: 29 de novembro de 2025</p>

        <div className="prose prose-invert prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Aceitação dos Termos</h2>
            <p className="text-neutral-300 leading-relaxed">
              Ao acessar e usar o EasySplit ("Serviço"), você concorda em cumprir e estar vinculado a estes Termos de Uso. 
              Se você não concordar com qualquer parte destes termos, não poderá acessar o Serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Descrição do Serviço</h2>
            <p className="text-neutral-300 leading-relaxed">
              O EasySplit é um plugin WordPress que permite realizar testes A/B em páginas web. 
              O serviço inclui funcionalidades de divisão de tráfego, integração com ferramentas de analytics e 
              persistência de variantes via cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Licença de Uso</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Ao adquirir o EasySplit, você recebe uma licença não-exclusiva e intransferível para:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>Usar o plugin em sites de sua propriedade ou de seus clientes</li>
              <li>Receber atualizações conforme o plano adquirido</li>
              <li>Acessar suporte técnico durante o período de licença</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Restrições de Uso</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">Você não pode:</p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>Revender, redistribuir ou sublicenciar o plugin</li>
              <li>Modificar, descompilar ou fazer engenharia reversa do código</li>
              <li>Usar o serviço para atividades ilegais ou fraudulentas</li>
              <li>Remover avisos de direitos autorais ou propriedade</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Pagamento e Reembolso</h2>
            <p className="text-neutral-300 leading-relaxed">
              Oferecemos garantia de 7 dias. Se não estiver satisfeito com o produto, você pode solicitar 
              reembolso integral dentro deste período, sem perguntas. Após 7 dias, não serão aceitas solicitações de reembolso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Suporte Técnico</h2>
            <p className="text-neutral-300 leading-relaxed">
              O suporte técnico está disponível via e-mail para usuários com licença ativa. 
              O tempo de resposta pode variar de acordo com a complexidade da solicitação.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Limitação de Responsabilidade</h2>
            <p className="text-neutral-300 leading-relaxed">
              O EasySplit é fornecido "como está". Não garantimos que o serviço será ininterrupto ou livre de erros. 
              Em nenhuma circunstância seremos responsáveis por danos indiretos, incidentais ou consequentes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Modificações dos Termos</h2>
            <p className="text-neutral-300 leading-relaxed">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. 
              Alterações significativas serão comunicadas por e-mail ou através do site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Contato</h2>
            <p className="text-neutral-300 leading-relaxed">
              Para questões sobre estes Termos de Uso, entre em contato através do e-mail: 
              <a href="mailto:suporte@easysplit.com.br" className="text-brand-yellow hover:underline ml-1">
                suporte@easysplit.com.br
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link to="/" className="text-brand-yellow hover:text-yellow-300 transition-colors">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};
