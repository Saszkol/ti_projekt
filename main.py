import json
from flask import Flask, render_template
from db_manager import

app = Flask(__name__)


@app.route("/")
def home():
    return render_template('index.html')


@app.route("/reservation")
def reservation():
    return render_template('reservation.html')


@app.route('/get_available_boats/<jsdata>', methods=['GET'])
def get_available_boats(jsdata):
    # todo
    #  1. Parse jsdata to dic +
    #  2. Create query to database with from and to parameters
    #  3. Execute Query
    #  4. Analyze result
    #  5. Build divs for all retrieved elements
    #  6. Render proper html

    print(f'Got jsdata from web browser: {jsdata}')
    js = try_parse_to_dic(jsdata)
    if js is not None:
        pass
    else:
        return 'error'
    return(jsdata)


def try_parse_to_dic(jsdata):
    try:
        print(f'Trying to parse jsdata: {jsdata} to dictionary.')
        js = json.loads(jsdata)
        return js
    except Exception as ex:
        print(f'Something went wrong with parsing jsdata to dictionary. Trace:\n{ex}')
        return None


def main():
    app.run(host='0.0.0.0',
            port=5000,
            debug=True)


if __name__ == '__main__':
    main()
