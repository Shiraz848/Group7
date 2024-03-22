from flask import Blueprint

confirmationMsg_bp = Blueprint(
    'confirmationMsg',
    __name__,
    static_folder='static',
    static_url_path='/confirmationMsg',
    template_folder='templates'
)

