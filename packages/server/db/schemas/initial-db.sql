CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "login_tokens"
(
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "fkUserId" uuid NOT NULL,
  "token" text NOT NULL,
  "expiredAt" timestamptz,
  "ip" TEXT,
  "userAgent" jsonb,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz
);

CREATE TABLE "users"
(
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "fkRoleId" uuid NOT NULL,
  "username" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "phone" TEXT,
  "profilePic" text,
  "isActive" BOOLEAN NOT NULL DEFAULT '1',
  "salt" TEXT,
  "customerId" TEXT,
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
  "token" TEXT NOT NULL,
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
  "name" TEXT NOT NULL,
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

CREATE TABLE "monthly_subscriptions"
(
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "fkUserId" uuid NOT NULL,
  "customerId" TEXT NOT NULL,
  "subscriptionId" TEXT NOT NULL,
  "subscriptionItemId" TEXT NOT NULL,
  "paymentMethodId" TEXT NOT NULL,
  "status" TEXT DEFAULT 'Pending',
  "date" timestamptz NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz,
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

ALTER TABLE "monthly_subscriptions" ADD CONSTRAINT "monthly_subscriptions_fk0" FOREIGN KEY ("fkUserId") REFERENCES "users"("id");