from flask import Blueprint, render_template, request


coachDetails_bp = Blueprint(
    'coachDetails',
    __name__,
    static_folder='static',
    static_url_path='/coachDetails',
    template_folder='templates'
)


# @coachDetails_bp.route('/findCoach/coach/<string:phone>')
# def coach_details(phone):
#     print("coach_details route was called.")
#     # phone = request.args['phone']
#     coach = coaches_col.find_one({'phone': phone})
#     if coach:
#         # The template_name_or_list parameter is not typically used like this,
#         # so just render_template('coachDetails.html', coach=coach) should suffice.
#         return render_template('findCoach.html', coach=coach, show_details=True)
#     else:
#         return "Coach not found", 404
