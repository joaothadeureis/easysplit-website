const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'easysplit-blog-secret-key-change-in-production';

// Paths
const DATA_DIR = path.join(__dirname, 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure directories exist
[DATA_DIR, UPLOADS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Initialize data files if they don't exist
const initializeDataFiles = () => {
  if (!fs.existsSync(POSTS_FILE)) {
    fs.writeFileSync(POSTS_FILE, JSON.stringify([], null, 2));
  }
  
  if (!fs.existsSync(CATEGORIES_FILE)) {
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify([
      { id: 1, name: 'CRO', slug: 'cro', count: 0 },
      { id: 2, name: 'WordPress', slug: 'wordpress', count: 0 },
      { id: 3, name: 'Tráfego Pago', slug: 'trafego-pago', count: 0 }
    ], null, 2));
  }
  
  if (!fs.existsSync(USERS_FILE)) {
    // Default admin user (password: admin123)
    const defaultPassword = bcrypt.hashSync('admin123', 10);
    fs.writeFileSync(USERS_FILE, JSON.stringify([
      {
        id: 1,
        username: 'admin',
        password: defaultPassword,
        name: 'Administrador',
        email: 'admin@easysplit.com.br',
        role: 'administrator'
      }
    ], null, 2));
    console.log('📝 Usuário admin criado! Login: admin / Senha: admin123');
  }
};

initializeDataFiles();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(UPLOADS_DIR));

// Helper functions
const readJSON = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch {
    return [];
  }
};

const writeJSON = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Auth middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

// ==================== AUTH ROUTES ====================

// Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const users = readJSON(USERS_FILE);
  
  const user = users.find(u => u.username === username);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// Validate token / Get current user
app.get('/api/auth/me', authenticate, (req, res) => {
  const users = readJSON(USERS_FILE);
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });
});

// ==================== POSTS ROUTES ====================

// List posts (public)
app.get('/api/posts', (req, res) => {
  const { page = 1, per_page = 9, category, search, status = 'publish' } = req.query;
  let posts = readJSON(POSTS_FILE);
  
  // Filter by status (only published for public)
  posts = posts.filter(p => p.status === status);
  
  // Filter by category
  if (category) {
    posts = posts.filter(p => p.categories?.includes(parseInt(category)));
  }
  
  // Search
  if (search) {
    const searchLower = search.toLowerCase();
    posts = posts.filter(p => 
      p.title.toLowerCase().includes(searchLower) ||
      p.excerpt?.toLowerCase().includes(searchLower)
    );
  }
  
  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Pagination
  const total = posts.length;
  const totalPages = Math.ceil(total / per_page);
  const start = (page - 1) * per_page;
  const paginatedPosts = posts.slice(start, start + parseInt(per_page));
  
  // Format response (WordPress-like structure)
  const formattedPosts = paginatedPosts.map(post => ({
    id: post.id,
    date: post.date,
    modified: post.modified || post.date,
    slug: post.slug,
    status: post.status,
    title: { rendered: post.title },
    content: { rendered: post.content, protected: false },
    excerpt: { rendered: post.excerpt || '' },
    categories: post.categories || [],
    _embedded: {
      'wp:featuredmedia': post.featured_image ? [{ source_url: post.featured_image }] : [],
      'author': [{ id: post.author_id || 1, name: post.author_name || 'Admin' }]
    }
  }));
  
  res.set('X-WP-Total', total.toString());
  res.set('X-WP-TotalPages', totalPages.toString());
  res.json(formattedPosts);
});

// Get single post by slug (public)
app.get('/api/posts/slug/:slug', (req, res) => {
  const posts = readJSON(POSTS_FILE);
  const post = posts.find(p => p.slug === req.params.slug && p.status === 'publish');
  
  if (!post) {
    return res.status(404).json({ message: 'Post não encontrado' });
  }
  
  res.json({
    id: post.id,
    date: post.date,
    modified: post.modified || post.date,
    slug: post.slug,
    status: post.status,
    title: { rendered: post.title },
    content: { rendered: post.content, protected: false },
    excerpt: { rendered: post.excerpt || '' },
    categories: post.categories || [],
    _embedded: {
      'wp:featuredmedia': post.featured_image ? [{ source_url: post.featured_image }] : [],
      'author': [{ id: post.author_id || 1, name: post.author_name || 'Admin' }]
    }
  });
});

