export interface Player {
  username: string;
}

export interface Team {
  name: string;
  colour: string;
  players: Player[];

  completed_tiles: number;
}

export interface Task {
  title: string;
  description: string;

  difficulty: string;
  category: string;
}

export interface Tile {
  number: number;

  task: Task | null;

  completed_by_team: Team | null;
  visible_to_teams: Team[];
}
