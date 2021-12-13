from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def home():
    return render_template('index.html')


@app.route("/reservation")
def reservation():
    return render_template('reservation.html')


def main():
    app.run(host='0.0.0.0',
            port=5000,
            debug=True)


if __name__ == '__main__':
    main()
