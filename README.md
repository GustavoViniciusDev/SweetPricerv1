# 🍰 SweetPricer

**SweetPricer** é um sistema de precificação voltado para confeitarias e vendedores individuais. Ele permite calcular preços de forma precisa e registrar históricos, oferecendo funcionalidades que ajudam a gerenciar custos e aumentar a lucratividade.


## 🚀 Funcionalidades

- 📊 **Precificação**: Calcule o custo de produção e defina preços baseados nos ingredientes e tempo de preparo.
- 📝 **Histórico de Preços**: Acompanhe o histórico de precificações e veja as mudanças de preço ao longo do tempo.
- 📱 **Responsivo**: Use o SweetPricer em computadores, tablets e smartphones.
- 💸 **Gerenciamento de Planos**: Integração com sistemas de pagamento, oferecendo diferentes planos de assinatura.

## 🛠 Tecnologias Utilizadas

- **Frontend**: React com Inertia.js
- **Backend**: Laravel 11
- **Banco de Dados**: MySQL
- **Serviços de Pagamento**: Stripe para cobrança de planos
- **Ambiente de Deploy**: CloudPanel, Hostinger VPS

## 🎯 Objetivo

O **SweetPricer** foi desenvolvido para ajudar confeiteiros e vendedores autônomos a otimizar seus preços de venda com base em custos reais. O sistema oferece uma interface intuitiva para calcular e gerenciar custos de produção de maneira precisa, sem complicações.

## 🖥️ Deploy

O sistema está em produção e pode ser acessado [aqui](https://sweetpricer.app).

## 🛡️ Configuração

### Pré-requisitos

- PHP >= 8.2
- Node.js >= 18.x
- Composer
- MySQL
- Stripe Account

### Passo a Passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/seuusuario/sweetpricer.git
   cd sweetpricer

2. Instale as dependências:

       composer install
       npm install

3. Crie o arquivo .env:

       cp .env.example .env
   
4. Configure as variáveis de ambiente no .env, incluindo o Stripe e MySQL:

        STRIPE_KEY=your_stripe_key
        STRIPE_SECRET=your_stripe_secret

5. Gere a chave da aplicação:

        php artisan key:generate

6. Execute as migrações e seeds:

       php artisan migrate --seed

7. Compile o frontend:

       npm run build

8. Inicie o servidor de desenvolvimento:

        php artisan serve

   
Agora o sistema estará rodando localmente em http://localhost:8000.

🛒 Planos de Assinatura
O SweetPricer oferece diferentes planos de assinatura para atender às necessidades de cada cliente. O gerenciamento de planos é feito através da integração com o Stripe, onde os usuários podem escolher o plano e fazer o pagamento de forma segura.

📷 Demonstração

![image](https://github.com/user-attachments/assets/f5b405e1-56df-41b8-9124-d2d9021ab4c4)


🤝 Contribuindo
Se quiser contribuir com o projeto:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (git checkout -b feature/nova-feature).
3. Faça o commit das suas alterações (git commit -m 'Adiciona nova feature').
4. Envie a sua branch (git push origin feature/nova-feature).
5. Abra um Pull Request.

🧑‍💻 Autor
Desenvolvido com ❤️ por Gustavo Linhares.
