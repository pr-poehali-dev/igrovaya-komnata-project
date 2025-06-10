
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface NumberGuessProps {
  onGameEnd: (result: 'win' | 'loss') => void;
}

const NumberGuess = ({ onGameEnd }: NumberGuessProps) => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [maxAttempts] = useState<number>(7);
  const [message, setMessage] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [history, setHistory] = useState<Array<{guess: number, hint: string}>>([]);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts(0);
    setMessage('Угадайте число от 1 до 100!');
    setGameStatus('playing');
    setHistory([]);
  };

  const makeGuess = () => {
    const guessNumber = parseInt(guess);
    
    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
      setMessage('Пожалуйста, введите число от 1 до 100');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    let hint = '';
    if (guessNumber === targetNumber) {
      setMessage('🎉 Поздравляю! Вы угадали число!');
      setGameStatus('won');
      onGameEnd('win');
      hint = 'Точно!';
    } else if (newAttempts >= maxAttempts) {
      setMessage(`😞 Игра окончена! Загаданное число было ${targetNumber}`);
      setGameStatus('lost');
      onGameEnd('loss');
      hint = 'Игра окончена';
    } else {
      const difference = Math.abs(targetNumber - guessNumber);
      if (difference <= 5) {
        hint = guessNumber < targetNumber ? 'Очень близко! Больше ↑' : 'Очень близко! Меньше ↓';
      } else if (difference <= 15) {
        hint = guessNumber < targetNumber ? 'Близко! Больше ↑' : 'Близко! Меньше ↓';
      } else {
        hint = guessNumber < targetNumber ? 'Слишком мало ↑' : 'Слишком много ↓';
      }
      setMessage(`Попытка ${newAttempts}/${maxAttempts}. ${hint}`);
    }

    setHistory(prev => [...prev, { guess: guessNumber, hint }]);
    setGuess('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && gameStatus === 'playing') {
      makeGuess();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white font-montserrat mb-4">
            🎯 Угадай число
          </CardTitle>
          <div className="flex justify-center gap-4 mb-4">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-200">
              Попытки: {attempts}/{maxAttempts}
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-200">
              Диапазон: 1-100
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Поле ввода */}
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center">
              <div className={`text-lg font-open-sans mb-2 ${
                gameStatus === 'won' ? 'text-green-400' :
                gameStatus === 'lost' ? 'text-red-400' : 'text-purple-200'
              }`}>
                {message}
              </div>
            </div>
            
            {gameStatus === 'playing' && (
              <div className="flex gap-2 w-full max-w-md">
                <Input
                  type="number"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Введите число..."
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50 font-open-sans"
                  min="1"
                  max="100"
                />
                <Button
                  onClick={makeGuess}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-open-sans px-6"
                  disabled={!guess}
                >
                  <Icon name="Target" size={20} />
                </Button>
              </div>
            )}

            {gameStatus !== 'playing' && (
              <Button
                onClick={startNewGame}
                className="bg-green-600 hover:bg-green-700 text-white font-open-sans px-8 py-2"
              >
                <Icon name="RotateCcw" size={20} className="mr-2" />
                Новая игра
              </Button>
            )}
          </div>

          {/* История попыток */}
          {history.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-white font-montserrat text-lg text-center">
                История попыток
              </h3>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {history.map((attempt, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-white/5 rounded-lg p-3 border border-white/10"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-purple-400 text-purple-300">
                        #{index + 1}
                      </Badge>
                      <span className="text-white font-open-sans text-lg">
                        {attempt.guess}
                      </span>
                    </div>
                    <span className={`font-open-sans text-sm ${
                      attempt.hint === 'Точно!' ? 'text-green-400' :
                      attempt.hint.includes('Очень близко') ? 'text-yellow-400' :
                      attempt.hint.includes('Близко') ? 'text-orange-400' : 'text-red-400'
                    }`}>
                      {attempt.hint}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Подсказки */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-white font-montserrat text-sm mb-2 flex items-center gap-2">
              <Icon name="Lightbulb" size={16} />
              Подсказки:
            </h4>
            <div className="text-purple-200 font-open-sans text-sm space-y-1">
              <div>🎯 <span className="text-green-400">Очень близко</span> - разница ≤ 5</div>
              <div>🔥 <span className="text-yellow-400">Близко</span> - разница ≤ 15</div>
              <div>❄️ <span className="text-red-400">Далеко</span> - разница > 15</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NumberGuess;
