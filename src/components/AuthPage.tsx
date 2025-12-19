import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { User } from '@/pages/Index';

type AuthPageProps = {
  onLogin: (user: User) => void;
  onBack: () => void;
};

const AuthPage = ({ onLogin, onBack }: AuthPageProps) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPosition, setRegisterPosition] = useState('');
  const [registerDepartment, setRegisterDepartment] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      id: '1',
      name: 'Иван Петров',
      email: loginEmail,
      position: 'Менеджер',
      department: 'Продажи'
    };
    onLogin(user);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      id: Math.random().toString(),
      name: registerName,
      email: registerEmail,
      position: registerPosition,
      department: registerDepartment
    };
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <Button variant="ghost" onClick={onBack}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4">
              <Icon name="User" size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Добро пожаловать</h2>
            <p className="text-muted-foreground">Войдите или создайте новый аккаунт</p>
          </div>

          <Card className="p-6 animate-scale-in">
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="example@company.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password">Пароль</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Войти</Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="register-name">Полное имя</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Иван Иванов"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="example@company.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-password">Пароль</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-position">Должность</Label>
                    <Input
                      id="register-position"
                      type="text"
                      placeholder="Менеджер"
                      value={registerPosition}
                      onChange={(e) => setRegisterPosition(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-department">Отдел</Label>
                    <Input
                      id="register-department"
                      type="text"
                      placeholder="Продажи"
                      value={registerDepartment}
                      onChange={(e) => setRegisterDepartment(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Зарегистрироваться</Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
