from flask import Blueprint, request, render_template, session, json, jsonify, redirect, url_for, flash
from WEB_partC.db_connector import get_filtered_coaches, get_user_favorite_coaches, add_to_user_favorites

findCoach_bp = Blueprint(
    'findCoach',
    __name__,
    static_folder='static',
    static_url_path='/findCoach/',
    template_folder='templates'
)


@findCoach_bp.route('/findCoach/', methods=['GET'])
def find_coach():
    name = session.get('name', 'Guest')
    user_email = session.get('email')
    user_city = None  # You might want to get the user's city from the session or a user profile object

    # Get user preferences from request arguments
    training_type = request.args.get('training-type')
    training_time = request.args.get('training-time')
    training_level = request.args.get('training-level')
    user_location = request.args.get('location') if request.args.get('location') == 'current' else None

    # Call the function to get filtered coaches from the db_connector
    coaches_list = get_filtered_coaches(training_type, training_time, training_level, user_location, user_city)

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
    return render_template('find_coach.html')
    # selected_coaches = request.form.getlist('selected_coaches')
    # if not selected_coaches:
    #     # Handle the case where no coaches are selected.
    #     # You might want to redirect back and show an error message.
    #     flash('Please select at least one coach.')
    #     return redirect(url_for('findCoach.find_coach'))
    # # Assuming the user's email is stored in session when they log in
    # user_email = session.get('email')
    #
    # # # This should be the name attribute of your checkboxes
    # # selected_coaches = request.form.getlist('selected_coaches')
    #
    # # Retrieve the user's document using their email
    # user = registered_users_col.find_one({"email": user_email})
    #
    # if user:
    #     # Add the list of selected coaches' phone numbers to the user's document
    #     # Use $addToSet to avoid duplicates
    #     registered_users_col.update_one(
    #         {"email": user_email},
    #         {"$addToSet": {"selected_coaches": {"$each": selected_coaches}}}
    #     )
    #
    #     # Redirect to a confirmation page or back to the coaches list with a success message
    #     return render_template('findCoach.html', show_confirmation=True)
    # else:
    #     # Handle the case where the user is not found
    #     return "User not found", 404


