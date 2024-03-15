from flask import Blueprint, request, render_template
from WEB_partC.db_connector import registered_users_col

signUp_bp = Blueprint(
    'signUp',
    __name__,
    static_folder='static',
    static_url_path='/signUp',
    template_folder='templates'
)

@signUp_bp.route('/signUp', methods=['GET', 'POST'])
def register():
    # if request.method == 'POST':
    #     if 'email' in request.form:
    #         email = request.form['email']
    #         existing_user = registered_users_col.find_one({"email": email})
#
#         if existing_user is None:
#             password = request.form['password'], method='sha256'
#             users.insert({'email': request.form['email'], 'password': hashed_password})
#             session['email'] = request.form['email']
#             flash('You have successfully signed up!', 'success')
#             return redirect(url_for('findCoach.findCoach'))  # Update with the appropriate function
#         else:
#             flash('Email already exists.', 'danger')
#
    return render_template('signUp.html')