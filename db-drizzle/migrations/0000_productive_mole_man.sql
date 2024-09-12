CREATE TABLE `Course` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`imageUrl` text,
	`price` real,
	`isPublished` numeric DEFAULT false NOT NULL,
	`categoryId` text,
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` numeric NOT NULL,
	FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON UPDATE cascade ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `Category` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Attachment` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`courseId` text NOT NULL,
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` numeric NOT NULL,
	FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Chapter` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`videoUrl` text,
	`position` integer NOT NULL,
	`isPublished` numeric DEFAULT false NOT NULL,
	`isFree` numeric DEFAULT false NOT NULL,
	`courseId` text NOT NULL,
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` numeric NOT NULL,
	FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `MuxData` (
	`id` text PRIMARY KEY NOT NULL,
	`assetId` text NOT NULL,
	`playbackId` text,
	`chapterId` text NOT NULL,
	FOREIGN KEY (`chapterId`) REFERENCES `Chapter`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `UserProgress` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`chapterId` text NOT NULL,
	`isCompleted` numeric DEFAULT false NOT NULL,
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` numeric NOT NULL,
	FOREIGN KEY (`chapterId`) REFERENCES `Chapter`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Purchase` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`courseId` text NOT NULL,
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` numeric NOT NULL,
	FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `StripeCustomer` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`stripeCustomerId` text NOT NULL,
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` numeric NOT NULL
);
--> statement-breakpoint
CREATE INDEX `Course_title_idx` ON `Course` (`title`);--> statement-breakpoint
CREATE INDEX `Course_categoryId_idx` ON `Course` (`categoryId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Category_name_key` ON `Category` (`name`);--> statement-breakpoint
CREATE INDEX `Attachment_courseId_idx` ON `Attachment` (`courseId`);--> statement-breakpoint
CREATE INDEX `Chapter_courseId_idx` ON `Chapter` (`courseId`);--> statement-breakpoint
CREATE UNIQUE INDEX `MuxData_chapterId_key` ON `MuxData` (`chapterId`);--> statement-breakpoint
CREATE UNIQUE INDEX `UserProgress_userId_chapterId_key` ON `UserProgress` (`userId`,`chapterId`);--> statement-breakpoint
CREATE INDEX `UserProgress_chapterId_idx` ON `UserProgress` (`chapterId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Purchase_userId_courseId_key` ON `Purchase` (`userId`,`courseId`);--> statement-breakpoint
CREATE INDEX `Purchase_courseId_idx` ON `Purchase` (`courseId`);--> statement-breakpoint
CREATE UNIQUE INDEX `StripeCustomer_stripeCustomerId_key` ON `StripeCustomer` (`stripeCustomerId`);--> statement-breakpoint
CREATE UNIQUE INDEX `StripeCustomer_userId_key` ON `StripeCustomer` (`userId`);