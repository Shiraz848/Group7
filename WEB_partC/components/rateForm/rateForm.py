from flask import Blueprint, request, flash, redirect

from WEB_partC.db_connector import update_coach_rating

rateForm_bp = Blueprint(
    'rateForm',
    __name__,
    static_folder='static',
    static_url_path='/rateForm',
    template_folder='templates'
)


@rateForm_bp.route('/rateForm', methods=['POST'])
def rate_coach():
    coach_phone = request.form['coach_phone']
    print(f'coach is: {coach_phone}')
    user_rating = int(request.form.get('rating'))  # Convert the rating to an integer
    return_url = request.form.get('return_url')

    success, new_rating = update_coach_rating(coach_phone, user_rating)

    if success:
        flash(f'Coach rating updated. New average rating: {new_rating}', 'success')
    else:
        flash('Failed to update coach rating.', 'error')

    return redirect(return_url)  # Redirect back to the page the user came from
