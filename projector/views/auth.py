from flask import Flask, render_template, abort, jsonify, g, url_for, request

from projector import app, auth, db
from projector.models.user import User



@auth.verify_password
def verify_password(username_or_token, password):
    # first try to authenticate by token
    user = User.verify_auth_token(username_or_token)
    if not user:
        # try to authenticate with username/password
        user = User.query.filter_by(username=username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True


@app.route('/api/users', methods=['POST'])
def new_user():

    if request.json is None:
        abort(400)

    username = request.json.get('username')
    password = request.json.get('password')
    
    if username is None or password is None:
        abort(400)    # missing arguments
    
    if User.query.filter_by(username=username).first() is not None:
        abort(400)    # existing user
    
    user = User(username=username)
    user.hash_password(password)
    
    db.session.add(user)
    db.session.commit()
    
    return (jsonify({'username': user.username}), 201,
            {'Location': url_for('get_user', id=user.id, _external=True)})


@app.route('/api/users/<int:id>')
def get_user(id):
    user = User.query.get(id)
    
    if not user:
        abort(400)
    
    return jsonify({'username': user.username})


@app.route('/api/token')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token(600)
    return jsonify({'token': token.decode('ascii'), 'duration': 600})
