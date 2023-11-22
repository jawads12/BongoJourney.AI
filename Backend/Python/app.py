from flask import Flask, request
from flask_cors import CORS  # Import CORS

from place1 import predict_place  # Importing the function

app = Flask(__name__)
CORS(app)  # Enable CORS globally

@app.route('/predict', methods=['POST'])
def predict():
    # Extract parameters from the request
    data = request.json
    param1 = data["budget"]
    param2 = data["days"]
    param3 = data["gender"]
    param4 = data["child"]
    param5 = data["withs"]
    param6 = data["season"]
    param7 = data["num_places"]
  

    # Call the function
    top_places = predict_place(param1, param2,param3,param4,param5,param6, param7)

    # Return the results
    return {'top_predicted_places': top_places}




if __name__ == '__main__':
    app.run(debug=True)
