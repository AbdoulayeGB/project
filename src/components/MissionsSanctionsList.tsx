import React, { useState, useMemo } from 'react';
import { useMissions } from '../hooks/useMissions';
import { Mission, Sanction } from '../types';

const MissionsSanctionsList: React.FC = () => {
  const { missions } = useMissions();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedMissions = useMemo(() => {
    let result = missions.filter(mission => {
      const matchesFilter = filter === 'all' || mission.status === filter;
      const matchesSearch = mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mission.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    return result.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
  }, [missions, filter, searchTerm, sortBy, sortOrder]);

  return (
    <div className="space-y-8 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Missions et Sanctions</h1>
        <p className="mt-2 text-gray-600">Liste des missions et leurs sanctions associées</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Tous les statuts</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminées</option>
          <option value="En attente">En attente</option>
        </select>

        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [newSortBy, newSortOrder] = e.target.value.split('-');
            setSortBy(newSortBy as 'date' | 'title');
            setSortOrder(newSortOrder as 'asc' | 'desc');
          }}
        >
          <option value="date-desc">Plus récent</option>
          <option value="date-asc">Plus ancien</option>
          <option value="title-asc">Titre A-Z</option>
          <option value="title-desc">Titre Z-A</option>
        </select>

        <input
          type="text"
          placeholder="Rechercher une mission..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {filteredAndSortedMissions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Aucune mission ne correspond à vos critères
          </div>
        ) : (
          filteredAndSortedMissions.map(mission => (
            <div key={mission.id} className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {mission.title}
              </h2>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Détails de la mission</h3>
                  <p className="text-gray-600">{mission.description}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-sm mt-2 ${
                    mission.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                    mission.status === 'Terminée' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {mission.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Sanctions</h3>
                  {mission.sanctions && mission.sanctions.length > 0 ? (
                    <ul className="space-y-2">
                      {mission.sanctions.map((sanction, index) => (
                        <li key={index} className="bg-red-50 p-3 rounded">
                          <p className="text-red-800 font-medium">{sanction.type}</p>
                          <p className="text-red-600">{sanction.description}</p>
                          <p className="text-sm text-red-500 mt-1">{sanction.date}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">Aucune sanction</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MissionsSanctionsList;