--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Ubuntu 15.4-1.pgdg22.04+1)
-- Dumped by pg_dump version 15.4 (Ubuntu 15.4-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'USER',
    'MODERATOR'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Activity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Activity" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    duration numeric(10,2) NOT NULL,
    distance numeric(10,2) NOT NULL,
    "ownerId" integer NOT NULL
);


ALTER TABLE public."Activity" OWNER TO postgres;

--
-- Name: Activity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Activity_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Activity_id_seq" OWNER TO postgres;

--
-- Name: Activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Activity_id_seq" OWNED BY public."Activity".id;


--
-- Name: Comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comment" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "activityId" integer NOT NULL,
    "ownerId" integer NOT NULL,
    content text NOT NULL
);


ALTER TABLE public."Comment" OWNER TO postgres;

--
-- Name: Comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Comment_id_seq" OWNER TO postgres;

--
-- Name: Comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Comment_id_seq" OWNED BY public."Comment".id;


--
-- Name: Follow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Follow" (
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "followeeId" integer NOT NULL,
    "followerId" integer NOT NULL
);


ALTER TABLE public."Follow" OWNER TO postgres;

--
-- Name: Like; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Like" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "activityId" integer NOT NULL,
    "ownerId" integer NOT NULL
);


ALTER TABLE public."Like" OWNER TO postgres;

--
-- Name: Like_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Like_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Like_id_seq" OWNER TO postgres;

--
-- Name: Like_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Like_id_seq" OWNED BY public."Like".id;


--
-- Name: Post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Post" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    content text NOT NULL,
    "authorId" integer NOT NULL,
    "parentPostId" integer,
    "threadId" integer NOT NULL
);


ALTER TABLE public."Post" OWNER TO postgres;

--
-- Name: Post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Post_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Post_id_seq" OWNER TO postgres;

--
-- Name: Post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Post_id_seq" OWNED BY public."Post".id;


--
-- Name: Profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Profile" (
    id integer NOT NULL,
    bio text,
    "userId" integer NOT NULL,
    age integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL
);


ALTER TABLE public."Profile" OWNER TO postgres;

--
-- Name: Profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Profile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Profile_id_seq" OWNER TO postgres;

--
-- Name: Profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Profile_id_seq" OWNED BY public."Profile".id;


--
-- Name: Thread; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Thread" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    title character varying(255) NOT NULL,
    "authorId" integer NOT NULL
);


ALTER TABLE public."Thread" OWNER TO postgres;

--
-- Name: Thread_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Thread_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Thread_id_seq" OWNER TO postgres;

--
-- Name: Thread_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Thread_id_seq" OWNED BY public."Thread".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: Vote; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Vote" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "postId" integer NOT NULL,
    "authorId" integer NOT NULL,
    upvote boolean NOT NULL
);


ALTER TABLE public."Vote" OWNER TO postgres;

--
-- Name: Vote_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Vote_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Vote_id_seq" OWNER TO postgres;

--
-- Name: Vote_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Vote_id_seq" OWNED BY public."Vote".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Activity id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Activity" ALTER COLUMN id SET DEFAULT nextval('public."Activity_id_seq"'::regclass);


--
-- Name: Comment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment" ALTER COLUMN id SET DEFAULT nextval('public."Comment_id_seq"'::regclass);


--
-- Name: Like id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like" ALTER COLUMN id SET DEFAULT nextval('public."Like_id_seq"'::regclass);


--
-- Name: Post id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post" ALTER COLUMN id SET DEFAULT nextval('public."Post_id_seq"'::regclass);


--
-- Name: Profile id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Profile" ALTER COLUMN id SET DEFAULT nextval('public."Profile_id_seq"'::regclass);


--
-- Name: Thread id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Thread" ALTER COLUMN id SET DEFAULT nextval('public."Thread_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: Vote id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vote" ALTER COLUMN id SET DEFAULT nextval('public."Vote_id_seq"'::regclass);


