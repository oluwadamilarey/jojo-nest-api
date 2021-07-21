import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../common/services/prisma.service';
import { UserType } from './graphql/enums/userType.enum';
import { CreateCareGiverInput } from '../auth/graphql/inputs/createCareGiver.input';
import { CreateHealthCareProfessionalInput } from '../auth/graphql/inputs/createHealthCareProfessional.input';
import { HealthCareProfessionalVerificationFile } from './graphql/types/healthCareProfessionalVerificationFile.type';
import { HealthCareProfessionalVerificationFileType } from './graphql/enums/healthCareProfessionalVerificationFileType.enum';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find a user by a unique attribute like their id, uuid or email
   *
   * @param userWhereUniqueInput
   * @returns
   */
  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        care_giver_profile: true,
        health_care_professional_profile: true,
      },
    });
  }

  /**
   * Create a caregiver user account
   *
   * @param input
   * @returns
   */
  async createCareGiver(input: CreateCareGiverInput): Promise<User> {
    const password = await bcrypt.hash(input.password, 10); // @TODO replace salt rounds with environment var / config var
    let user: Prisma.UserCreateInput;
    const {
      full_name,
      email,
      phone_number,
      country,
      state,
      city,
      address,
      role,
      child,
    } = input;

    user = {
      full_name,
      email,
      phone_number,
      user_type: UserType.CARE_GIVER,
      profile_image: `https://ui-avatars.com/api/?background=random&name=${full_name}`,
      password,
      care_giver_profile: {
        create: {
          country,
          state,
          city,
          address,
          role,
        },
      },
    };

    if (child) {
      const {
        first_name,
        date_of_birth,
        gender,
        birth_term,
        blood_group,
        genotype,
        has_allergies,
        has_medical_conditions,
        has_special_needs,
        allergies,
        track_milestones,
        track_growth,
        track_immunizations,
      } = child;
      user = {
        full_name,
        email,
        phone_number,
        user_type: UserType.CARE_GIVER,
        profile_image: `https://ui-avatars.com/api/?background=random&name=${full_name}`,
        password,
        care_giver_profile: {
          create: {
            country,
            state,
            city,
            address,
            role,
            children: {
              create: {
                first_name,
                date_of_birth,
                gender,
                birth_term,
                blood_group,
                genotype,
                has_allergies,
                has_medical_conditions,
                has_special_needs,
                allergies,
                track_milestones,
                track_growth,
                track_immunizations,
              },
            },
          },
        },
      };
    }

    return this.prisma.user.create({
      data: user,
      include: {
        care_giver_profile: {
          include: {
            children: true,
          },
        },
      },
    });
  }

  /**
   * Create a health care professional's user account
   *
   * @param input
   * @returns
   */
  async createHealthCareProfessional(
    input: CreateHealthCareProfessionalInput,
  ): Promise<User> {
    const password = await bcrypt.hash(input.password, 10); // @TODO replace salt rounds with environment var / config var
    const {
      full_name,
      email,
      phone_number,
      role,
      years_of_experience,
      verification_files,
    } = input;

    // @TODO Implement actual file upload
    const uploadedVerificationFilesData = verification_files.map(
      (verification_file) => {
        return {
          file_url: `https://source.unsplash.com/random/400/400`,
          type: verification_file.type,
        };
      },
    );

    return this.prisma.user.create({
      data: {
        full_name,
        email,
        phone_number,
        user_type: UserType.HEALTH_CARE_PROFESSIONAL,
        profile_image: `https://ui-avatars.com/api/?background=random&name=${full_name}`,
        password,
        health_care_professional_profile: {
          create: {
            years_of_experience,
            role,
            verification_files: {
              create: uploadedVerificationFilesData,
            },
          },
        },
      },

      include: {
        health_care_professional_profile: {
          include: {
            verification_files: true,
          },
        },
      },
    });
  }
}
