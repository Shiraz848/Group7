from flask import Blueprint, render_template

from WEB_partC.db_connector import coaches_col

coachDetails_bp = Blueprint(
    'coachDetails',
    __name__,
    static_folder='static',
    static_url_path='/coach/<string:phone>',
    template_folder='templates'
)


@coachDetails_bp.route('/coach/<string:phone>')
def coach_details(phone):
    print("coach_details route was called.")
    coach = coaches_col.find_one({'phone': phone})
    if coach is None:
        return "Coach not found", 404

    print("coach found")
    return render_template('coachDetails.html', coach=coach)