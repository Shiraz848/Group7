from flask import Blueprint, render_template, session, url_for, redirect, request

from WEB_partC.db_connector import registered_users_col

myAccount_bp = Blueprint(
    'myAccount',
    __name__,
    static_folder='static',
    static_url_path='/myAccount',
    template_folder='templates'
)

@myAccount_bp.route('/myAccount', methods=['GET', 'POST'])
def update_account():
    message = None  # Initialize a message variable
    updated = False  # Initialize updated flag

    if 'email' not in session:
        # User is not logged in, redirect to sign-in page
        return redirect(url_for('signIn.login'))

    user_email = session['email']
    user = registered_users_col.find_one({"email": user_email})

    if request.method == 'POST':
        if request.form['password'] != request.form['confirm-password']:
            message = 'Passwords do not match.'
            updated = False
        else:
            # If passwords match, update the user details
            # Update user details based on form input
            # You need to add validation and proper updating logic here
            user['firstName'] = request.form['first-name']  # Make sure to match the form field names
            user['lastName'] = request.form['last-name']  # Make sure to match the form field names
            user['phone'] = request.form['phone']  # Make sure to match the form field names
            user['city'] = request.form['city']  # Make sure to match the form field names
            user['password'] = request.form['password']  # Make sure to match the form field names

            # Save updated user to database
            registered_users_col.update_one({"email": user_email}, {"$set": user})

            # Optionally, update the session details if they are changed
            session['firstName'] = user['firstName']
            session['lastName'] = user['lastName']
            session['phone'] = user['phone']
            session['city'] = user['city']
            session['password'] = user['password']
            # ... update other session details

            # Redirect to the account page or display a success message
            message = 'Details updated successfully.'
            updated = True

        # return redirect(url_for('.update_account'))  # Redirect to the same page to display updated details

    # For a GET request, display the user details
    return render_template('myAccount.html', user=user, message=message, updated=updated)
