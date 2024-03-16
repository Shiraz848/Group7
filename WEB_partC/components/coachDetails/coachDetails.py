from flask import Blueprint, render_template, request


coachDetails_bp = Blueprint(
    'coachDetails',
    __name__,
    static_folder='static',
    static_url_path='/coachDetails',
    template_folder='templates'
)