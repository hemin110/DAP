from flask import Flask, request,render_template ,make_response, Response, redirect, url_for, jsonify,session,flash

from mysqlconnection import MySQLConnector
import re
from flask.ext.bcrypt import Bcrypt
EMAIL_REGEX = re.compile(r'^[a-za-z0-9\.\+_-]+@[a-za-z0-9\._-]+\.[a-za-z]*$')


import csv
import os
import os.path
import glob
import json
import traceback
import numpy as np

from ml import createModel, getModel, getModelType
import datautil

global  username
username = ""

UPLOAD_FOLDER = './data/'
UPLOAD_TEMP_FOLDER = './temp_file/'
ALLOWED_EXTENSIONS = set(['csv'])
ALLOWED_TEMP_EXTENSIONS = set(['txt'])


app = Flask(__name__, static_url_path='')
flask_bcrypt = Bcrypt(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['UPLOAD_TEMP_FOLDER'] = UPLOAD_TEMP_FOLDER
## secret_key
app.config['SECRET_KEY'] = '\xed\xfeX#}\xab(\x10\xff\x85\xa4\xf8\x9b\xa7\xe4\xc0\xf1A-]\x15R\xab|'
#connect mysql
mysql = MySQLConnector('demo_flask_login_registration')


@app.route('/')
def index():
    return render_template('login.html')   

@app.route('/users', methods=['POST'])
def create():
    error = False
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    password_confirm = request.form['password_confirm']
	
    if len(name) < 3:
        error = True
        flash('Name cannot be blank')
    if len(email) < 1:
        error = True
        flash('Email cannot be blank')
    if len(password) < 3:
        error = True
        flash('Password cannot be blank')
    if len(password_confirm) < 3:
        error = True
        flash('Password confirmation cannot be blank')
    if not EMAIL_REGEX.match(email):
        error = True
        flash('Email is invalid')
    if password != password_confirm:
        error = True
        flash('Passwords do not match')

    if error is True:
        return redirect(url_for('index'))

    pw_hash = flask_bcrypt.generate_password_hash(password)
    insert_query = "INSERT INTO users (name, email, password, created_at, updated_at) VALUES ('{}', '{}', '{}', NOW(), NOW())".format(name, email, pw_hash)
    print insert_query
    mysql.run_mysql_query(insert_query)
    return redirect(url_for('show'))

@app.route('/checkname')
def checkname():
    global username
    if username is not "":
        print username
        return Response(username)
    else:
        return Response('gest')
    

@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'GET':
        return render_template('signin.html')

    email = request.form['email']
    password = request.form['password']
    signin_query = "SELECT * FROM users WHERE email='{}' LIMIT 1".format(email)
    user = mysql.fetch(signin_query)
    if user:
        if flask_bcrypt.check_password_hash(user[0]['password'], password):
            session['id'] = user[0]['id']
            session['name'] = user[0]['name']
            global username
            username = user[0]['name']
            return redirect(url_for('show'))
    flash('Invalid email or password')
    return redirect(url_for('signin'))

@app.route('/signout')
def signout():
    session.pop('id')
    session.pop('name')
    global username
    username = ""
    return redirect(url_for('signin'))

@app.route('/show')
def show():
    if 'id' not in session:
        return redirect(url_for('signin'))
    return app.send_static_file('index.html')
    
@app.errorhandler(404)
def page_not_found(error):
    return app.send_static_file('notfound.html'),404

@app.route('/debug')
def index_debug():
    return app.send_static_file('index_debug.html')


@app.route('/csvdata', methods=['GET', 'POST'])
def csvdata():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = file.filename
            # Security issue
            # TODO, check duplicated file
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return json.dumps({})
        return json.dumps({error:
                           'You are not allowed to upload such a file.'})
    else:
        flist = [f.replace('./data'+os.sep, '').replace('.csv', '')
                 for f in glob.glob('./data/*.csv')]
        return json.dumps(flist)
    

@app.route('/txtdata', methods=['GET', 'POST'])
def txtdata():
    if request.method == 'POST':
        file = request.files['file2']
        if file and allowed_temp_file(file.filename):
            filename = file.filename
            # Security issue
            # TODO, check duplicated file
            file.save(os.path.join(app.config['UPLOAD_TEMP_FOLDER'], filename))
            return json.dumps({})
        return json.dumps({error:
                           'You are not allowed to upload such a file.'})
    else:
        flist = [f.replace('./temp_data'+os.sep, '').replace('.txt', '')
                 for f in glob.glob('./temp_data/*.txt')]
        return json.dumps(flist)


@app.route('/data/<dataname>')
def getdata(dataname):
    fpath = './data/' + dataname + '.csv'

    headerOnly = False
    try:
        headerOnly = request.args['headerOnly']
        value = headerOnly.strip().upper()
        if value not in ("0", "FALSE", "F", "N", "NO", "NONE", ""):
            headerOnly = True
    except:
        pass

    if not os.path.isfile(fpath):
        return make_response('<h1>File %s does not exist!</h1>' % fpath)
    else:
        with open(fpath, 'rb') as csvfile:
            if headerOnly:
                return jsonify(name=dataname, csv=csvfile.readline())
            else:
                return jsonify(name=dataname, csv=csvfile.read().decode("UTF-8"))


@app.route('/ml/cls/<action>', methods=['GET'])
def mlclsop(action):
    try:
        if action == "create":
            method = request.args['type']
            model = createModel("Classification", method)
            return jsonify(result="Success", model=model.getId())

        elif action == "train":
            modelId = request.args['id']
            dataName = request.args['data']
            label = request.args['label']
            features = request.args['features'].split(",")

            model = getModel(modelId)

            datadf = datautil.load(dataName)
            labelData = datautil.getColValues(datadf, label)
            featureData = datautil.getColsValues(datadf, features)

            data = dict()
            data["features"] = featureData
            data["label"] = labelData
            model.train(data)

            return jsonify(result="Success", model=modelId)

        elif action == "predict":
            modelId = request.args['id']
            data = json.loads(request.args['data'])

            model = getModel(modelId)
            return jsonify(result="Success", predict=str(model.predict(data)))

        elif action == "predictViz":
            modelId = request.args['id']
            scale = request.args['scale']

            model = getModel(modelId)
            return jsonify(result="Success",
                           predict=str(model.predictViz(int(scale))))

        else:
            return jsonify(result="Failed",
                           msg="Do not support this action {}".format(action))
    except:
        traceback.print_exc()
        return jsonify(result="Failed", msg="Some Exception")


# TODO : lots of overlap with cls operation
@app.route('/ml/regression/<action>', methods=['GET'])
def mlregressionop(action):
    try:
        if action == "create":
            method = request.args['type']
            model = createModel("Regression", method)
            return jsonify(result="Success", model=model.getId())

        elif action == "train":
            modelId = request.args['id']
            dataName = request.args['data']
            label = request.args['target']
            features = request.args['train'].split(",")

            model = getModel(modelId)

            datadf = datautil.load(dataName)
            labelData = datautil.getColValues(datadf, label)
            featureData = datautil.getColsValues(datadf, features)

            data = dict()
            data["train"] = featureData
            data["target"] = labelData
            model.train(data)
            predit_data = model.predict(data['train'])
            true_data =  data['target']
            rmse = np.sqrt(np.mean((predit_data - true_data)**2))

            return jsonify(result="Success", model=modelId,rmse = rmse)

        elif action == "predict":
            modelId = request.args['id']
            data = json.loads(request.args['data'])

            model = getModel(modelId)
            return jsonify(result="Success", predict=str(model.predict(data)))

        elif action == "predictViz":
            modelId = request.args['id']
            scale = request.args['scale']

            model = getModel(modelId)

            return jsonify(result="Success",
                           predict=str(model.predictViz(int(scale))))
            

        else:
            return jsonify(result="Failed",
                           msg="Do not support this action {}".format(action))
    except:
        traceback.print_exc()
        return jsonify(result="Failed", msg="Some Exception")


@app.route('/ml/aa/<action>', methods=['GET'])
def mlaaop(action):
    try:
        if action == "create":
            method = request.args['type']
            model = createModel("association_analysis", method)
            return jsonify(result="Success", model=model.getId())

        elif action == "train":
            modelId = request.args['id']
            dataName = request.args['data']
            label = request.args['label']
            features = request.args['features'].split(",")
            model = getModel(modelId)

            datadf = datautil.load(dataName)
            labelData = datautil.getColValues(datadf, label)
            featureData = datautil.getColsValues(datadf, features)

            data = dict()
            data["train"] = featureData
            data["target"] = labelData
            model.train(data)

            return jsonify(result="Success", model=modelId)

        elif action == "predict":
            '''
            modelId = request.args['id']
            data = json.loads(request.args['data'])

            model = getModel(modelId)
            return jsonify(result="Success", predict=str(model.predict(data)))
            '''
            print "pass"
            pass

        elif action == "predictViz":
            modelId = request.args['id']
            scale = request.args['scale']
            model = getModel(modelId)

            return jsonify(result="Success",
                           predict=str(model.predictViz(int(scale))))
            

        else:
            return jsonify(result="Failed",
                           msg="Do not support this action {}".format(action))
    except:
        traceback.print_exc()
        return jsonify(result="Failed", msg="Some Exception")


@app.route('/ml/cluster/<action>', methods=['GET'])
def mlclusterop(action):
    try:
        if action == "create":
            method = request.args['type']
            model = createModel("Cluster", method)
            return jsonify(result="Success", model=model.getId())

        elif action == "train":
            modelId = request.args['id']
            dataName = request.args['data']
            features = request.args['train'].split(",")

            model = getModel(modelId)

            datadf = datautil.load(dataName)
            featureData = datautil.getColsValues(datadf, features)

            data = dict()
            data["train"] = featureData
            model.train(data)

            return jsonify(result="Success", model=modelId)

        elif action == "predict":
            modelId = request.args['id']
            data = json.loads(request.args['data'])

            model = getModel(modelId)
            return jsonify(result="Success", predict=str(model.predict(data)))

        elif action == "predictViz":
            modelId = request.args['id']
            scale = request.args['scale']

            model = getModel(modelId)
            return jsonify(result="Success",
                           predict=str(model.predictViz(int(scale))))

        else:
            return jsonify(result="Failed",
                           msg="Do not support this action {}".format(action))
    except:
        traceback.print_exc()
        return jsonify(result="Failed", msg="Some Exception")


@app.route('/mlmodel/list/<type>', methods=['GET'])
def mlmodel(type):
    return json.dumps(getModelType(type))


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

def allowed_temp_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_TEMP_EXTENSIONS

if __name__ == '__main__':
    app.debug = True
    app.run()
