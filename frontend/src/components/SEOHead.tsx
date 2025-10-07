import React from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'BijouxKart – French Elegance, Timeless Beauty',
  description = 'Discover BijouxKart\'s exquisite collection of fine French jewelry. French elegance, timeless beauty. Premium rings, necklaces, earrings, and bracelets crafted with precision.',
  keywords = 'bijoukart, bijoux, french jewelry, jewelry, gold, diamonds, rings, necklaces, earrings, bracelets, luxury jewelry, fine jewelry, french elegance',
  ogTitle,
  ogDescription,
  ogImage = '/images/bijoukart-logo.jpg',
  canonical
}) => {
  React.useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updateProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('author', 'BijouxKart');
    updateMeta('robots', 'index, follow');
    
    updateProperty('og:title', ogTitle || title);
    updateProperty('og:description', ogDescription || description);
    updateProperty('og:image', ogImage);
    updateProperty('og:type', 'website');
    
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', ogTitle || title);
    updateMeta('twitter:description', ogDescription || description);
    updateMeta('twitter:image', ogImage);

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonical]);

  return null;
};

export default SEOHead;