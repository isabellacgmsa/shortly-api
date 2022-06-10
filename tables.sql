create table users (
    "id" serial primary key,
    "name" text not null,
    "email" text not null unique
)

create table passwords (
    "id" serial primary key,
    "password" text not null,
    "userId" int not null references "users"("id")
)

create table sections(
    "id" serial primary key,
    "token" text not null,
    "createdAt" date not null default now(),
    "finishDate" date,
    "userId" int not null references "users"("id")
)

create table shortened_urls(
    "id" serial primary key, 
    "sectionId" int not null references "sections"("id"),
    "createdAt" date not null default now(),
    "url" text not null unique,
    "shortenedUrl" text not null unique,
    "visitCount" bigint not null default 0
)