import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
}

interface BookingFormProps {
  room: Room;
  onClose: () => void;
  onConfirm: (booking: any) => void;
}

const BookingForm = ({ room, onClose, onConfirm }: BookingFormProps) => {
  const [selectedGame, setSelectedGame] = useState("");
  const [hours, setHours] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const games = [
    { id: "vr5", name: "VR5", icon: "Gamepad2", category: "VR" },
    { id: "csgo", name: "CS:GO", icon: "Target", category: "PC" },
    {
      id: "ml",
      name: "Mobile Legends",
      icon: "Smartphone",
      category: "Mobile",
    },
    { id: "valorant", name: "Valorant", icon: "Crosshair", category: "PC" },
    { id: "dota2", name: "Dota 2", icon: "Shield", category: "PC" },
  ];

  const availableGames =
    room.type === "VR"
      ? games.filter((g) => g.category === "VR")
      : games.filter((g) => g.category !== "VR");

  const totalPrice = room.price * hours;
  const today = new Date().toISOString().split("T")[0];

  const handleConfirm = () => {
    if (!selectedGame || !date || !time) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    const booking = {
      roomId: room.id,
      roomName: room.name,
      game: selectedGame,
      hours,
      date,
      time,
      totalPrice,
      status: "confirmed",
    };

    onConfirm(booking);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <Card className="w-full max-w-lg bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white font-montserrat">
              Бронирование {room.name}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
          <Badge
            variant="outline"
            className="border-purple-400 text-purple-300 w-fit"
          >
            {room.type} • {room.price} ₽/час
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-white">Выберите игру</Label>
            <Select value={selectedGame} onValueChange={setSelectedGame}>
              <SelectTrigger className="bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="Выберите игру" />
              </SelectTrigger>
              <SelectContent>
                {availableGames.map((game) => (
                  <SelectItem key={game.id} value={game.id}>
                    <div className="flex items-center gap-2">
                      <Icon name={game.icon as any} size={16} />
                      {game.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Дата</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today}
                className="bg-white/20 border-white/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Время</Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-white/20 border-white/30 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Количество часов</Label>
            <Select
              value={hours.toString()}
              onValueChange={(value) => setHours(parseInt(value))}
            >
              <SelectTrigger className="bg-white/20 border-white/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((hour) => (
                  <SelectItem key={hour} value={hour.toString()}>
                    {hour} {hour === 1 ? "час" : hour < 5 ? "часа" : "часов"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
            <div className="flex justify-between items-center">
              <span className="text-purple-200">Итого к оплате:</span>
              <span className="text-white text-xl font-bold">
                {totalPrice} ₽
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/30 text-white hover:bg-white/20"
            >
              Отмена
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Icon name="Calendar" size={16} className="mr-2" />
              Забронировать
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
