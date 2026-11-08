import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbSchema } from '../utils/schemas';

/**
 * Breadcrumbs компонент для навигации и SEO
 * Автоматически генерирует Schema.org BreadcrumbList разметку
 */
const Breadcrumbs = ({ items }) => {
  // Всегда включаем главную страницу
  const breadcrumbItems = [
    { name: 'Главная', url: '/' },
    ...items
  ];

  // Генерируем Schema.org разметку
  const schema = getBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      {/* Schema.org BreadcrumbList — без Helmet, чтобы не создавать дублей в <head> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <nav aria-label="Хлебные крошки" className="mb-6">
        <ol className="flex flex-wrap items-center gap-y-1 text-sm text-gray-600">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const isFirst = index === 0;

            return (
              <li key={index} className="flex items-center min-w-0">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 mx-2 text-gray-400" aria-hidden="true" />
                )}
                
                {isLast ? (
                  <span 
                    className="text-gray-900 font-medium break-words min-w-0"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.url}
                    className="flex items-center hover:text-signal-600 transition-colors duration-200"
                  >
                    {isFirst && <Home className="w-4 h-4 mr-1" aria-hidden="true" />}
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
