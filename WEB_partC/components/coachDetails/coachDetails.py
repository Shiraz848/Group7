from flask import Blueprint, render_template, request, flash, url_for, redirect

coachDetails_bp = Blueprint(
    'coachDetails',
    __name__,
    static_folder='static',
    static_url_path='/coachDetails',
    template_folder='templates'
)

# @coachDetails_bp.route('/rate_coach', methods=['POST'])
# def rate_coach():
#     rating = request.form['rating']
#     coach_phone = request.form['coach_phone']
#     # Logic to update the coach's rating in the database using `coach_phone` and `rating`
#     # For example, assuming you have a function to update the rating:
#     # update_coach_rating(coach_phone, rating)
#
#     flash('Rating submitted successfully!', 'success')
#     return redirect(url_for('favorites.show_favorites'))
