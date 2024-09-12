import { relations } from "drizzle-orm/relations";
import { category, course, attachment, chapter, muxData, userProgress, purchase } from "./schema";

export const courseRelations = relations(course, ({one, many}) => ({
	category: one(category, {
		fields: [course.categoryId],
		references: [category.id]
	}),
	attachments: many(attachment),
	chapters: many(chapter),
	purchases: many(purchase),
}));

export const categoryRelations = relations(category, ({many}) => ({
	courses: many(course),
}));

export const attachmentRelations = relations(attachment, ({one}) => ({
	course: one(course, {
		fields: [attachment.courseId],
		references: [course.id]
	}),
}));

export const chapterRelations = relations(chapter, ({one, many}) => ({
	course: one(course, {
		fields: [chapter.courseId],
		references: [course.id]
	}),
	muxData: many(muxData),
	userProgresses: many(userProgress),
}));

export const muxDataRelations = relations(muxData, ({one}) => ({
	chapter: one(chapter, {
		fields: [muxData.chapterId],
		references: [chapter.id]
	}),
}));

export const userProgressRelations = relations(userProgress, ({one}) => ({
	chapter: one(chapter, {
		fields: [userProgress.chapterId],
		references: [chapter.id]
	}),
}));

export const purchaseRelations = relations(purchase, ({one}) => ({
	course: one(course, {
		fields: [purchase.courseId],
		references: [course.id]
	}),
}));