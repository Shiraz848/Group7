from flask import Blueprint
from flask import render_template,redirect,url_for


favorites_bp = Blueprint(
    'favorites',
    __name__,
    static_folder='static',
    static_url_path='/favorites',
    template_folder='templates'
)


@favorites_bp.route('/favorites')
def show_favorites():
    return render_template('favorites.html')