// Get single post by ID (authenticated)
app.get('/api/posts/:id', authenticate, (req, res) => {
  const posts = readJSON(POSTS_FILE);
  const post = posts.find(p => p.id === parseInt(req.params.id));
  
  if (!post) {
    return res.status(404).json({ message: 'Post não encontrado' });
  }
  
  res.json({
    id: post.id,
    date: post.date,
    modified: post.modified || post.date,
    slug: post.slug,
    status: post.status,
    title: { rendered: post.title },
    content: { rendered: post.content, protected: false },
    excerpt: { rendered: post.excerpt || '' },
    categories: post.categories || [],
    _embedded: {
      'wp:featuredmedia': post.featured_image ? [{ source_url: post.featured_image }] : [],
      'author': [{ id: post.author_id || 1, name: post.author_name || 'Admin' }]
    }
  });
});

// Create post (authenticated)
app.post('/api/posts', authenticate, (req, res) => {
  const { title, content, excerpt, slug, status = 'draft', categories = [], featured_image } = req.body;
  
  if (!title) {
    return res.status(400).json({ message: 'Título é obrigatório' });
  }
  
  const posts = readJSON(POSTS_FILE);
  const users = readJSON(USERS_FILE);
  const user = users.find(u => u.id === req.user.id);
  
  const newPost = {
    id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
    title,
    content: content || '',
    excerpt: excerpt || '',
    slug: slug || generateSlug(title),
    status,
    categories,
    featured_image: featured_image || null,
    author_id: req.user.id,
    author_name: user?.name || 'Admin',
    date: new Date().toISOString(),
    modified: new Date().toISOString()
  };
  
  posts.push(newPost);
  writeJSON(POSTS_FILE, posts);
  
  res.status(201).json({
    id: newPost.id,
    date: newPost.date,
    slug: newPost.slug,
    status: newPost.status,
    title: { rendered: newPost.title },
    content: { rendered: newPost.content, protected: false },
    excerpt: { rendered: newPost.excerpt }
  });
});

// Update post (authenticated)
app.put('/api/posts/:id', authenticate, (req, res) => {
  const { title, content, excerpt, slug, status, categories, featured_image } = req.body;
  const posts = readJSON(POSTS_FILE);
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ message: 'Post não encontrado' });
  }
  
  posts[index] = {
    ...posts[index],
    ...(title && { title }),
    ...(content !== undefined && { content }),
    ...(excerpt !== undefined && { excerpt }),
    ...(slug && { slug }),
    ...(status && { status }),
    ...(categories && { categories }),
    ...(featured_image !== undefined && { featured_image }),
    modified: new Date().toISOString()
  };
  
  writeJSON(POSTS_FILE, posts);
  
  const post = posts[index];
  res.json({
    id: post.id,
    date: post.date,
    modified: post.modified,
    slug: post.slug,
    status: post.status,
    title: { rendered: post.title },
    content: { rendered: post.content, protected: false },
    excerpt: { rendered: post.excerpt }
  });
});

// Delete post (authenticated)
app.delete('/api/posts/:id', authenticate, (req, res) => {
  let posts = readJSON(POSTS_FILE);
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ message: 'Post não encontrado' });
  }
  
  posts.splice(index, 1);
  writeJSON(POSTS_FILE, posts);
  
  res.json({ message: 'Post excluído com sucesso' });
});

// ==================== CATEGORIES ROUTES ====================

// List categories (public)
app.get('/api/categories', (req, res) => {
  const categories = readJSON(CATEGORIES_FILE);
  res.json(categories);
});

// Create category (authenticated)
app.post('/api/categories', authenticate, (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: 'Nome é obrigatório' });
  }
  
  const categories = readJSON(CATEGORIES_FILE);
  
  const newCategory = {
    id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
    name,
    slug: generateSlug(name),
    count: 0
  };
  
  categories.push(newCategory);
  writeJSON(CATEGORIES_FILE, categories);
  
  res.status(201).json(newCategory);
});

// ==================== MEDIA ROUTES ====================

// Upload image (authenticated)
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    cb(null, allowed.includes(file.mimetype));
  }
});

app.post('/api/media', authenticate, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Nenhum arquivo enviado' });
  }
  
  const url = `/uploads/${req.file.filename}`;
  res.json({
    id: Date.now(),
    source_url: url,
    filename: req.file.filename
  });
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 EasySplit Blog CMS - Servidor Local                  ║
║                                                           ║
║   API rodando em: http://localhost:${PORT}                  ║
║                                                           ║
║   📝 Login padrão:                                        ║
║      Usuário: admin                                       ║
║      Senha:   admin123                                    ║
║                                                           ║
║   ⚠️  Altere a senha em produção!                          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});
