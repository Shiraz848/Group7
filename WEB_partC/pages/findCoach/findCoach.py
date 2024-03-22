from flask import Blueprint, request, render_template, session, json, jsonify, redirect, url_for, flash
from WEB_partC.db_connector import (get_filtered_coaches, get_user_favorite_coaches,
                                    add_to_user_favorites, add_to_user_contacted,
                                    add_user_to_coach_interested)


findCoach_bp = Blueprint(
    'findCoach',
    __name__,
    static_folder='static',
    static_url_path='/findCoach/',
    template_folder='templates'
)


@findCoach_bp.route('/findCoach/', methods=['GET', 'POST'])
def find_coach():
    name = session.get('name', 'Guest')
    user_email = session.get('email')
    user_city = None  # You might want to get the user's city from the session or a user profile object

    # Get user preferences from request arguments
    training_type = request.args.get('training-type')
    training_time = request.args.get('training-time')
    training_level = request.args.get('training-level')
    # user_location = request.args.get('location') if request.args.get('location') == 'current' else None

    # Call the function to get filtered coaches from the db_connector
    coaches_list = get_filtered_coaches(training_type, training_time, training_level)

    # Call the function to get user's favorite coaches from the db_connector
    favorites = get_user_favorite_coaches(user_email)

    return render_template('findCoach.html', name=name, coaches=coaches_list, favorites=favorites)


@findCoach_bp.route('/add_to_favorites/<string:coach_phone>', methods=['POST'])
def add_to_favorites(coach_phone):
    user_email = session.get('email')
    if add_to_user_favorites(user_email, coach_phone):
        flash('Coach added to favorites!', 'success')
    else:
        flash('Failed to add coach to favorites.', 'error')
    return redirect(url_for('findCoach.find_coach'))


@findCoach_bp.route('/findCoach/contact', methods=['POST'])
def contact_coaches():
    selected_coaches = request.form.getlist('selected_coaches')
    user_email = session.get('email')

    if not selected_coaches:
        flash('No coaches were selected.', 'error')
        return redirect(url_for('findCoach.find_coach'))

    for coach_phone in selected_coaches:
        if add_to_user_contacted(user_email, coach_phone) and add_user_to_coach_interested(coach_phone, user_email):
            flash('Coaches have been notified!', 'success')
        else:
            flash(f'Failed to contact coach {coach_phone}.', 'error')

    # Redirect back to the find coach page or to a success page
    return redirect(url_for('findCoach.find_coach'))





