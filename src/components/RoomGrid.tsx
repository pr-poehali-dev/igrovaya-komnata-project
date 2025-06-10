import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Room {
  id: string;
  name: string;
  type: "VIP" | "Standard" | "VR";
  status: "free" | "occupied" | "maintenance";
  currentGame?: string;
  timeLeft?: number;
  specs: string[];
  price: number;
}

interface RoomGridProps {
  onRoomSelect: (room: Room) => void;
}

const RoomGrid = ({ onRoomSelect }: RoomGridProps) => {
  const rooms: Room[] = [
    {
      id: "vip-1",
      name: "VIP 01",
      type: "VIP",
      status: "free",
      specs: ["RTX 4090", "Intel i9", "32GB RAM"],
      price: 500,
    },
    {
      id: "vip-2",
      name: "VIP 02",
      type: "VIP",
      status: "occupied",
      currentGame: "CS:GO",
      timeLeft: 45,
      specs: ["RTX 4090", "Intel i9", "32GB RAM"],
      price: 500,
    },
    {
      id: "std-1",
      name: "Standard 01",
      type: "Standard",
      status: "free",
      specs: ["RTX 3070", "Intel i7", "16GB RAM"],
      price: 300,
    },
    {
      id: "std-2",
      name: "Standard 02",
      type: "Standard",
      status: "occupied",
      currentGame: "Mobile Legends",
      timeLeft: 25,
      specs: ["RTX 3070", "Intel i7", "16GB RAM"],
      price: 300,
    },
    {
      id: "vr-1",
      name: "VR Zone 01",
      type: "VR",
      status: "free",
      specs: ["Meta Quest 3", "VR Ready PC", "Tracking System"],
      price: 800,
    },
    {
      id: "vr-2",
      name: "VR Zone 02",
      type: "VR",
      status: "maintenance",
      specs: ["Meta Quest 3", "VR Ready PC", "Tracking System"],
      price: 800,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "free":
        return "bg-green-500/20 text-green-300";
      case "occupied":
        return "bg-red-500/20 text-red-300";
      case "maintenance":
        return "bg-yellow-500/20 text-yellow-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "free":
        return "CheckCircle";
      case "occupied":
        return "Clock";
      case "maintenance":
        return "Wrench";
      default:
        return "Circle";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "free":
        return "Свободна";
      case "occupied":
        return "Занята";
      case "maintenance":
        return "Обслуживание";
      default:
        return "Неизвестно";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "VIP":
        return "Crown";
      case "VR":
        return "Glasses";
      default:
        return "Monitor";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <Card
          key={room.id}
          className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white font-montserrat flex items-center gap-2">
                <Icon name={getTypeIcon(room.type) as any} size={20} />
                {room.name}
              </CardTitle>
              <Badge
                variant="secondary"
                className={getStatusColor(room.status)}
              >
                <Icon
                  name={getStatusIcon(room.status) as any}
                  size={12}
                  className="mr-1"
                />
                {getStatusText(room.status)}
              </Badge>
            </div>
            <Badge
              variant="outline"
              className="border-purple-400 text-purple-300 w-fit"
            >
              {room.type}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-4">
            {room.status === "occupied" && room.currentGame && (
              <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-red-300 font-open-sans text-sm">
                    Играет: {room.currentGame}
                  </span>
                  <span className="text-red-300 font-mono text-sm">
                    {room.timeLeft} мин
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-purple-200 font-open-sans text-sm">
                Характеристики:
              </h4>
              {room.specs.map((spec, index) => (
                <div key={index} className="text-white font-open-sans text-sm">
                  • {spec}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <div className="text-white">
                <span className="text-lg font-bold">{room.price} ₽</span>
                <span className="text-purple-200 text-sm">/час</span>
              </div>
              <Button
                onClick={() => onRoomSelect(room)}
                disabled={room.status !== "free"}
                className={`${
                  room.status === "free"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-gray-600 cursor-not-allowed"
                } text-white`}
              >
                {room.status === "free" ? (
                  <>
                    <Icon name="Calendar" size={16} className="mr-2" />
                    Забронировать
                  </>
                ) : (
                  "Недоступна"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RoomGrid;
