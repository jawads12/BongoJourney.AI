from flask import Flask, request
from place1 import printy  # Importing the function

app = Flask(__name__)

@app.route('/printty', methods=['POST'])
def printty():
    # Extract parameters from the request
    data = request.json
    param1 = data["param1"]
  

    # Call the function
    result1 = printy(param1)

    # Return the results
    return {'result1': result1}

if __name__ == '__main__':
    app.run(debug=True)
