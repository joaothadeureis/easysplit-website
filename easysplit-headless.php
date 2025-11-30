<?php
/**
 * Plugin Name: EasySplit Headless Mode
 * Description: Configura o WordPress como CMS headless para o site React
 * Version: 1.2
 * Author: EasySplit
 */

if (!defined('ABSPATH')) exit;

/**
 * SITEMAP - Modificar URLs do Rank Math para usar /blog/ em vez de /wp/
 */

// Filtro principal para URLs de posts no sitemap
add_filter('rank_math/sitemap/xml_post_url', function($url, $post) {
    if ($post->post_type === 'post') {
        return 'https://easysplit.com.br/blog/' . $post->post_name;
    }
    return $url;
}, 10, 2);

// Filtro para entradas do sitemap (backup)
add_filter('rank_math/sitemap/entry', function($entry, $type, $object) {
    if (isset($entry['loc'])) {
        // Posts
        if (is_object($object) && isset($object->post_type) && $object->post_type === 'post') {
            $entry['loc'] = 'https://easysplit.com.br/blog/' . $object->post_name;
        }
        // Substituir /wp/ por /blog/
        elseif (strpos($entry['loc'], 'easysplit.com.br/wp/') !== false) {
            if (strpos($entry['loc'], '/wp/wp-') === false && 
                strpos($entry['loc'], '/wp/category/') === false &&
                strpos($entry['loc'], '/wp/tag/') === false) {
                $entry['loc'] = preg_replace(
                    '#https://easysplit\.com\.br/wp/([a-z0-9-]+)/?$#i', 
                    'https://easysplit.com.br/blog/$1', 
                    $entry['loc']
                );
            }
        }
        // Categorias
        if (strpos($entry['loc'], '/wp/category/') !== false) {
            $entry['loc'] = str_replace('/wp/category/', '/blog/categoria/', $entry['loc']);
        }
        // Remover entrada da home do WP
        if ($entry['loc'] === 'https://easysplit.com.br/wp/' || $entry['loc'] === 'https://easysplit.com.br/wp') {
            $entry['loc'] = 'https://easysplit.com.br/blog';
        }
    }
    return $entry;
}, 10, 3);

// Modificar URL antes de adicionar ao sitemap
add_filter('rank_math/sitemap/url', function($url) {
    if (strpos($url, 'easysplit.com.br/wp/') !== false && strpos($url, '/wp/wp-') === false) {
        $url = preg_replace('#/wp/([a-z0-9-]+)/?$#i', '/blog/$1', $url);
    }
    return $url;
});


/**
 * REDIRECIONAMENTO - Front-end do WP para o React
 */
add_action('template_redirect', function() {
    if (is_admin()) return;
    if (defined('REST_REQUEST') && REST_REQUEST) return;
    
    $uri = $_SERVER['REQUEST_URI'];
    if (strpos($uri, 'wp-admin') !== false) return;
    if (strpos($uri, 'wp-json') !== false) return;
    if (strpos($uri, 'wp-login') !== false) return;
    if (strpos($uri, 'wp-content') !== false) return;
    if (strpos($uri, 'sitemap') !== false) return;
    if (strpos($uri, '.xml') !== false) return;
    
    $redirect_url = null;
    
    if (is_single()) {
        $redirect_url = 'https://easysplit.com.br/blog/' . get_post_field('post_name', get_the_ID());
    } elseif (is_category()) {
        $redirect_url = 'https://easysplit.com.br/blog/categoria/' . get_queried_object()->slug;
    } elseif (is_tag()) {
        $redirect_url = 'https://easysplit.com.br/blog';
    } elseif (is_author() || is_archive() || is_home() || is_front_page()) {
        $redirect_url = 'https://easysplit.com.br/blog';
    }
    
    if ($redirect_url) {
        wp_redirect($redirect_url, 301);
        exit;
    }
});


/**
 * DESABILITAR sitemap nativo do WordPress
 */
add_filter('wp_sitemaps_enabled', '__return_false');


/**
 * NOINDEX - Fallback de segurança
 */
add_action('wp_head', function() {
    if (!is_admin()) {
        echo '<meta name="robots" content="noindex, nofollow">' . "\n";
    }
}, 1);


/**
 * CANONICAL - URLs corretas para SEO
 */
add_filter('rank_math/frontend/canonical', function($canonical) {
    if (is_single()) {
        return 'https://easysplit.com.br/blog/' . get_post_field('post_name', get_the_ID());
    }
    if (is_category()) {
        return 'https://easysplit.com.br/blog/categoria/' . get_queried_object()->slug;
    }
    if (is_home() || is_front_page()) {
        return 'https://easysplit.com.br/';
    }
    return $canonical;
});