import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-brand-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8">Política de Privacidade</h1>
        <p className="text-neutral-400 mb-12">Última atualização: 29 de novembro de 2025</p>

        <div className="prose prose-invert prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introdução</h2>
            <p className="text-neutral-300 leading-relaxed">
              A Agência Maximum ("nós", "nosso") opera o site easysplit.com.br e o plugin EasySplit. 
              Esta política descreve como coletamos, usamos e protegemos suas informações pessoais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Informações que Coletamos</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">Podemos coletar os seguintes tipos de informações:</p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li><strong>Informações de cadastro:</strong> nome, e-mail, dados de pagamento</li>
              <li><strong>Dados de uso:</strong> páginas visitadas, tempo no site, ações realizadas</li>
              <li><strong>Informações técnicas:</strong> endereço IP, tipo de navegador, sistema operacional</li>
              <li><strong>Cookies:</strong> utilizamos cookies para melhorar a experiência do usuário</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Como Usamos suas Informações</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">Utilizamos as informações coletadas para:</p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>Processar pedidos e fornecer o serviço contratado</li>
              <li>Enviar atualizações sobre o produto e promoções (com seu consentimento)</li>
              <li>Melhorar nosso site e serviços</li>
              <li>Responder a solicitações de suporte</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Cookies</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Utilizamos cookies para:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li><strong>Cookies essenciais:</strong> necessários para o funcionamento do site</li>
              <li><strong>Cookies de análise:</strong> Google Analytics para entender o uso do site</li>
              <li><strong>Cookies de marketing:</strong> para campanhas publicitárias relevantes</li>
            </ul>
            <p className="text-neutral-300 leading-relaxed mt-4">
              Você pode gerenciar suas preferências de cookies através do banner exibido no site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Compartilhamento de Dados</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Podemos compartilhar suas informações com:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>Processadores de pagamento (para transações financeiras)</li>
              <li>Ferramentas de análise (Google Analytics, Microsoft Clarity)</li>
              <li>Autoridades legais (quando exigido por lei)</li>
            </ul>
            <p className="text-neutral-300 leading-relaxed mt-4">
              Não vendemos suas informações pessoais para terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Segurança dos Dados</h2>
            <p className="text-neutral-300 leading-relaxed">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações, 
              incluindo criptografia SSL, acesso restrito a dados e monitoramento de segurança.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Seus Direitos (LGPD)</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar exclusão de seus dados</li>
              <li>Revogar consentimento a qualquer momento</li>
              <li>Solicitar portabilidade de dados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Retenção de Dados</h2>
            <p className="text-neutral-300 leading-relaxed">
              Mantemos suas informações pelo tempo necessário para cumprir as finalidades descritas nesta política, 
              a menos que um período maior seja exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Alterações nesta Política</h2>
            <p className="text-neutral-300 leading-relaxed">
              Podemos atualizar esta política periodicamente. Alterações significativas serão notificadas 
              por e-mail ou através de aviso no site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contato</h2>
            <p className="text-neutral-300 leading-relaxed">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
              <br />
              <a href="mailto:privacidade@easysplit.com.br" className="text-brand-yellow hover:underline">
                privacidade@easysplit.com.br
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
