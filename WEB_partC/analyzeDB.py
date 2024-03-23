from WEB_partC.db_connector import coaches_col, registered_users_col


def print_all_coaches():
    coaches = coaches_col.find()
    for coach in coaches:
        print(coach)


def print_all_registered_users():
    users = registered_users_col.find()
    for user in users:
        print(user)


def analyze_db():
    print("Coaches Collection:")
    print_all_coaches()

    print("\nRegistered Users Collection:")
    print_all_registered_users()


# execute analyze_db() when run
if __name__ == '__main__':
    analyze_db()
