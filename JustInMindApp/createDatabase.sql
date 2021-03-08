DROP DATABASE IF EXISTS [JustInMind]

CREATE DATABASE [JustInMind]

USE [JustInMind]

CREATE TABLE [dbo].[Attachements](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Reference] [varchar](250) NOT NULL,
	[TaskId] [int] NOT NULL,
 CONSTRAINT [PK_Attachements] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Text] [varchar](250) NOT NULL,
	[TaskId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_Comments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CommentsCopy](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Text] [varchar](250) NOT NULL,
	[TaskId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Feedbacks](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Rate] [int] NULL,
	[Text] [varchar](250) NOT NULL,
	[TaskId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_Feedbacks] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FeedbacksCopy](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Rate] [int] NULL,
	[Text] [varchar](250) NOT NULL,
	[TaskId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Histories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Action] [varchar](50) NOT NULL,
	[TaskId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_Histories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[States](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_States] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tasks](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](250) NULL,
	[UrgencyId] [int] NOT NULL,
	[CategoryId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[StateId] [int] NOT NULL,
 CONSTRAINT [PK_Tasks] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Urgencies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Urgencies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Password] [varchar](50) NULL,
	[RoleId] [int] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Attachements]  WITH CHECK ADD  CONSTRAINT [FK_Attachements_Tasks] FOREIGN KEY([TaskId])
REFERENCES [dbo].[Tasks] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Attachements] CHECK CONSTRAINT [FK_Attachements_Tasks]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Comments] FOREIGN KEY([Id])
REFERENCES [dbo].[Comments] ([Id])
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_Comments_Comments]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Tasks] FOREIGN KEY([TaskId])
REFERENCES [dbo].[Tasks] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_Comments_Tasks]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_Comments_Users]
GO
ALTER TABLE [dbo].[Feedbacks]  WITH CHECK ADD  CONSTRAINT [FK_Feedbacks_Tasks] FOREIGN KEY([TaskId])
REFERENCES [dbo].[Tasks] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Feedbacks] CHECK CONSTRAINT [FK_Feedbacks_Tasks]
GO
ALTER TABLE [dbo].[Histories]  WITH CHECK ADD  CONSTRAINT [FK_Histories_Tasks] FOREIGN KEY([TaskId])
REFERENCES [dbo].[Tasks] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Histories] CHECK CONSTRAINT [FK_Histories_Tasks]
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD  CONSTRAINT [FK_Tasks_Categories] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Categories] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Tasks] CHECK CONSTRAINT [FK_Tasks_Categories]
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD  CONSTRAINT [FK_Tasks_States] FOREIGN KEY([StateId])
REFERENCES [dbo].[States] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Tasks] CHECK CONSTRAINT [FK_Tasks_States]
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD  CONSTRAINT [FK_Tasks_Urgencies] FOREIGN KEY([UrgencyId])
REFERENCES [dbo].[Urgencies] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Tasks] CHECK CONSTRAINT [FK_Tasks_Urgencies]
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD  CONSTRAINT [FK_Tasks_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Tasks] CHECK CONSTRAINT [FK_Tasks_Users]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Roles] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Roles]

USE JustInMind;

DELETE FROM dbo.Attachements;
DBCC CHECKIDENT (Attachements, RESEED, 0);
DELETE FROM dbo.Comments;
DBCC CHECKIDENT (Comments, RESEED, 0);
DELETE FROM dbo.Feedbacks;
DBCC CHECKIDENT (Feedbacks, RESEED, 0);
DELETE FROM dbo.Histories;
DBCC CHECKIDENT (Histories, RESEED, 0);
DELETE FROM dbo.Tasks;
DBCC CHECKIDENT (Tasks, RESEED, 0);
DELETE FROM dbo.States;
DBCC CHECKIDENT (States, RESEED, 0);
DELETE FROM dbo.Users;
DBCC CHECKIDENT (Users, RESEED, 0);
DELETE FROM dbo.Categories;
DBCC CHECKIDENT (Categories, RESEED, 0);
DELETE FROM dbo.Roles;
DBCC CHECKIDENT (Roles, RESEED, 0);
DELETE FROM dbo.Urgencies;
DBCC CHECKIDENT (Urgencies, RESEED, 0);

INSERT INTO dbo.Roles (Name)
VALUES ('Guest'),
     ('Developer'),
     ('Manager'),
     ('Tester'),
       ('DevOps');

INSERT INTO dbo.States (Name)
VALUES ('New'),
     ('Active'),
     ('Done'),
     ('Investigation'),
       ('In test');

INSERT INTO dbo.Urgencies (Name)
VALUES ('Low'),
     ('MediumLow'),
     ('Medium'),
     ('High'),
       ('Critical');

INSERT INTO dbo.Categories (Name)
VALUES ('Bug'),
     ('Improvement'),
     ('Feature'),
     ('Error'),
       ('Other');

INSERT INTO dbo.Users (Name, Password, RoleId)
VALUES ('Victor', '1', 1),
     ('Danila', '1', 1),
     ('Petia', '1', 1),
     ('Dan', '1', 1),
     ('Jon', '1', 2),
     ('Mike', '1', 2),
     ('Hill', '1', 2),
     ('Irving', '1', 2),
     ('Aleksey', '1', 2),
     ('Ais', '1', 3),
     ('Harry', '1', 3),
     ('Mor', '1', 3),
     ('Tom', '1', 3),
     ('Kevin', '1', 4),
     ('Loch', '1', 4),
     ('Jim', '1', 4),
     ('Podric', '1', 0),
     ('Terion', '1', 0),
     ('Tyvin', '1', 0),
     ('Hound', '1', 0),
     ('Aria', '1', 0),
     ('Sansa', '1', 0);

