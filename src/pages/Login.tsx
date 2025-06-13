
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, LogIn } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const users = [
  {
    id: 'user-a',
    name: 'User A',
    roles: ['report-creator']
  },
  {
    id: 'user-b',
    name: 'User B',
    roles: ['report-creator', 'data-manager', 'report-generator', 'report-validator']
  }
];

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const handleUserLogin = (user: typeof users[0]) => {
    login(user);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Select your user to continue
          </p>
        </div>

        <div className="space-y-4">
          {users.map((user) => (
            <Card 
              key={user.id}
              className="p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 border-border hover:border-primary/50 bg-gradient-to-br from-background to-muted/30"
              onClick={() => handleUserLogin(user)}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {user.roles.length} role{user.roles.length > 1 ? 's' : ''} available
                  </p>
                </div>
                <LogIn className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            This is a demo login. Select any user to continue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
