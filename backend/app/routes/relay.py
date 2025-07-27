from flask import Blueprint, request, jsonify
from app.utils.queue_manager import message_queues

relay_bp = Blueprint('relay', __name__)

@relay_bp.route('/relay/send', methods=['POST'])
def send_message():
    data = request.json
    to = data.get('to')
    from_ = data.get('from')
    payload = data.get('data')  # This should be encrypted from frontend

    if not to or not from_ or not payload:
        return jsonify({"error": "Missing to/from/data"}), 400

    if to not in message_queues:
        message_queues[to] = []

    message_queues[to].append({
        "from": from_,
        "data": payload
    })

    return jsonify({"message": "Message queued."}), 200

@relay_bp.route('/relay/fetch', methods=['POST'])
def fetch_messages():
    data = request.json
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    messages = message_queues.get(user_id, [])
    message_queues[user_id] = []  # Clear after fetching
    return jsonify({"messages": messages})