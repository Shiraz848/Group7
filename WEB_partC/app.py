from flask import Flask


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

from components.confirmationMsg.confirmationMsg import confirmationMsg_bp
app.register_blueprint(confirmationMsg_bp)

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
