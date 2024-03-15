from flask import Blueprint, request, render_template, session, json, jsonify
from WEB_partC.db_connector import get_filtered_coaches, get_coaches_near_location, registered_users_col

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
    if request.method == 'POST':
        # Extract form data
        training_type = request.form['training-type']
        training_time = request.form['training-time']
        training_level = request.form['training-level']
        location_preference = request.form['location']
        # latitude = request.form.get('latitude', type=float)  # Get latitude as float if present
        # longitude = request.form.get('longitude', type=float)  # Get longitude as float if present

        # Update session with the current user's location if available
        # if latitude and longitude:
        #     session['latitude'] = latitude
        #     session['longitude'] = longitude

        coaches_list = get_filtered_coaches(training_type, training_time, training_level, location_preference)

        if location_preference == 'current' and 'latitude' in session and 'longitude' in session:
            # Use session latitude and longitude
            coaches_list = get_coaches_near_location(session['latitude'], session['longitude'])

        return render_template('findCoach.html',name=name,  coaches=coaches_list)

    # For a GET request or if the form is not submitted, display all coaches
    coaches_list = get_filtered_coaches()
    return render_template('findCoach.html', name=name, coaches=coaches_list)


# @findCoach_bp.route('/contact_coaches', methods=['GET', 'POST'])
# def contact_coaches():
#     user_email = session.get('user_email')  # assuming the user's email is stored in session
#     selected_coach_ids = request.form.get('selected_coaches')
#
#     if selected_coach_ids and user_email:
#         selected_coach_ids = json.loads(selected_coach_ids)
#
#         # Update the user's document in the database with the selected coaches
#         registered_users_col.update_one(
#             {'email': user_email},
#             {'$set': {'coaches_to_contact': selected_coach_ids}}
#         )
#
#         # Return a success response
#         return jsonify({'status': 'success', 'message': 'Your details have been sent!'})
#     else:
#         # Return an error response
#         return jsonify({'status': 'error', 'message': 'There was an issue processing your request.'})
