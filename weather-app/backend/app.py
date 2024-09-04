from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import requests

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)

@app.route('/')
def home():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/get_weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({'error': 'City is required'}), 400
    
    api_key = '30528d9d4f60434ab03175129240105'
    url = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={city}"
    
    response = requests.get(url)
    weather_data = response.json()

    if 'error' in weather_data:
        return jsonify({'error': 'City not found'}), 404
    
    return jsonify({
        'city': weather_data['location']['name'],
        'temperature': weather_data['current']['temp_c'],
        'description': weather_data['current']['condition']['text'],
    })

if __name__ == '__main__':
    app.run(debug=True)
