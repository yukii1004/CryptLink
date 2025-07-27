# app/models/user_status.py

class UserStatusStore:
    def __init__(self):
        # In-memory status store
        self.online_users = {}

    def mark_online(self, user_id: str, usertype: str):
        self.online_users[user_id] = {
            "usertype": usertype,
            "status": "online"
        }

    def mark_offline(self, user_id: str):
        self.online_users.pop(user_id, None)

    def get_online_users_by_type(self, usertype: str):
        return [
            user_id for user_id, details in self.online_users.items()
            if details.get("usertype") == usertype
        ]

    def is_online(self, user_id: str):
        return user_id in self.online_users