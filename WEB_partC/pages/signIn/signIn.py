from flask import Blueprint, request, render_template, session, redirect, url_for
from WEB_partC.db_connector import registered_users_col

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
        print("Form data:", request.form)
        if 'email' in request.form:
            email = request.form['email']
            password = request.form['password']
            # Query the database for the user by email
            user = registered_users_col.find_one({'email': email})
            print('hiiiiii')
            print(user)
            if user and user.get('password') == password:
                session['email'] = email
                session['name'] = user.get('firstName', 'Guest')  # Use 'Guest' as a default if name is not found
                session['logged_in'] = True
                print("Session set:", session)  # Check what's being set in the session
                print(f"Logged in as: {user['firstName']}")
                return redirect(url_for('findCoach.find_coach'))
            else:
                print('Wrong email or password')
            #     # You can use the flash function to show the error message in the template
            #     flash('Invalid email or password, please try again.', 'error')
                return redirect(url_for('signIn.login'))
            # return render_template('signIn.html')

    # For a GET request, just render the signIn page
    return render_template('signIn.html')



@signIn_bp.route('/logout', methods=['GET'])
def logout_func():
    session.clear()  # Clear all session data
    return redirect(url_for('homePage.homePage_func'))  # Adjust the redirect to your homepage route