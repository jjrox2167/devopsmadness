export type AccountOverviewUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  dateOfBirth?: string | Date | null;
  language?: string | null;
  country?: string | null;
  gender?: string | null;
  twoFactorEnabled?: boolean | null;
};
