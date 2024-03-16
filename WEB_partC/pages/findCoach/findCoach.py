from flask import Blueprint, request, render_template, session, json, jsonify, redirect, url_for, flash
from WEB_partC.db_connector import get_filtered_coaches, coaches_col, registered_users_col

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
    user = registered_users_col.find_one({"email": user_email})
    favorites = user.get('favorites', []) if user else []

    if request.method == 'POST':
        # Extract form data
        training_type = request.form.get('training-type')
        training_time = request.form.get('training-time')
        training_level = request.form.get('training-level')

        coaches_list = get_filtered_coaches(training_type, training_time, training_level)
    else:
        coaches_list = get_filtered_coaches()

    # Enhance the coaches list with 'is_favorite' information
    for coach in coaches_list:
        coach['is_favorite'] = coach['phone'] in favorites

    return render_template('findCoach.html', name=name, coaches=coaches_list, favorites=favorites)




@findCoach_bp.route('/coach/<string:phone>')
def coach_details(phone):
    coach = coaches_col.find_one({'phone': phone})
    if coach:
        # Add 'show_modal' flag to the context
        return render_template('findCoach.html', coach=coach)
    else:
        return "Coach not found", 404


@findCoach_bp.route('/findCoach/contact', methods=['POST'])
def contact_coaches():
    selected_coaches = request.form.getlist('selected_coaches')
    if not selected_coaches:
        # Handle the case where no coaches are selected.
        # You might want to redirect back and show an error message.
        flash('Please select at least one coach.')
        return redirect(url_for('findCoach.find_coach'))
    # Assuming the user's email is stored in session when they log in
    user_email = session.get('email')

    # # This should be the name attribute of your checkboxes
    # selected_coaches = request.form.getlist('selected_coaches')

    # Retrieve the user's document using their email
    user = registered_users_col.find_one({"email": user_email})

    if user:
        # Add the list of selected coaches' phone numbers to the user's document
        # Use $addToSet to avoid duplicates
        registered_users_col.update_one(
            {"email": user_email},
            {"$addToSet": {"selected_coaches": {"$each": selected_coaches}}}
        )

        # Redirect to a confirmation page or back to the coaches list with a success message
        return render_template('findCoach.html', show_confirmation=True)
    else:
        # Handle the case where the user is not found
        return "User not found", 404


@findCoach_bp.route('/add_to_favorites/<coach_id>', methods=['POST'])
def add_to_favorites(coach_id):
    user_email = session.get('email')
    result = registered_users_col.update_one(
        {"email": user_email},
        {'$addToSet': {'favorites': coach_id}}
    )

    if result.modified_count > 0:
        flash('Coach added to favorites!', 'success')
    else:
        flash('Coach is already in your favorites or an error occurred.', 'info')

    return redirect(url_for('findCoach.find_coach'))


