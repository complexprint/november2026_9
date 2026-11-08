import React from 'react';
import { Helmet } from 'react-helmet-async';
import { seoMeta } from "../data/seoMeta";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { companyInfo } from '../data/mock';
import { Phone, Mail, MapPin, Send, Clock, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import Breadcrumbs from '../components/Breadcrumbs';
import { useRepairRequestModal } from '../components/RepairRequestModal';

const Contacts = () => {
  const { open: scrollToRepairForm } = useRepairRequestModal();

  const callPhone = () => {
    window.location.href = `tel:${companyInfo.phone}`;
  };

  const openTelegram = () => {
    window.open(companyInfo.telegram, '_blank', 'noopener');
  };

  const sendEmail = () => {
    window.location.href = `mailto:${companyInfo.email}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-50">
      <Helmet>
        <title>{seoMeta["/contacts"].title}</title>
        <meta name="description" content={seoMeta["/contacts"].description} />
        <link rel="canonical" href="https://complexprint.ru/contacts" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Header />

      <main className="pt-24 lg:pt-[124px] pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { name: 'Главная', url: '/' },
            { name: 'Контакты', url: '/contacts' }
          ]} />

          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-brand-100 text-signal-700 hover:bg-brand-200">
              <Phone className="w-4 h-4 mr-2" />
              Свяжитесь с нами
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Контакты
              <span className="bg-gradient-to-r from-signal-500 to-brand-600 bg-clip-text text-transparent block lg:inline lg:ml-4">
                Комплекс Принт
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Мы всегда на связи и готовы помочь с ремонтом и обслуживанием вашего печатного оборудования
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Telegram */}
            <Card className="hover:shadow-xl transition-shadow cursor-pointer border-0 shadow-lg" onClick={openTelegram}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Telegram</h3>
                <p className="text-brand-600 font-medium hover:underline">@complexprint_mos</p>
                <p className="text-gray-500 text-sm mt-2">Быстрые ответы</p>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card className="hover:shadow-xl transition-shadow cursor-pointer border-0 shadow-lg" onClick={callPhone}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Телефон</h3>
                <p className="text-green-600 font-medium hover:underline">{companyInfo.phone}</p>
                <p className="text-gray-500 text-sm mt-2">Звоните с 9:00 до 21:00</p>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="hover:shadow-xl transition-shadow cursor-pointer border-0 shadow-lg" onClick={sendEmail}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-signal-400 to-signal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Email</h3>
                <p className="text-signal-600 font-medium hover:underline">{companyInfo.email}</p>
                <p className="text-gray-500 text-sm mt-2">Ответим в течение дня</p>
              </CardContent>
            </Card>

            {/* Address */}
            <Card className="hover:shadow-xl transition-shadow border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Адрес</h3>
                <p className="text-brand-600 font-medium">{companyInfo.address}</p>
                <p className="text-gray-500 text-sm mt-2">Москва</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-signal-500 to-brand-600 rounded-3xl p-8 lg:p-12 text-white text-center mb-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Готовы работать без сбоев?
              </h2>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                📞 Позвоните нам или оставьте заявку на сайте для бесплатной диагностики и расчета стоимости обслуживания!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={callPhone}
                  className="bg-white text-signal-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold rounded-full shadow-lg flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  {companyInfo.phone}
                </Button>
                <Button 
                  onClick={scrollToRepairForm}
                  className="bg-brand-800 hover:bg-brand-900 text-white px-8 py-6 text-lg font-bold rounded-full shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Создать заявку
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Working Hours */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-8 h-8 text-signal-500" />
                  <h3 className="text-2xl font-bold text-gray-900">Режим работы</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Понедельник - Пятница</span>
                    <span className="font-semibold text-gray-900">09:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Суббота</span>
                    <span className="font-semibold text-gray-900">10:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Воскресенье</span>
                    <span className="font-semibold text-gray-900">По договоренности</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  * Срочный выезд возможен в любое время по предварительной договоренности
                </p>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Send className="w-8 h-8 text-brand-500" />
                  <h3 className="text-2xl font-bold text-gray-900">Быстрые ссылки</h3>
                </div>
                <div className="space-y-4">
                  <a 
                    href={companyInfo.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-brand-50 rounded-xl hover:bg-brand-100 transition-colors"
                  >
                    <Send className="w-6 h-6 text-brand-500" />
                    <div>
                      <div className="font-semibold text-gray-900">Telegram канал</div>
                      <div className="text-sm text-gray-500">@complexprint_mos</div>
                    </div>
                  </a>
                  <a 
                    href={`mailto:${companyInfo.email}`}
                    className="flex items-center gap-3 p-4 bg-brand-50 rounded-xl hover:bg-brand-100 transition-colors"
                  >
                    <Mail className="w-6 h-6 text-signal-500" />
                    <div>
                      <div className="font-semibold text-gray-900">Написать на почту</div>
                      <div className="text-sm text-gray-500">{companyInfo.email}</div>
                    </div>
                  </a>
                  <a 
                    href={`tel:${companyInfo.phone}`}
                    className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                  >
                    <Phone className="w-6 h-6 text-green-500" />
                    <div>
                      <div className="font-semibold text-gray-900">Позвонить</div>
                      <div className="text-sm text-gray-500">{companyInfo.phone}</div>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contacts;
