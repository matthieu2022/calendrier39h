import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const App = () => {
  // États pour la page de login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Composant CartoucheCalcul
  const CartoucheCalcul = () => {
    const [dateDebut] = useState('2024-03-07');
    const [dateFin] = useState('2025-03-07');
    const [heuresEnPresentiel] = useState(0);
    const [heuresEnDistanciel] = useState(0);
    const [dureeContrat] = useState(1965.60);
    const [heuresFormation] = useState(0);
    const [tauxFormation] = useState('#DIV/0!');

    return (
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="mb-4">
                <div className="text-center font-bold border-b pb-2 mb-4">
                  Date de la période
                  <div className="flex justify-center items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <Input
                        type="date"
                        value={dateDebut}
                        className="w-[130px]"
                      />
                    </div>
                    <span>à</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <Input
                        type="date"
                        value={dateFin}
                        className="w-[130px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 border">
                  <div className="bg-gray-100 p-2 font-bold text-center">
                    Calendrier pour 39h
                  </div>
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr>
                        <td className="border p-2 bg-green-100">Nb d'heures en Présentiel</td>
                        <td className="border p-2 text-center">{heuresEnPresentiel.toFixed(2)}</td>
                        <td className="border p-2">heures</td>
                      </tr>
                      <tr>
                        <td className="border p-2 bg-blue-100">Nb d'heures en Distanciel</td>
                        <td className="border p-2 text-center">{heuresEnDistanciel.toFixed(2)}</td>
                        <td className="border p-2">heures</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Durée du contrat</td>
                        <td className="border p-2 text-center">{dureeContrat.toFixed(2)}</td>
                        <td className="border p-2">heures</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Taux de formation</td>
                        <td className="border p-2 text-center">{tauxFormation}</td>
                        <td className="border p-2">%</td>
                      </tr>
                      <tr className="italic">
                        <td className="border p-2">Nb d'heures de formation</td>
                        <td className="border p-2 text-center">{heuresFormation.toFixed(2)}</td>
                        <td className="border p-2">heures</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Composant CalendrierGrid
  const CalendrierGrid = () => {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    const [selectedType, setSelectedType] = useState(null);

    const getDaysInMonth = (year, month) => {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const days = [];

      const firstDayOfWeek = firstDay.getDay() || 7;
      for (let i = 1; i < firstDayOfWeek; i++) {
        days.push(null);
      }

      for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push(i);
      }

      return days;
    };

    return (
      <Card>
        <CardContent className="p-4">
          <div className="mb-4 flex gap-4 items-center">
            <Input
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-32"
            />
            <Button
              onClick={() => setSelectedType('presentiel')}
              style={{ 
                backgroundColor: selectedType === 'presentiel' ? '#22c55e' : '#4ade80',
                color: 'white',
                border: 'none'
              }}
            >
              Présentiel
            </Button>
            <Button
              onClick={() => setSelectedType('distanciel')}
              style={{ 
                backgroundColor: selectedType === 'distanciel' ? '#3b82f6' : '#60a5fa',
                color: 'white',
                border: 'none'
              }}
            >
              Distanciel
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, monthIndex) => (
              <div key={monthIndex} className="border rounded p-2">
                <h3 className="font-bold mb-2">
                  {new Date(year, monthIndex).toLocaleString('fr-FR', { month: 'long' })}
                </h3>
                <div className="grid grid-cols-7 gap-1">
                  {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(day => (
                    <div key={day} className="text-center text-xs font-bold">
                      {day}
                    </div>
                  ))}
                  {getDaysInMonth(year, monthIndex).map((day, index) => (
                    <div
                      key={index}
                      className={`
                        text-center text-xs p-1 rounded
                        ${day ? 'bg-gray-100 hover:bg-gray-200 cursor-pointer' : ''}
                      `}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Composant CalendarPage
  const CalendarPage = ({ onLogout }) => {
    return (
      <div className="min-h-screen p-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow">
            <h1 className="text-xl font-bold">Planification des formations</h1>
            <Button 
              variant="destructive"
              onClick={onLogout}
            >
              Déconnexion
            </Button>
          </div>
          <CartoucheCalcul />
          <CalendrierGrid />
        </div>
      </div>
    );
  };

  const handleLogin = () => {
    if ((username === 'admin' && password === '1234') || 
        (username === 'user' && password === '12345')) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Identifiants incorrects');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setError('');
  };

  if (isLoggedIn) {
    return <CalendarPage onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 bg-gray-50">
      <div className="w-full max-w-md mt-8">
        <Card>
          <CardContent className="p-6">
            <div className="w-full h-24 border border-gray-300 mb-8 flex items-center justify-center">
              LOGO
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full max-w-md">
        <Card>
          <CardContent className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-600 rounded">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="w-1/3">utilisateur</label>
                <Input
                  className="w-2/3 bg-[#fff9c4]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="w-1/3">mot de passe</label>
                <Input
                  type="password"
                  className="w-2/3 bg-[#fff9c4]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-center mt-6">
                <Button onClick={handleLogin}>
                  Connexion
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full max-w-md mt-8 flex justify-between text-sm text-gray-600">
        <div>© matthieu - 2024</div>
        <div>version en cours V12</div>
      </div>
    </div>
  );
};

export default App;