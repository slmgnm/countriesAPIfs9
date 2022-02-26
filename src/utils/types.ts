export type ICountry = {
  flags: string[];
  name: {
    common: string;
    official: string;
    nativeName: {
      msa: {
        official: string;
        common: string;
      };
    };
  };
  capital: string[];
  region: string;
  population: number;
};
