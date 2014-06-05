from flask import Flask, render_template, abort, jsonify, g, url_for
from flask.ext.httpauth import HTTPBasicAuth
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True

@app.route('/')
def index():
	return render_template('index.html')

auth = HTTPBasicAuth()
db = SQLAlchemy(app)

from projector.views import *
from projector.models import *