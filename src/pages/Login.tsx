
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const users = [
  {
    id: 'user-1',
    name: 'User 1',
    roles: ['report-generator']
  },
  {
    id: 'user-2', 
    name: 'User 2',
    roles: ['report-creator']
  },
  {
    id: 'user-3',
    name: 'User 3',
    roles: ['report-validator']
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="mb-12">
        <h1 className="text-4xl font-light text-foreground mb-2">
          Welcome back
        </h1>
      </div>

      <div className="flex gap-16">
        {users.map((user) => (
          <div 
            key={user.id}
            onClick={() => handleUserLogin(user)}
            className="cursor-pointer transition-all duration-200 hover:scale-105 flex flex-col items-center"
          >
            <Avatar className="h-24 w-24 mb-4 bg-muted">
              <AvatarFallback className="text-2xl font-semibold bg-muted text-muted-foreground">
                <User size={36} />
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-medium text-foreground">{user.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
