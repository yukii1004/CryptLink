from flask import Blueprint, request, jsonify
from app.models.user_status import UserStatusStore

presence_bp = Blueprint('presence', __name__)
user_store = UserStatusStore()

@presence_bp.route('/presence/online', methods=['POST'])
def mark_online():
    data = request.json
    user_id = data.get('user_id')
    usertype = data.get('usertype')
    if not user_id or not usertype:
        return jsonify({"error": "Missing user_id or usertype"}), 400

    user_store.mark_online(user_id, usertype)
    return jsonify({"message": f"{user_id} marked online."}), 200

@presence_bp.route('/presence/offline', methods=['POST'])
def mark_offline():
    data = request.json
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    user_store.mark_offline(user_id)
    return jsonify({"message": f"{user_id} marked offline."}), 200

@presence_bp.route('/presence/<usertype>', methods=['GET'])
def get_online_users(usertype):
    return jsonify({"online": user_store.get_online_users_by_type(usertype)})