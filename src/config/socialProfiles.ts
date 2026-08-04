export const SOCIAL_PROFILES = {
  facebook: {
    label: 'Facebook',
    url: 'https://www.facebook.com/datacostza'
  },
  linkedin: {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/datacostza/'
  }
} as const;

export const ORGANIZATION_SAME_AS = Object.values(SOCIAL_PROFILES).map(({ url }) => url);
