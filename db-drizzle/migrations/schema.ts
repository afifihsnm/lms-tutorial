import { sqliteTable, AnySQLiteColumn, index, foreignKey, text, real, numeric, uniqueIndex, integer } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"
import { randomUUID } from "crypto";

export const Course = sqliteTable("Course", {
	id: text("id").primaryKey().$defaultFn(() => randomUUID()),
	userId: text("userId").notNull(),
	title: text("title").notNull(),
	description: text("description"),
	imageUrl: text("imageUrl"),
	price: real("price"),
	isPublished: integer("isPublished", { mode: 'boolean' }).default(false).notNull(),
	categoryId: text("categoryId").references(() => Category.id, { onDelete: "set null", onUpdate: "cascade" } ),
	createdAt: numeric("createdAt").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: numeric("updatedAt").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
},
(table) => {
	return {
		titleIdx: index("Course_title_idx").on(table.title),
		categoryIdIdx: index("Course_categoryId_idx").on(table.categoryId),
	}
});

export const Category = sqliteTable("Category", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
},
(table) => {
	return {
		nameKey: uniqueIndex("Category_name_key").on(table.name),
	}
});

export const Attachment = sqliteTable("Attachment", {
	id: text("id").primaryKey().$defaultFn(() => randomUUID()),
	name: text("name").notNull(),
	url: text("url").notNull(),
	courseId: text("courseId").notNull().references(() => Course.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: numeric("createdAt").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: numeric("updatedAt").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
},
(table) => {
	return {
		courseIdIdx: index("Attachment_courseId_idx").on(table.courseId),
	}
});

export const Chapter = sqliteTable("Chapter", {
	id: text("id").primaryKey().$defaultFn(() => randomUUID()),
	title: text("title").notNull(),
	description: text("description"),
	videoUrl: text("videoUrl"),
	position: integer("position").notNull(),
	isPublished: integer("isPublished", { mode: 'boolean' }).default(false).notNull(),
	isFree: integer("isFree", { mode: 'boolean' }).default(false).notNull(),
	courseId: text("courseId").notNull().references(() => Course.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: numeric("createdAt").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: numeric("updatedAt").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
},
(table) => {
	return {
		courseIdIdx: index("Chapter_courseId_idx").on(table.courseId),
	}
});

export const MuxData = sqliteTable("MuxData", {
	id: text("id").primaryKey().notNull(),
	assetId: text("assetId").notNull(),
	playbackId: text("playbackId"),
	chapterId: text("chapterId").notNull().references(() => Chapter.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		chapterIdKey: uniqueIndex("MuxData_chapterId_key").on(table.chapterId),
	}
});

export const UserProgress = sqliteTable("UserProgress", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").notNull(),
	chapterId: text("chapterId").notNull().references(() => Chapter.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	isCompleted: numeric("isCompleted").notNull(),
	createdAt: numeric("createdAt").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: numeric("updatedAt").notNull(),
},
(table) => {
	return {
		userIdChapterIdKey: uniqueIndex("UserProgress_userId_chapterId_key").on(table.userId, table.chapterId),
		chapterIdIdx: index("UserProgress_chapterId_idx").on(table.chapterId),
	}
});

export const Purchase = sqliteTable("Purchase", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").notNull(),
	courseId: text("courseId").notNull().references(() => Course.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: numeric("createdAt").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: numeric("updatedAt").notNull(),
},
(table) => {
	return {
		userIdCourseIdKey: uniqueIndex("Purchase_userId_courseId_key").on(table.userId, table.courseId),
		courseIdIdx: index("Purchase_courseId_idx").on(table.courseId),
	}
});

export const StripeCustomer = sqliteTable("StripeCustomer", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").notNull(),
	stripeCustomerId: text("stripeCustomerId").notNull(),
	createdAt: numeric("createdAt").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: numeric("updatedAt").notNull(),
},
(table) => {
	return {
		stripeCustomerIdKey: uniqueIndex("StripeCustomer_stripeCustomerId_key").on(table.stripeCustomerId),
		userIdKey: uniqueIndex("StripeCustomer_userId_key").on(table.userId),
	}
});