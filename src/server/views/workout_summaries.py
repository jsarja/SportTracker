from flask import request
from copy import copy
from datetime import datetime
import time

from database import db_connection_template
from utils import create_json


TIME_PERIOD_SQL = {
    'week': "AND workoutDate >= date('now', '-7 days')",
    'month': "AND workoutDate >= date('now', '-1 month')",
    'year': "AND workoutDate >= date('now', '-1 year')",
    'custom': "AND workoutDate >= date('now', '-{} days')",
    'all': "",
}

def get_workouts(googleId, cur):
    # Get sql clause to get workouts from wanted time period.
    if not 'timePeriod' in request.args:
        time_period_sql = ""
    elif request.args.get('timePeriod') == 'custom':
        time_period_sql = TIME_PERIOD_SQL['custom'].format(
            request.args.get('customDays'))
    else:
        time_period_sql = TIME_PERIOD_SQL[request.args.get('timePeriod')]

    # Create sql clause to get workouts by sport.
    if not 'sport' in request.args:
        sport_sql = ''
    else:
        sport_sql = "AND sport = '{}'".format(request.args.get('sport'))

    cur.execute('SELECT * from workouts where googleId = "{}" {} {} ORDER BY workoutDate'
        .format(googleId, time_period_sql, sport_sql))

    workouts = cur.fetchall()
    trimmed_workouts = []
    for workout in workouts:
        new_workout = list(workout)
        # From start and end datetimes get only the time in hh:mm format.
        if new_workout[3]:
            d = datetime.strptime(new_workout[3].split('.')[0], '%Y-%m-%dT%H:%M:%S')
            new_workout[3] = time.strftime("%H:%M", time.localtime(time.mktime(d.timetuple())))
        if new_workout[4]:
            d = datetime.strptime(new_workout[4].split('.')[0], '%Y-%m-%dT%H:%M:%S')
            new_workout[4] = time.strftime("%H:%M", time.localtime(time.mktime(d.timetuple())))
         # Calculate average speed if time and distance is known.
        new_workout.append(None)
        if new_workout[5] and new_workout[6]:
            new_workout[11] = new_workout[6]/(float(new_workout[5])/3600)

        trimmed_workouts.append(new_workout)

    return trimmed_workouts

STAT_COLUMN_LIST = ['endTime', 'startTime', 'duration', 'distance', 
'heartRate', 'calories', 'speed']

def get_summary(googleId):
    def callback(conn, cur, response, status, args):
        workouts = get_workouts(googleId, cur)

        if len(workouts) == 0:
            response = {}
            return

        # Create dicts where min, max and sum values are saved
        data_min = {
            'endTime': workouts[0][3],
            'startTime': workouts[0][4],
            'duration': workouts[0][5],
            'distance': workouts[0][6],
            'heartRate': workouts[0][7],
            'calories': workouts[0][8],
            'speed': workouts[0][11],
        }

        data_max = copy(data_min)
        data_sum = copy(data_min)
        
        # Don't get sum data for start and end time.
        data_sum.pop('startTime')
        data_sum.pop('endTime')

        # For calculating the average, track how many workouts are included 
        # when calculating the sum.
        total_values = {
            'duration': len(workouts) - (0 if data_min['duration'] else 1),
            'distance': len(workouts) - (0 if data_min['distance'] else 1),
            'heartRate': len(workouts) - (0 if data_min['heartRate'] else 1),
            'calories': len(workouts) - (0 if data_min['calories'] else 1),
            'speed': len(workouts) - (0 if data_min['speed'] else 1),
        }

        for workout in workouts[1:]:
            stat_columns = workout[3:9]
            stat_columns.append(workout[11])
            for idx, column in enumerate(stat_columns):
                # If value exits, find out if it is curren min or max value
                # and add it to the total sum.
                if column:
                    min_value = data_min[STAT_COLUMN_LIST[idx]]
                    if not min_value or column < min_value:
                        data_min[STAT_COLUMN_LIST[idx]] = column

                    max_value = data_max[STAT_COLUMN_LIST[idx]]
                    if not max_value or column > max_value:
                        data_max[STAT_COLUMN_LIST[idx]] = column
                    
                    if idx not in (0, 1):
                        if data_sum[STAT_COLUMN_LIST[idx]]:
                            data_sum[STAT_COLUMN_LIST[idx]] += column
                        else:
                            data_sum[STAT_COLUMN_LIST[idx]] = column

                # If no value, dont count the workout in the average calculation.
                elif idx not in (0, 1):
                    total_values[STAT_COLUMN_LIST[idx]] -= 1

        # Calculate average for each variable.
        data_avg = {}
        for stat, stat_sum in data_sum.items():
            if stat_sum:
                data_avg[stat] = round(stat_sum/total_values[stat], 2)
            else:
                data_avg[stat] = None

        response['minData'] = data_min
        response['maxData'] = data_max
        response['sumData'] = data_sum
        response['avgData'] = data_avg

    return db_connection_template(callback, googleId)

def get_chart_data(googleId):
    def callback(conn, cur, response, status, args):
        workouts = get_workouts(googleId, cur)

        if len(workouts) == 0:
            response = {}
            return

        chart_data = {
            'distance': [],
            'duration': [],
            'calories': [],
            'heartRate': [],
            'startTime': [],
            'endTime': [],
            'speed': []
        }

        # Format the data to match the data structure that recharts charting 
        # library uses.
        for workout in workouts:
            stat_columns = workout[3:9]
            stat_columns.append(workout[11])
            workout_date = workout[2]
            for idx, column in enumerate(stat_columns):
                if column:
                    stat_list = chart_data[STAT_COLUMN_LIST[idx]]
                    stat_list.append({STAT_COLUMN_LIST[idx]: column, 
                    'date':workout_date})

        response.update(chart_data)
    return db_connection_template(callback, googleId)