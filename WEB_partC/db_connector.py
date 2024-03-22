import os
import pymongo
from flask import session, render_template
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


# def insert_users(users_list):
#     for user in users_list:
#         # Use the phone number as a unique identifier
#         if not registered_users_col.find_one({'email': user['email']}):
#             registered_users_col.insert_one(user)
#             print(f"Inserted users: {user['email']}")
#         else:
#             print(f"user already exists: {user['email']}")


def add_new_user(first_name, last_name, email, phone, city, password, location_access):
    # Create the new user document
    new_user = {
        'firstName': first_name,
        'lastName': last_name,
        'email': email,
        'phone': phone,
        'city': city,
        'password': password,
        'locationAccess': location_access == 'on',  # Convert checkbox value to boolean
    }
    # Check if the user already exists
    if registered_users_col.find_one({'email': email}):
        return False, "User already exists with that email."

    if registered_users_col.find_one({'phone': phone}):
        return False, "User already exists with that phone number."

    # Insert the new user into the database
    registered_users_col.insert_one(new_user)
    return True, "User registered successfully."


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
            'city': 'Beer Sheva',
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
            'city': 'Beer Sheva',
            'address': '2 Yaakov Cohen st.',
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
            'city': 'Hod Hasharon',
            'address': '1 Yanush Korchak st.',
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
            'city': 'Tel Aviv-Yafo',
            'address': '7 Levontin st.',
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
            'city': 'Ramat Hasharon',
            'address': '11 Mordechai Street ',
            'phone': '054-555-5988',
            'location': {
                'type': 'Point',
                'coordinates': [34.840278, 32.137805]  # Note: longitude comes first in GeoJSON
            }
        }
    ]

    # registered_users = [

    #     {
    #         'firstName': 'Johny',
    #         'lastName': 'Boy',
    #         'email': 'jhonyboy@gmail.com',
    #         'phone': '050-666-1234',
    #         'city': 'Tel Aviv-Yafo',
    #         'password': 'PaSsWoRd123',
    #         'location': {
    #             'type': 'Point',
    #             'coordinates': [34.7818, 32.0853]  # Note: longitude comes first in GeoJSON
    #         },
    #         'locationAccess': 'true'
    #
    #     },
    #     # {
    #     #     'firstName': 'Alice',
    #     #     'lastName': 'Smith',
    #     #     'email': 'alice.smith@yahoo.com',
    #     #     'phone': '053-444-1234',
    #     #     'city': 'Jerusalem',
    #     #     'password': 'P@55w0rd',
    #     #     'location': {
    #     #         'type': 'Point',
    #     #         'coordinates': [35.2137, 31.7683]  # Note: longitude comes first in GeoJSON
    #     #     },
    #     #     'locationAccess': 'false'
    #     #
    #     # },
    #     # {
    #     #
    #     #     'firstName': 'Michael',
    #     #     'lastName': 'Johnson',
    #     #     'email': 'michael.johnson@hotmail.com',
    #     #     'phone': '052-345-2222',
    #     #     'city': 'Haifa',
    #     #     'password': 'ComplexPass123',
    #     #     'location': {
    #     #         'type': 'Point',
    #     #         'coordinates': [34.9896, 32.7940]  # Note: longitude comes first in GeoJSON
    #     #     },
    #     #     'locationAccess': 'true'
    #     #
    #     # },
    #     {
    #         'firstName': 'Emily',
    #         'lastName': 'Davis',
    #         'email': 'emily.davis@outlook.com',
    #         'phone': '054-345-1233',
    #         'city': 'Tel Aviv-Yafo',
    #         'password': 'StrongPassword789',
    #         'location': {
    #             'type': 'Point',
    #             'coordinates': [34.77369, 32.06154]  # Note: longitude comes first in GeoJSON
    #         },
    #         'locationAccess': 'false'
    #
    #     },
    #     {
    #         'firstName': 'Emily',
    #         'lastName': 'Brown',
    #         'email': 'david.brown@aol.com',
    #         'phone': '053-443-2343',
    #         'city': 'Beersheba',
    #         'password': 'SecurePass12',
    #         'location': {
    #             'type': 'Point',
    #             'coordinates': [34.7915, 31.2518]  # Note: longitude comes first in GeoJSON
    #         },
    #         'locationAccess': 'true'
    #
    #     }
    # ]

    insert_coaches(coaches)
    # insert_users(registered_users)


# Function to get filtered coaches based on user preferences and location
def get_filtered_coaches(training_type=None, training_time=None, training_level=None):
    query = {}
    if training_type:
        query['classType'] = training_type
    if training_time:
        query['trainingTime'] = training_time
    if training_level:
        query['trainingLevel'] = training_level

    # Add location filters here if needed

    return list(coaches_col.find(query))


def add_to_user_contacted(user_email, coach_phone):
    result = registered_users_col.update_one(
        {"email": user_email},
        {"$addToSet": {"contacted_coaches": coach_phone}}
    )
    return result.modified_count > 0


def add_user_to_coach_interested(coach_phone, user_email):
    result = coaches_col.update_one(
        {"phone": coach_phone},
        {"$addToSet": {"interested_users": user_email}}
    )
    return result.modified_count > 0


def get_user_favorite_coaches(user_email):
    user = registered_users_col.find_one({'email': user_email})
    favorite_coaches_ids = user.get('favorites', [])
    favorite_coaches = coaches_col.find({'phone': {'$in': favorite_coaches_ids}})
    favorite_coaches_list = list(favorite_coaches)  # Convert the cursor to a list
    return favorite_coaches_list


def add_to_user_favorites(user_email, coach_phone):
    result = registered_users_col.update_one(
        {"email": user_email},
        {'$addToSet': {'favorites': coach_phone}}
    )
    return result.modified_count > 0


def remove_from_favorites(user_email, coach_phone):
    result = registered_users_col.update_one(
        {"email": user_email},
        {'$pull': {'favorites': coach_phone}}
    )
    return result.modified_count > 0


def update_coach_rating(coach_phone, user_rating):
    try:
        # Find the coach document by phone number
        coach = coaches_col.find_one({'phone': coach_phone})
        if coach:
            # Calculate the new average rating
            current_rating = coach.get('rating', 0)
            current_rating_count = coach.get('rating_count', 0)
            new_avg_rating = ((current_rating * current_rating_count) + user_rating) / (current_rating_count + 1)

            # Update the coach document with the new average rating and increment the rating count
            update_result = coaches_col.update_one(
                {'phone': coach_phone},
                {
                    '$set': {
                        'rating': new_avg_rating,
                        'rating_count': current_rating_count + 1
                    }
                }
            )

            if update_result.modified_count == 0:
                print("No documents were updated")
                return False, None

            print(f"Updated coach with new rating: {new_avg_rating}")
            return True, new_avg_rating
        else:
            print("Coach not found")
            return False, None
    except Exception as e:
        print(f"An error occurred: {e}")
        return False, None


# Run the initialize_db function if this script is executed directly
if __name__ == '__main__':
    initialize_db()
