import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { User } from '@/pages/Index';

type CertificatesPageProps = {
  user: User | null;
  onNavigate: (page: 'home' | 'courses' | 'results') => void;
  onLogout: () => void;
};

const certificates = [
  {
    id: 1,
    courseName: 'Корпоративная безопасность и конфиденциальность',
    issueDate: '10 декабря 2024',
    certificateNumber: 'CERT-2024-001234',
    score: 92,
    instructor: 'Алексей Смирнов'
  },
  {
    id: 2,
    courseName: 'Финансовая грамотность для сотрудников',
    issueDate: '5 декабря 2024',
    certificateNumber: 'CERT-2024-001189',
    score: 78,
    instructor: 'Мария Петрова'
  }
];

const CertificatesPage = ({ user, onNavigate, onLogout }: CertificatesPageProps) => {
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
            <Button variant="ghost" onClick={() => onNavigate('results')}>
              <Icon name="BarChart3" size={20} className="mr-2" />
              Результаты
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
          <h1 className="text-4xl font-bold mb-4">Мои сертификаты</h1>
          <p className="text-xl text-muted-foreground">
            Все полученные сертификаты о прохождении курсов
          </p>
        </div>

        {certificates.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Icon name="Award" size={40} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Сертификатов пока нет</h3>
            <p className="text-muted-foreground mb-6">
              Завершите курс и успешно пройдите тестирование, чтобы получить сертификат
            </p>
            <Button onClick={() => onNavigate('courses')}>
              Перейти к курсам
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {certificates.map((cert, index) => (
              <Card 
                key={cert.id} 
                className="overflow-hidden hover:shadow-xl transition-shadow animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-br from-primary to-secondary p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <Icon name="Award" size={48} />
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {cert.score}%
                      </Badge>
                    </div>
                    
                    <h3 className="text-sm uppercase tracking-wider mb-2 opacity-90">
                      Сертификат об окончании курса
                    </h3>
                    <h2 className="text-2xl font-bold mb-4">{cert.courseName}</h2>
                    
                    <div className="border-t border-white/30 pt-4 mt-4">
                      <p className="text-sm opacity-90">Выдан</p>
                      <p className="font-semibold">{user?.name}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Дата выдачи</p>
                      <p className="text-sm font-semibold">{cert.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">№ сертификата</p>
                      <p className="text-sm font-semibold">{cert.certificateNumber}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Инструктор</p>
                    <p className="text-sm font-semibold">{cert.instructor}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Icon name="Download" size={16} className="mr-2" />
                      Скачать PDF
                    </Button>
                    <Button variant="outline">
                      <Icon name="Share2" size={16} className="mr-2" />
                      Поделиться
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Card className="mt-12 p-8 bg-gradient-to-r from-accent/20 to-accent/10 border-accent/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <Icon name="Lightbulb" size={24} className="text-accent-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Как получить сертификат?</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <span>Пройдите все уроки курса</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <span>Успешно сдайте итоговое тестирование (минимум 70%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <span>Сертификат будет автоматически добавлен в ваш профиль</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default CertificatesPage;
