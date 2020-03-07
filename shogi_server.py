from flask import Flask
app = Flask(__name__)

class Piece:
    def __init__(self, type:string, pos:list, belong:int):
        this.type = type
        this.pos = pos
        this.belong = belong

class Board:
    init_pieces = [Piece("king", [0,4], 0), Piece("king", [8, 4], 1), Piece("")]
    def __init__(self):
        self.pieces

@app.route('/')
def hello_world():
   return 'Hello World’

if __name__ == '__main__':
   app.run()
