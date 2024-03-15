import os
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
# get your uri from .env file
uri = os.environ.get('DB_URI')

cluster = MongoClient(uri, server_api=ServerApi('1'))

# Connect to your database
mydatabase = cluster['mydatabase']

# Define your project-specific collections
coaches_col = mydatabase['coaches']
registered_users_col = mydatabase['registered_users']


# Define a function to insert coaches
def insert_coaches(coaches_list):
    for coach in coaches_list:
        # Use the phone number as a unique identifier
        if not coaches_col.find_one({'phone': coach['phone']}):
            coaches_col.insert_one(coach)
            print(f"Inserted coach: {coach['name']}")
        else:
            print(f"Coach already exists: {coach['name']}")


def insert_users(users_list):
    for user in users_list:
        # Use the phone number as a unique identifier
        if not registered_users_col.find_one({'email': user['email']}):
            registered_users_col.insert_one(user)
            print(f"Inserted users: {user['email']}")
        else:
            print(f"user already exists: {user['email']}")


# Define a function to initialize the database
def initialize_db():
    coaches = [
        {
            'name': 'John Doe',
            'rating': 4,
            'classType': 'Cardio',
            'trainingTime': 'Afternoon / Evening',
            'trainingLevel': 'Beginner',
            'experience': '5 years',
            'certification': 'ACE Certified',
            'address': 'Ben-Gurion University Sports Center',
            'phone': '054-444-5555',
            'location': {
                'type': 'Point',
                'coordinates': [34.8119998, 31.2618491]  # Note: longitude comes first in GeoJSON
            }
        },
        {
            'name': 'Jane Smith',
            'rating': 5,
            'classType': 'Cardio',
            'trainingTime': 'Afternoon / Evening',
            'trainingLevel': 'Advanced',
            'experience': '8 years',
            'certification': 'NASM Certified',
            'address': '2 Yaakov Cohen st. Beer Sheva',
            'phone': '054-555-5555',
            'location': {
                'type': 'Point',
                'coordinates': [34.800516, 31.2527846]
            }
        },
        {
            'name': 'Inbal Epshtein',
            'rating': 2,
            'classType': 'Pilates',
            'trainingTime': 'Morning',
            'trainingLevel': 'Beginner',
            'experience': '10 years',
            'certification': 'Wingate Certified',
            'address': '1 Yanush Korchak st. Hod Hasharon',
            'phone': '052-555-5455',
            'location': {
                'type': 'Point',
                'coordinates': [34.9098584, 32.1622844]  # Note: longitude comes first in GeoJSON
            }
        },
        {
            'name': 'Yuval Amit',
            'rating': 5,
            'classType': 'Tennis',
            'trainingTime': 'Afternoon / Evening',
            'trainingLevel': 'Advanced',
            'experience': '18 years',
            'certification': 'Ramat Hasharon Tennis Center Certified',
            'address': '7 Levontin st. Tel Aviv-Yafo',
            'phone': '054-555-5905',
            'location': {
                'type': 'Point',
                'coordinates': [34.779576, 32.0617781]  # Note: longitude comes first in GeoJSON
            }
        },
        {
            'name': 'Dana Cohen',
            'rating': 4,
            'classType': 'Yoga',
            'trainingTime': 'Afternoon / Evening',
            'trainingLevel': 'Advanced',
            'experience': '18 years',
            'certification': 'Ramat Hasharon Tennis Center Certified',
            'address': '11 Mordechai Street Ramat Hasharon',
            'phone': '054-555-5988',
            'location': {
                'type': 'Point',
                'coordinates': [34.840278, 32.137805]  # Note: longitude comes first in GeoJSON
            }
        }
    ]

    registered_users = [

        {
            'name': 'Johny Boy',
            'email': 'jhonyboy@gmail.com',
            'phone': '050-666-1234',
            'city': 'Tel Aviv-Yafo',
            'password': 'PaSsWoRd123',
            'location': {
                'type': 'Point',
                'coordinates': [34.7818, 32.0853]  # Note: longitude comes first in GeoJSON
            },
            'locationAccess': 'true'
        },
        # {
        #     'name': 'Alice Smith',
        #     'email': 'alice.smith@yahoo.com',
        #     'phone': '053-444-1234',
        #     'city': 'Jerusalem',
        #     'password': 'P@55w0rd',
        #     'location': {
        #         'type': 'Point',
        #         'coordinates': [35.2137, 31.7683]  # Note: longitude comes first in GeoJSON
        #     },
        #     'locationAccess': 'false'
        # },
        # {
        #     'name': 'Michael Johnson',
        #     'email': 'michael.johnson@hotmail.com',
        #     'phone': '052-345-2222',
        #     'city': 'Haifa',
        #     'password': 'ComplexPass123',
        #     'location': {
        #         'type': 'Point',
        #         'coordinates': [34.9896, 32.7940]  # Note: longitude comes first in GeoJSON
        #     },
        #     'locationAccess': 'true'
        # },
        {
            'name': 'Emily Davis',
            'email': 'emily.davis@outlook.com',
            'phone': '054-345-1233',
            'city': 'Tel Aviv-Yafo',
            'password': 'StrongPassword789',
            'location': {
                'type': 'Point',
                'coordinates': [34.77369, 32.06154]  # Note: longitude comes first in GeoJSON
            },
            'locationAccess': 'false'
        },
        {
            'name': 'David Brown',
            'email': 'david.brown@aol.com',
            'phone': '053-443-2343',
            'city': 'Beersheba',
            'password': 'SecurePass12',
            'location': {
                'type': 'Point',
                'coordinates': [34.7915, 31.2518]  # Note: longitude comes first in GeoJSON
            },
            'locationAccess': 'true'
        }
    ]

    insert_coaches(coaches)
    insert_users(registered_users)
    # coaches_col.create_index([("location", pymongo.GEOSPHERE)])
    # registered_users_col.create_index([("location", pymongo.GEOSPHERE)])


def get_filtered_coaches(training_type=None, training_time=None, training_level=None, location=None):
    # Construct query based on provided parameters
    query = {}
    if training_type:
        query['classType'] = training_type
    if training_time:
        query['trainingTime'] = training_time
    if training_level:
        query['trainingLevel'] = training_level
    if location:
        query['Location'] = location
    # Include other conditions based on location_preference if necessary

    # Execute the query on the MongoDB collection
    return list(coaches_col.find(query))


def get_coaches_near_location(lat, lng):
    # Convert lat and lng to float if they are not already
    lat = float(lat)
    lng = float(lng)

    # Use the correct MongoDB query with the 'location' field
    coaches = coaches_col.find({
        'location': {
            '$nearSphere': {
                '$geometry': {
                    'type': 'Point',
                    'coordinates': [lng, lat]  # Again, longitude comes first in GeoJSON
                },
                '$maxDistance': 15000  # within 15 km
            }
        }
    })
    return list(coaches)


def get_all_users():
    return list(registered_users_col.find({}))


# Run the initialize_db function if this script is executed directly
if __name__ == '__main__':
    initialize_db()
