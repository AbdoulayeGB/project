import React from 'react';
import { useForm } from 'react-hook-form';
import { Mission, MissionType } from '../types/mission';

interface MissionFormProps {
  onSubmit: (data: Partial<Mission>) => void;
  initialData?: Partial<Mission>;
}

export const MissionForm: React.FC<MissionFormProps> = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Mission>>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
            Référence
          </label>
          <input
            type="text"
            {...register('reference', { required: 'La référence est requise' })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
            placeholder="ex: MISSION-2024-001"
          />
          {errors.reference && (
            <p className="mt-1 text-sm text-red-600">{errors.reference.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titre de la mission
          </label>
          <input
            type="text"
            {...register('title', { required: 'Le titre est requis' })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
            Organisation
          </label>
          <input
            type="text"
            {...register('organization', { required: 'L\'organisation est requise' })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
          />
          {errors.organization && (
            <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="type_mission" className="block text-sm font-medium text-gray-700">
            Type de mission
          </label>
          <select
            {...register('type_mission', { required: 'Le type de mission est requis' })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
          >
            <option value="Contrôle sur place">Contrôle sur place</option>
            <option value="Contrôle sur pièces">Contrôle sur pièces</option>
            <option value="Contrôle en ligne">Contrôle en ligne</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register('description', { required: 'La description est requise' })}
          rows={4}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="motif_controle" className="block text-sm font-medium text-gray-700">
          Motif du contrôle
        </label>
        <textarea
          {...register('motif_controle', { required: 'Le motif du contrôle est requis' })}
          rows={3}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
        />
        {errors.motif_controle && (
          <p className="mt-1 text-sm text-red-600">{errors.motif_controle.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Adresse
        </label>
        <input
          type="text"
          {...register('address', { required: 'L\'adresse est requise' })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
            Date de début
          </label>
          <input
            type="date"
            {...register('start_date', { required: 'La date de début est requise' })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
          />
          {errors.start_date && (
            <p className="mt-1 text-sm text-red-600">{errors.start_date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
            Date de fin
          </label>
          <input
            type="date"
            {...register('end_date', { required: 'La date de fin est requise' })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
          />
          {errors.end_date && (
            <p className="mt-1 text-sm text-red-600">{errors.end_date.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Statut
        </label>
        <select
          {...register('status', { required: 'Le statut est requis' })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
        >
          <option value="PLANIFIEE">Planifiée</option>
          <option value="EN_COURS">En cours</option>
          <option value="TERMINEE">Terminée</option>
          <option value="ANNULEE">Annulée</option>
        </select>
      </div>

      <div>
        <label htmlFor="team_members" className="block text-sm font-medium text-gray-700">
          Membres de l'équipe (séparés par des virgules)
        </label>
        <input
          type="text"
          {...register('team_members')}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
          placeholder="Ex: John Doe, Jane Smith"
        />
      </div>

      <div>
        <label htmlFor="objectives" className="block text-sm font-medium text-gray-700">
          Objectifs (un par ligne)
        </label>
        <textarea
          {...register('objectives')}
          rows={3}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
          placeholder="Entrez chaque objectif sur une nouvelle ligne"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Enregistrer la mission
        </button>
      </div>
    </form>
  );
};