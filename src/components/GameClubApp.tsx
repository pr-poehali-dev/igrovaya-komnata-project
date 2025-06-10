import { useState } from "react";
import AuthForm from "./AuthForm";
import Header from "./Header";
import RoomGrid from "./RoomGrid";
import BookingForm from "./BookingForm";
import UserProfile from "./UserProfile";
import PriceList from "./PriceList";

const GameClubApp = () => {
  const [user, setUser] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState("rooms");
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [balance, setBalance] = useState(2500);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleLogin = (email: string) => {
    setUser(email.split("@")[0]);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("rooms");
  };

  const handleRoomSelect = (room: any) => {
    setSelectedRoom(room);
    setShowBookingForm(true);
  };

  const handleBookingConfirm = (booking: any) => {
    setBalance((prev) => prev - booking.totalPrice);
    setShowBookingForm(false);
    setSelectedRoom(null);
    alert(
      `Комната ${booking.roomName} забронирована!\nИгра: ${booking.game}\nДата: ${booking.date} в ${booking.time}\nК оплате: ${booking.totalPrice} ₽`,
    );
  };

  const handleAddBalance = () => {
    const amount = prompt("Введите сумму для пополнения:");
    if (amount && !isNaN(Number(amount))) {
      setBalance((prev) => prev + Number(amount));
      alert(`Баланс пополнен на ${amount} ₽`);
    }
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "rooms":
      case "booking":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white font-montserrat mb-4">
                🎮 Игровые комнаты
              </h2>
              <p className="text-purple-200 font-open-sans">
                Выберите комнату и забронируйте время для игры
              </p>
            </div>
            <RoomGrid onRoomSelect={handleRoomSelect} />
          </div>
        );
      case "profile":
        return (
          <UserProfile
            user={user}
            balance={balance}
            onAddBalance={handleAddBalance}
          />
        );
      case "prices":
        return <PriceList />;
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl text-white">Страница не найдена</h2>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header
        user={user}
        balance={balance}
        onLogout={handleLogout}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">{renderCurrentPage()}</main>

      {showBookingForm && selectedRoom && (
        <BookingForm
          room={selectedRoom}
          onClose={() => {
            setShowBookingForm(false);
            setSelectedRoom(null);
          }}
          onConfirm={handleBookingConfirm}
        />
      )}
    </div>
  );
};

export default GameClubApp;
