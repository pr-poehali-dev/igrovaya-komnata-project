import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RockPaperScissorsProps {
  onGameEnd: (result: "win" | "loss") => void;
}

const RockPaperScissors = ({ onGameEnd }: RockPaperScissorsProps) => {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  const choices = [
    { id: "rock", name: "Камень", emoji: "🪨" },
    { id: "paper", name: "Бумага", emoji: "📄" },
    { id: "scissors", name: "Ножницы", emoji: "✂️" },
  ];

  const playGame = (playerChoice: string) => {
    setIsPlaying(true);
    setPlayerChoice(playerChoice);

    // Анимация выбора компьютера
    setTimeout(() => {
      const computerChoice =
        choices[Math.floor(Math.random() * choices.length)].id;
      setComputerChoice(computerChoice);

      const gameResult = getResult(playerChoice, computerChoice);
      setResult(gameResult);

      if (gameResult === "Победа!") {
        setScore((prev) => ({ ...prev, player: prev.player + 1 }));
        onGameEnd("win");
      } else if (gameResult === "Поражение!") {
        setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
        onGameEnd("loss");
      }

      setIsPlaying(false);
    }, 1000);
  };

  const getResult = (player: string, computer: string) => {
    if (player === computer) return "Ничья!";

    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      return "Победа!";
    }

    return "Поражение!";
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ player: 0, computer: 0 });
  };

  const getChoiceDisplay = (choiceId: string | null) => {
    if (!choiceId) return "❓";
    return choices.find((c) => c.id === choiceId)?.emoji || "❓";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white font-montserrat mb-4">
            Камень-Ножницы-Бумага
          </CardTitle>
          <div className="flex justify-center gap-8 mb-4">
            <div className="text-center">
              <div className="text-sm text-purple-200 mb-1">Вы</div>
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-200"
              >
                {score.player}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-sm text-purple-200 mb-1">Компьютер</div>
              <Badge variant="secondary" className="bg-red-500/20 text-red-200">
                {score.computer}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Игровое поле */}
          <div className="flex justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-6xl mb-2 transition-transform duration-300 hover:scale-110">
                {getChoiceDisplay(playerChoice)}
              </div>
              <div className="text-purple-200 font-open-sans">Ваш выбор</div>
            </div>

            <div className="text-4xl text-white animate-pulse">VS</div>

            <div className="text-center">
              <div className="text-6xl mb-2 transition-transform duration-300">
                {isPlaying ? "🎲" : getChoiceDisplay(computerChoice)}
              </div>
              <div className="text-purple-200 font-open-sans">Компьютер</div>
            </div>
          </div>

          {/* Результат */}
          {result && (
            <div className="text-center">
              <div
                className={`text-2xl font-bold font-montserrat ${
                  result === "Победа!"
                    ? "text-green-400"
                    : result === "Поражение!"
                      ? "text-red-400"
                      : "text-yellow-400"
                }`}
              >
                {result}
              </div>
            </div>
          )}

          {/* Кнопки выбора */}
          <div className="flex justify-center gap-4 flex-wrap">
            {choices.map((choice) => (
              <Button
                key={choice.id}
                onClick={() => playGame(choice.id)}
                disabled={isPlaying}
                className="bg-purple-600 hover:bg-purple-700 text-white font-open-sans px-6 py-8 text-lg transition-all duration-200 hover:scale-105 disabled:opacity-50"
              >
                <div className="text-center">
                  <div className="text-3xl mb-1">{choice.emoji}</div>
                  <div>{choice.name}</div>
                </div>
              </Button>
            ))}
          </div>

          {/* Кнопка сброса */}
          <div className="text-center">
            <Button
              onClick={resetGame}
              variant="outline"
              className="border-purple-400 text-purple-300 hover:bg-purple-600 hover:text-white font-open-sans"
            >
              Сбросить счёт
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RockPaperScissors;
