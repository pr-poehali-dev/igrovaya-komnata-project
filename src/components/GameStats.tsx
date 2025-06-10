import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface GameStatsProps {
  stats: {
    gamesPlayed: number;
    wins: number;
    losses: number;
  };
}

const GameStats = ({ stats }: GameStatsProps) => {
  const winRate =
    stats.gamesPlayed > 0
      ? Math.round((stats.wins / stats.gamesPlayed) * 100)
      : 0;
  const draws = stats.gamesPlayed - stats.wins - stats.losses;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-purple-200 font-open-sans text-sm flex items-center gap-2">
          <Icon name="GameController2" size={16} />
          Игр сыграно:
        </span>
        <Badge variant="secondary" className="bg-purple-500/20 text-purple-200">
          {stats.gamesPlayed}
        </Badge>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-purple-200 font-open-sans text-sm flex items-center gap-2">
          <Icon name="Trophy" size={16} />
          Побед:
        </span>
        <Badge variant="secondary" className="bg-green-500/20 text-green-200">
          {stats.wins}
        </Badge>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-purple-200 font-open-sans text-sm flex items-center gap-2">
          <Icon name="X" size={16} />
          Поражений:
        </span>
        <Badge variant="secondary" className="bg-red-500/20 text-red-200">
          {stats.losses}
        </Badge>
      </div>

      {draws > 0 && (
        <div className="flex justify-between items-center">
          <span className="text-purple-200 font-open-sans text-sm flex items-center gap-2">
            <Icon name="Minus" size={16} />
            Ничьих:
          </span>
          <Badge
            variant="secondary"
            className="bg-yellow-500/20 text-yellow-200"
          >
            {draws}
          </Badge>
        </div>
      )}

      <div className="flex justify-between items-center pt-2 border-t border-white/10">
        <span className="text-purple-200 font-open-sans text-sm flex items-center gap-2">
          <Icon name="Percent" size={16} />
          Процент побед:
        </span>
        <Badge
          variant="secondary"
          className={`${
            winRate >= 70
              ? "bg-green-500/20 text-green-200"
              : winRate >= 50
                ? "bg-yellow-500/20 text-yellow-200"
                : "bg-red-500/20 text-red-200"
          }`}
        >
          {winRate}%
        </Badge>
      </div>
    </div>
  );
};

export default GameStats;
