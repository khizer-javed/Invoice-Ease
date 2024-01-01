CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "login_tokens"
(
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "fkUserId" uuid NOT NULL,
  "token" text NOT NULL,
  "expiredAt" timestamptz,
  "ip" varchar(50),
  "userAgent" jsonb,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz
);

CREATE TABLE "users"
(
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "fkRoleId" uuid NOT NULL,
  "username" varchar(20) NOT NULL UNIQUE,
  "password" varchar(100) NOT NULL,
  "email" varchar(50) NOT NULL UNIQUE,
  "phone" varchar(20),
  "profilePic" text,
  "isActive" BOOLEAN NOT NULL DEFAULT '1',
  "salt" varchar(255),
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz,
  "fkCreatedBy" uuid,
  "fkUpdatedBy" uuid,
  "deletedAt" timestamptz,
  "passwordResetAt" timestamptz
);

CREATE TABLE "forgot_passwords"
(
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "fkUserId" uuid NOT NULL,
  "token" varchar(255) NOT NULL,
  "expiredAt" timestamptz NOT NULL,
  "servedAt" timestamptz,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz
);

CREATE TABLE "super_user"
(
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "fkUserId" uuid NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT '1',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz
);

CREATE TABLE "roles"
(
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "description" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT '1',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz,
  "fkCreatedBy" uuid,
  "fkUpdatedBy" uuid,
  "deletedAt" timestamptz
);

CREATE TABLE "permissions"
(
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "name" varchar NOT NULL,
  "permission" varchar NOT NULL,
  "moduleName" varchar,
  "parent" varchar NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT '1',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz,
  "deletedAt" timestamptz
);

CREATE TABLE "role_permissions"
(
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "fkRoleId" uuid NOT NULL,
  "fkPermissionId" uuid NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz,
  "fkCreatedBy" uuid,
  "fkUpdatedBy" uuid,
  "deletedAt" timestamptz
);

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("fkRoleId") REFERENCES "roles" ("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk1" FOREIGN KEY ("fkCreatedBy") REFERENCES "users" ("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk2" FOREIGN KEY ("fkUpdatedBy") REFERENCES "users" ("id");

ALTER TABLE "forgot_passwords" ADD CONSTRAINT "forgot_passwords_fk0" FOREIGN KEY ("fkUserId") REFERENCES "users"("id");

ALTER TABLE "super_user" ADD FOREIGN KEY ("fkUserId") REFERENCES "users" ("id");

ALTER TABLE "roles" ADD CONSTRAINT "roles_fk0" FOREIGN KEY ("fkCreatedBy") REFERENCES "users" ("id");
ALTER TABLE "roles" ADD CONSTRAINT "roles_fk1" FOREIGN KEY ("fkUpdatedBy") REFERENCES "users" ("id");

ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_fk0" FOREIGN KEY ("fkRoleId") REFERENCES "roles" ("id");
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_fk1" FOREIGN KEY ("fkPermissionId") REFERENCES "permissions" ("id");
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_fk2" FOREIGN KEY ("fkCreatedBy") REFERENCES "users" ("id");
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_fk3" FOREIGN KEY ("fkUpdatedBy") REFERENCES "users" ("id");