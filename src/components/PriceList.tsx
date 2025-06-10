import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const PriceList = () => {
  const pricing = [
    {
      category: "VIP Комнаты",
      icon: "Crown",
      description: "Премиум оборудование и комфорт",
      color: "from-yellow-500 to-orange-500",
      prices: [
        { period: "1 час", price: 500, popular: false },
        { period: "3 часа", price: 1350, popular: true, discount: 10 },
        { period: "6 часов", price: 2400, popular: false, discount: 20 },
        { period: "День (8ч)", price: 2800, popular: false, discount: 30 },
      ],
      features: [
        "RTX 4090 + Intel i9",
        "32GB RAM",
        "4K мониторы 144Hz",
        "Премиум переферия",
        "Отдельная комната",
        "Бесплатные напитки",
      ],
    },
    {
      category: "Standard Комнаты",
      icon: "Monitor",
      description: "Отличное соотношение цены и качества",
      color: "from-blue-500 to-purple-500",
      prices: [
        { period: "1 час", price: 300, popular: false },
        { period: "3 часа", price: 810, popular: true, discount: 10 },
        { period: "6 часов", price: 1440, popular: false, discount: 20 },
        { period: "День (8ч)", price: 1680, popular: false, discount: 30 },
      ],
      features: [
        "RTX 3070 + Intel i7",
        "16GB RAM",
        "1440p мониторы 144Hz",
        "Качественная переферия",
        "Комфортная зона",
        "Чай/кофе",
      ],
    },
    {
      category: "VR Зоны",
      icon: "Glasses",
      description: "Погружение в виртуальную реальность",
      color: "from-green-500 to-teal-500",
      prices: [
        { period: "30 мин", price: 500, popular: false },
        { period: "1 час", price: 800, popular: true },
        { period: "2 часа", price: 1440, popular: false, discount: 10 },
        { period: "3 часа", price: 1920, popular: false, discount: 20 },
      ],
      features: [
        "Meta Quest 3",
        "VR Ready PC",
        "Система трекинга",
        "Большая игровая зона",
        "Библиотека VR игр",
        "Инструктаж включен",
      ],
    },
  ];

  const additionalServices = [
    {
      name: "Аренда VIP зала для турниров",
      price: "5000 ₽/день",
      icon: "Trophy",
    },
    {
      name: "Организация киберспортивных мероприятий",
      price: "от 10000 ₽",
      icon: "Users",
    },
    {
      name: "Персональный тренер по киберспорту",
      price: "1000 ₽/час",
      icon: "GraduationCap",
    },
    {
      name: "Проведение дня рождения",
      price: "3000 ₽ + аренда",
      icon: "PartyPopper",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white font-montserrat mb-4">
          💰 Прайс-лист
        </h2>
        <p className="text-purple-200 font-open-sans">
          Выберите оптимальный тариф для ваших игровых сессий
        </p>
      </div>

      {/* Основные тарифы */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pricing.map((category) => (
          <Card
            key={category.category}
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <CardHeader className="text-center">
              <div
                className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <Icon
                  name={category.icon as any}
                  size={32}
                  className="text-white"
                />
              </div>
              <CardTitle className="text-white font-montserrat text-xl">
                {category.category}
              </CardTitle>
              <p className="text-purple-200 font-open-sans text-sm">
                {category.description}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Цены */}
              <div className="space-y-3">
                {category.prices.map((price, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-lg border ${
                      price.popular
                        ? "bg-purple-500/20 border-purple-400"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">
                        {price.period}
                      </span>
                      {price.popular && (
                        <Badge className="bg-purple-500 text-white text-xs">
                          Популярно
                        </Badge>
                      )}
                      {price.discount && (
                        <Badge
                          variant="outline"
                          className="border-green-400 text-green-300 text-xs"
                        >
                          -{price.discount}%
                        </Badge>
                      )}
                    </div>
                    <span className="text-white font-bold">
                      {price.price} ₽
                    </span>
                  </div>
                ))}
              </div>

              {/* Возможности */}
              <div className="space-y-2">
                <h4 className="text-purple-200 font-open-sans text-sm font-medium">
                  Что включено:
                </h4>
                {category.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-white text-sm"
                  >
                    <Icon name="Check" size={14} className="text-green-400" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Дополнительные услуги */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white font-montserrat flex items-center gap-2">
            <Icon name="Plus" size={24} />
            Дополнительные услуги
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Icon
                      name={service.icon as any}
                      size={20}
                      className="text-white"
                    />
                  </div>
                  <span className="text-white font-medium">{service.name}</span>
                </div>
                <span className="text-purple-300 font-bold">
                  {service.price}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Информация об оплате */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-400/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Icon name="Info" size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-montserrat text-lg mb-2">
                Информация об оплате
              </h3>
              <div className="text-purple-200 font-open-sans text-sm space-y-1">
                <div>• Оплата производится через внутренний баланс</div>
                <div>• Пополнение баланса: наличные, карта, переводы</div>
                <div>• Скидки при покупке пакетов от 3 часов</div>
                <div>• Возврат средств возможен за 2 часа до сессии</div>
                <div>
                  • Действует система лояльности для постоянных клиентов
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceList;
