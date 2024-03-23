from flask import Flask, render_template
from flask import Blueprint

homePage_bp = Blueprint(
    'homePage',
    __name__,
    static_folder='static',
    static_url_path='/',
    template_folder='templates'
)


@homePage_bp.route('/', methods=['GET'])
def homePage_func():
    return render_template('homePage.html')