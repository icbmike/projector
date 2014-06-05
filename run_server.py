from projector import app, db

import os

if not os.path.exists('db.sqlite'):
        db.create_all()

app.run(debug=True)