--
-- Data for Name: Activity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Activity" (id, "createdAt", "updatedAt", title, description, duration, distance, "ownerId") FROM stdin;
1	2023-09-12 22:51:47.864	2023-09-12 22:51:47.864	this is a run	hot and humid as ballz, josh pushed my shit in...	2488.25	6.00	1
2	2023-09-12 22:51:57.23	2023-09-12 23:08:42.234	this is a run	hot and humid as ballz, josh pushed my shit in...	2544.25	6.00	2
5	2023-12-07 03:26:35.952	2023-12-07 03:26:35.952	asdfasdf	asdfasdf	0.00	0.00	1
6	2023-12-07 03:26:50.288	2023-12-07 03:26:50.288	test	testafdasdfasdfasdfas	3785.00	6.00	1
7	2023-12-07 03:27:36.516	2023-12-07 03:27:36.516	asd	asdfasd	0.00	0.00	1
8	2023-12-07 03:29:04.695	2023-12-07 03:29:04.695	asdf	asdf	0.00	0.00	1
9	2023-12-07 03:29:54.796	2023-12-07 03:29:54.796	asdfasd	fsadfasdf	0.00	0.00	1
10	2023-12-07 03:30:00.665	2023-12-07 03:30:00.665	sadf	sadf	0.00	0.00	1
11	2023-12-07 03:31:50.642	2023-12-07 03:31:50.642	aasdf	asdfsdaf	0.00	0.00	1
12	2023-12-07 03:32:00.948	2023-12-07 03:32:00.948	aasdf	asdfsdaf	0.00	0.00	1
13	2023-12-07 03:33:14.59	2023-12-07 03:33:14.59	asdfasdf	asdfasdfasd	2706.00	6.00	1
14	2023-12-07 03:38:59.099	2023-12-07 03:38:59.099	TESTING	WEEEEEEE FUNNNN... long boi	4445.20	12.00	1
15	2023-12-12 02:03:35.721	2023-12-12 02:03:35.721	jsdkf;asdfjkas;ldfk	as;ldkfjas;ldkfjasdl;kf	18305.00	5.00	1
16	2024-01-15 19:13:46.639	2024-01-15 19:13:46.639	testing 123 ballz	i like running, this was OK.....	1200.00	3.00	8
17	2024-01-27 20:20:36.529	2024-01-27 20:20:36.529	sdfsda	sadfsdf	3661.00	31.00	8
18	2024-01-27 21:32:47.527	2024-01-27 21:32:47.527	KNEE PAINNNN????	Injury to knee maybe??? FML	305.22	0.50	8
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comment" (id, "createdAt", "updatedAt", "activityId", "ownerId", content) FROM stdin;
1	2024-01-27 22:43:28.393	2024-01-27 22:43:28.393	18	8	asdf
2	2024-01-27 22:49:40.501	2024-01-27 22:49:40.501	18	8	asdfsadf
3	2024-01-27 22:50:18.162	2024-01-27 22:50:18.162	18	8	asdf
4	2024-01-27 23:23:20.113	2024-01-27 23:23:20.113	18	1	test
5	2024-01-27 23:45:33.917	2024-01-27 23:45:33.917	18	8	hi
6	2024-01-27 23:45:52.901	2024-01-27 23:45:52.901	18	8	asdf
7	2024-01-28 00:16:29.347	2024-01-28 00:16:29.347	18	8	asdf
8	2024-01-28 01:08:46.056	2024-01-28 01:08:46.056	18	8	asdf
9	2024-01-28 02:09:03.151	2024-01-28 02:09:03.151	18	8	asdf
10	2024-01-28 02:40:27.24	2024-01-28 02:40:27.24	18	8	asdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdf
11	2024-01-28 02:40:59.791	2024-01-28 02:40:59.791	18	8	asdfasd
12	2024-01-28 03:10:18.214	2024-01-28 03:10:18.214	18	8	asdf
13	2024-01-28 03:12:38.141	2024-01-28 03:12:38.141	18	8	asdf
14	2024-01-28 03:25:20.283	2024-01-28 03:25:20.283	17	8	asdf
\.


