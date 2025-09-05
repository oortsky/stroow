CREATE TYPE "public"."status" AS ENUM('pending', 'paid', 'proceeded', 'received', 'released', 'completed', 'cancelled', 'refunded');--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"payer_id" varchar(256) NOT NULL,
	"payee_id" varchar(256) NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"amount" integer NOT NULL,
	"service_fee" integer NOT NULL,
	"total" integer NOT NULL,
	"note" text,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"pin" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" varchar(256) NOT NULL,
	"account_bank" text,
	"account_number" text,
	"account_holder_name" text
);
--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_payer_id_users_id_fk" FOREIGN KEY ("payer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_payee_id_users_id_fk" FOREIGN KEY ("payee_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;