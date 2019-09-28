from database import db_connection_template

from utils import user_exists

def handle_login(googleId):
	return db_connection_template(login_callback, googleId)

# Check if user with given googleId exits. If the user is new add googleId to 
# the users table.
def login_callback(conn, cur, response, status, args):
	googleId = args[0]

	if user_exists(googleId):
		response['newUser'] = False

	else:
		cur.execute('INSERT INTO users VALUES ("{}")'.format(googleId))
		conn.commit()
		response['newUser'] = True