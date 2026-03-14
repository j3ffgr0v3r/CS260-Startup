const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'authToken';

// The users and events are saved in memory and disappear whenever the service is restarted.
let users = [];
let events = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Middleware to verify that the request is good
const verifyParams = (...args) => {
    return async (req, res, next) => {
        for (const arg of args) {
            if (!Object.hasOwn(req.body, arg)) {
                res.status(400).send({ msg: 'Error: Bad Request' });
                return;
            }
        }
        next();
    };
}

// Reset Database for testing and demonstration purposes
apiRouter.post('/resetDB', async (req, res) => {

    events = [
        {
            eventID: crypto.randomUUID(),
            date: new Date(2026, 1, 6, 20),
            title: "LoTR Marathon",
            description: "Bring your swords ;)",
            allDay: false
        },
        {
            eventID: crypto.randomUUID(),
            date: new Date(2026, 1, 17),
            title: "Camping",
            location: "Tibble Fork",
            allDay: true
        },
        {
            eventID: crypto.randomUUID(),
            date: new Date(2026, 1, 23, 10),
            title: "Service Project",
            description: "Shovel Snow",
            location: "Nearby Neighborhood",
            allDay: false
        },
        {
            eventID: crypto.randomUUID(),
            date: new Date(2026, 1, 7, 21),
            title: "Karaoke",
            description: "Let's see how good your voice really is",
            allDay: false
        },
        {
            eventID: crypto.randomUUID(),
            date: new Date(2026, 1, 11, 20),
            title: "Mission Prep",
            description: "Helaman Girls...",
            allDay: false
        },
        {
            eventID: crypto.randomUUID(),
            date: new Date(2026, 1, 27),
            title: "Ski Trip",
            description: "In what snow???",
            location: "Somewhere, I suppose",
            allDay: true
        }
    ]

    users = [
        {
            username: "clairevance07",
            password: await bcrypt.hash("password", 10),
            firstName: "Claire",
            lastName: "Vance",
            friends: ["turingA113"],
            friendRequests: ["Matt<3"],
            events: [events.at(3).eventID, events.at(4).eventID, events.at(2).eventID],
            eventInvites: [],
        },
        {
            username: "turingA113",
            password: await bcrypt.hash("password", 10),
            firstName: "Alex",
            lastName: "Turing",
            friends: ["clairevance07"],
            friendRequests: [],
            events: [events.at(1).eventID, events.at(2).eventID, events.at(5).eventID],
            eventInvites: [],
        },
        {
            username: "Matt<3",
            password: await bcrypt.hash("password", 10),
            firstName: "Matthew",
            lastName: "Hart",
            friends: [],
            friendRequests: [],
            events: [events.at(3).eventID, events.at(4).eventID, events.at(2).eventID],
            eventInvites: [],
        },
        {
            username: "plarke_",
            password: await bcrypt.hash("password", 10),
            firstName: "Preston",
            lastName: "Clarke",
            friends: [],
            friendRequests: [],
            events: [events.at(3).eventID, events.at(4).eventID, events.at(2).eventID],
            eventInvites: [],
        },
        {
            username: "LMP",
            password: await bcrypt.hash("password", 10),
            firstName: "Layne",
            lastName: "Peterson",
            friends: [],
            friendRequests: [],
            events: [events.at(3).eventID, events.at(4).eventID, events.at(2).eventID],
            eventInvites: [],
        },
        {
            username: "JeffersonBestPres",
            password: await bcrypt.hash("password", 10),
            firstName: "Jessica",
            lastName: "McRae",
            friends: [],
            friendRequests: [],
            events: [events.at(3).eventID, events.at(4).eventID, events.at(2).eventID],
            eventInvites: [],
        }

    ]


    res.status(200);
});

// CreateAuth a new user
apiRouter.post('/auth/create', verifyParams("username", "password", "firstName", "lastName"), async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.username, req.body.password, req.body.firstName, req.body.lastName);
        user.authToken = uuid.v4();
        setAuthCookie(res, user.authToken);
        res.send(publicUser(user));
    }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', verifyParams("username", "password"), async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.authToken = uuid.v4();
            setAuthCookie(res, user.authToken);
            res.send(publicUser(user));
            return;
        }
    }
    res.status(401).send({ msg: 'Error: Invalid Login Credentials' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('authToken', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});


// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await findUser('authToken', req.cookies[authCookieName]);
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).send({ msg: 'Error: Unauthorized' });
    }
};

// Middleware to verify that the user has permission to view target users information (is self, or is friends)
const verifyPermsToTargetUser = async (req, res, next) => {
    const targetUserByPath = (!req.params.username || req.params.username == req.user.username) ? req.user : users.friends.find((u) => u["username"] === req.params.username);
    const targetUserByQuery = (!req.query.username || req.query.username == req.user.username) ? req.user : users.friends.find((u) => u["username"] === req.query.username);
    const targetUser = targetUserByPath ? targetUserByPath : targetUserByQuery;
    if (targetUser) {
        req.targetUser = targetUser;
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

// GetUser information
apiRouter.get('/users/:username', verifyAuth, verifyPermsToTargetUser, (_req, res) => {
    const user = publicUser(_req.targetUser);

    res.send(user);
});

// GetEvents
apiRouter.get('/events', verifyAuth, verifyPermsToTargetUser, (_req, res) => {
    const eventIds = new Set(_req.targetUser.events);
    const result = events.filter(event => eventIds.has(event.eventID));
    res.send(result);
});

// CreateEvent
apiRouter.post('/events', verifyAuth, verifyParams("date", "title", "allDay"), (req, res) => {
    res.send(JSON.stringify({ event: createEvent(req.user, req.body) }));
});

// GetEventInvites
apiRouter.get('/eventInvites', verifyAuth, (_req, res) => {
    const eventIds = new Set(_req.user.eventInvites);
    const result = events.filter(event => eventIds.has(event.eventID));
    res.send(result);
});

// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Creates new event, and adds it to current users events, and to invitees event invites
function createEvent(owner, newEvent) {
    const event = {
        eventID: crypto.randomUUID(),
        date: newEvent.date,
        title: newEvent.title,
        description: newEvent.description,
        location: newEvent.location,
        allDay: newEvent.allDay,
        host: owner.username,
        invitees: newEvent.invitees,
    }

    events.push(event);

    owner.events.push(event.eventID);

    if (newEvent.invitees) {
        for (const username of newEvent.invitees) {
            if (owner.friends.find((u) => u["username"] === username)) {
                findUser("username", username).eventInvites.push(event);
            }
        }
    }

    return event;
}


async function createUser(username, password, firstName, lastName) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        authToken: uuid.v4(),
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: passwordHash,
        friends: [],
        friendRequests: [],
        events: [],
        eventInvites: [],
    };
    users.push(user);

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

// Formats user into safe to share object
function publicUser(user) {
    return {
        username: user.username,
        displayName: user.firstName + " " + user.lastName,
        firstName: user.firstName,
        lastName: user.lastName,
    };
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
