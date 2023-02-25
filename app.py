from flask import request, session
from flask_api import FlaskAPI, status, exceptions
from flask_session import Session
import uuid
from flask_cors import CORS

app = FlaskAPI(__name__)
SECRET_KEY = b'_5#y2L"F4Q8z\n\xec]/'
SESSION_TYPE = 'filesystem'
app.config.from_object(__name__)
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)
Session(app)
CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
session = {}
books_db = { 'books': []}


def is_logged_in():
    print(session)
    return 'username' in session


@app.route("/auth", methods=['POST'])
def auth():
    """
    Authenticate.
    """
    request_data = request.get_json()
    if request_data['password'] == 'admin123':
        session['username'] = request_data['username']
        return {'message': 'Successful log in as ' + session['username'] + '.', 'token': uuid.uuid4().hex}, status.HTTP_200_OK

    return 'Failed.', status.HTTP_401_UNAUTHORIZED


@app.route("/logout", methods=['POST'])
def clear():
    """
    Clear Authenticate.
    """
    session.pop('username', None)
    return 'Ok.', status.HTTP_204_NO_CONTENT


@app.route("/books", methods=['GET', 'POST'])
def notes_list():
    """
    List or create books.
    """
    if not is_logged_in():
        return {'message': 'You are not logged in.'}, status.HTTP_401_UNAUTHORIZED
    
    if request.method == 'POST':
        inserted_id = uuid.uuid4().hex
        request.data['id'] = inserted_id
        print(str(request.data))
        books_db['books'].insert(0, request.data)
        return { 'id': inserted_id }, status.HTTP_201_CREATED

    # request.method == 'GET'
    return books_db, status.HTTP_200_OK


@app.route("/books/<string:key>", methods=['GET', 'PUT', 'DELETE'])
def notes_detail(key):
    """
    Retrieve, update or delete book instances.
    """
    if not is_logged_in():
        return 'You are not logged in.', status.HTTP_401_UNAUTHORIZED

    # Check args
    #return {"message": "Invalid ID"}, status.HTTP_400_BAD_REQUEST

    if request.method == 'PATCH':
        print(str(request.data))
        return {}

    elif request.method == 'DELETE':
        print("Removed ", key)
        return '', status.HTTP_204_NO_CONTENT

    # request.method == 'GET'
    books = {}
    print(books)
    for book in books:
        return book
    
    raise exceptions.NotFound()


if __name__ == "__main__":
    app.run(debug=True)