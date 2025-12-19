import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { User } from '@/pages/Index';

type ResultsPageProps = {
  user: User | null;
  onNavigate: (page: 'home' | 'courses' | 'certificates') => void;
  onLogout: () => void;
};

const testResults = [
  {
    id: 1,
    courseName: 'Основы продаж и работы с клиентами',
    date: '15 декабря 2024',
    score: 85,
    passed: true,
    attempts: 1
  },
  {
    id: 2,
    courseName: 'Корпоративная безопасность',
    date: '10 декабря 2024',
    score: 92,
    passed: true,
    attempts: 1
  },
  {
    id: 3,
    courseName: 'Финансовая грамотность',
    date: '5 декабря 2024',
    score: 78,
    passed: true,
    attempts: 2
  }
];

const ResultsPage = ({ user, onNavigate, onLogout }: ResultsPageProps) => {
  const averageScore = Math.round(
    testResults.reduce((acc, result) => acc + result.score, 0) / testResults.length
  );

  const totalCourses = 6;
  const completedCourses = 3;
  const inProgressCourses = 2;

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="ghost" onClick={() => onNavigate('home')}>
              <Icon name="Home" size={20} className="mr-2" />
              Главная
            </Button>
            <Button variant="ghost" onClick={() => onNavigate('courses')}>
              <Icon name="BookOpen" size={20} className="mr-2" />
              Курсы
            </Button>
            <Button variant="ghost" onClick={() => onNavigate('certificates')}>
              <Icon name="Award" size={20} className="mr-2" />
              Сертификаты
            </Button>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user.name}</span>
              <Button variant="outline" onClick={onLogout}>Выйти</Button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Мои результаты</h1>
          <p className="text-xl text-muted-foreground">
            Отслеживайте свой прогресс и достижения в обучении
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Всего курсов</span>
              <Icon name="BookOpen" size={20} className="text-primary" />
            </div>
            <div className="text-3xl font-bold">{totalCourses}</div>
          </Card>

          <Card className="p-6 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Завершено</span>
              <Icon name="CheckCircle" size={20} className="text-green-500" />
            </div>
            <div className="text-3xl font-bold">{completedCourses}</div>
          </Card>

          <Card className="p-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">В процессе</span>
              <Icon name="Clock" size={20} className="text-orange-500" />
            </div>
            <div className="text-3xl font-bold">{inProgressCourses}</div>
          </Card>

          <Card className="p-6 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Средний балл</span>
              <Icon name="TrendingUp" size={20} className="text-primary" />
            </div>
            <div className="text-3xl font-bold">{averageScore}%</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-2xl font-bold mb-6">Результаты тестирования</h2>
            <div className="space-y-4">
              {testResults.map((result) => (
                <div 
                  key={result.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{result.courseName}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          {result.date}
                        </span>
                        <span>Попыток: {result.attempts}</span>
                      </div>
                    </div>
                    <Badge variant={result.passed ? "default" : "destructive"}>
                      {result.passed ? 'Пройден' : 'Не пройден'}
                    </Badge>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Результат</span>
                      <span className="font-semibold">{result.score}%</span>
                    </div>
                    <Progress value={result.score} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Статистика</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Общий прогресс</span>
                  <span className="text-sm font-semibold">
                    {Math.round((completedCourses / totalCourses) * 100)}%
                  </span>
                </div>
                <Progress value={(completedCourses / totalCourses) * 100} />
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Распределение оценок</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-sm text-muted-foreground">90-100%</div>
                    <div className="flex-1">
                      <Progress value={33} className="h-2" />
                    </div>
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-sm text-muted-foreground">80-89%</div>
                    <div className="flex-1">
                      <Progress value={33} className="h-2" />
                    </div>
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-sm text-muted-foreground">70-79%</div>
                    <div className="flex-1">
                      <Progress value={33} className="h-2" />
                    </div>
                    <span className="text-sm font-medium">1</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-3">Достижения</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center p-3 bg-accent rounded-lg">
                    <Icon name="Award" size={24} className="text-primary mb-1" />
                    <span className="text-xs text-center">Первый курс</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-accent rounded-lg">
                    <Icon name="Target" size={24} className="text-primary mb-1" />
                    <span className="text-xs text-center">3 курса</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-muted rounded-lg opacity-50">
                    <Icon name="Trophy" size={24} className="text-muted-foreground mb-1" />
                    <span className="text-xs text-center">5 курсов</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;
