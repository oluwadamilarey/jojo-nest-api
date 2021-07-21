import { registerEnumType } from '@nestjs/graphql';

export enum Genotype {
  AA = 'AA',
  AS = 'AS',
  SS = 'SS',
  AC = 'AC',
}

registerEnumType(Genotype, {
  name: 'Genotype',
  description: 'Human genotype',
});
