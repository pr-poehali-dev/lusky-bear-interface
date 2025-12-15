import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

type Screen = 'promo' | 'home' | 'instructions' | 'signals';

interface Signal {
  id: number;
  multiplier: string;
}

const PROMO_CODE = 'CSERGAR45';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('promo');
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState(false);
  const [currentSignal, setCurrentSignal] = useState<Signal | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [isWaiting, setIsWaiting] = useState(false);

  const generateSignal = (): Signal => {
    const random = Math.random();
    let multiplier: number;

    if (random < 0.7) {
      multiplier = 1 + Math.random() * 14;
    } else if (random < 0.9) {
      multiplier = 15 + Math.random() * 5;
    } else {
      multiplier = 20 + Math.random() * 30;
    }

    return {
      id: Date.now(),
      multiplier: `${multiplier.toFixed(2)}x`
    };
  };

  useEffect(() => {
    if (currentScreen === 'signals' && currentSignal) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setIsWaiting(false);
            setCurrentSignal(null);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentScreen, currentSignal]);

  const handleGetSignal = () => {
    const signal = generateSignal();
    setCurrentSignal(signal);
    setIsWaiting(true);
    setCountdown(60);
  };

  const handlePromoSubmit = () => {
    if (promoInput.toUpperCase() === PROMO_CODE) {
      setCurrentScreen('home');
      setPromoError(false);
    } else {
      setPromoError(true);
      setTimeout(() => setPromoError(false), 2000);
    }
  };

  const handlePromoKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePromoSubmit();
    }
  };

  const PromoScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900">
      <div className="text-center space-y-8 w-full max-w-md">
        <div className="relative mb-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl leading-tight font-black tracking-tight text-[#FF00FF] drop-shadow-[0_0_30px_rgba(255,0,255,0.5)]">
            LUSKY<br />BEAR
          </h1>
          <div className="mt-4 text-[#FFD700] text-sm sm:text-base font-semibold tracking-wider drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
            VIP СИГНАЛЫ
          </div>
        </div>

        <Card className="p-6 sm:p-8 bg-black/60 border-2 border-[#FFD700] rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.3)]">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Icon name="Lock" className="mx-auto text-[#FFD700]" size={48} />
              <h2 className="text-xl sm:text-2xl font-bold text-[#FFD700]">
                Введите промо-код
              </h2>
              <p className="text-sm text-white/70">
                Для доступа к VIP сигналам
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Введите код..."
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                onKeyPress={handlePromoKeyPress}
                className={`w-full text-center text-lg sm:text-xl py-6 bg-black/40 border-2 ${
                  promoError ? 'border-red-500' : 'border-[#FFD700]/50'
                } text-white placeholder:text-white/30 focus:border-[#FFD700] rounded-xl transition-all`}
                autoFocus
              />

              {promoError && (
                <div className="text-red-500 text-sm text-center animate-fade-in">
                  ❌ Неверный промо-код
                </div>
              )}

              <Button
                onClick={handlePromoSubmit}
                className="w-full text-lg sm:text-xl py-6 sm:py-7 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:from-[#FFA500] hover:to-[#FFD700] active:scale-95 font-black rounded-2xl transition-all touch-manipulation shadow-[0_0_30px_rgba(255,215,0,0.5)]"
              >
                <Icon name="Unlock" className="mr-2" size={24} />
                Войти
              </Button>
            </div>
          </div>
        </Card>

        <p className="text-xs text-white/50">
          Получите промо-код у администратора
        </p>
      </div>
    </div>
  );

  const HomeScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900">
      <div className="text-center space-y-12 w-full max-w-md">
        <div className="relative mb-8">
          <h1 className="text-6xl sm:text-7xl md:text-8xl leading-tight font-black tracking-tight text-[#FF00FF] drop-shadow-[0_0_30px_rgba(255,0,255,0.5)]">
            LUSKY<br />BEAR
          </h1>
          <div className="mt-4 text-[#FFD700] text-sm sm:text-base font-semibold tracking-wider drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
            VIP СИГНАЛЫ
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={() => setCurrentScreen('instructions')}
            className="w-full text-lg sm:text-xl py-6 sm:py-7 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:from-[#FFA500] hover:to-[#FFD700] active:scale-95 font-black rounded-2xl transition-all touch-manipulation shadow-[0_0_30px_rgba(255,215,0,0.5)]"
          >
            <Icon name="Rocket" className="mr-2" size={24} />
            Начать
          </Button>

          <Button 
            onClick={() => window.open('https://t.me/Lusky_bear_help_bot', '_blank')}
            className="w-full text-lg sm:text-xl py-6 sm:py-7 bg-transparent border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/20 active:bg-[#FFD700]/30 font-bold rounded-2xl transition-all touch-manipulation"
          >
            <Icon name="MessageCircle" className="mr-2" size={24} />
            SUPPORT
          </Button>
        </div>
      </div>
    </div>
  );

  const InstructionsScreen = () => (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900">
      <div className="max-w-2xl mx-auto space-y-4">
        <Button
          variant="ghost"
          onClick={() => setCurrentScreen('home')}
          className="text-[#FFD700] hover:bg-[#FFD700]/10 active:bg-[#FFD700]/20 -ml-2 touch-manipulation"
        >
          <Icon name="ArrowLeft" className="mr-2" size={20} />
          Назад
        </Button>

        <Card className="p-6 sm:p-8 bg-black/60 border-2 border-[#FFD700] rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.3)]">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-center text-[#FFD700] leading-tight drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
              ⚡ Инструкция для правильной работы ⚡
            </h2>

            <div className="space-y-4 sm:space-y-6 text-white text-sm sm:text-base">
              <div className="flex gap-3">
                <div className="text-2xl sm:text-3xl flex-shrink-0">🚀</div>
                <div>
                  <span className="font-bold text-[#FFD700]">1.</span> Зарегистрируйте новый аккаунт.
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-2xl sm:text-3xl flex-shrink-0">🔥</div>
                <div>
                  <span className="font-bold text-[#FFD700]">2.</span> Получите бесплатный бонус 50 рублей, при желании введите промокод.
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-2xl sm:text-3xl flex-shrink-0">👑</div>
                <div>
                  <span className="font-bold text-[#FFD700]">3.</span> Пополните баланс на любую сумму. Можно играть на бонус, но казино будет вас сливать.
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-2xl sm:text-3xl flex-shrink-0">💥</div>
                <div>
                  <span className="font-bold text-[#FFD700]">4.</span> Зайдите в Tower Rush и сделайте 2 ставки — покажите казино, что вы не бот.
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-2xl sm:text-3xl flex-shrink-0">🎰</div>
                <div>
                  <span className="font-bold text-[#FFD700]">5.</span> Зайдите в CRASH X и нажмите «Получить сигнал» 🎟️
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          <Button
            onClick={() => window.open('https://t.me/X_Quill_Bot/app?startapp=eHd1PTE3MDQwMjgzNzcmbT1uZXRsbzU1NSZjPWRlZmF1bHQ', '_blank')}
            className="w-full text-lg sm:text-xl py-6 sm:py-7 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:from-[#FFA500] hover:to-[#FFD700] active:scale-95 font-black rounded-2xl transition-all touch-manipulation shadow-[0_0_30px_rgba(255,215,0,0.5)]"
          >
            <Icon name="UserPlus" className="mr-2" size={24} />
            Зарегистрироваться
          </Button>

          <Button
            onClick={() => setCurrentScreen('signals')}
            className="w-full text-lg sm:text-xl py-6 sm:py-7 bg-transparent border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/20 active:bg-[#FFD700]/30 font-bold rounded-2xl transition-all touch-manipulation"
          >
            <Icon name="Play" className="mr-2" size={24} />
            К сигналам
          </Button>
        </div>
      </div>
    </div>
  );

  const SignalsScreen = () => (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900">
      <div className="max-w-2xl mx-auto space-y-4">
        <Button
          variant="ghost"
          onClick={() => setCurrentScreen('instructions')}
          className="text-[#FFD700] hover:bg-[#FFD700]/10 active:bg-[#FFD700]/20 -ml-2 touch-manipulation"
        >
          <Icon name="ArrowLeft" className="mr-2" size={20} />
          Назад
        </Button>

        <Card className="p-6 sm:p-8 bg-black/60 border-2 border-[#FFD700] rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.3)]">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl sm:text-4xl">🎰</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">CRASH X</h2>
            </div>

            {!currentSignal && !isWaiting ? (
              <Button
                onClick={handleGetSignal}
                className="w-full text-xl sm:text-2xl py-6 sm:py-8 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:from-[#FFA500] hover:to-[#FFD700] active:scale-95 font-black rounded-2xl transition-all touch-manipulation shadow-[0_0_30px_rgba(255,215,0,0.5)]"
              >
                <Icon name="Zap" className="mr-2" size={28} />
                Получить сигнал
              </Button>
            ) : currentSignal && !isWaiting ? (
              <Button
                onClick={handleGetSignal}
                className="w-full text-xl sm:text-2xl py-6 sm:py-8 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:from-[#FFA500] hover:to-[#FFD700] active:scale-95 font-black rounded-2xl transition-all touch-manipulation shadow-[0_0_30px_rgba(255,215,0,0.5)]"
              >
                <Icon name="Zap" className="mr-2" size={28} />
                Следующий сигнал
              </Button>
            ) : null}

            {currentSignal && (
              <>
                <Card className="p-6 sm:p-8 bg-transparent border-2 border-[#FFD700] rounded-2xl">
                  <div className="space-y-3">
                    <div className="text-[#FFD700] text-lg sm:text-xl font-semibold">
                      Ваш сигнал:
                    </div>
                    <div className="text-[#FFD700] text-5xl sm:text-6xl font-black drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]">
                      {currentSignal.multiplier}
                    </div>
                  </div>
                </Card>

                {isWaiting ? (
                  <Card className="p-5 sm:p-6 bg-black/40 border border-[#FFD700]/30 rounded-2xl">
                    <div className="flex items-center justify-center gap-2 text-[#FFD700]">
                      <Icon name="Timer" size={20} />
                      <span className="text-base sm:text-lg font-semibold">
                        Следующий сигнал через:
                      </span>
                    </div>
                    <div className="text-[#FFD700] text-4xl sm:text-5xl font-black mt-2">
                      {countdown}с
                    </div>
                  </Card>
                ) : null}

                {!isWaiting && (
                  <Button
                    onClick={handleGetSignal}
                    className="w-full text-xl sm:text-2xl py-6 sm:py-8 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:from-[#FFA500] hover:to-[#FFD700] active:scale-95 font-black rounded-2xl transition-all touch-manipulation shadow-[0_0_30px_rgba(255,215,0,0.5)]"
                  >
                    <Icon name="Zap" className="mr-2" size={28} />
                    Следующий сигнал
                  </Button>
                )}

                {isWaiting && (
                  <Button
                    disabled
                    className="w-full text-xl sm:text-2xl py-6 sm:py-8 bg-transparent border-2 border-[#FFD700]/30 text-[#FFD700]/50 opacity-50 font-bold rounded-2xl cursor-not-allowed touch-manipulation"
                  >
                    <Icon name="Zap" className="mr-2" size={28} />
                    Ожидание ({countdown}с)
                  </Button>
                )}
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen select-none">
      {currentScreen === 'promo' && <PromoScreen />}
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'instructions' && <InstructionsScreen />}
      {currentScreen === 'signals' && <SignalsScreen />}
    </div>
  );
};

export default Index;