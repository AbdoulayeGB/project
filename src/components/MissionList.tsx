import React, { useState } from 'react';
import { Mission } from '../types/mission';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { PencilIcon, TrashIcon, CalendarIcon, MapPinIcon, UsersIcon, ChatBubbleLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { MissionDetails } from './MissionDetails';

interface MissionListProps {
  missions: Mission[];
  onEdit?: (mission: Mission) => void;
  onDelete?: (id: string) => void;
  onAddRemark?: (missionId: string, content: string) => void;
  onAddSanction?: (missionId: string, sanction: any) => void;
  onAddFinding?: (missionId: string, finding: any) => void;
}

const statusColors = {
  PLANIFIEE: 'bg-blue-100 text-blue-800 border-blue-200',
  EN_COURS: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  TERMINEE: 'bg-green-100 text-green-800 border-green-200',
  ANNULEE: 'bg-red-100 text-red-800 border-red-200',
};

const statusLabels = {
  PLANIFIEE: 'Planifiée',
  EN_COURS: 'En cours',
  TERMINEE: 'Terminée',
  ANNULEE: 'Annulée',
};

export const MissionList: React.FC<MissionListProps> = ({
  missions,
  onEdit,
  onDelete,
  onAddRemark,
  onAddSanction,
  onAddFinding
}) => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {mission.organization}
                  </h3>
                  <p className="text-sm text-gray-600">{mission.title}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[mission.status]}`}>
                  {statusLabels[mission.status]}
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
                  {format(new Date(mission.start_date), 'dd MMMM yyyy', { locale: fr })}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                  {mission.address}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <UsersIcon className="h-5 w-5 mr-2 text-gray-400" />
                  {mission.team_members.join(', ')}
                </div>
                {(mission.findings?.length || 0) > 0 && (
                  <div className="flex items-center text-sm text-gray-600">
                    <ExclamationTriangleIcon className="h-5 w-5 mr-2 text-gray-400" />
                    {mission.findings?.length} manquement(s)
                  </div>
                )}
                {(mission.remarks?.length || 0) > 0 && (
                  <div className="flex items-center text-sm text-gray-600">
                    <ChatBubbleLeftIcon className="h-5 w-5 mr-2 text-gray-400" />
                    {mission.remarks?.length} remarque(s)
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setSelectedMission(mission)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ChatBubbleLeftIcon className="h-4 w-4 mr-2" />
                  Détails
                </button>
                {onEdit && (
                  <button
                    onClick={() => onEdit(mission)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Modifier
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(mission.id)}
                    className="inline-flex items-center px-3 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      
      </div>

      {/* Modal pour les détails de la mission */}
      {selectedMission && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">
                {selectedMission.title}
              </h2>
              <button
                onClick={() => setSelectedMission(null)}
                className="text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <MissionDetails
                mission={selectedMission}
                onAddRemark={onAddRemark!}
                onAddSanction={onAddSanction!}
                onAddFinding={onAddFinding!}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};