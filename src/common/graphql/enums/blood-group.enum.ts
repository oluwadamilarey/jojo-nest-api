import { registerEnumType } from '@nestjs/graphql';

export enum BloodGroup {
  A = 'A',
  B = 'B',
  AB = 'AB',
  O = 'O',
}

registerEnumType(BloodGroup, {
  name: 'BloodGroup',
  description: 'Human blood group',
});
