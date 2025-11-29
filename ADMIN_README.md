# EasySplit - Blog com WordPress na Hostinger

## 📋 Visão Geral da Arquitetura

```
easysplit.com.br/           → Site React (frontend)
easysplit.com.br/blog       → Página de blog do React
easysplit.com.br/wp/        → WordPress (CMS - escondido do público)
easysplit.com.br/wp/wp-admin → Painel admin do WordPress
```

---

## 🚀 PASSO A PASSO COMPLETO

### PASSO 1: Instalar WordPress na Hostinger

1. Acesse o **hPanel** da Hostinger (hpanel.hostinger.com)
2. Clique em **Sites** → selecione `easysplit.com.br`
3. Vá em **Instalar Aplicação** → **WordPress**
4. **IMPORTANTE**: No campo de diretório, digite: `wp`
   - Isso instala o WordPress em `easysplit.com.br/wp`
5. Preencha:
   - Título do site: EasySplit Blog
   - Usuário admin: seu_usuario
   - Senha: crie uma senha forte
   - Email: seu@email.com
6. Clique em **Instalar**

---

### PASSO 2: Configurar WordPress

1. Acesse `https://easysplit.com.br/wp/wp-admin`
2. Faça login com as credenciais criadas

#### 2.1 Configurar Links Permanentes
1. Vá em **Configurações** → **Links Permanentes**
2. Selecione **Nome do post**
3. Salve

#### 2.2 Criar Senha de Aplicativo (para o painel admin do React)
1. Vá em **Usuários** → **Perfil**
2. Role até **Senhas de Aplicativo**
3. Digite um nome: `EasySplit Admin`
4. Clique em **Adicionar Nova Senha de Aplicativo**
5. **COPIE a senha** (formato: `xxxx xxxx xxxx xxxx xxxx xxxx`)
   - ⚠️ Você só verá essa senha UMA VEZ!

---

### PASSO 3: Fazer Build do Site React

No seu terminal local:

```bash
npm run build
```

Isso cria a pasta `dist/` com os arquivos do site.

---

### PASSO 4: Fazer Upload dos Arquivos

#### Via Gerenciador de Arquivos (hPanel):

1. Acesse hPanel → **Gerenciador de Arquivos**
2. Navegue até `public_html/`
3. **Delete** os arquivos existentes (exceto a pasta `wp/`)
4. Faça upload de TODO o conteúdo da pasta `dist/`

#### Via FTP:

1. Use FileZilla ou similar
2. Conecte com as credenciais FTP do hPanel
3. Navegue até `public_html/`
4. Envie todos os arquivos de `dist/`

**IMPORTANTE**: NÃO sobrescreva a pasta `wp/`!

---

### PASSO 5: Configurar .htaccess

Crie ou edite o arquivo `.htaccess` na raiz (`public_html/`):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Não redirecionar WordPress
  RewriteRule ^wp/ - [L]
  
  # React SPA - redireciona todas as rotas para index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Headers de segurança e cache
<IfModule mod_headers.c>
  # Cache para assets
  <FilesMatch "\.(css|js|woff2|woff|ttf|svg|png|jpg|jpeg|gif|ico)$">
    Header set Cache-Control "max-age=31536000, public"
  </FilesMatch>
  
  # Permitir CORS para API do WordPress
  Header always set Access-Control-Allow-Origin "*"
  Header always set Access-Control-Allow-Methods "GET, POST, DELETE, OPTIONS"
  Header always set Access-Control-Allow-Headers "Authorization, Content-Type"
</IfModule>
```

---

## 🔐 Como Usar o Painel Admin

### Acessar o Painel
1. Vá para `https://easysplit.com.br/#/admin/login`
2. Use:
   - **Usuário**: seu usuário do WordPress
   - **Senha**: a **Senha de Aplicativo** (NÃO a senha normal!)

### Criar Posts
1. Faça login no painel
2. Clique em **Novo Post**
3. Preencha título, conteúdo, categorias
4. Clique em **Publicar**

---

## 📝 Gerenciar Posts Diretamente no WordPress

Você também pode gerenciar posts diretamente pelo WordPress:

1. Acesse `https://easysplit.com.br/wp/wp-admin`
2. Vá em **Posts** → **Adicionar Novo**
3. Os posts aparecerão automaticamente no blog React

---

## 🎨 Personalização

### Alterar URL do WordPress

Se você mudar onde o WordPress está instalado, edite `constants.ts`:

```typescript
export const WP_DOMAIN = 'https://easysplit.com.br/wp';
```

### Usar Mock Data (desenvolvimento)

Para testar sem WordPress, altere em `constants.ts`:

```typescript
export const USE_MOCK_DATA = true;
```

---

## 🐛 Troubleshooting

### "Credenciais inválidas"
- ✅ Verifique se está usando a **Senha de Aplicativo**
- ✅ Verifique se o usuário tem permissão de autor/editor

### Posts não aparecem
- ✅ Verifique se existem posts publicados no WordPress
- ✅ Teste: `https://easysplit.com.br/wp/wp-json/wp/v2/posts`

### Erro de CORS
- ✅ Verifique o .htaccess
- ✅ Ou instale o plugin "WP REST API - CORS" no WordPress

### Blog mostrando dados de exemplo
- ✅ Verifique se `USE_MOCK_DATA = false` em `constants.ts`
- ✅ Verifique se a URL do WordPress está correta

---

## 📁 Estrutura Final no Servidor

```
public_html/
├── index.html          # Site React
├── assets/             # CSS, JS, imagens do React
├── .htaccess           # Configurações Apache
└── wp/                 # WordPress
    ├── wp-admin/
    ├── wp-content/
    ├── wp-includes/
    └── ...
```

---

## ✨ Pronto!

Seu site está configurado:

- 🌐 **Site**: `https://easysplit.com.br`
- 📝 **Blog**: `https://easysplit.com.br/blog`
- 🔐 **Admin React**: `https://easysplit.com.br/admin/login` (acesso direto, sem link no site)
- ⚙️ **WordPress Admin**: `https://easysplit.com.br/wp/wp-admin`
