import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { User } from '@/pages/Index';

type HomePageProps = {
  user: User | null;
  onNavigate: (page: 'home' | 'auth' | 'courses' | 'results' | 'certificates') => void;
  onLogout: () => void;
};

const HomePage = ({ user, onNavigate, onLogout }: HomePageProps) => {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="GraduationCap" size={32} className="text-primary" />
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Привет, {user.name}</span>
              <Button variant="outline" onClick={onLogout}>Выйти</Button>
            </div>
          ) : (
            <Button onClick={() => onNavigate('auth')}>Войти</Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-6">Обучение персонала нового поколения</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Современная платформа для онлайн-обучения с интерактивными курсами, 
            тестированием и сертификацией сотрудников
          </p>
          {!user && (
            <Button size="lg" onClick={() => onNavigate('auth')} className="mr-4">
              Начать обучение
            </Button>
          )}
          <Button size="lg" variant="outline" onClick={() => onNavigate('courses')}>
            Каталог курсов
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 hover:shadow-lg transition-shadow animate-scale-in cursor-pointer" onClick={() => onNavigate('courses')}>
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Icon name="BookOpen" size={28} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Курсы</h3>
            <p className="text-muted-foreground">
              Широкий выбор образовательных программ для развития профессиональных навыков
            </p>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow animate-scale-in cursor-pointer" onClick={() => user ? onNavigate('results') : onNavigate('auth')}>
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Icon name="BarChart3" size={28} className="text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Результаты</h3>
            <p className="text-muted-foreground">
              Отслеживайте свой прогресс, оценки и статистику выполнения тестов
            </p>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow animate-scale-in cursor-pointer" onClick={() => user ? onNavigate('certificates') : onNavigate('auth')}>
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Icon name="Award" size={28} className="text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Сертификаты</h3>
            <p className="text-muted-foreground">
              Получайте официальные сертификаты о прохождении курсов обучения
            </p>
          </Card>
        </div>

        <div className="bg-muted rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Почему выбирают нас</h3>
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5</div>
              <p className="text-muted-foreground">Активных курсов</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10</div>
              <p className="text-muted-foreground">Студентов</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">60%</div>
              <p className="text-muted-foreground">Успешность</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Поддержка</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;