export interface FindPetsResponse {
  pets: FindPetsResponseItem[];
}

export interface FindPetsResponseItem {
  id: string;
  name: string;
  about: string;
  age: number;
  size: string;
  energyLevel: string;
  independencyLevel: string;
  environment: string;
  createdAt: Date;
}
