create database quizapp;

create table groups (
    id serial primary key,
    name text
);

create table users (
    id serial primary key,
    first_name text not null,
    last_name text not null,
    email text not null unique,
    password text not null,
    role text default 'member' -- three roles can be selected:: member, tutor and admin
);

create table quiz (
    id serial primary key,
    title text not null,
    description text,
    date Date not null,
    time Time not null,
    duration int not null,
    group_id int,
    foreign key (group_id) references groups(id)
);

create table question (
    id serial primary key,
    title text not null,
    option_a text not null,
    option_b text not null,
    option_c text not null,
    option_d text not null,
    answer text not null,
    quiz_id int not null,
    foreign key (quiz_id) references quiz(id)
);

create table result (
    id serial primary key,
    member_id int not null,
    quiz_id int not null,
    score int default 0,
    foreign key (member_id) references users(id),
    foreign key (quiz_id) references quiz(id)
);