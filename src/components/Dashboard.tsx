import React from 'react';
import { Mission } from '../types/mission';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

interface DashboardProps {
  missions: Mission[];
}

export const Dashboard: React.FC<DashboardProps> = ({ missions }) => {
  const getStatistics = () => {
    return {
      total: missions.length,
      enCours: missions.filter(m => m.status === 'EN_COURS').length,
      planifiees: missions.filter(m => m.status === 'PLANIFIEE').length,
      terminees: missions.filter(m => m.status === 'TERMINEE').length
    };
  };

  const stats = getStatistics();

  const getMissionsByMonth = () => {
    const missionsByMonth: { [key: string]: Mission[] } = {};
    
    missions.forEach(mission => {
      const monthKey = format(new Date(mission.start_date), 'MMMM yyyy', { locale: fr });
      if (!missionsByMonth[monthKey]) {
        missionsByMonth[monthKey] = [];
      }
      missionsByMonth[monthKey].push(mission);
    });

    return missionsByMonth;
  };

  const missionsByMonth = getMissionsByMonth();

  return (
    <div className="space-y-8">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <ChartBarIcon className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total des missions</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">En cours</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.enCours}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <ExclamationCircleIcon className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Planifiées</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.planifiees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <ClipboardDocumentCheckIcon className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Terminées</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.terminees}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Missions par mois */}
      <div className="space-y-6">
        {Object.entries(missionsByMonth).map(([month, monthMissions]) => (
          <div key={month} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600">
              <h3 className="text-lg font-semibold text-white capitalize">
                {month}
              </h3>
            </div>
            <div className="p-6">
              <div className="divide-y divide-gray-200">
                {monthMissions.map(mission => (
                  <div key={mission.id} className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          {mission.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {mission.organization} - {mission.type_mission}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Du {format(new Date(mission.start_date), 'dd/MM/yyyy')} au {format(new Date(mission.end_date), 'dd/MM/yyyy')}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        mission.status === 'EN_COURS' ? 'bg-yellow-100 text-yellow-800' :
                        mission.status === 'TERMINEE' ? 'bg-green-100 text-green-800' :
                        mission.status === 'PLANIFIEE' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {mission.status === 'EN_COURS' ? 'En cours' :
                         mission.status === 'TERMINEE' ? 'Terminée' :
                         mission.status === 'PLANIFIEE' ? 'Planifiée' :
                         'Annulée'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};