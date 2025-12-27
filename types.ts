export interface Game {
  id: string;
  name: string;
  slug: string;
  image: string;
  themeColor: string;
}

export enum ChangeType {
  NEW = 'New Content',
  BUFF = 'Buff',
  NERF = 'Nerf',
  ADJUSTMENT = 'Adjustment',
  FIX = 'Bug Fix'
}

export interface PatchItem {
  title: string;
  description: string;
  type: ChangeType;
  importance: 'High' | 'Medium' | 'Low';
}

export interface PatchUpdateSection {
  title: string; // e.g., "Main Update 14.2" or "Hotfix 14.2.1"
  date: string;
  isHotfix: boolean;
  summary: string;
  changes: PatchItem[];
}

export interface PatchNotes {
  gameName: string;
  headlineVersion: string; // The main version number for display
  headlineDate: string;
  overallSummary: string;
  updates: PatchUpdateSection[]; // List containing the main update and any subsequent hotfixes
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface FetchResult {
  data: PatchNotes | null;
  sources: GroundingSource[];
  error?: string;
}
