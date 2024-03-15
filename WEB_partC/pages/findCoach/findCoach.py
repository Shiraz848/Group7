from flask import Blueprint, request, render_template, session, json, jsonify, redirect, url_for
from WEB_partC.db_connector import get_filtered_coaches, coaches_col

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

        coaches_list = get_filtered_coaches(training_type, training_time, training_level)

        return render_template('findCoach.html',name=name,  coaches=coaches_list)

    # For a GET request or if the form is not submitted, display all coaches
    coaches_list = get_filtered_coaches()
    return render_template('findCoach.html', name=name, coaches=coaches_list)

@findCoach_bp.route('/coach/<string:phone>')
def coach_details(phone):
    coach = coaches_col.find_one({'phone': phone})
    if coach:
        # Add 'show_modal' flag to the context
        return render_template('findCoach.html', coach=coach, show_modal=True)
    else:
        return "Coach not found", 404



# Route for getting the details of a coach
# @findCoach_bp.route('/coach/<string:phone>')
# def coach_details(phone):
#     print("coach_details route was called.")
#     coach = coaches_col.find_one({'phone': phone})
#     if coach is None:
#         return "Coach not found", 404
#     return render_template('findCoach.html', coach=coach)

# Route for adding a coach to favorites (You'll need to replace `user` with the correct way to get the current user)
# @findCoach_bp.route('/add_to_favorites', methods=['POST'])
# def add_to_favorites():
#     phone = request.form['phone']
#     user = get_current_user()  # Implement this function based on how you determine the current user
#     # Logic to add the coach to the user's favorites
#     # ...
#     return redirect(url_for('find_coaches'))




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
