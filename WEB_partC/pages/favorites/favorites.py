from flask import Blueprint, session, flash
from flask import render_template,redirect,url_for

from WEB_partC.db_connector import get_user_favorite_coaches, remove_from_favorites

favorites_bp = Blueprint(
    'favorites',
    __name__,
    static_folder='static',
    static_url_path='/favorites',
    template_folder='templates'
)


@favorites_bp.route('/favorites', methods=['GET'])
def show_favorites():
    user_email = session.get('email')  # Get the user's email from the session
    favorite_coaches_list = get_user_favorite_coaches(user_email)

    return render_template('favorites.html', favorite_coaches=favorite_coaches_list)

@favorites_bp.route('/delete_favorite/string:<coach_phone>', methods=['POST'])
def delete_favorite(coach_phone):
    user_email = session.get('email')
    if remove_from_favorites(user_email, coach_phone):
        flash('Coach removed from favorites successfully!', 'success')
    else:
        flash('Failed to remove coach from favorites.', 'error')

    return redirect(url_for('favorites.show_favorites'))