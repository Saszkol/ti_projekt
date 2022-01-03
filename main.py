import json
from flask import Flask, render_template
from db_manager import DatabaseManager

app = Flask(__name__)


@app.route("/")
def home():
    return render_template('index.html')


@app.route("/reservation")
def reservation():
    return render_template('reservation.html')


@app.route("/result_ok")
def result_ok():
    return render_template('result_ok.html')


@app.route("/result_error")
def result_error():
    return render_template('result_error.html')


@app.route('/get_available_boats/<jsdata>', methods=['GET'])
def get_available_boats(jsdata):
    print(f'Got jsdata from web browser: {jsdata}')
    js = try_parse_to_dic(jsdata)
    SearchResult.db_query_result = DatabaseManager.get_all_available_boats_filtered_by_date(js)
    if js is not None:
        return SearchResult.db_query_result
    else:
        return 'error'


@app.route('/boat/<nr>')
def boat(nr):
    print(nr)
    return render_template('boat.html', config_json=SearchResult.db_query_result[nr])


@app.route('/accept_reservation/<reservation_data>', methods=['GET'])
def accept_reservation(reservation_data):
    print(f'Got reservation data: {reservation_data}')
    reservation_data_json = try_parse_to_dic(reservation_data)
    if reservation_data_json is None:
        return 'error'
    else:
        # todo
        #  1. add user data to db
        #  2. add reservation data to db
        #  3. return success
        insert_user_result = DatabaseManager.insert_user(reservation_data_json)
        if not insert_user_result:
            return 'error'
        else:
            proper_string_to_parse = reservation_data_json['config_json'].replace('\'', '"')
            chosen_boat_data = try_parse_to_dic(proper_string_to_parse)
            print(chosen_boat_data)
            insert_reservation_result = DatabaseManager.insert_reservation(chosen_boat_data, reservation_data_json)
            if insert_reservation_result:
                return 'ok'
            else:
                return 'error'


def try_parse_to_dic(jsdata):
    try:
        print(f'Trying to parse jsdata: {jsdata} to dictionary.')
        js = json.loads(jsdata)
        print(f'Successfully parsed jsdata to dictionary!')
        return js
    except Exception as ex:
        print(f'Something went wrong with parsing jsdata to dictionary. Trace:\n{ex}')
        return None


class SearchResult:
    db_query_result = None


def main():
    app.run(host='0.0.0.0',
            port=5000,
            debug=True)


if __name__ == '__main__':
    main()
