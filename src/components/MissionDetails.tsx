import React, { useState } from 'react';
import { Mission, Remark, Sanction, SanctionType } from '../types/mission';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FindingsForm } from './FindingsForm';

interface MissionDetailsProps {
  mission: Mission;
  onAddRemark: (missionId: string, content: string) => void;
  onAddSanction: (missionId: string, sanction: Omit<Sanction, 'id' | 'mission_id' | 'created_at' | 'updated_at'>) => void;
  onAddFinding: (missionId: string, finding: any) => void;
}

export const MissionDetails: React.FC<MissionDetailsProps> = ({
  mission,
  onAddRemark,
  onAddSanction,
  onAddFinding
}) => {
  const [newRemark, setNewRemark] = useState('');
  const [newSanction, setNewSanction] = useState({
    type: 'AVERTISSEMENT' as SanctionType,
    description: '',
    amount: '',
    decision_date: format(new Date(), 'yyyy-MM-dd')
  });

  const handleRemarkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRemark.trim()) {
      onAddRemark(mission.id, newRemark);
      setNewRemark('');
    }
  };

  const handleSanctionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSanction(mission.id, {
      type: newSanction.type,
      description: newSanction.description,
      amount: newSanction.amount ? parseFloat(newSanction.amount) : undefined,
      decision_date: newSanction.decision_date
    });
    setNewSanction({
      type: 'AVERTISSEMENT',
      description: '',
      amount: '',
      decision_date: format(new Date(), 'yyyy-MM-dd')
    });
  };

  return (
    <div className="space-y-8">
      {/* Manquements constatés */}
      <FindingsForm
        missionId={mission.id}
        onAddFinding={onAddFinding}
        existingFindings={mission.findings}
      />

      {/* Remarques */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h3 className="text-lg font-semibold text-white">Remarques</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mission.remarks?.map((remark) => (
              <div key={remark.id} className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{remark.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {format(new Date(remark.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                </p>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleRemarkSubmit} className="mt-6">
            <div>
              <label htmlFor="remark" className="block text-sm font-medium text-gray-700">
                Nouvelle remarque
              </label>
              <textarea
                id="remark"
                value={newRemark}
                onChange={(e) => setNewRemark(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Ajouter une remarque
            </button>
          </form>
        </div>
      </div>

      {/* Sanctions */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-red-600 to-pink-600">
          <h3 className="text-lg font-semibold text-white">Sanctions</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mission.sanctions?.map((sanction) => (
              <div key={sanction.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {sanction.type.replace('_', ' ')}
                    </span>
                    <p className="mt-2 text-gray-700">{sanction.description}</p>
                    {sanction.amount && (
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        Montant: {sanction.amount.toLocaleString('fr-FR')} FCFA
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {format(new Date(sanction.decision_date), 'dd/MM/yyyy')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSanctionSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="sanctionType" className="block text-sm font-medium text-gray-700">
                Type de sanction
              </label>
              <select
                id="sanctionType"
                value={newSanction.type}
                onChange={(e) => setNewSanction({ ...newSanction, type: e.target.value as SanctionType })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="AVERTISSEMENT">Avertissement</option>
                <option value="MISE_EN_DEMEURE">Mise en demeure</option>
                <option value="AMENDE">Amende</option>
                <option value="INJONCTION">Injonction</option>
                <option value="RESTRICTION_TRAITEMENT">Restriction de traitement</option>
              </select>
            </div>

            <div>
              <label htmlFor="sanctionDescription" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="sanctionDescription"
                value={newSanction.description}
                onChange={(e) => setNewSanction({ ...newSanction, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="sanctionAmount" className="block text-sm font-medium text-gray-700">
                Montant (FCFA)
              </label>
              <input
                type="number"
                id="sanctionAmount"
                value={newSanction.amount}
                onChange={(e) => setNewSanction({ ...newSanction, amount: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Optionnel"
              />
            </div>

            <div>
              <label htmlFor="sanctionDate" className="block text-sm font-medium text-gray-700">
                Date de décision
              </label>
              <input
                type="date"
                id="sanctionDate"
                value={newSanction.decision_date}
                onChange={(e) => setNewSanction({ ...newSanction, decision_date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Ajouter une sanction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};