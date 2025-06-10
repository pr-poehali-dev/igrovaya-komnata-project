import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  user: string;
  balance: number;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header = ({
  user,
  balance,
  onLogout,
  onNavigate,
  currentPage,
}: HeaderProps) => {
  const navItems = [
    { id: "rooms", label: "Комнаты", icon: "Monitor" },
    { id: "booking", label: "Бронирование", icon: "Calendar" },
    { id: "profile", label: "Профиль", icon: "User" },
    { id: "prices", label: "Цены", icon: "DollarSign" },
  ];

  return (
    <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate("rooms")}
          >
            <div className="text-3xl">🎮</div>
            <div>
              <h1 className="text-xl font-montserrat text-white font-bold">
                GameZone
              </h1>
              <p className="text-xs text-purple-200">Игровой клуб</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => onNavigate(item.id)}
                className={`text-white hover:bg-white/20 ${
                  currentPage === item.id ? "bg-purple-600" : ""
                }`}
              >
                <Icon name={item.icon as any} size={16} className="mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-purple-200">Баланс</p>
              <Badge className="bg-green-500/20 text-green-300">
                {balance} ₽
              </Badge>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs text-purple-200">Добро пожаловать</p>
              <p className="text-sm text-white font-medium">{user}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="border-red-400 text-red-300 hover:bg-red-600 hover:text-white"
            >
              <Icon name="LogOut" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
