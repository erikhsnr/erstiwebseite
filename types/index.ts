import {
  Event,
  EventGroup,
  Registration,
  Admin,
  ContactMessage,
  EmailLog,
} from "@prisma/client";

export type {
  Event,
  EventGroup,
  Registration,
  Admin,
  ContactMessage,
  EmailLog,
};

// Define enum-like types for string fields
export type RegistrationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "WAITLIST";
export type EmailType =
  | "CONFIRMATION"
  | "REMINDER_DAY_BEFORE"
  | "REMINDER_3_HOURS"
  | "CANCELLATION"
  | "ADMIN_NOTIFICATION";

export interface EventWithGroups extends Event {
  groups: EventGroupWithRegistrations[];
  registrations: Registration[];
}

export interface EventGroupWithRegistrations extends EventGroup {
  registrations: Registration[];
}

export interface RegistrationWithEvent extends Registration {
  event: Event;
  group?: EventGroup;
}

export interface EventFormData {
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  maxGroups: number;
  groups: {
    name: string;
    maxSeats: number;
  }[];
}

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  groupId?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AdminLoginData {
  email: string;
  password: string;
}

export interface AdminCreateData {
  email: string;
  password: string;
  name: string;
}

export interface EventFilters {
  date?: string;
  status?: "upcoming" | "past" | "all";
  search?: string;
}

export interface RegistrationFilters {
  eventId?: string;
  status?: RegistrationStatus;
  search?: string;
}

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface EmailTemplateData {
  firstName: string;
  lastName: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation?: string;
  groupName?: string;
  unsubscribeUrl: string;
}

export interface AdminStats {
  totalEvents: number;
  totalRegistrations: number;
  upcomingEvents: number;
  pendingRegistrations: number;
  confirmedRegistrations: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface WeekSchedule {
  [key: string]: EventWithGroups[];
}

export interface NavigationItem {
  name: string;
  href: string;
  current?: boolean;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface ImportantLink {
  title: string;
  description: string;
  href: string;
  external?: boolean;
}
