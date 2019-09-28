from flask import jsonify
import sqlite3

def db_connection_template(callback, *args):
	response = {}
	status = {'code': 200}
	conn = None

	try:
		conn = sqlite3.connect('sqlite/sportTracker.db')
		cur = conn.cursor()
		callback(conn, cur, response, status, args)

	except sqlite3.Error as e:
		status['code'] = 500
		response['msg'] = str(e)

	finally:
		if conn:
			conn.close()
	return jsonify(response), status['code']