--
-- Data for Name: Follow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Follow" ("createdAt", "updatedAt", "followeeId", "followerId") FROM stdin;
2023-09-11 19:59:09.804	2023-09-11 19:59:09.804	3	4
2023-09-11 19:59:13.832	2023-09-11 19:59:13.832	3	5
2023-09-11 19:59:16.925	2023-09-11 19:59:16.925	3	2
2023-09-11 19:59:22.503	2023-09-11 19:59:22.503	1	2
2023-09-11 19:59:27.358	2023-09-11 19:59:27.358	1	5
2023-09-11 19:59:30.88	2023-09-11 19:59:30.88	1	3
2023-09-12 21:07:02.151	2023-09-12 21:07:02.151	1	4
2023-09-12 21:20:50.321	2023-09-12 21:20:50.321	2	1
2024-01-21 18:51:42.426	2024-01-21 18:51:42.426	3	1
2024-01-21 19:14:06.499	2024-01-21 19:14:06.499	8	1
2024-01-21 20:47:51.807	2024-01-21 20:47:51.807	1	8
\.


--
-- Data for Name: Like; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Like" (id, "createdAt", "updatedAt", "activityId", "ownerId") FROM stdin;
146	2024-01-28 03:12:43.459	2024-01-28 03:12:43.459	18	8
147	2024-01-28 03:25:22.429	2024-01-28 03:25:22.429	17	8
\.


