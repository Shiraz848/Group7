from flask import Flask, render_template
import os

# Initialize Flask app
app = Flask(__name__)
app.config.from_pyfile('settings.py')


# Import Blueprints
from pages.findCoach.findCoach import findCoach_bp
app.register_blueprint(findCoach_bp)


from pages.favorites.favorites import favorites_bp
app.register_blueprint(favorites_bp)

from components.coachDetails.coachDetails import coachDetails_bp
app.register_blueprint(coachDetails_bp)

from components.rateForm.rateForm import rateForm_bp
app.register_blueprint(rateForm_bp)

# from components.confirmationMsg.confirmationMsg import confirmationMsg_bp
# app.register_blueprint(confirmationMsg_bp)

from pages.signIn.signIn import signIn_bp
app.register_blueprint(signIn_bp)

from pages.signUp.signUp import signUp_bp
app.register_blueprint(signUp_bp)

from pages.homePage.homePage import homePage_bp
app.register_blueprint(homePage_bp)

from pages.myAccount.myAccount import myAccount_bp
app.register_blueprint(myAccount_bp)

from pages.aboutUs.aboutUs import aboutUs_bp
app.register_blueprint(aboutUs_bp)

# Define your Flask routes
# @app.route('/')
# def index():
#     return 'Hello, World!'

# @app.route('/mongodb')
# def mongodb_func():
#     # Logic to verify database connection and list collections
#     collections = mydatabase.list_collection_names()  # List all collections in 'mydatabase'
#     return ', '.join(collections)  # This will display the list of collection names


# @app.route('/coaches')
# def show_coaches():
#     # Fetch all documents in the 'coaches' collection, excluding the '_id' field
#     coaches = mydatabase['coaches'].find({}, {'_id': 0})
#     coaches_list = list(coaches)
#     # Convert the cursor to a list and jsonify the response
#     return jsonify(coaches_list)

# --------------------
# import flask
#
# app = flask.Flask(__name__)
#
#
# # @app.route('/')
# # def hello_world():
# #     return 'Hello World!'
#
# # pages
#
# from WEB_partC.pages.findCoach.findCoach import findCoach
# app.register_blueprint(findCoach)
#

#
# from WEB_partC.pages.signIn.signIn import signIn
# app.register_blueprint(signIn)
#
#
#
#
# @app.route('/mongodb')
# def mongodb_func():
#     message = 'good'
# # #     # message = pymongo.version
# # #
#     return render_template('mongodb.html', message=message)
