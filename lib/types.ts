export type FlavorProfile = {
  acidity: number;
  bitterness: number;
  sweetness: number;
  body: number;
  notes: string[];
};

export type BrewingRecipe = {
  method: string;
  grind: string;
  dose: string;
  water_temp: string;
  pour_speed: string;
  notes: string;
};

export type CoffeeBean = {
  id: string;
  name: string;
  origin: string;
  roast_level: string;
  flavor_profile: FlavorProfile;
  vibe_tags: string[];
  music_pairing: string;
  spotify_id: string;
  brewing_recipe: BrewingRecipe;
  description: string;
};
