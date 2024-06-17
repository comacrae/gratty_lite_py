6-5-24

- add update endpoint for posts
- COMPLETE: separate endpoints by concerns
- COMPLETE: add a self-referential many-to-many table for followers (or make a many-to-many table which has two primary keys)
- COMPLETE: add a limit to post and post-item GET requests (similar to user setup)

6-8-24

-implement csrf token acception (requires somehow adding the csrf token using getCsrfToken react hook and combining it with useSession hook to )
