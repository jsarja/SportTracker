CREATE TABLE users (
	googleId TEXT PRIMARY KEY
);

CREATE TABLE workouts (
	workoutId INTEGER PRIMARY KEY AUTOINCREMENT,
	googleId TEXT,
	workoutDate TEXT NOT NULL,
	endTime TEXT,
	startTime TEXT,
	duration INTEGER,
	distance REAL,
	avgHeartRate INTEGER,
	calories INTEGER,
	notes TEXT,
	sport TEXT,
	FOREIGN KEY(googleId) REFERENCES users(googleId)
);

CREATE TABLE workoutCoordinates (
	coordinateId INTEGER PRIMARY KEY AUTOINCREMENT,
	workoutId INTEGER,
	lat REAL,
	lng REAL,
	FOREIGN KEY(workoutId) REFERENCES workouts(workoutId)
);

CREATE TABLE weights (
	weightId INTEGER PRIMARY KEY AUTOINCREMENT,
	googleId TEXT NOT NULL,
	weight REAL NOT NULL,
	weightDate TEXT NOT NULL,
	FOREIGN KEY(googleId) REFERENCES users(googleId)
);
