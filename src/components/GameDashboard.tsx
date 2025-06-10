import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import RockPaperScissors from "./RockPaperScissors";
import NumberGuess from "./NumberGuess";
import GameStats from "./GameStats";

interface GameStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
}

const GameDashboard = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [stats, setStats] = useState<GameStats>({
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
  });

  const updateStats = (result: "win" | "loss") => {
    setStats((prev) => ({
      gamesPlayed: prev.gamesPlayed + 1,
      wins: prev.wins + (result === "win" ? 1 : 0),
      losses: prev.losses + (result === "loss" ? 1 : 0),
    }));
  };

  const games = [
    {
      id: "rps",
      title: "Камень-Ножницы-Бумага",
      description: "Классическая игра против компьютера",
      icon: "Scissors",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      id: "number",
      title: "Угадай число",
      description: "Попробуй угадать число от 1 до 100",
      icon: "Hash",
      color: "bg-gradient-to-br from-blue-500 to-purple-500",
    },
  ];

  if (activeGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setActiveGame(null)}
              className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
            >
              <Icon name="ArrowLeft" size={20} />
              Назад в игровую комнату
            </button>
          </div>

          {activeGame === "rps" && (
            <RockPaperScissors onGameEnd={updateStats} />
          )}
          {activeGame === "number" && <NumberGuess onGameEnd={updateStats} />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 font-montserrat">
            🎮 Игровая Комната
          </h1>
          <p className="text-xl text-purple-200 font-open-sans">
            Выбери игру и начни веселиться!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {games.map((game) => (
            <Card
              key={game.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => setActiveGame(game.id)}
            >
              <CardHeader className="pb-3">
                <div
                  className={`w-12 h-12 ${game.color} rounded-full flex items-center justify-center mb-3`}
                >
                  <Icon
                    name={game.icon as any}
                    size={24}
                    className="text-white"
                  />
                </div>
                <CardTitle className="text-white font-montserrat text-xl">
                  {game.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-200 font-open-sans">
                  {game.description}
                </p>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-3">
                <Icon name="Trophy" size={24} className="text-white" />
              </div>
              <CardTitle className="text-white font-montserrat text-xl">
                Статистика
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GameStats stats={stats} />
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Badge
            variant="secondary"
            className="bg-purple-500/20 text-purple-200 px-4 py-2"
          >
            Больше игр скоро появится! 🚀
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default GameDashboard;
