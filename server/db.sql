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
    option_c text,
    option_d text,
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

insert into groups (name) values
('group1'), ('group2'), ('group3');

insert into users (first_name, last_name, email, password, role) values
('AAAA', 'BBBB', 'aaaa@mail.com', 'aaaabbbb', 'member'),
('CCCC', 'DDDD', 'cccc@mail.com', 'ccccdddd', 'tutor'),
('EEEE', 'FFFF', 'eeee@mail.com', 'eeeeffff', 'admin');

insert into quiz (title, description, date, time, duration, group_id) values
('Science Quiz', 'Test your science knowledge', '2024-04-02', '10:30:00', 30, 1);

insert into question (title, option_a, option_b, option_c, option_d, answer, quiz_id) values
('Who discovered penicillin?', 'Marie Curie', 'Alexander Fleming', 'Albert Einstein', 'Isaac Newton', 'Alexander Fleming', 1),
('What is the chemical symbol for water?', 'H2O', 'CO2', 'NaCl', 'O2', 'H2O', 1),
('Which planet is known as the Red Planet?', 'Mars', 'Venus', 'Jupiter', 'Mercury', 'Mars', 1);

insert into result (member_id, quiz_id, score) values
(1, 1, 18);