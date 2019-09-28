from flask import abort, request, jsonify
import json

from database import db_connection_template
from utils import create_json, create_db_values, user_exists

ORDERS = {
	'dateNew': 'date(workoutDate) DESC',
	'dateOld': 'date(workoutDate)',
	'durationLong': 'duration DESC',
	'durationSmall': 'duration',
	'distanceLong': 'distance DESC',
	'distanceSmall': 'distance',
}

FILTERS = {
	'minDuration': 'duration >= {}',
	'maxDuration': 'duration <= {}',
	'minDistance': 'distance >= {}',
	'maxDistance': 'distance <= {}',
	'minWorkoutDate': "strftime('%s', workoutDate) > strftime('%s','{}')",
	'maxWorkoutDate': "strftime('%s', workoutDate) < strftime('%s','{}')",
	'sport': "sport = '{}'",
}

WORKOUT_COLUMNS = ['workoutId', 'googleId', 'workoutDate', 'endTime', 
	'startTime', 'duration','distance', 'avgHeartRate', 'calories', 'notes', 
	'sport']

# Get all filter options from request and convert them to sql 
# comparison operators.
def get_filters():
	filters = dict()
	if 'filters' in request.args:
		filters = json.loads(request.args['filters'])
	where_parts = [FILTERS[filter_str].format(value) 
		for filter_str, value in filters.items()]
	return " AND ".join(where_parts)

def get_workouts(googleId):
	def callback(conn, cur, response, status, args):
		googleId = args[0]

		order = 'dateNew'
		if 'order' in request.args:
			order = request.args['order']

		filters = get_filters()
		where = ''
		if filters:
			where = ' AND {}'.format(filters)

		sql = """SELECT * from workouts where googleId = "{}" 
		{} ORDER BY {}""".format(googleId, where, ORDERS[order])
		cur.execute(sql)
		all_workouts = cur.fetchall()

		response['workouts'] = [create_json(workout, WORKOUT_COLUMNS) 
			for workout in all_workouts]

	return db_connection_template(callback, googleId)


def get_workout(googleId, workoutId):
	def callback(conn, cur, response, status, args):
		googleId = args[0]
		workoutId = args[1]

		cur.execute("""SELECT * FROM workouts 
					WHERE workoutId = "{}" 
					AND googleId = "{}" """.format(workoutId, googleId))
		workout = cur.fetchone()

		if not workout:
			status['code'] = 400
			response['msg'] = "No workout found with googleId and " \
				+ "workoutId combination."
		else:
			response['workoutInfo'] = create_json(workout, WORKOUT_COLUMNS)

			# Also get coordinates for the route if they are recorded.
			cur.execute("""SELECT lat, lng FROM workoutCoordinates 
					WHERE workoutId = "{}" """.format(workoutId))	
			coordinates = cur.fetchall()
			if coordinates:
				coordinates = [{'lat': coord[0], 'lng': coord[1]} 
					for coord in coordinates]
				response['workoutCoordinates'] = coordinates
			
	
	return db_connection_template(callback, googleId, workoutId)


def create_workout(googleId):
	def callback(conn, cur, response, status, args):
		googleId = args[0]

		if not googleId:
			status['code'] = 400
			response['msg'] = "Please provide google ID in the request."
			return jsonify(response)

		elif not user_exists(googleId):
			status['code'] = 400
			response['msg'] = "Can't add workout for user who doesn't exist."
			return jsonify(response)

		elif 'workoutDate' not in request.json:
			status['code'] = 400
			response['msg'] = "Please provide a date for workout."
			return jsonify(response)

		else:
			values = request.json
			coordinates = None
			if 'coordinates' in values:
				coordinates = values.pop('coordinates')

			values['googleId'] = googleId
			# Only save date from datetime string.
			values['workoutDate'] = values['workoutDate'].split('T')[0]
			cur.execute("""INSERT INTO workouts({}) VALUES {}""".format(
				", ".join(WORKOUT_COLUMNS), 
				create_db_values(values, WORKOUT_COLUMNS)))
			
			# If coordinates were recorded save them to the database too.
			if coordinates:
				# Get the id of the workout that was just saved to database.
				workout_id = cur.lastrowid
				for coord in coordinates:
					cur.execute("""INSERT INTO workoutCoordinates(workoutId, lat, lng) 
					VALUES ({}, {}, {})""".format(workout_id, coord['lat'], coord['lng']))

			conn.commit()
			status['code'] = 201

	return db_connection_template(callback, googleId)

def delete_workout(googleId, workoutId):
	def callback(conn, cur, response, status, args):
		googleId = args[0]
		workoutId = args[1]

		cur.execute("""DELETE FROM workouts WHERE googleId="{}" 
		AND workoutId="{}" """.format(googleId, workoutId))
		conn.commit()

	return db_connection_template(callback, googleId, workoutId)
	
