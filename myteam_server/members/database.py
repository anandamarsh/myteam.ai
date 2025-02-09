class InMemoryDB:
    def __init__(self):
        self._data = {}
        self._counter = 1

    def list_all(self):
        return list(self._data.values())

    def get(self, id):
        return self._data.get(id)

    def create(self, member_data):
        id = self._counter
        self._counter += 1
        member_data['id'] = id
        self._data[id] = member_data
        return member_data

    def update(self, id, member_data):
        if id in self._data:
            member_data['id'] = id
            self._data[id] = member_data
            return member_data
        return None

    def delete(self, id):
        return self._data.pop(id, None)

# Create a singleton instance
db = InMemoryDB()
