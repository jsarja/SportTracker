from flask import Flask, request, jsonify
from flask_cors import CORS

from views.login import handle_login
from views.workout_summaries import get_summary, get_chart_data
from views.weight import save_weight, get_weights
from views.workouts import get_workout, get_workouts, delete_workout, create_workout, ORDERS

app = Flask(__name__, static_folder='./build', static_url_path='/sportTracker')
application = app
CORS(app)

app.config.from_mapping(
	DEBUG = True
)

@app.route('/login', methods=['GET'])
def login():
	googleId = request.headers.get('Authorization')
	return handle_login(googleId)


@app.route('/workouts', methods=['GET', 'POST'])
def workouts():
	googleId = request.headers.get('Authorization')
	if request.method == 'POST':
		return create_workout(googleId)

	return get_workouts(googleId)

@app.route('/workouts/<workoutId>', methods=['GET', 'DELETE'])
def workout(workoutId):
	googleId = request.headers.get('Authorization')
	if request.method == 'DELETE':
		return delete_workout(googleId, workoutId)

	return get_workout(googleId, workoutId)

@app.route('/workouts/summary', methods=['GET'])
def summaries():
	googleId = request.headers.get('Authorization')
	return get_summary(googleId)

@app.route('/workouts/summary/chart', methods=['GET'])
def summary_charts():
	googleId = request.headers.get('Authorization')
	return get_chart_data(googleId)

@app.route('/weight', methods=['GET', 'POST'])
def weight():
	googleId = request.headers.get('Authorization')
	if request.method == 'POST':
		return save_weight(googleId)
	return get_weights(googleId)

@app.route('/')
def index():
	return app.send_static_file('index.html')

@app.errorhandler(404)
def fallback(e):
	return app.send_static_file('index.html')

if __name__ == '__main__':
	app.run(port=3000, debug=True)