INSERT INTO dbo.Tasks (Name, Description, UrgencyId, CategoryId, UserId, StateId)
VALUES ('Add flag', '', 1, 1, 1, 2),
     ('Add flag', '', 1, 1, 1, 2),
     ('Add flag', '', 1, 1, 1, 2),
     ('Add flag', '', 1, 1, 1, 2),
     ('Add flag', '', 1, 1, 1, 2),
     ('Fix bug', '', 1, 1, 1, 1),
     ('Fix bug', '', 1, 1, 1, 1),
     ('Fix bug', '', 1, 1, 1, 1),
     ('Fix bug', '', 1, 1, 1, 1),
     ('Fix bug', '', 1, 1, 1, 1),
     ('Investigation', '', 1, 1, 1, 0),
     ('Investigation', '', 1, 1, 1, 0),
     ('Investigation', '', 1, 1, 1, 0),
     ('Investigation', '', 1, 1, 1, 0),
     ('Investigation', '', 1, 1, 1, 0),
     ('Test', '', 1, 1, 1, 0),
     ('Test', '', 1, 1, 1, 0),
     ('Test', '', 1, 1, 1, 0),
     ('Test', '', 1, 1, 1, 0),
     ('Fix error', '', 1, 1, 1, 4),
     ('Fix error', '', 1, 1, 1, 4),
     ('Fix error', '', 1, 1, 1, 4),
     ('Fix error', '', 1, 1, 1, 4),
     ('Fix error', '', 1, 1, 1, 3),
     ('Fix error', '', 1, 1, 1, 3),
     ('Fix error', '', 1, 1, 1, 3),
     ('Fix error', '', 1, 1, 1, 3),
     ('Fix error', '', 1, 1, 1, 3),
     ('Fix error', '', 1, 1, 1, 3),
     ('Fix error', '', 1, 1, 1, 3),
     ('Fix error', '', 1, 1, 1, 3)

INSERT INTO dbo.Histories (Action, TaskId, UserId)
VALUES ('Added task', 1, 1),
       ('Added task', 2, 1),
     ('Added task', 3, 1),
     ('Added task', 4, 1),
     ('Added task', 5, 1),
     ('Added task', 6, 1),
     ('Added task', 7, 1),
     ('Added task', 8, 1),
     ('Added task', 9, 1),
     ('Added task', 10, 1),
     ('Added task', 11, 1),
     ('Added task', 12, 1),
     ('Added task', 13, 1),
     ('Added task', 14, 1),
     ('Added task', 15, 1),
     ('Added task', 16, 1),
     ('Added task', 17, 1),
     ('Added task', 18, 1),
     ('Added task', 19, 1),
     ('Added task', 20, 1),
     ('Added task', 21, 1),
     ('Added task', 22, 1),
     ('Added task', 23, 1),
     ('Finished task', 24, 5),
     ('Finished task', 25, 5),
     ('Finished task', 26, 5),
     ('Finished task', 27, 5),
     ('Finished task', 28, 5),
     ('Finished task', 29, 5),
     ('Finished task', 30, 5),
     ('Finished task', 30, 5);

INSERT INTO dbo.Feedbacks (Rate, Text, TaskId, UserId)
VALUES (NULL, 'Well done', 24, 1),
       (NULL, 'Well done', 25, 1),
     (NULL, 'Well done', 26, 1),
     (5, 'Well done', 27, 1),
     (5, 'Well done', 28, 1),
     (4, 'Well done', 29, 1),
     (4, 'Well done', 30, 1),
     (4, 'Well done', 0, 1);

INSERT INTO dbo.Comments (Text, TaskId, UserId)
VALUES ('Please, hold off this changes', 1,  11),
       ('Please, hold off this changes', 2,  11),
     ('Please, hold off this changes', 3,  11),
     ('Please, hold off this changes', 4,  11),
     ('Please, hold off this changes', 5,  11),
     ('Please, hold off this changes', 6,  11),
     ('Please, hold off this changes', 7,  11),
     ('Please, hold off this changes', 8,  11),
     ('Please, hold off this changes', 9,  11),
     ('Please, hold off this changes', 10, 11),
     ('Please, hold off this changes', 11, 11),
     ('Please, hold off this changes', 12, 11),
     ('Please, hold off this changes', 13, 11),
     ('Please, hold off this changes', 14, 11),
     ('Please, hold off this changes', 15, 11),
     ('Please, hold off this changes', 16, 11),
     ('Please, hold off this changes', 17, 11),
     ('Please, hold off this changes', 18, 11),
     ('Please, hold off this changes', 19, 11),
     ('Please, hold off this changes', 20, 11),
     ('Please, hold off this changes', 21, 11),
     ('Please, hold off this changes', 22, 11),
     ('Please, hold off this changes', 23, 11);

INSERT INTO dbo.Attachements (Reference, TaskId)
VALUES ('https://html5book.ru/sozdanie-html-form/', 1),
       ('https://html5book.ru/sozdanie-html-form/', 2),
     ('https://html5book.ru/sozdanie-html-form/', 3),
     ('https://html5book.ru/sozdanie-html-form/', 4),
     ('https://html5book.ru/sozdanie-html-form/', 5),
     ('https://html5book.ru/sozdanie-html-form/', 6),
     ('https://html5book.ru/sozdanie-html-form/', 7),
     ('https://html5book.ru/sozdanie-html-form/', 8),
     ('https://html5book.ru/sozdanie-html-form/', 9),
     ('https://html5book.ru/sozdanie-html-form/', 10);