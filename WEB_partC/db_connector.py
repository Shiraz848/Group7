import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from math import radians, cos, sin, asin, sqrt

# Load environment variables from .env file
load_dotenv()
# uri from .env file
uri = os.environ.get('DB_URI')

cluster = MongoClient(uri, server_api=ServerApi('1'))

# Connection to database
mydatabase = cluster['mydatabase']

# project collections
coaches_col = mydatabase['coaches']
registered_users_col = mydatabase['registered_users']


# function to insert coaches
def insert_coaches(coaches_list):
    for coach in coaches_list:
        # Use the phone number as a unique identifier
        if not coaches_col.find_one({'phone': coach['phone']}):
            coaches_col.insert_one(coach)
            print(f"Inserted coach: {coach['name']}")
        else:
            print(f"Coach already exists: {coach['name']}")


def add_new_user(first_name, last_name, email, phone, city, password, location_access):
    location_access_bool = location_access == 'true'
    # Create the new user document
    new_user = {
        'firstName': first_name,
        'lastName': last_name,
        'email': email,
        'phone': phone,
        'city': city,
        'password': password,
        'locationAccess': location_access_bool  # Convert checkbox value to boolean
    }
    # Check if the user already exists
    if registered_users_col.find_one({'email': email}):
        return False, "User already exists with that email."

    if registered_users_col.find_one({'phone': phone}):
        return False, "User already exists with that phone number."

    # Insert the new user into the database
    registered_users_col.insert_one(new_user)
    return True, "User registered successfully."


# function to initialize the database
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

    insert_coaches(coaches)


# a list of Israeli cities
ISRAELI_CITIES = [
    'Jerusalem', 'Tel Aviv-Yafo', 'Haifa', 'Rishon LeZion',
    'Petah Tikva', 'Ashdod', 'Netanya', 'Beer Sheva', 'Holon',
    'Bnei Brak', 'Ramat Gan', 'Ashkelon', 'Bat Yam', 'Herzliya',
    'Kfar Saba', 'Modiin', 'Nahariya', 'Hadera', 'Raanana', 'Lod',
    'Ramla', 'Hod Hasharon', 'Ramat Hasharon'
]


def find_one_user(user_email):
    user = registered_users_col.find_one({'email': user_email})
    return user


def get_user_city(user_email):
    user = registered_users_col.find_one({'email': user_email})
    return user['city']


def update_one_user(user_email, user):
    # Perform the update operation
    result = registered_users_col.update_one({"email": user_email}, {"$set": user})

    if result.modified_count == 0:
        # no information was modified
        return False, "No changes were made to the user."

    # Successful update
    return True, "User updated successfully."


# Calculate the great circle distance between two points on the earth (specified in decimal degrees)
def haversine(lon1, lat1, lon2, lat2):
    # convert decimal degrees to radians
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a))
    r = 6371  # Radius of earth in kilometers. Use 3956 for miles
    return c * r


def get_filtered_coaches(training_type=None, training_time=None, training_level=None, user_city=None,
                         user_latitude=None, user_longitude=None, use_current_location=False):

    coaches = []

    # the base query with provided filters
    query = {}
    if training_type:
        query['classType'] = training_type
    if training_time:
        query['trainingTime'] = training_time
    if training_level:
        query['trainingLevel'] = training_level
    if user_city and not use_current_location:
        query['city'] = user_city

    # If location filtering is not used, we add all coaches matching other filters
    if not use_current_location:
        coaches = list(coaches_col.find(query))
    else:
        # use_current_location is True
        if user_latitude and user_longitude:
            # Convert latitude and longitude to float
            user_latitude = float(user_latitude)
            user_longitude = float(user_longitude)

            # Retrieve all coaches first
            all_coaches = list(coaches_col.find(query))

            # Filter coaches based on location proximity
            coaches = [
                coach for coach in all_coaches
                if haversine(
                    user_longitude, user_latitude,
                    coach['location']['coordinates'][0], coach['location']['coordinates'][1]
                ) <= 50  # Distance in kilometers
            ]

    return coaches


def get_all_coaches():
    all_coaches = list(coaches_col.find({}))
    return all_coaches


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
    favorite_coaches_list = list(favorite_coaches)
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
