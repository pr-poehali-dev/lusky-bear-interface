import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

type Screen = 'home' | 'register' | 'signals' | 'support';

interface Signal {
  id: number;
  multiplier: string;
  time: string;
  rarity: 'common' | 'medium' | 'rare';
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [signals, setSignals] = useState<Signal[]>([]);
  const [countdown, setCountdown] = useState(60);

  const generateSignal = (): Signal => {
    const random = Math.random();
    let multiplier: number;
    let rarity: 'common' | 'medium' | 'rare';

    if (random < 0.7) {
      multiplier = 1 + Math.random() * 14;
      rarity = 'common';
    } else if (random < 0.9) {
      multiplier = 15 + Math.random() * 5;
      rarity = 'medium';
    } else {
      multiplier = 20 + Math.random() * 30;
      rarity = 'rare';
    }

    return {
      id: Date.now(),
      multiplier: `${multiplier.toFixed(2)}x`,
      time: new Date().toLocaleTimeString('ru-RU'),
      rarity
    };
  };

  useEffect(() => {
    if (currentScreen === 'signals') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setSignals(prev => [generateSignal(), ...prev].slice(0, 10));
            return 60;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentScreen]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-primary';
      case 'medium': return 'text-accent';
      case 'rare': return 'text-yellow-400';
      default: return 'text-white';
    }
  };

  const HomeScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full"></div>
          <h1 className="relative text-7xl md:text-8xl font-black tracking-tight gradient-primary bg-clip-text text-transparent animate-pulse-glow">
            LUSKY<br />BEAR
          </h1>
        </div>
        
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          Премиальная платформа торговых сигналов
        </p>

        <Button 
          size="lg"
          onClick={() => setCurrentScreen('register')}
          className="text-xl px-12 py-7 gradient-primary hover:scale-105 transition-transform glow-primary font-bold"
        >
          Начать
        </Button>
      </div>
    </div>
  );

  const RegisterScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
      <Card className="w-full max-w-md p-8 space-y-6 bg-card/50 backdrop-blur-xl border-primary/20">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
            LUSKY BEAR
          </h2>
          <p className="text-muted-foreground">
            Выберите действие для продолжения
          </p>
        </div>

        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full text-lg py-6 gradient-primary hover:scale-105 transition-transform glow-primary font-semibold"
            onClick={() => window.open('https://t.me/X_Quill_Bot/app?startapp=eHd1PTE3MDQwMjgzNzcmbT1uZXRsbzU1NSZjPWRlZmF1bHQ', '_blank')}
          >
            <Icon name="UserPlus" className="mr-2" size={24} />
            Зарегистрироваться
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full text-lg py-6 border-primary/30 hover:bg-primary/10 hover:scale-105 transition-transform font-semibold"
            onClick={() => setCurrentScreen('signals')}
          >
            <Icon name="TrendingUp" className="mr-2" size={24} />
            К сигналам
          </Button>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen('support')}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="MessageCircle" className="mr-2" size={18} />
            Поддержка
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen('home')}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="Home" className="mr-2" size={18} />
            Главная
          </Button>
        </div>
      </Card>
    </div>
  );

  const SignalsScreen = () => (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentScreen('register')}
            className="hover:bg-primary/10"
          >
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            Назад
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentScreen('support')}
              className="hover:bg-primary/10"
            >
              <Icon name="MessageCircle" size={20} />
            </Button>
          </div>
        </div>

        <Card className="p-6 bg-card/50 backdrop-blur-xl border-primary/20">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
              Торговые сигналы
            </h2>
            
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Icon name="Timer" size={20} />
              <span className="text-lg">Следующий сигнал через: <span className="text-primary font-bold">{countdown}с</span></span>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Частые</div>
                <div className="text-lg font-bold text-primary">1.00-15.00x</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Средние</div>
                <div className="text-lg font-bold text-accent">15.00-20.00x</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Редкие</div>
                <div className="text-lg font-bold text-yellow-400">20.00-50.00x</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          {signals.length === 0 ? (
            <Card className="p-8 text-center bg-card/30 backdrop-blur-xl border-primary/10">
              <Icon name="Activity" className="mx-auto mb-4 text-muted-foreground" size={48} />
              <p className="text-muted-foreground">Ожидание первого сигнала...</p>
            </Card>
          ) : (
            signals.map((signal, index) => (
              <Card 
                key={signal.id}
                className="p-4 bg-card/50 backdrop-blur-xl border-primary/20 hover:border-primary/40 transition-all animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`text-3xl font-black ${getRarityColor(signal.rarity)}`}>
                      {signal.multiplier}
                    </div>
                    {signal.rarity === 'rare' && (
                      <Icon name="Sparkles" className="text-yellow-400" size={24} />
                    )}
                    {signal.rarity === 'medium' && (
                      <Icon name="Star" className="text-accent" size={20} />
                    )}
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    {signal.time}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const SupportScreen = () => (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => setCurrentScreen('register')}
          className="hover:bg-primary/10"
        >
          <Icon name="ArrowLeft" className="mr-2" size={20} />
          Назад
        </Button>

        <Card className="p-8 space-y-6 bg-card/50 backdrop-blur-xl border-primary/20">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
              Поддержка
            </h2>
            <p className="text-muted-foreground">
              Мы готовы помочь вам 24/7
            </p>
          </div>

          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full justify-start text-lg gradient-primary hover:scale-105 transition-transform glow-primary"
              onClick={() => window.open('https://t.me/X_Quill_Bot', '_blank')}
            >
              <Icon name="Send" className="mr-3" size={24} />
              Написать в Telegram
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full justify-start text-lg border-primary/30 hover:bg-primary/10"
              onClick={() => window.open('mailto:support@luskybear.com', '_blank')}
            >
              <Icon name="Mail" className="mr-3" size={24} />
              Отправить Email
            </Button>
          </div>
        </Card>

        <Card className="p-6 space-y-4 bg-card/50 backdrop-blur-xl border-primary/20">
          <h3 className="text-xl font-bold">Часто задаваемые вопросы</h3>
          
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="item-1" className="border-primary/20">
              <AccordionTrigger className="hover:text-primary">
                Как работают сигналы?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Наша система анализирует рынок и генерирует торговые сигналы каждую минуту. 
                Сигналы показывают потенциальный множитель прибыли от 1.00x до 50.00x.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-primary/20">
              <AccordionTrigger className="hover:text-primary">
                Как зарегистрироваться?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Нажмите кнопку "Зарегистрироваться" на главном экране и следуйте инструкциям в Telegram боте.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-primary/20">
              <AccordionTrigger className="hover:text-primary">
                Какова точность сигналов?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Система показывает высокую точность на исторических данных, но помните, 
                что торговля всегда связана с рисками. Используйте сигналы как рекомендации.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-primary/20">
              <AccordionTrigger className="hover:text-primary">
                Есть ли платные тарифы?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Базовые сигналы доступны бесплатно. Премиум тарифы с расширенной аналитикой 
                и дополнительными функциями доступны после регистрации.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'register' && <RegisterScreen />}
      {currentScreen === 'signals' && <SignalsScreen />}
      {currentScreen === 'support' && <SupportScreen />}
    </div>
  );
};

export default Index;
