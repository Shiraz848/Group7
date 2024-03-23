from flask import Blueprint, request, render_template, session, redirect, url_for, flash
from WEB_partC.db_connector import find_one_user

signIn_bp = Blueprint(
    'signIn',
    __name__,
    static_folder='static',
    static_url_path='/signIn',
    template_folder='templates'
)


@signIn_bp.route('/signIn', methods=['GET', 'POST'])
def login():
    print("Login route was called.")
    if request.method == 'POST':
        if 'email' in request.form:
            email = request.form['email']
            password = request.form['password']
            # Query the database for the user by email
            user = find_one_user(email)
            if user and user.get('password') == password:
                session['email'] = email
                session['firstName'] = user.get('firstName', 'Guest')  # Use 'Guest' as a default if name is not found
                session['logged_in'] = True
                print(f"Logged in as: {user['firstName']}")
                return redirect(url_for('findCoach.find_coach'))
            else:
                print('Wrong email or password')
                flash('Invalid email or password, please try again.', 'error')
                return redirect(url_for('signIn.login'))

    # For a GET request, render the signIn page
    return render_template('signIn.html')


@signIn_bp.route('/logout', methods=['GET'])
def logout_func():
    session.clear()  # Clear all session data
    return redirect(url_for('homePage.homePage_func'))