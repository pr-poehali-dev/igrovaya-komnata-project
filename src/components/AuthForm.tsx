import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface AuthFormProps {
  onLogin: (email: string) => void;
}

const AuthForm = ({ onLogin }: AuthFormProps) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginData.email);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }
    onLogin(registerData.email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white font-montserrat mb-2">
            🎮 GameZone
          </CardTitle>
          <p className="text-purple-200 font-open-sans">
            Войдите в свой аккаунт или создайте новый
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10">
              <TabsTrigger
                value="login"
                className="text-white data-[state=active]:bg-purple-600"
              >
                Вход
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="text-white data-[state=active]:bg-purple-600"
              >
                Регистрация
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Пароль
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Icon name="LogIn" size={20} className="mr-2" />
                  Войти
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Имя
                  </Label>
                  <Input
                    id="name"
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, name: e.target.value })
                    }
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                    placeholder="Ваше имя"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="reg-email"
                    type="email"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      })
                    }
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password" className="text-white">
                    Пароль
                  </Label>
                  <Input
                    id="reg-password"
                    type="password"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-white">
                    Подтвердите пароль
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Icon name="UserPlus" size={20} className="mr-2" />
                  Создать аккаунт
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
