import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { User, Course } from '@/pages/Index';

type CoursesPageProps = {
  user: User | null;
  onNavigate: (page: 'home' | 'courses' | 'results' | 'certificates') => void;
  onCourseSelect: (course: Course) => void;
  onLogout: () => void;
};

const courses: Course[] = [
  {
    id: '1',
    title: 'Основы продаж и работы с клиентами',
    description: 'Изучите техники эффективного общения с клиентами, методы выявления потребностей и закрытия сделок',
    duration: '4 недели',
    lessonsCount: 12,
    category: 'Продажи',
    progress: 45,
    enrolled: true
  },
  {
    id: '2',
    title: 'Управление проектами (Project Management)',
    description: 'Познакомьтесь с методологиями Agile, Scrum и Kanban, научитесь планировать и контролировать проекты',
    duration: '6 недель',
    lessonsCount: 18,
    category: 'Менеджмент',
    progress: 0,
    enrolled: false
  },
  {
    id: '3',
    title: 'Корпоративная безопасность и конфиденциальность',
    description: 'Основы информационной безопасности, работа с конфиденциальными данными и защита от киберугроз',
    duration: '3 недели',
    lessonsCount: 9,
    category: 'Безопасность',
    progress: 100,
    enrolled: true
  },
  {
    id: '4',
    title: 'Эффективная коммуникация в команде',
    description: 'Развитие навыков делового общения, презентации идей и конструктивная работа в коллективе',
    duration: '3 недели',
    lessonsCount: 10,
    category: 'Soft Skills',
    progress: 0,
    enrolled: false
  },
  {
    id: '5',
    title: 'Финансовая грамотность для сотрудников',
    description: 'Основы бухгалтерского учета, бюджетирование и финансовое планирование в организации',
    duration: '5 недель',
    lessonsCount: 15,
    category: 'Финансы',
    progress: 20,
    enrolled: true
  },
  {
    id: '6',
    title: 'Цифровые инструменты современного офиса',
    description: 'Работа с облачными сервисами, CRM-системами, таск-менеджерами и инструментами видеоконференций',
    duration: '4 недели',
    lessonsCount: 14,
    category: 'IT',
    progress: 0,
    enrolled: false
  }
];

const CoursesPage = ({ user, onNavigate, onCourseSelect, onLogout }: CoursesPageProps) => {
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
            {user && (
              <>
                <Button variant="ghost" onClick={() => onNavigate('results')}>
                  <Icon name="BarChart3" size={20} className="mr-2" />
                  Результаты
                </Button>
                <Button variant="ghost" onClick={() => onNavigate('certificates')}>
                  <Icon name="Award" size={20} className="mr-2" />
                  Сертификаты
                </Button>
              </>
            )}
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
          <h1 className="text-4xl font-bold mb-4">Каталог курсов</h1>
          <p className="text-xl text-muted-foreground">
            Выберите курс для изучения новых навыков и развития карьеры
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card 
              key={course.id} 
              className="p-6 hover:shadow-lg transition-all cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onCourseSelect(course)}
            >
              <div className="flex items-start justify-between mb-4">
                <Badge variant={course.enrolled ? "default" : "secondary"}>
                  {course.category}
                </Badge>
                {course.enrolled && course.progress === 100 && (
                  <Icon name="CheckCircle" size={24} className="text-green-500" />
                )}
              </div>

              <h3 className="text-xl font-semibold mb-3 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {course.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span>{course.duration}</span>
                  <span className="mx-2">•</span>
                  <Icon name="BookOpen" size={16} />
                  <span>{course.lessonsCount} уроков</span>
                </div>

                {course.enrolled && course.progress > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Прогресс</span>
                      <span className="font-semibold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} />
                  </div>
                )}

                <Button 
                  className="w-full mt-2" 
                  variant={course.enrolled ? "default" : "outline"}
                >
                  {course.enrolled ? 'Продолжить' : 'Записаться'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoursesPage;
