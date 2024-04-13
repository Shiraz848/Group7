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
    if 'email' not in session:
        return redirect(url_for('signIn.login'))

    user_email = session['email']
    user = find_one_user(user_email)
    sorted_cities = sorted(ISRAELI_CITIES)

    if request.method == 'POST':
        first_name = request.form['first-name']
        last_name = request.form['last-name']
        phone = request.form['phone']
        city = request.form['city']
        password = request.form['password']
        confirm_password = request.form['confirm-password']

        if password != confirm_password:
            flash('Passwords do not match', 'error')
        else:
            user['firstName'] = first_name
            user['lastName'] = last_name
            user['phone'] = phone
            user['city'] = city
            user['password'] = password

            success, message = update_one_user(user_email, user)

            if success:
                flash('Account details updated successfully!', 'success')
                session['firstName'] = user['firstName']
                session['lastName'] = user['lastName']
                session['phone'] = user['phone']
                session['city'] = user['city']
                session['password'] = user['password']

            else:
                flash(message, 'error')
                return redirect(url_for('.update_account'))

    return render_template('myAccount.html', user=user, cities=sorted_cities)