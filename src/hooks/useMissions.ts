import { useState } from 'react';
import { Mission, Remark, Sanction, Finding } from '../types/mission';
import { mockMissions } from '../data/mockData';

export function useMissions() {
  const [missions, setMissions] = useState<Mission[]>(mockMissions);

  const addMission = (mission: Omit<Mission, 'id' | 'created_at' | 'updated_at'>) => {
    const newMission: Mission = {
      ...mission,
      id: Math.random().toString(36).substr(2, 9),
      remarks: [],
      sanctions: [],
      findings: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setMissions(prev => [...prev, newMission]);
    return newMission;
  };

  const updateMission = (id: string, updates: Partial<Mission>) => {
    setMissions(prev => prev.map(mission => 
      mission.id === id 
        ? { ...mission, ...updates, updated_at: new Date().toISOString() }
        : mission
    ));
  };

  const deleteMission = (id: string) => {
    setMissions(prev => prev.filter(mission => mission.id !== id));
  };

  const addRemark = (missionId: string, content: string) => {
    const newRemark: Remark = {
      id: Math.random().toString(36).substr(2, 9),
      mission_id: missionId,
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setMissions(prev => prev.map(mission =>
      mission.id === missionId
        ? {
            ...mission,
            remarks: [...(mission.remarks || []), newRemark],
            updated_at: new Date().toISOString()
          }
        : mission
    ));

    return newRemark;
  };

  const addSanction = (missionId: string, sanctionData: Omit<Sanction, 'id' | 'mission_id' | 'created_at' | 'updated_at'>) => {
    const newSanction: Sanction = {
      id: Math.random().toString(36).substr(2, 9),
      mission_id: missionId,
      ...sanctionData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setMissions(prev => prev.map(mission =>
      mission.id === missionId
        ? {
            ...mission,
            sanctions: [...(mission.sanctions || []), newSanction],
            updated_at: new Date().toISOString()
          }
        : mission
    ));

    return newSanction;
  };

  const addFinding = (missionId: string, findingData: Omit<Finding, 'id' | 'mission_id' | 'created_at' | 'updated_at'>) => {
    const newFinding: Finding = {
      id: Math.random().toString(36).substr(2, 9),
      mission_id: missionId,
      ...findingData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setMissions(prev => prev.map(mission =>
      mission.id === missionId
        ? {
            ...mission,
            findings: [...(mission.findings || []), newFinding],
            updated_at: new Date().toISOString()
          }
        : mission
    ));

    return newFinding;
  };

  return {
    missions,
    addMission,
    updateMission,
    deleteMission,
    addRemark,
    addSanction,
    addFinding
  };
}