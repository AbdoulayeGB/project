export interface Mission {
  id: number;
  title: string;
  description: string;
  status: string;
}

export interface Sanction {
  id: number;
  type: string;
  description: string;
  date: string;
}