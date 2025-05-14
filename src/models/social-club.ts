import { Venue } from './venue';

export interface SocialClub extends Venue {
  type: 'social-club';
  activities: string[];
  membershipFee?: number;
  ageGroup?: string;
  meetingSchedule?: string;
  membershipRequired: boolean;
}
