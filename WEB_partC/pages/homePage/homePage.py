from flask import Flask, render_template, request, redirect, url_for, session
from flask import Blueprint

homePage_bp = Blueprint(
    'homePage',
    __name__,
    static_folder='static',
    template_folder='templates'
)

@homePage_bp.route('/', methods=['GET'])
def homePage_func():
    return render_template('homePage.html')