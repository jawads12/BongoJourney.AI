import pandas as pd
import numpy as np

df = pd.read_csv('chittagong.csv')
df

df.info

from sklearn.preprocessing import LabelEncoder


# Initializing Label Encoders for each field
le_gender = LabelEncoder()
le_children = LabelEncoder()
le_with = LabelEncoder()
le_season = LabelEncoder()
le_place1 = LabelEncoder()
le_place2 = LabelEncoder()
le_place3 = LabelEncoder()
le_place4 = LabelEncoder()
le_place5 = LabelEncoder()
le_place6 = LabelEncoder()

# Fill None values with a placeholder for encoding
df.fillna('None', inplace=True)

# Applying Label Encoding to the fields
df['Gender'] = le_gender.fit_transform(df['Gender'])
df['Children'] = le_children.fit_transform(df['Children'])
df['with'] = le_with.fit_transform(df['with'])
df['season'] = le_season.fit_transform(df['season'])
df['Place 1'] = le_place1.fit_transform(df['Place 1'])
df['Place 2'] = le_place2.fit_transform(df['Place 2'])
df['Place 3'] = le_place3.fit_transform(df['Place 3'])
df['Place 4'] = le_place4.fit_transform(df['Place 4'])
df['Place 5'] = le_place5.fit_transform(df['Place 5'])
df['Place 6'] = le_place6.fit_transform(df['Place 6'])

# Display the first few rows of the DataFrame after label encoding
print(df.head())


# Dropping all place fields except 'Place 1'
DF1 = df.drop(['Place 2', 'Place 3', 'Place 4', 'Place 5', 'Place 6', 'User-ID'], axis=1)
DF2 = df.drop(['Place 1', 'Place 3', 'Place 4', 'Place 5', 'Place 6','User-ID'], axis=1)
DF3 = df.drop(['Place 2', 'Place 1', 'Place 4', 'Place 5', 'Place 6','User-ID'], axis=1)
DF4 = df.drop(['Place 2', 'Place 3', 'Place 1', 'Place 5', 'Place 6','User-ID'], axis=1)
DF5 = df.drop(['Place 2', 'Place 3', 'Place 4', 'Place 1', 'Place 6','User-ID'], axis=1)
DF6 = df.drop(['Place 2', 'Place 3', 'Place 4', 'Place 5', 'Place 1','User-ID'], axis=1)


# Now df_reduced will have all columns except the ones dropped
DF1

male_encoded = dict(zip(le_place1.classes_, le_place1.transform(le_place1.classes_)))["Chittagong University"]

print(f"The number assigned to 'Male' is: {male_encoded}")
 
original_value = le_place1.inverse_transform([2])[0]

print(f"The original value for the encoded number  is: {original_value}")



"""Test data and Train Data Separation"""

df

DF1

from sklearn.model_selection import train_test_split


# Preparing the features (X) and target (y)
X1 = DF1.drop('Place 1', axis=1)  # All columns except 'Place 1'
y1 = DF1['Place 1']  # 'Place 1' column as the target

# Splitting the dataset into training and test sets
# Setting test_size=0.2 means 20% of the data will be used for testing, and 80% for training
X1_train, X1_test, y1_train, y1_test = train_test_split(X1, y1, test_size=0.2, random_state=42)

# X_train, y_train are the training features and target
# X_test, y_test are the testing features and target

# Drop rows with missing values in the training data
X1_train.dropna(inplace=True)
y1_train = y1_train.loc[X1_train.index]  # Update y_train to align with the dropped rows in X_train

# Drop rows with missing values in the test data
X1_test.dropna(inplace=True)
y1_test = y1_test.loc[X1_test.index]  # Update y_test to align with the dropped rows in X_test

"""Place 2"""

from sklearn.model_selection import train_test_split


# Preparing the features (X) and target (y)
X2 = DF2.drop('Place 2', axis=1)  # All columns except 'Place 1'
y2 = DF2['Place 2']  # 'Place 1' column as the target

# Splitting the dataset into training and test sets
# Setting test_size=0.2 means 20% of the data will be used for testing, and 80% for training
X2_train, X2_test, y2_train, y2_test = train_test_split(X2, y2, test_size=0.2, random_state=42)

# X_train, y_train are the training features and target
# X_test, y_test are the testing features and target

# Drop rows with missing values in the training data
X2_train.dropna(inplace=True)
y2_train = y2_train.loc[X2_train.index]  # Update y_train to align with the dropped rows in X_train

# Drop rows with missing values in the test data
X2_test.dropna(inplace=True)
y2_test = y2_test.loc[X2_test.index]  # Update y_test to align with the dropped rows in X_test

"""Random Forest Classifier

"""

from sklearn.ensemble import RandomForestClassifier

# Create a Random Forest Classifier instance
rf_classifier = RandomForestClassifier(random_state=42)

# Train the classifier with the training data
rf_classifier.fit(X1_train, y1_train)

from sklearn.ensemble import RandomForestClassifier

# Create a Random Forest Classifier instance for Place 2
rf_classifier2 = RandomForestClassifier(random_state=42)

# Train the classifier with the training data for Place 2
rf_classifier2.fit(X2_train, y2_train)
# Making predictions on the test data
y1_pred = rf_classifier.predict(X1_test)

