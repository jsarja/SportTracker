from flask import request, jsonify

from database import db_connection_template

# Gets needed values from request and ads them to the database.
def save_weight(googleId):
    def callback(conn, cur, response, status, args):
        googleId = args[0]
        weight = request.json.get('weight')
        date = request.json.get('date').split('T')[0]

        cur.execute("""INSERT INTO weights(googleId, weight, weightDate) 
					VALUES ("{}", {}, "{}")""".format(googleId, weight, date))
        conn.commit()

    return db_connection_template(callback, googleId)

def get_weights(googleId):
    def callback(conn, cur, response, status, args):
        googleId = args[0]

        sql = """SELECT * from weights where googleId = "{}" 
            ORDER BY weightDate""".format(googleId)
        cur.execute(sql)
        results = cur.fetchall()

        # Format the results to match the data structure that recharts
        # charting library uses.
        weights = [{'weight': row[2], 'date': row[3]} for row in results]

        response['weights'] = weights

    return db_connection_template(callback, googleId)