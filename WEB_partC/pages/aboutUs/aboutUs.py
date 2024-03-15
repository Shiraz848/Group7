from flask import Blueprint, render_template

aboutUs_bp = Blueprint(
    'aboutUs',
    __name__,
    static_folder='static',
    static_url_path='/aboutUs',
    template_folder='templates'
)

@aboutUs_bp.route('/aboutUs')
def aboutUs_func():
    return render_template('aboutUs.html')