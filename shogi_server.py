from flask import Flask, request, json
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
rooms = {}


@app.route('/')
def hello_world():
   return 'Hello World'

@app.route('/room/<owner>', methods=['GET', 'POST'])
def room(owner):
    if request.method == 'POST':
        rooms[owner] = request.get_json()
        print(request.content_type)
        print(rooms[owner])
        return 'Received'
        # response = flask.jsonify({'info' : 'Received'})
        # response.headers.add('Access-Control-Allow-Origin', '*')
        # return response
    elif request.method == 'GET':
        if owner in rooms:
            return json.jsonify(rooms[owner])
            # response = flask.jsonify(rooms[owner])
            # response.headers.add('Access-Control-Allow-Origin', '*')
            # return response
        else:
            return 'Nonexistent'
            # response = flask.jsonify({'info' : 'The room does not exist'})
            # response.headers.add('Access-Control-Allow-Origin', '*')
            # return response


if __name__ == '__main__':
   app.run(host="0.0.0.0", port=5000, debug=True)
