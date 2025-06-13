
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center justify-center p-6">
      <div className="mb-12">
        <h1 className="text-4xl font-light text-white mb-2">
          Welcome back
        </h1>
      </div>

      <div className="flex gap-16">
        {users.map((user) => (
          <Card 
            key={user.id}
            className="p-8 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl bg-white/90 backdrop-blur-sm border-0 rounded-lg"
            onClick={() => handleUserLogin(user)}
          >
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl font-semibold bg-gray-200 text-gray-700">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-medium text-gray-800">{user.name}</h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Login;
