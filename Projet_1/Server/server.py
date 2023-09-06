from flask import Flask, request, jsonify
import util

#Creéation de l'application
app = Flask(__name__)

# Récupération des zones dans notre modèle de prédiction
@app.route('/get_area_names')
def get_area_names():
    response = jsonify({
        'Area': util.get_area_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

#Application pour la prédiction des prix des propriétés dans Londres
@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    area = request.form['Area']
    housetype = request.form['House Type']
    sqft = float(request.form['square ft'])
    bed = int(request.form['No. of bedrooms'])
    bath = int(request.form['No. of bathrooms'])
    recpt = int(request.form['No. of receptions'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(Area,housetype,sqft,bed,bath,recpt)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

# Exécution de l'application
if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction")
    util.load_saved_artifacts()
    app.run()