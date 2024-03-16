from flask import Blueprint, session, flash
from flask import render_template,redirect,url_for

from WEB_partC.db_connector import registered_users_col, coaches_col

favorites_bp = Blueprint(
    'favorites',
    __name__,
    static_folder='static',
    static_url_path='/favorites',
    template_folder='templates'
)


@favorites_bp.route('/favorites', methods=['GET', 'POST'])
def show_favorites():
    user_email = session.get('email')  # Get the user's email from the session
    user = registered_users_col.find_one({'email': user_email})
    favorite_coaches_ids = user.get('favorites', [])
    favorite_coaches = coaches_col.find({'phone': {'$in': favorite_coaches_ids}})
    favorite_coaches_list = list(favorite_coaches)  # Convert the cursor to a list

    return render_template('favorites.html', favorite_coaches=favorite_coaches_list)


@favorites_bp.route('/delete_favorite/<coach_id>', methods=['POST'])
def delete_favorite(coach_id):
    user_email = session.get('email')
    # Remove the coach from the user's favorites list
    result = registered_users_col.update_one(
        {'email': user_email},
        {'$pull': {'favorites': coach_id}}
    )

    if result.modified_count > 0:
        flash('Coach removed from favorites successfully!', 'success')
    else:
        flash('Failed to remove coach from favorites.', 'error')

    return redirect(url_for('favorites.show_favorites'))