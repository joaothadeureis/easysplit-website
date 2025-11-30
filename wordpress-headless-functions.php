<?php
/**
 * =====================================================
 * EASYSPLIT - WORDPRESS HEADLESS MODE
 * =====================================================
 * Cole este código no functions.php do tema WordPress
 * Aparência > Editor de Arquivos do Tema > functions.php
 * =====================================================
 */

/**
 * 1. SITEMAP DO RANK MATH COM URLs CORRETAS (/blog/)
 * O sitemap será gerado automaticamente com as URLs do React
 */

// Modificar URLs no sitemap do Rank Math
add_filter('rank_math/sitemap/url', function($url) {
    // Posts: /wp/slug → /blog/slug
    if (strpos($url, '/wp/') !== false && strpos($url, '/wp/wp-') === false) {
        $url = preg_replace('#/wp/([a-z0-9-]+)/?$#i', '/blog/$1', $url);
    }
    return $url;
});

// Modificar entrada completa do sitemap
add_filter('rank_math/sitemap/entry', function($entry, $type, $object) {
    if (isset($entry['loc'])) {
        // Posts
        if ($type === 'post' || (isset($object->post_type) && $object->post_type === 'post')) {
            $entry['loc'] = preg_replace('#/wp/([a-z0-9-]+)/?$#i', '/blog/$1', $entry['loc']);
        }
        // Categorias
        if (strpos($entry['loc'], '/wp/category/') !== false) {
            $entry['loc'] = str_replace('/wp/category/', '/blog/categoria/', $entry['loc']);
        }
    }
    return $entry;
}, 10, 3);

// Adicionar páginas estáticas do React ao sitemap
add_filter('rank_math/sitemap/urlimages', function($images, $post) {
    return $images;
}, 10, 2);


/**
 * 2. REDIRECIONAR FRONT-END DO WORDPRESS PARA O REACT
 * Qualquer acesso a posts/categorias redireciona 301 para o React
 */
add_action('template_redirect', function() {
    // Ignorar admin, API, login, arquivos
    if (is_admin()) return;
    if (defined('REST_REQUEST') && REST_REQUEST) return;
    if (strpos($_SERVER['REQUEST_URI'], 'wp-admin') !== false) return;
    if (strpos($_SERVER['REQUEST_URI'], 'wp-json') !== false) return;
    if (strpos($_SERVER['REQUEST_URI'], 'wp-login') !== false) return;
    if (strpos($_SERVER['REQUEST_URI'], 'wp-content') !== false) return;
    if (strpos($_SERVER['REQUEST_URI'], 'sitemap') !== false) return;
    
    $redirect_url = null;
    
    // Posts individuais
    if (is_single()) {
        $redirect_url = 'https://easysplit.com.br/blog/' . get_post_field('post_name', get_the_ID());
    }
    // Categorias
    elseif (is_category()) {
        $redirect_url = 'https://easysplit.com.br/blog/categoria/' . get_queried_object()->slug;
    }
    // Tags
    elseif (is_tag()) {
        $redirect_url = 'https://easysplit.com.br/blog/tag/' . get_queried_object()->slug;
    }
    // Autor
    elseif (is_author()) {
        $redirect_url = 'https://easysplit.com.br/blog';
    }
    // Arquivo / Home do blog
    elseif (is_archive() || is_home() || is_front_page()) {
        // Não redirecionar a home do WP admin
        if (!is_page()) {
            $redirect_url = 'https://easysplit.com.br/blog';
        }
    }
    
    if ($redirect_url) {
        wp_redirect($redirect_url, 301);
        exit;
    }
});


/**
 * 3. DESABILITAR SITEMAP NATIVO DO WORDPRESS (usar apenas Rank Math)
 */
add_filter('wp_sitemaps_enabled', '__return_false');


/**
 * 4. NOINDEX COMO FALLBACK
 * Caso alguma página do WP seja acessada diretamente
 */
add_action('wp_head', function() {
    if (!is_admin() && !is_page()) {
        echo '<meta name="robots" content="noindex, nofollow">' . "\n";
    }
}, 1);


/**
 * 5. CORS PARA API REST (permite acesso do site React)
 */
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $origin = get_http_origin();
        $allowed = array(
            'https://easysplit.com.br',
            'http://localhost:5173',
            'http://localhost:3000'
        );
        
        if ($origin && in_array($origin, $allowed)) {
            header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
        } else {
            header('Access-Control-Allow-Origin: https://easysplit.com.br');
        }
        
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With');
        
        return $value;
    });
}, 15);


/**
 * 6. TRATAR REQUISIÇÕES OPTIONS (preflight CORS)
 */
add_action('init', function() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: https://easysplit.com.br');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With');
        header('Access-Control-Max-Age: 86400');
        status_header(200);
        exit();
    }
});


/**
 * 7. CANONICAL URLs APONTANDO PARA O REACT
 * Importante para SEO - evita conteúdo duplicado
 */
add_filter('rank_math/frontend/canonical', function($canonical) {
    if (is_single()) {
        return 'https://easysplit.com.br/blog/' . get_post_field('post_name', get_the_ID());
    }
    if (is_category()) {
        return 'https://easysplit.com.br/blog/categoria/' . get_queried_object()->slug;
    }
    return $canonical;
});

// Para Yoast (se usar no futuro)
add_filter('wpseo_canonical', function($canonical) {
    if (is_single()) {
        return 'https://easysplit.com.br/blog/' . get_post_field('post_name', get_the_ID());
    }
    return $canonical;
});
