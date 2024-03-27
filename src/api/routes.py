"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

# You must already have this line in your project, you don't have to add it again

api = Blueprint('api', __name__)
# Setup the Flask-JWT-Extended extension
# jwt = JWTManager(api)
# api.config["JWT_SECRET_KEY"] = "leo"  # Change this "super secret" to something else!



# Allow CORS requests to this API
CORS(api)


# Create a route to authenticate your users and return JWT Token
# The create_access_token() function is used to actually generate the JWT
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Query your database for username and password
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        # The user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    # Create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })


@api.route('/newuser', methods=['POST'])
def post_new_user():
    new_user = request.json    
    check_existing_user = User.query.filter_by(email = new_user['email']).first()
    if check_existing_user:
        response_body = {
            "bad_message": "Email already in use. Reset password or use a diffrent email"
        }
        return jsonify(response_body),200
    else:
        new_user_creation = User(email = new_user['email'], password = new_user['password'])
        db.session.add(new_user_creation)
        db.session.commit()
        response_body = {
            "message": 'New account with has been created'
        }
        return jsonify(response_body), 201
    
# Protect a route with jwt_required, which will kick out requests without a valid JWT


