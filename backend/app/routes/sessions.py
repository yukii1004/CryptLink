from flask import Blueprint, request, jsonify

session_bp = Blueprint('sessions', __name__)

# Map from user_id to connected bank_id (session partner)
active_sessions = {}

@session_bp.route('/session/create', methods=['POST'])
def create_session():
    data = request.json
    user_id = data.get('user_id')
    bank_id = data.get('bank_id')

    if not user_id or not bank_id:
        return jsonify({"error": "Missing user_id or bank_id"}), 400

    active_sessions[user_id] = bank_id
    active_sessions[bank_id] = user_id
    return jsonify({"message": f"Session established between {user_id} and {bank_id}."})

@session_bp.route('/session/<user_id>', methods=['GET'])
def get_session_partner(user_id):
    partner = active_sessions.get(user_id)
    if partner:
        return jsonify({"connected_to": partner})
    else:
        return jsonify({"connected_to": None})
