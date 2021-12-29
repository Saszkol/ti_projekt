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