--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Post" (id, "createdAt", "updatedAt", content, "authorId", "parentPostId", "threadId") FROM stdin;
15	2023-12-27 23:32:16.566	2023-12-27 23:32:16.566	Can anyone explain the difference?	1	\N	11
16	2023-12-27 23:32:51.183	2023-12-27 23:32:51.183	A better question: How does one run a workout and incorporate both?	1	15	11
17	2023-12-27 23:33:41.942	2023-12-27 23:33:41.942	LT1 = Aerobic Threshold\nLT2 = Anerobic Threshold\n\nits all "tempo/threshold" sort of?	7	16	11
18	2023-12-27 23:34:20.768	2023-12-27 23:34:20.768	Thanks, PRs are 4:30 mile, and 1:55 800m	3	\N	12
19	2023-12-27 23:34:55.028	2023-12-27 23:34:55.028	Maybe lack endurance... ?	7	18	12
20	2023-12-28 17:12:11.835	2023-12-28 17:12:11.835	What are your running goals for 2024?!?! Discus....	7	\N	13
21	2023-12-28 17:12:55.896	2023-12-28 17:12:55.896	I want to break 4 minutes in the mile and 1:50 in the 800m again as well as sub 8:00 in the 3000m.	7	20	13
22	2023-12-28 17:14:57.239	2023-12-28 17:14:57.239	Just to be running and training 100% healthy for me!	1	21	13
23	2023-12-28 17:20:23.358	2023-12-28 17:20:23.358	What are your splits during the race?? MPW?? example workouts?	1	18	12
28	2023-12-28 18:30:22.042	2023-12-28 18:30:22.042	Great Idea! Hi MOM!	1	23	12
29	2023-12-28 19:38:33.188	2023-12-28 19:38:33.188	Any thoughts on who are the favorites?	1	\N	14
30	2023-12-28 19:43:00.826	2023-12-28 19:43:00.826	Anybody else think that running is fun?	1	\N	15
31	2023-12-28 19:43:35.719	2023-12-28 19:43:35.719	What are some of the best indoor track races this winter 2024???	7	\N	16
32	2023-12-28 19:43:50.61	2023-12-28 19:43:50.61	I suppose it is lol	7	30	15
33	2023-12-28 19:44:11.198	2023-12-28 19:44:11.198	If Jakob Ingebrigsten does then him lol	7	29	14
34	2023-12-28 19:44:42.722	2023-12-28 19:44:42.722	Boston always has good meets, NYC is usually good, etc.	7	31	16
35	2023-12-28 19:51:18.146	2023-12-28 19:51:18.146	Ohio has some pretty great tracks like Spire which feels like an Outdoor track	8	34	16
36	2023-12-28 19:52:44.79	2023-12-28 19:52:44.79	It feels like really toxic there which is a stark contrast to this site. Everybody is really courteous and shows respect for the most part.	8	\N	17
38	2023-12-28 22:39:14.448	2023-12-28 22:39:14.448	I amaze even myself. LOL	8	\N	18
39	2023-12-28 22:39:26.483	2023-12-28 22:39:26.483	NICEEEEEEEE	8	38	18
40	2023-12-28 22:45:01.414	2023-12-28 22:45:01.414	this is a test 1	8	37	11
41	2023-12-28 22:45:10.517	2023-12-28 22:45:10.517	this is a test 2	8	16	11
42	2023-12-28 22:45:15.977	2023-12-28 22:45:15.977	this is a test 3\n	8	17	11
43	2023-12-28 22:45:21.218	2023-12-28 22:45:21.218	this is a test 4	8	16	11
44	2023-12-28 22:45:34.284	2023-12-28 22:45:34.284	this is a test 6\nI like running	8	43	11
45	2023-12-28 22:45:42.656	2023-12-28 22:45:42.656	this is a test 65435234\nI like running	8	44	11
46	2023-12-28 22:48:41.727	2023-12-28 22:48:41.727	this is a test	8	\N	19
47	2023-12-28 22:49:40.863	2023-12-28 22:49:40.863	What are some of the early favorites?	8	\N	20
48	2023-12-28 22:50:08.065	2023-12-28 22:50:08.065	this is also a test	7	\N	21
49	2023-12-28 22:50:32.623	2023-12-28 22:50:32.623	I guess not spam and testing....	7	45	11
50	2023-12-28 22:51:10.017	2023-12-28 22:51:10.017	More tests...	7	\N	22
51	2023-12-28 22:52:26.843	2023-12-28 22:52:26.843	Seems like a tough course?	7	\N	23
52	2023-12-28 22:52:56.398	2023-12-28 22:52:56.398	Never too early....	7	\N	24
53	2023-12-28 22:53:10.815	2023-12-28 22:53:10.815	Testing 123	7	\N	25
54	2023-12-28 22:53:28.503	2023-12-28 22:53:28.503	Testing 123456 woo\nwoo\ncool	7	\N	26
55	2023-12-28 22:54:50.37	2023-12-28 22:54:50.37	race prediction 5k\n7 mile tempo run ~5:33 pace\n6x800m all in 2:20-22\nPR - 14:57\nindoor track	7	\N	27
56	2023-12-28 22:55:12.241	2023-12-28 22:55:12.241	LMAO	7	\N	28
57	2023-12-28 22:56:01.599	2023-12-28 22:56:01.599	What is the craziest story you've had on a run?	7	\N	29
58	2023-12-28 22:56:14.368	2023-12-28 22:56:14.368	A test that is lol	7	\N	30
59	2023-12-28 22:57:00.976	2023-12-28 22:57:00.976	more than 20 threads actually	7	\N	31
60	2023-12-28 22:58:05.778	2023-12-28 22:58:05.778	here comes another no content post\n	7	15	11
61	2023-12-28 23:08:15.381	2023-12-28 23:08:15.381	Just lactate accumulation inflection points.	7	15	11
62	2023-12-28 23:15:06.564	2023-12-28 23:15:06.564	test	7	\N	32
37	2023-12-28 20:28:36.823	2023-12-28 20:28:36.823	testing idk anymore 5	8	17	11
63	2023-12-28 23:39:32.721	2023-12-28 23:39:32.721	testing 123	7	15	11
64	2023-12-28 23:43:04.818	2023-12-28 23:43:04.818	even splits or negative splits, I heard josh guarino is a terrible runner	7	18	12
65	2023-12-28 23:44:21.318	2023-12-28 23:44:21.318	test	7	18	12
66	2023-12-28 23:47:10.555	2023-12-28 23:47:10.555	test	7	62	32
67	2023-12-28 23:47:42.426	2023-12-28 23:47:42.426	test	7	62	32
68	2023-12-28 23:47:58.46	2023-12-28 23:47:58.46	test	7	62	32
69	2024-01-15 19:14:56.889	2024-01-15 19:14:56.889	asdfasdfasdfasdf	8	62	32
70	2024-01-15 19:15:23.375	2024-01-15 19:15:23.375	this is a test\n	8	15	11
71	2024-01-21 18:09:46.405	2024-01-21 18:09:46.405	hello world	8	50	22
72	2024-01-21 21:33:22.254	2024-01-21 21:33:22.254	2	9	50	22
\.


