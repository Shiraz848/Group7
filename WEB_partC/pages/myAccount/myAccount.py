from flask import Blueprint, render_template, session, url_for, redirect, request, flash
from WEB_partC.db_connector import find_one_user, update_one_user, ISRAELI_CITIES

myAccount_bp = Blueprint(
    'myAccount',
    __name__,
    static_folder='static',
    static_url_path='/myAccount',
    template_folder='templates'
)


@myAccount_bp.route('/myAccount', methods=['GET', 'POST'])
def update_account():
    message = None
    updated = False

    if 'email' not in session:
        # User is not logged in, redirect to sign-in page
        return redirect(url_for('signIn.login'))

    user_email = session['email']
    user = find_one_user(user_email)

    sorted_cities = sorted(ISRAELI_CITIES)

    if request.method == 'POST':
        if request.form['password'] != request.form['confirm-password']:
            flash('Passwords do not match', 'error')
            message = 'Passwords do not match.'
            updated = False
        else:
            # If passwords match, update the user details
            # Update user details based on form input
            # You need to add validation and proper updating logic here
            user['firstName'] = request.form['first-name']
            user['lastName'] = request.form['last-name']
            user['phone'] = request.form['phone']
            user['city'] = request.form['city']
            user['password'] = request.form['password']

            # Save updated user to database
            update_one_user(user_email, user)

            # Optionally, update the session details if they are changed
            session['firstName'] = user['firstName']
            session['lastName'] = user['lastName']
            session['phone'] = user['phone']
            session['city'] = user['city']
            session['password'] = user['password']

            # flash('Details updated successfully!', 'success')

            # Redirect to the account page or display a success message
            message = 'Details updated successfully.'
            updated = True

    return render_template('myAccount.html', user=user, cities=sorted_cities,  message=message, updated=updated)
