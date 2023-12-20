interface Channel {
  id: number;
  name: string;
  public_cdn_url: string;
}

export interface Game {
  id: number;
  date_time: string;
  official_date: string;
  channel?: Channel;
  no_broadcast?: boolean;
  status: string;
  venue: string;
  home_team: {
    id: number;
    name: string;
    abbreviation: string;
  };
  away_team: {
    id: number;
    name: string;
    abbreviation: string;
  };
  score: {
    inning: number;
    inning_half: string;
    home_score: number;
    away_score: number;
  };
}