--
-- Data for Name: Profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Profile" (id, bio, "userId", age, "createdAt", "updatedAt", "firstName", "lastName") FROM stdin;
3	is a baller wishes he was taller	3	34	2023-09-11 03:24:22.897	2023-09-11 03:24:22.897	Nicky	G
4	is a baller wishes he was taller	4	34	2023-09-11 03:24:25.183	2023-09-11 03:24:25.183	Nicky	G
5	is a baller wishes he was taller	5	34	2023-09-11 03:24:27.467	2023-09-11 03:24:27.467	Nicky	G
2	is a baller wishes he was taller	2	34	2023-09-11 03:24:13.195	2023-12-05 05:18:10.769	Nicky	G
1	I AM THE GOD OF THIS SITE HEAR ME ROAR AND BREATH FIRE, MAKING PROGRESS	1	37	2023-09-11 03:24:10.164	2023-12-05 05:35:58.159	Nicholas	Guarino
8	I likea to runnnnn.....	13	22	2023-12-28 19:50:48.374	2023-12-28 19:50:48.374	Nicholas	Guarino
7	I am the Nicky G father. test	12	45	2023-12-27 22:18:13.026	2023-12-28 23:28:43.956	Nicholas	Guarino
9	asdf	14	69	2024-01-21 21:32:56.466	2024-01-21 21:32:56.466	Nicholas	Guarino
\.


--
-- Data for Name: Thread; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Thread" (id, "createdAt", "updatedAt", title, "authorId") FROM stdin;
13	2023-12-28 17:12:11.826	2023-12-28 17:12:11.826	Official 2024 Running Goals Thread	7
14	2023-12-28 19:38:33.182	2023-12-28 19:38:33.182	Who will win world indoor championships??	1
15	2023-12-28 19:43:00.82	2023-12-28 19:43:00.82	Running is fun!	1
16	2023-12-28 19:43:35.714	2023-12-28 19:43:35.714	Indoor track races	7
17	2023-12-28 19:52:44.784	2023-12-28 19:52:44.784	Letsrun.com is a bad	8
18	2023-12-28 22:39:14.44	2023-12-28 22:39:14.44	This site is amazing wow!!!	8
19	2023-12-28 22:48:41.721	2023-12-28 22:48:41.721	Testing 123	8
20	2023-12-28 22:49:40.856	2023-12-28 22:49:40.856	Early Favorites for NCAA Indoor Track and Field Championships	8
21	2023-12-28 22:50:08.051	2023-12-28 22:50:08.051	Testing 456	7
23	2023-12-28 22:52:26.835	2023-12-28 22:52:26.835	Paris Olympics Marathon	7
24	2023-12-28 22:52:56.388	2023-12-28 22:52:56.388	Paris Olympics Way too Early Predictions	7
25	2023-12-28 22:53:10.804	2023-12-28 22:53:10.804	Testing 123	7
26	2023-12-28 22:53:28.495	2023-12-28 22:53:28.495	Testing 123456	7
27	2023-12-28 22:54:50.361	2023-12-28 22:54:50.361	Another Race prediction thread	7
28	2023-12-28 22:55:12.227	2023-12-28 22:55:12.227	Testy Mctestface	7
29	2023-12-28 22:56:01.588	2023-12-28 22:56:01.588	Craziest Running Story	7
30	2023-12-28 22:56:14.355	2023-12-28 22:56:14.355	Another one...	7
31	2023-12-28 22:57:00.964	2023-12-28 22:57:00.964	Final Test Updated	7
12	2023-12-27 23:33:55.52	2023-12-28 23:44:21.32	How to run fast in the 1500m?	3
32	2023-12-28 23:15:06.558	2024-01-15 19:14:56.891	test	7
11	2023-12-27 23:32:16.558	2024-01-15 19:15:23.376	What is the difference between LT1 and LT2 tempo run?	1
22	2023-12-28 22:51:10.01	2024-01-21 21:33:22.256	Testing 789	7
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, "createdAt", "updatedAt", username, password, role) FROM stdin;
1	nickyg2@velocida.run	2023-09-11 03:15:34.727	2023-09-11 03:15:34.727	adminnick52	$2b$12$k2hEdWe72BYPii7KtVo7RupVuihxvfVLkMyOXAZcqrQxBSKrbuL02	ADMIN
2	test@velocida.run	2023-09-11 03:16:53.035	2023-09-11 03:16:53.035	testuser	$2b$12$Cc8XfUYlYzFW2K3FOb00nuqVM6YuYnwoA/zGe1/Bpqc.SKs0gO5hu	USER
3	test5@velocida.run	2023-09-11 03:16:56.875	2023-09-11 03:16:56.875	testuser5	$2b$12$qrRvsTH8/zT7YFoplUtRaefrmHaj/w7piMWm5zDprGY84if./JJuy	USER
4	test22@velocida.run	2023-09-11 03:17:01.49	2023-09-11 03:17:01.49	testuser22	$2b$12$9UX5IZ68Yw0OW1V/UW5QDOCbsooSYqzz7g2QZ93mgALI2YjWCpKri	USER
5	test522@velocida.run	2023-09-11 03:17:10.972	2023-09-11 03:17:10.972	testuser522	$2b$12$p4rjRmTNkXoXSyoluW1G5u.9z1Oon.YWS0KbHuIkz1eFiUIr0Dpbq	USER
7	test@net.net	2023-09-10 23:29:19.373	2023-09-10 23:29:19.373	testetstetsets	asdfasd	USER
8		2023-10-17 02:28:00.009	2023-10-17 02:28:00.009		$2b$12$sH//vMDMhhHBKjSlUmmcgeGIpy1VhNzFcrA.F.rhfo4EOEyZahtKy	USER
9	sub4miler5@gmail.com	2023-10-17 02:28:49.544	2023-10-17 02:28:49.544	asdf	$2b$12$7koyMWcn5wVifNaycdyKr.3c.t3WGpbWh7EcWSUZh/zkDh1QCsaUK	USER
10	asdfasdf@fasdfasdf.sdfasdf	2023-10-17 02:31:10.3	2023-10-17 02:31:10.3	asdfasdfasdf	$2b$12$9LpGLClmwpov/.FKvMco1un0nkSEUrLazv4rOHYfw2GIjXvDC0tV.	USER
11	nguarino05@gmail.com	2023-11-23 00:08:01.936	2023-11-23 00:08:01.936	test	$2b$12$zqRnT4Viy1xarzUDVLHIcOL0uMvoGLwh7zpMwHC4co3ZIXGTCyY9i	USER
12	nguarino522@gmail.com	2023-12-27 22:18:13.023	2023-12-27 22:18:13.023	TheNickyGFather	$2b$12$X.AmIGlupsRXKamGfzI2COtSCKdmaSIZyGnwU0gfD7FmtcC99pQU6	USER
13	sub4miler5+22@gmail.com	2023-12-28 19:50:48.371	2023-12-28 19:50:48.371	RunningMan522	$2b$12$3ePZXE/dLs5cXPDpePA.duI.iK49S83kotkPz6ChYsBHVgbdmAp4y	USER
14	sub4miler5+522234@gmail.com	2024-01-21 21:32:56.462	2024-01-21 21:32:56.462	TheRealGRunner	$2b$12$tnQcdw9yfCePZMBOZdhyBeA/ZYL.Ou/x2GoxGpPnjeGPExdodmCe.	USER
\.


