import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator used to indicate which routes / graphql queries do not need authentication
 *
 * @see https://docs.nestjs.com/security/authentication#enable-authentication-globally
 * @returns
 */
export const SkipAuthentication = () => SetMetadata(IS_PUBLIC_KEY, true);
