export interface BlogPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  categories?: number[];
  tags?: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
      media_details?: {
        width: number;
        height: number;
        sizes?: {
          medium?: { source_url: string };
          large?: { source_url: string };
          full?: { source_url: string };
        };
      };
    }>;
    'author'?: Array<{
      id: number;
      name: string;
      description?: string;
      avatar_urls?: {
        '24'?: string;
        '48'?: string;
        '96'?: string;
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
  };
}

export interface WPCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  parent: number;
}

export interface WPTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
}

export interface WPPagination {
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  pagination: WPPagination;
}

export interface WPUser {
  id: number;
  name: string;
  email?: string;
  description?: string;
  avatar_urls?: {
    '24'?: string;
    '48'?: string;
    '96'?: string;
  };
  capabilities?: {
    [key: string]: boolean;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  period?: string;
  description?: string;
  features: string[];
  recommended?: boolean;
  promoTag?: string;
  buttonText: string;
  link: string;
  footerNote?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export enum RoutePath {
  HOME = '/',
  FEATURES = '/features',
  PRICING = '/pricing',
  BLOG = '/blog',
  BLOG_POST = '/blog/:slug'
}