--
-- Data for Name: Vote; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Vote" (id, "createdAt", "updatedAt", "postId", "authorId", upvote) FROM stdin;
236	2023-12-28 19:43:52.456	2023-12-28 19:43:52.456	30	7	t
237	2023-12-28 19:44:13.801	2023-12-28 19:44:13.801	33	7	t
238	2023-12-28 19:44:14.621	2023-12-28 19:44:14.621	29	7	t
239	2023-12-28 19:51:19.702	2023-12-28 19:51:19.702	34	8	t
240	2023-12-28 19:51:20.613	2023-12-28 19:51:20.613	31	8	t
241	2023-12-28 19:51:22.046	2023-12-28 19:51:22.046	35	8	t
242	2023-12-28 19:52:46.08	2023-12-28 19:52:46.08	36	8	t
243	2023-12-28 20:28:40.508	2023-12-28 20:28:40.508	17	8	t
244	2023-12-28 20:28:44.857	2023-12-28 20:28:44.857	15	8	t
245	2023-12-28 20:28:47.909	2023-12-28 20:28:47.909	16	8	f
246	2023-12-28 22:39:21.133	2023-12-28 22:39:21.133	38	8	t
247	2023-12-28 22:44:52.371	2023-12-28 22:44:52.371	37	8	t
248	2023-12-28 22:50:36.14	2023-12-28 22:50:36.14	37	7	f
249	2023-12-28 22:50:37.701	2023-12-28 22:50:37.701	40	7	f
250	2023-12-28 22:50:38.538	2023-12-28 22:50:38.538	41	7	f
251	2023-12-28 22:50:39.715	2023-12-28 22:50:39.715	42	7	f
252	2023-12-28 22:50:41.509	2023-12-28 22:50:41.509	43	7	f
253	2023-12-28 22:50:42.637	2023-12-28 22:50:42.637	44	7	f
254	2023-12-28 22:50:44.409	2023-12-28 22:50:44.409	45	7	f
255	2023-12-28 22:50:45.868	2023-12-28 22:50:45.868	49	7	t
256	2023-12-28 23:45:00.285	2023-12-28 23:45:00.285	18	7	t
257	2023-12-28 23:45:01.639	2023-12-28 23:45:03.977	19	7	f
258	2023-12-28 23:45:05.192	2023-12-28 23:45:05.192	23	7	t
259	2024-01-15 19:15:03.078	2024-01-15 19:15:03.078	69	8	f
260	2024-01-15 19:15:04.106	2024-01-15 19:15:04.106	68	8	t
261	2024-01-15 19:15:05.378	2024-01-15 19:15:05.378	67	8	t
262	2024-01-15 19:15:06.711	2024-01-15 19:15:06.711	66	8	f
263	2024-01-21 18:09:30.069	2024-01-21 18:09:30.069	63	8	f
264	2024-01-21 18:09:31.016	2024-01-21 18:09:31.016	70	8	t
265	2024-01-21 18:37:58.395	2024-01-21 18:37:58.395	23	8	t
222	2023-12-27 23:33:11.042	2023-12-27 23:33:11.042	15	7	f
223	2023-12-27 23:33:11.822	2023-12-27 23:33:11.822	16	7	t
224	2023-12-28 17:12:14.193	2023-12-28 17:12:14.193	20	7	t
225	2023-12-28 17:14:41.538	2023-12-28 17:14:41.538	21	1	t
266	2024-01-21 18:38:00.283	2024-01-21 18:38:00.283	19	8	f
227	2023-12-28 17:14:59.815	2023-12-28 17:14:59.815	22	1	t
228	2023-12-28 17:19:57.928	2023-12-28 17:19:57.928	19	1	f
267	2024-01-21 18:38:02.082	2024-01-21 18:38:02.082	18	8	t
268	2024-01-21 18:38:05.265	2024-01-21 18:38:05.265	65	8	f
230	2023-12-28 17:22:24.951	2023-12-28 17:23:04.889	20	1	t
233	2023-12-28 17:40:13.407	2023-12-28 17:40:13.407	16	1	t
234	2023-12-28 18:27:22.155	2023-12-28 18:27:22.155	15	1	t
273	2024-01-21 18:38:16.472	2024-01-21 18:38:16.472	64	8	t
235	2023-12-28 18:30:25.653	2023-12-28 18:30:30.131	23	1	t
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
6520e35a-ab30-462d-abac-3c4e4e4ac4fd	3de9e0465a22932a5a941f8f9a96591ac8be6d3e3bcbd66871fde9b0902d33c0	2024-01-28 00:40:39.980176-05	20230829023614_init	\N	\N	2024-01-28 00:40:39.965772-05	1
331ec355-f159-4d04-a9a6-e1a76ff30d69	c8b7c6f12312bb9d6d0f9cf963289eac8a9b52132bceb4d62a9003177cac6ea5	2024-01-28 00:40:39.983479-05	20230829025534_init	\N	\N	2024-01-28 00:40:39.980982-05	1
44548b66-322c-4fca-b9fa-a1fc775c9f38	01baa06e3440df93a9fafcb9559b20ccf79ab06e978f2d42995d675d927fd895	2024-01-28 00:40:39.987699-05	20230829025715_init	\N	\N	2024-01-28 00:40:39.98419-05	1
2049bfef-6780-4e0e-809f-9d3a635176b8	36213fa282d36eeabc4d03805becab838b8547dbf6496d1dfc92205aa550c2a4	2024-01-28 00:40:39.991232-05	20230829030755_dev	\N	\N	2024-01-28 00:40:39.988378-05	1
321d75ee-27d5-4752-8009-ccdf50e553e2	d5eb58a178a5a57cea7924a8a2f69b5d16a90c1b0fa1c4eef4f5899264d44c2b	2024-01-28 00:40:40.006661-05	20230904224407_basic	\N	\N	2024-01-28 00:40:39.991937-05	1
cbb48b18-f349-4609-b7b2-4e4c8dd8d6fc	1b4e46a27b31a186839f683d65ffe86011904d1497c31b50b19c2434e24803da	2024-01-28 00:40:40.013263-05	20230911031452_followers	\N	\N	2024-01-28 00:40:40.007368-05	1
b958c459-7691-4649-b386-e155f3e647e2	c2142ba7d441ec245c5f9657cafae669331c822b2c7ebe06887eff523db55204	2024-01-28 00:40:40.025519-05	20240128051026_	\N	\N	2024-01-28 00:40:40.014055-05	1
ece8dee8-fe5d-438c-b251-fb28c65aad4e	3de9e0465a22932a5a941f8f9a96591ac8be6d3e3bcbd66871fde9b0902d33c0	2023-09-10 23:14:33.467296-04	20230829023614_init	\N	\N	2023-09-10 23:14:33.451681-04	1
517dd72d-358d-4fb9-9ad1-2f56b5b86897	c8b7c6f12312bb9d6d0f9cf963289eac8a9b52132bceb4d62a9003177cac6ea5	2023-09-10 23:14:33.470734-04	20230829025534_init	\N	\N	2023-09-10 23:14:33.468123-04	1
2fa248ce-769e-45a9-acc8-564e456af147	01baa06e3440df93a9fafcb9559b20ccf79ab06e978f2d42995d675d927fd895	2023-09-10 23:14:33.475181-04	20230829025715_init	\N	\N	2023-09-10 23:14:33.471541-04	1
ff1ad256-20d5-4899-aae5-5e88a33f39a3	36213fa282d36eeabc4d03805becab838b8547dbf6496d1dfc92205aa550c2a4	2023-09-10 23:14:33.478784-04	20230829030755_dev	\N	\N	2023-09-10 23:14:33.475888-04	1
c584279b-1106-4c84-9280-6d52bfa1f4c6	d5eb58a178a5a57cea7924a8a2f69b5d16a90c1b0fa1c4eef4f5899264d44c2b	2023-09-10 23:14:33.49413-04	20230904224407_basic	\N	\N	2023-09-10 23:14:33.479504-04	1
586b079f-845a-47fa-863f-479c999d2b80	1b4e46a27b31a186839f683d65ffe86011904d1497c31b50b19c2434e24803da	2023-09-10 23:14:52.897335-04	20230911031452_followers	\N	\N	2023-09-10 23:14:52.89067-04	1
\.


