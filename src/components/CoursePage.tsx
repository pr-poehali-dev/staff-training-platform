import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Course, User } from '@/pages/Index';

type CoursePageProps = {
  course: Course | null;
  onNavigate: (page: 'courses' | 'results') => void;
  onBack: () => void;
  user: User | null;
  onLogout: () => void;
};

const lessons = [
  { id: 1, title: 'Введение в курс', duration: '15 мин', completed: true },
  { id: 2, title: 'Основные концепции', duration: '25 мин', completed: true },
  { id: 3, title: 'Практическое применение', duration: '30 мин', completed: false },
  { id: 4, title: 'Продвинутые техники', duration: '40 мин', completed: false },
  { id: 5, title: 'Итоговое тестирование', duration: '20 мин', completed: false }
];

const testQuestions = [
  {
    id: 1,
    question: 'Какой главный принцип эффективной коммуникации с клиентом?',
    options: [
      'Говорить как можно больше о продукте',
      'Слушать и понимать потребности клиента',
      'Быстро закрыть сделку',
      'Предлагать максимальную скидку'
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: 'Что такое "активное слушание"?',
    options: [
      'Слушать музыку во время работы',
      'Внимательное восприятие с обратной связью',
      'Записывать все, что говорит клиент',
      'Слушать несколько человек одновременно'
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: 'Какой метод лучше всего подходит для выявления потребностей?',
    options: [
      'Закрытые вопросы',
      'Утверждения',
      'Открытые вопросы',
      'Прямые продажи'
    ],
    correctAnswer: 2
  }
];

const CoursePage = ({ course, onNavigate, onBack, user, onLogout }: CoursePageProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  if (!course) {
    return null;
  }

  const handleSubmitTest = () => {
    setTestSubmitted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    testQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / testQuestions.length) * 100);
  };

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к курсам
          </Button>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user.name}</span>
              <Button variant="outline" onClick={onLogout}>Выйти</Button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <Badge className="mb-4">{course.category}</Badge>
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={18} />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="BookOpen" size={18} />
                <span>{course.lessonsCount} уроков</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Прогресс курса</span>
                <span className="font-semibold">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          </div>

          <Card className="p-6 animate-scale-in">
            <Tabs defaultValue="lessons">
              <TabsList className="mb-6">
                <TabsTrigger value="lessons">Уроки</TabsTrigger>
                <TabsTrigger value="materials">Материалы</TabsTrigger>
                <TabsTrigger value="test">Тестирование</TabsTrigger>
              </TabsList>

              <TabsContent value="lessons">
                <div className="space-y-3">
                  {lessons.map((lesson) => (
                    <div 
                      key={lesson.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          lesson.completed ? 'bg-green-100' : 'bg-muted'
                        }`}>
                          {lesson.completed ? (
                            <Icon name="Check" size={20} className="text-green-600" />
                          ) : (
                            <span className="text-sm font-semibold">{lesson.id}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{lesson.title}</h3>
                          <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                        </div>
                      </div>
                      <Button variant={lesson.completed ? "outline" : "default"}>
                        {lesson.completed ? 'Повторить' : 'Начать'}
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="materials">
                <div className="space-y-4">
                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Icon name="FileText" size={24} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Презентация курса</h3>
                        <p className="text-sm text-muted-foreground">PDF, 2.5 MB</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Icon name="Download" size={20} />
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                        <Icon name="FileSpreadsheet" size={24} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Шаблоны и чек-листы</h3>
                        <p className="text-sm text-muted-foreground">XLSX, 1.2 MB</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Icon name="Download" size={20} />
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Icon name="Video" size={24} className="text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Видео-лекции</h3>
                        <p className="text-sm text-muted-foreground">MP4, 145 MB</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Icon name="Download" size={20} />
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="test">
                {!testSubmitted ? (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-blue-900 mb-1">Инструкция по тестированию</h3>
                          <p className="text-sm text-blue-800">
                            Ответьте на все вопросы. Для успешного прохождения необходимо набрать минимум 70%.
                          </p>
                        </div>
                      </div>
                    </div>

                    {testQuestions.map((question, index) => (
                      <Card key={question.id} className="p-6">
                        <h3 className="font-semibold mb-4">
                          {index + 1}. {question.question}
                        </h3>
                        <RadioGroup 
                          value={selectedAnswers[question.id]?.toString()}
                          onValueChange={(value) => 
                            setSelectedAnswers({...selectedAnswers, [question.id]: parseInt(value)})
                          }
                        >
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center space-x-2 mb-2">
                              <RadioGroupItem value={optIndex.toString()} id={`q${question.id}-${optIndex}`} />
                              <Label htmlFor={`q${question.id}-${optIndex}`} className="cursor-pointer">
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </Card>
                    ))}

                    <Button 
                      onClick={handleSubmitTest} 
                      className="w-full"
                      disabled={Object.keys(selectedAnswers).length !== testQuestions.length}
                    >
                      Отправить ответы
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
                      calculateScore() >= 70 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <Icon 
                        name={calculateScore() >= 70 ? "CheckCircle" : "XCircle"} 
                        size={48} 
                        className={calculateScore() >= 70 ? 'text-green-600' : 'text-red-600'}
                      />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">
                      {calculateScore() >= 70 ? 'Тест пройден!' : 'Тест не пройден'}
                    </h2>
                    <p className="text-xl text-muted-foreground mb-6">
                      Ваш результат: {calculateScore()}%
                    </p>
                    {calculateScore() >= 70 ? (
                      <Button onClick={() => onNavigate('results')}>
                        Посмотреть результаты
                      </Button>
                    ) : (
                      <Button onClick={() => setTestSubmitted(false)}>
                        Попробовать снова
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CoursePage;
