import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MissionList } from './components/MissionList';
import { MissionForm } from './components/MissionForm';
import { Dashboard } from './components/Dashboard';
import { useMissions } from './hooks/useMissions';
import MissionsSanctionsList from './components/MissionsSanctionsList';
import Statistics from './components/Statistics';

const queryClient = new QueryClient();

function App() {
  const { missions, addMission, updateMission, deleteMission, addRemark, addSanction, addFinding } = useMissions();

  const handleSubmit = (data: any) => {
    const formattedData = {
      ...data,
      team_members: data.team_members ? data.team_members.split(',').map((m: string) => m.trim()) : [],
      objectives: data.objectives ? data.objectives.split('\n').filter((o: string) => o.trim()) : []
    };
    addMission(formattedData);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
          <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-20">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                      CDP Control
                    </span>
                  </div>
                  <div className="hidden md:ml-12 md:flex md:space-x-8">
                    <Link
                      to="/"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Tableau de bord
                    </Link>
                    <Link
                      to="/missions"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Liste des missions
                    </Link>
                    <Link
                      to="/nouvelle-mission"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Nouvelle mission
                    </Link>
                    <Link
                      to="/missions-sanctions"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Missions & Sanctions
                    </Link>
                    <Link
                      to="/statistics"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Statistiques
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <div className="mb-8">
                      <h1 className="text-3xl font-bold text-gray-900">
                        Tableau de bord
                      </h1>
                      <p className="mt-2 text-gray-600">
                        Vue d'ensemble des missions de contrôle
                      </p>
                    </div>
                    <Dashboard missions={missions} />
                  </div>
                }
              />
              <Route
                path="/missions"
                element={
                  <div>
                    <div className="mb-8">
                      <h1 className="text-3xl font-bold text-gray-900">
                        Missions de contrôle
                      </h1>
                      <p className="mt-2 text-gray-600">
                        Gérez et suivez toutes vos missions de contrôle de protection des données
                      </p>
                    </div>
                    <MissionList 
                      missions={missions}
                      onDelete={deleteMission}
                      onAddRemark={addRemark}
                      onAddSanction={addSanction}
                      onAddFinding={addFinding}
                    />
                  </div>
                }
              />
              <Route
                path="/nouvelle-mission"
                element={
                  <div>
                    <div className="mb-8">
                      <h1 className="text-3xl font-bold text-gray-900">
                        Nouvelle mission
                      </h1>
                      <p className="mt-2 text-gray-600">
                        Créez une nouvelle mission de contrôle
                      </p>
                    </div>
                    <div className="bg-white shadow-lg rounded-2xl">
                      <div className="px-6 py-8">
                        <MissionForm onSubmit={handleSubmit} />
                      </div>
                    </div>
                  </div>
                }
              />
              <Route path="/missions-sanctions" element={<MissionsSanctionsList />} />
              <Route path="/statistics" element={<Statistics />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;