--
-- Name: Activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Activity_id_seq"', 18, true);


--
-- Name: Comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Comment_id_seq"', 14, true);


--
-- Name: Like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Like_id_seq"', 147, true);


--
-- Name: Post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Post_id_seq"', 72, true);


--
-- Name: Profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Profile_id_seq"', 9, true);


--
-- Name: Thread_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Thread_id_seq"', 32, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 14, true);


--
-- Name: Vote_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Vote_id_seq"', 275, true);


--
-- Name: Activity Activity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Activity"
    ADD CONSTRAINT "Activity_pkey" PRIMARY KEY (id);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: Follow Follow_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Follow"
    ADD CONSTRAINT "Follow_pkey" PRIMARY KEY ("followerId", "followeeId");


--
-- Name: Like Like_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_pkey" PRIMARY KEY (id);


--
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


--
-- Name: Profile Profile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_pkey" PRIMARY KEY (id);


--
-- Name: Thread Thread_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Thread"
    ADD CONSTRAINT "Thread_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Vote Vote_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Profile_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Profile_userId_key" ON public."Profile" USING btree ("userId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Activity Activity_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Activity"
    ADD CONSTRAINT "Activity_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_activityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES public."Activity"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Follow Follow_followeeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Follow"
    ADD CONSTRAINT "Follow_followeeId_fkey" FOREIGN KEY ("followeeId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Follow Follow_followerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Follow"
    ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Like Like_activityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES public."Activity"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Like Like_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Post Post_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Post Post_parentPostId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_parentPostId_fkey" FOREIGN KEY ("parentPostId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Post Post_threadId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES public."Thread"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Profile Profile_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Thread Thread_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Thread"
    ADD CONSTRAINT "Thread_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Vote Vote_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Vote Vote_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

