import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface UserProfileProps {
  user: string;
  balance: number;
  onAddBalance: () => void;
}

const UserProfile = ({ user, balance, onAddBalance }: UserProfileProps) => {
  const userStats = {
    totalHours: 156,
    totalGames: 89,
    favoriteGame: "CS:GO",
    lastVisit: "2024-06-08",
    level: "Pro Gamer",
    achievements: 12,
  };

  const recentBookings = [
    {
      id: 1,
      room: "VIP 01",
      game: "CS:GO",
      date: "2024-06-08",
      time: "14:00",
      hours: 2,
      price: 1000,
      status: "completed",
    },
    {
      id: 2,
      room: "VR Zone 01",
      game: "VR5",
      date: "2024-06-05",
      time: "18:00",
      hours: 1,
      price: 800,
      status: "completed",
    },
    {
      id: 3,
      room: "Standard 02",
      game: "Mobile Legends",
      date: "2024-06-10",
      time: "16:00",
      hours: 3,
      price: 900,
      status: "upcoming",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-300";
      case "upcoming":
        return "bg-blue-500/20 text-blue-300";
      case "cancelled":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Профиль пользователя */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="User" size={40} className="text-white" />
            </div>
            <CardTitle className="text-white font-montserrat">{user}</CardTitle>
            <Badge className="bg-purple-500/20 text-purple-300 mx-auto">
              {userStats.level}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-purple-200 text-sm">Баланс:</span>
              <Badge className="bg-green-500/20 text-green-300">
                {balance} ₽
              </Badge>
            </div>
            <Button
              onClick={onAddBalance}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Пополнить баланс
            </Button>
          </CardContent>
        </Card>

        {/* Статистика */}
        <Card className="lg:col-span-2 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white font-montserrat flex items-center gap-2">
              <Icon name="BarChart3" size={24} />
              Статистика игрока
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {userStats.totalHours}
                </div>
                <div className="text-purple-200 text-sm">Часов сыграно</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {userStats.totalGames}
                </div>
                <div className="text-purple-200 text-sm">Игровых сессий</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {userStats.achievements}
                </div>
                <div className="text-purple-200 text-sm">Достижений</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-300 mb-1">
                  {userStats.favoriteGame}
                </div>
                <div className="text-purple-200 text-sm">Любимая игра</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-300 mb-1">
                  {userStats.lastVisit}
                </div>
                <div className="text-purple-200 text-sm">Последний визит</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* История бронирований */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white font-montserrat flex items-center gap-2">
            <Icon name="History" size={24} />
            История бронирований
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white/5 rounded-lg p-4 border border-white/10"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-medium">
                        {booking.room}
                      </span>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(booking.status)}
                      >
                        {booking.status === "completed"
                          ? "Завершено"
                          : "Запланировано"}
                      </Badge>
                    </div>
                    <div className="text-purple-200 text-sm space-y-1">
                      <div>Игра: {booking.game}</div>
                      <div>
                        {booking.date} в {booking.time} • {booking.hours}ч
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">
                      {booking.price} ₽
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
