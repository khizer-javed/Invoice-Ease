CREATE TABLE "LoginTokens"
(
  "id" serial PRIMARY KEY,
  "fkUserId" int NOT NULL,
  "token" text NOT NULL,
  "expiredAt" timestamptz,
  "ip" varchar(50),
  "userAgent" jsonb,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz
);

CREATE TABLE "SocialMediaTokens"
(
  "id" serial PRIMARY KEY,
  "fkUserId" int NOT NULL,
  "fkSocialMediaTypeId" int NOT NULL,
  "token" text NOT NULL,
  "expiredAt" timestamptz,
  "ip" varchar(50),
  "userAgent" jsonb,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz
);

CREATE TABLE "Users"
(
  "id" serial PRIMARY KEY,
  "fkRoleId" integer NOT NULL,
  "username" varchar(20) NOT NULL UNIQUE,
  "password" varchar(100) NOT NULL,
  "email" varchar(50) NOT NULL UNIQUE,
  "phone" varchar(20),
  "profilePic" text,
  "isActive" BOOLEAN NOT NULL DEFAULT '1',
  "salt" varchar(255),
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz,
  "fkCreatedBy" integer,
  "fkUpdatedBy" integer,
  "deletedAt" timestamptz,
  "passwordResetAt" timestamptz
);

CREATE TABLE "ForgotPasswords"
(
  "id" serial PRIMARY KEY,
  "fkUserId" integer NOT NULL,
  "token" varchar(255) NOT NULL,
  "expiredAt" timestamptz NOT NULL,
  "servedAt" timestamptz,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz
);

CREATE TABLE "SuperUsers"
(
  "id" serial PRIMARY KEY,
  "fkUserId" integer NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT '1',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz
);

CREATE TABLE "Roles"
(
  "id" serial PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "description" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT '1',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz,
  "fkCreatedBy" integer,
  "fkUpdatedBy" integer,
  "deletedAt" timestamptz
);

CREATE TABLE "Permissions"
(
  "id" serial PRIMARY KEY,
  "name" varchar NOT NULL,
  "permission" varchar NOT NULL,
  "moduleName" varchar,
  "parent" varchar NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT '1',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz,
  "deletedAt" timestamptz
);

CREATE TABLE "RolePermissions"
(
  "id" serial PRIMARY KEY,
  "fkRoleId" integer NOT NULL,
  "fkPermissionId" integer NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz,
  "fkCreatedBy" integer,
  "fkUpdatedBy" integer,
  "deletedAt" timestamptz
);

CREATE TABLE "Companies"
(
  "id" serial PRIMARY KEY,
  "name" varchar(250) NOT NULL,
  "logo" text,
  "isActive" BOOLEAN NOT NULL DEFAULT '1',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz,
  "fkCreatedBy" integer,
  "fkUpdatedBy" integer,
  "deletedAt" timestamptz
);

CREATE TABLE "CompanyUsers"
(
  "id" serial PRIMARY KEY,
  "fkUserId" integer NOT NULL,
  "fkCompanyId" integer NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT '1',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz,
  "fkCreatedBy" integer,
  "fkUpdatedBy" integer,
  "deletedAt" timestamptz
);

CREATE TABLE "SocialMediaTypes"
(
  "id" serial PRIMARY KEY,
  "name" varchar(20) NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT '1',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz
);

CREATE TABLE "Posts"
(
  "id" serial PRIMARY KEY,
  "fkSocialMediaTypeId" integer NOT NULL,
  "profile" varchar(20),
  "status" varchar(20) NOT NULL,
  "text" varchar(200) NOT NULL,
  "translation" varchar(200) NOT NULL,
  "type" varchar(20),
  "link" varchar(30),
  "budget" numeric(10,3),
  "labels" numeric(10,3),
  "date" timestamptz NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT '1',
  "createdAt" timestamptz NOT NULL,
  "fkCreatedBy" integer,
  "fkUpdatedBy" integer,
  "updatedAt" timestamptz
);

ALTER TABLE "Users" ADD CONSTRAINT "Users_fk0" FOREIGN KEY ("fkRoleId") REFERENCES "Roles" ("id");
ALTER TABLE "Users" ADD CONSTRAINT "Users_fk1" FOREIGN KEY ("fkCreatedBy") REFERENCES "Users" ("id");
ALTER TABLE "Users" ADD CONSTRAINT "Users_fk2" FOREIGN KEY ("fkUpdatedBy") REFERENCES "Users" ("id");

ALTER TABLE "ForgotPasswords" ADD CONSTRAINT "ForgotPasswords_fk0" FOREIGN KEY ("fkUserId") REFERENCES "Users"("id");

ALTER TABLE "Companies" ADD CONSTRAINT "Companies_fk0" FOREIGN KEY ("fkCreatedBy") REFERENCES "Users" ("id");
ALTER TABLE "Companies" ADD CONSTRAINT "Companies_fk1" FOREIGN KEY ("fkUpdatedBy") REFERENCES "Users" ("id");

ALTER TABLE "SuperUsers" ADD FOREIGN KEY ("fkUserId") REFERENCES "Users" ("id");

ALTER TABLE "Roles" ADD CONSTRAINT "Roles_fk0" FOREIGN KEY ("fkCreatedBy") REFERENCES "Users" ("id");
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_fk1" FOREIGN KEY ("fkUpdatedBy") REFERENCES "Users" ("id");

ALTER TABLE "RolePermissions" ADD CONSTRAINT "RolePermissions_fk0" FOREIGN KEY ("fkRoleId") REFERENCES "Roles" ("id");
ALTER TABLE "RolePermissions" ADD CONSTRAINT "RolePermissions_fk1" FOREIGN KEY ("fkPermissionId") REFERENCES "Permissions" ("id");
ALTER TABLE "RolePermissions" ADD CONSTRAINT "RolePermissions_fk2" FOREIGN KEY ("fkCreatedBy") REFERENCES "Users" ("id");
ALTER TABLE "RolePermissions" ADD CONSTRAINT "RolePermissions_fk3" FOREIGN KEY ("fkUpdatedBy") REFERENCES "Users" ("id");

ALTER TABLE "CompanyUsers" ADD CONSTRAINT "CompanyUsers_fk0" FOREIGN KEY ("fkUserId") REFERENCES "Users" ("id");
ALTER TABLE "CompanyUsers" ADD CONSTRAINT "CompanyUsers_fk1" FOREIGN KEY ("fkCompanyId") REFERENCES "Companies" ("id");
ALTER TABLE "CompanyUsers" ADD CONSTRAINT "CompanyUsers_fk2" FOREIGN KEY ("fkCreatedBy") REFERENCES "Users" ("id");
ALTER TABLE "CompanyUsers" ADD CONSTRAINT "CompanyUsers_fk3" FOREIGN KEY ("fkUpdatedBy") REFERENCES "Users" ("id");

ALTER TABLE "Posts" ADD CONSTRAINT "Posts_fk0" FOREIGN KEY ("fkSocialMediaTypeId") REFERENCES "SocialMediaTypes" ("id");
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_fk1" FOREIGN KEY ("fkCreatedBy") REFERENCES "Users" ("id");
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_fk2" FOREIGN KEY ("fkUpdatedBy") REFERENCES "Users" ("id");

ALTER TABLE "SocialMediaTokens" ADD CONSTRAINT "Posts_fk0" FOREIGN KEY ("fkUserId") REFERENCES "Users" ("id");
ALTER TABLE "SocialMediaTokens" ADD CONSTRAINT "Posts_fk1" FOREIGN KEY ("fkSocialMediaTypeId") REFERENCES "SocialMediaTypes" ("id");