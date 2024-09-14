from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

items = []

@app.route('/items', methods=['GET'])
def get_items():
    return jsonify(items)

@app.route('/items', methods=['POST'])
def add_item():
    new_item = request.json.get('item')
    items.append(new_item)
    return jsonify({'message': 'Item added successfully'}), 201

@app.route('/items/<int:index>', methods=['DELETE'])
def delete_item(index):
    if 0 <= index < len(items):
        deleted_item = items.pop(index)
        return jsonify({'message': f'{deleted_item} deleted successfully'}), 200
    return jsonify({'error': 'Item not found'}), 404

@app.route('/items/<int:index>', methods=['PUT'])
def update_item(index):
    if 0 <= index < len(items):
        updated_item = request.json.get('item')
        items[index] = updated_item
        return jsonify({'message': 'Item updated successfully'}), 200
    return jsonify({'error': 'Item not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)