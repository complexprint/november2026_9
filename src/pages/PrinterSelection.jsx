import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { seoMeta } from "../data/seoMeta";
import Header from '../components/Header';
import Footer from '../components/Footer';
import PrinterCategoryCard from '../components/PrinterCategoryCard';
import PrinterList from '../components/PrinterList';
import { Badge } from '../components/ui/badge';
import { usageCategories, getPrintersByUsageCategory } from '../data/printers';

const PrinterSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Получаем данные выбранной категории и принтеры
  const currentCategory = selectedCategory 
    ? usageCategories.find(cat => cat.id === selectedCategory)
    : null;
  
  const categoryPrinters = selectedCategory 
    ? getPrintersByUsageCategory(selectedCategory)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Helmet>
        <title>{seoMeta["/printer-selection"].title}</title>
        <meta name="description" content={seoMeta["/printer-selection"].description} />
        <link rel="canonical" href="https://complexprint.ru/printer-selection" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Header />
      
      <main className="pt-20">
        {!selectedCategory ? (
          // Главная страница с категориями
          <section className="py-20">
            <div className="container mx-auto px-4">
              {/* Хлебные крошки и кнопка назад */}
              <div className="mb-8">
                <button
                  onClick={handleBackToHome}
                  className="inline-flex items-center text-brand-600 hover:text-brand-800 font-medium mb-4"
                >
                  ← Вернуться на главную
                </button>
                <nav className="text-sm text-gray-600">
                  <span>Главная</span> / <span>Выбор принтера</span>
                </nav>
              </div>

              {/* Заголовок */}
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-brand-100 text-brand-700 hover:bg-brand-200">
                  Выбор печатающего оборудования
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Современные принтеры и МФУ 
                  <span className="bg-gradient-to-r from-signal-500 to-brand-600 bg-clip-text text-transparent block lg:inline lg:ml-4">
                    для любых задач
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Подберем оптимальное решение для личного использования, офиса или высоконагруженной рабочей среды
                </p>
              </div>

              {/* Категории использования */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                  Категории использования
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                  Выберите подходящую категорию для подбора оптимального печатного оборудования
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                  {usageCategories.map(category => (
                    <PrinterCategoryCard
                      key={category.id}
                      category={category}
                      onClick={() => handleCategorySelect(category.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Дополнительная информация */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-signal-500 to-brand-600 rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-2xl">🛠️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Профессиональное обслуживание
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Полный цикл технического обслуживания всех моделей принтеров. 
                    Наши сертифицированные специалисты обеспечат бесперебойную работу вашего оборудования.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-signal-500 to-brand-600 rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-2xl">📞</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Бесплатная консультация
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Не уверены в выборе? Свяжитесь с нами для получения персональной консультации 
                    по подбору оптимального печатного решения для ваших задач.
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          // Страница со списком принтеров выбранной категории
          <section className="py-20">
            <div className="container mx-auto px-4">
              {/* Хлебные крошки и кнопка назад */}
              <div className="mb-8">
                <button
                  onClick={handleBackToCategories}
                  className="inline-flex items-center text-brand-600 hover:text-brand-800 font-medium mb-4"
                >
                  ← Вернуться к категориям
                </button>
                <nav className="text-sm text-gray-600">
                  <span>Главная</span> / 
                  <span> Выбор принтера</span> / 
                  <span className="text-brand-600"> {currentCategory?.name}</span>
                </nav>
              </div>

              {/* Заголовок категории */}
              <div className="text-center mb-16">
                <div className="text-6xl mb-4">{currentCategory?.icon}</div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  {currentCategory?.name}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {currentCategory?.description}
                </p>
              </div>

              {/* Список принтеров */}
              <PrinterList 
                printers={categoryPrinters} 
                categoryName={currentCategory?.name}
              />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PrinterSelection;