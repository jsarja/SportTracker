from database import db_connection_template

import sqlite3

# Checks if given googleId is in the users table.
def user_exists(googleId):
	conn = sqlite3.connect('sqlite/sportTracker.db')
	cur = conn.cursor()

	cur.execute('SELECT googleId from users where googleId = "{}"'
		.format(googleId))
	return cur.fetchone()	

def create_json(values, headers):
	values = list(values)
	
	json = dict((headers[idx], val) for idx, val in enumerate(values))
	json['speed'] = None
	if json['duration'] and json['distance']:
		json['speed'] = json['distance']/(float(json['duration'])/3600)

	return json

def create_db_values(values, headers):
	insert_string = '('
	
	for header in headers:
		if header in values:
			insert_string += ' "{}",'.format(values[header])
		else:
			insert_string += ' null,'

	return insert_string[:-1] + ')'