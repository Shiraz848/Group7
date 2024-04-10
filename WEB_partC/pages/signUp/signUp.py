from flask import Blueprint, request, render_template, flash, redirect, url_for
from WEB_partC.db_connector import add_new_user, ISRAELI_CITIES

signUp_bp = Blueprint(
    'signUp',
    __name__,
    static_folder='static',
    static_url_path='/signUp',
    template_folder='templates'
)


@signUp_bp.route('/signUp', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Get form data
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        email = request.form['email']
        phone = request.form['phoneNumber']
        city = request.form['city']
        password = request.form['password']
        location_access = request.form['locationAccess']

        # Add new user to the database
        success, message = add_new_user(first_name, last_name, email, phone, city, password, location_access)

        if success:
            flash(message, 'success')
            return redirect(url_for('signIn.login'))
        else:
            flash(message, 'error')
            print("flashhhhh error")
            return redirect(url_for('signUp.register'))

    sorted_cities = sorted(ISRAELI_CITIES)

    return render_template('signUp.html', cities=sorted_cities)
