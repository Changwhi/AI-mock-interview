import { integer, pgEnum, pgTable, serial, text, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

type UserId = number & { __brand: 'user_id' };
export const popularityEnum = pgEnum('popularity', ['unknown', 'known', 'popular']);

export const MockInterview = pgTable('mockInterview', {
  id: serial('id').primaryKey(),
  jsonMockResp:text('jsonMockResp').notNull(),
  jobPosition:varchar('jobPosition').notNull(),
  jobDescription:varchar('jobDescription').notNull(),
  jobExperience:varchar('jobExperience').notNull(),
  createdBy:varchar('createdBy').notNull(),
  createdAt:varchar('createdAt').notNull(),
  mockId:varchar('mockId').notNull(),
});


export const Answer = pgTable('answer', {
  id: serial('id').primaryKey(),
  mockIdRef: varchar('mockId').notNull(),
  question: varchar('question').notNull(),
  correctAns: varchar('correctAns').notNull(),
  userAnswer: varchar('answer').notNull(),
  feedback: varchar('feedback').notNull(),
  userEmail:varchar('userEmail').notNull(),
  rating: varchar('rating').notNull(),
  createdAt:varchar('createdAt').notNull(),
});