from sklearn.ensemble import RandomForestClassifier

# Assuming X2_train and y2_train are your features and target for Place 2
rf_classifier2 = RandomForestClassifier(random_state=42)
rf_classifier2.fit(X2_train, y2_train)

"""accuracy"""

from sklearn.metrics import accuracy_score

# Calculating the accuracy
accuracy = accuracy_score(y1_test, y1_pred)
print(f"Accuracy of the model: {accuracy}")

y1_pred

DF1

import pandas as pd

def predict_place1(budget, day, gender, children, with_person, season):
    # Encode the input features
    encoded_features = {
        'Budget': budget,  # Assuming Budget is numeric and doesn't need encoding
        'Day': day,        # Assuming Day is numeric and doesn't need encoding
        'Gender': le_gender.transform([gender])[0],
        'Children': le_children.transform([children])[0],
        'with': le_with.transform([with_person])[0],
        'season': le_season.transform([season])[0]
    }

    # Convert encoded features to a DataFrame with the correct column names
    feature_df = pd.DataFrame([encoded_features], columns=encoded_features.keys())

    # Predict using the Random Forest model
    predicted_place_num = rf_classifier.predict(feature_df)[0]

    # Decode the predicted 'Place 1' value
    predicted_place_name = le_place1.inverse_transform([predicted_place_num])[0]

    return predicted_place_name

# Example usage of the function
predicted_place = predict_place1(10000, 3, 'Male', 'Yes', 'Friends', 'Winter')
print(f"Predicted 'Place 1': {predicted_place}")

def predict_place2(budget, day, gender, children, with_person, season, place1_prediction):
    # Encode the input features
    encoded_features = {
        'Budget': budget,  # Assuming Budget is numeric and doesn't need encoding
        'Day': day,        # Assuming Day is numeric and doesn't need encoding
        'Gender': le_gender.transform([gender])[0],
        'Children': le_children.transform([children])[0],
        'with': le_with.transform([with_person])[0],
        'season': le_season.transform([season])[0]
    }

    # Convert encoded features to a DataFrame with the correct column names
    feature_df = pd.DataFrame([encoded_features], columns=encoded_features.keys())

    # Predict using the Random Forest model for Place 2
    # Get probability estimates for each class
    class_probabilities = rf_classifier2.predict_proba(feature_df)[0]

    # Get the class with the highest probability
    predicted_place_num = np.argmax(class_probabilities)

    # Check if the top prediction for Place 2 is the same as Place 1
    if le_place2.inverse_transform([predicted_place_num])[0] == place1_prediction:
        # If so, choose the next best class
        sorted_indices = np.argsort(class_probabilities)[::-1]  # Sort probabilities in descending order
        for idx in sorted_indices:
            if le_place2.inverse_transform([idx])[0] != place1_prediction:
                predicted_place_num = idx
                break

    # Decode the final predicted 'Place 2' value
    predicted_place_name = le_place2.inverse_transform([predicted_place_num])[0]

    return predicted_place_name


# Example usage of the function
predicted_place = predict_place2(15000, 3, 'Male', 'No', 'Friends', 'Summer',predicted_place)
print(f"Predicted 'Place 2': {predicted_place}")




#predict(10000,5,"Male","Yes", "Friends", "Winter")




def predict_place(budget, days, gender, child, withs, season, num_places=1):
    """
    Predict the top N places based on the given parameters, excluding 'None'.

    :param budget: Budget for the trip.
    :param days: Number of days of the trip.
    :param gender: Gender of the visitor.
    :param child: Whether children are accompanying.
    :param withs: Type of companion for the trip.
    :param season: Season of the visit.
    :param num_places: Number of top places to predict.
    :return: A list of the top N predicted place names, excluding 'None'.
    """
    # Encode the input features
    encoded_features = {
        'Budget': budget,  # Assuming Budget is numeric and doesn't need encoding
        'Day': days,        # Assuming Day is numeric and doesn't need encoding
        'Gender': le_gender.transform([gender])[0],
        'Children': le_children.transform([child])[0],
        'with': le_with.transform([withs])[0],
        'season': le_season.transform([season])[0]
    }

    # Convert encoded features to a DataFrame
    feature_df = pd.DataFrame([encoded_features], columns=encoded_features.keys())

    # Predict the probabilities for all places
    probabilities = rf_classifier.predict_proba(feature_df)[0]

    # Sort indices by probability, highest first
    sorted_indices = np.argsort(probabilities)[::-1]

    # Decode each index and check if it's 'None', exclude 'None' from top predictions
    top_places = []
    for index in sorted_indices:
        place_name = le_place1.inverse_transform([index])[0]
        if place_name != 'None' and len(top_places) < num_places:
            top_places.append(place_name)

    return top_places

# Example usage of the function
top_predicted_places = predict_place(10000, 5, "Male", "Yes", "Friends", "Winter", 3)
print(f"Top Predicted Places: {top_predicted_places}")


# Example usage of the function
top_predicted_places = predict_place(10000, 5, "Male", "Yes", "Friends", "Winter", 6)
print(f"Top Predicted Places: {top_predicted_places}")


