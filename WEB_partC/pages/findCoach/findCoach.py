from flask import Blueprint, request, render_template, session, json, jsonify, redirect, url_for, flash
from WEB_partC.db_connector import (get_filtered_coaches, get_user_favorite_coaches,
                                    add_to_user_favorites, add_to_user_contacted,
                                    add_user_to_coach_interested, get_user_city, get_all_coaches, )

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

    # Default to showing all coaches on initial load
    coaches_list = get_all_coaches()

    # If search parameters are present, use filters
    if 'search' in request.args:
        training_type = request.args.get('training-type')
        training_time = request.args.get('training-time')
        training_level = request.args.get('training-level')
        use_current_location = request.args.get('location') == 'Current'

        if use_current_location:
            latitude = request.args.get('latitude')
            longitude = request.args.get('longitude')
            coaches_list = get_filtered_coaches(training_type, training_time, training_level, None, latitude, longitude,
                                                use_current_location)
        else:
            city = get_user_city(user_email)
            coaches_list = get_filtered_coaches(training_type, training_time, training_level, city, None, None, False)

    favorites = get_user_favorite_coaches(user_email)

    # Check if the current user has already contacted the coaches
    already_contacted = []
    for coach in coaches_list:
        if user_email in coach.get('interested_users', []):
            already_contacted.append(coach['phone'])

    # Check if contact was made in the previous action
    contact_made = request.args.get('contact_made') == 'true'

    return render_template('findCoach.html',
                           name=name,
                           coaches=coaches_list,
                           favorites=favorites,
                           already_contacted=already_contacted,
                           contact_made=contact_made)


@findCoach_bp.route('/findCoach/contact', methods=['POST'])
def contact_coaches():
    print("Contact endpoint hit")
    selected_coaches = request.form.getlist('selected_coaches')
    user_email = session.get('email')
    print(selected_coaches)
    print(f"Attempting to contact coaches for user: {user_email}")  # Debug print

    if not selected_coaches:
        print("No coaches were selected.")  # Debug print
        flash('Please select at least one coach.')
        return redirect(url_for('findCoach.find_coach'))

    contact_made = False
    for coach_phone in selected_coaches:
        print(f"Processing coach: {coach_phone}")  # Debug print
        user_updated = add_to_user_contacted(user_email, coach_phone)
        coach_updated = add_user_to_coach_interested(coach_phone, user_email)
        if user_updated and coach_updated:
            contact_made = True
            print(f"Contact made with coach: {coach_phone}")  # Debug print
        else:
            print(f"Failed to update contact for coach: {coach_phone}")  # Debug print

    if contact_made:
        # Redirect with a special query parameter that triggers the confirmation message
        return redirect(url_for('findCoach.find_coach', contact_made='true'))
    else:
        flash('No coaches were selected or an error occurred.', 'error')
        return redirect(url_for('findCoach.find_coach'))


@findCoach_bp.route('/add_to_favorites/<string:coach_phone>', methods=['POST'])
def add_to_favorites(coach_phone):
    user_email = session.get('email')
    if add_to_user_favorites(user_email, coach_phone):
        flash('Coach added to favorites!', 'success')
    else:
        flash('Failed to add coach to favorites.', 'error')
    return redirect(url_for('findCoach.find_coach'))
