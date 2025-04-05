import numpy as np
import random
import base64
import string
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from scipy.stats import entropy

# Function to calculate entropy of a string
def calculate_entropy(text):
    prob = [float(text.count(c)) / len(text) for c in set(text)]
    return entropy(prob, base=2)

# Function to generate simulated encrypted text for different algorithms
def generate_encrypted_text(algorithm):
    if algorithm == "AES":
        return base64.b64encode(bytes(random.getrandbits(8) for _ in range(16))).decode()
    elif algorithm == "DES":
        return base64.b64encode(bytes(random.getrandbits(8) for _ in range(8))).decode()
    elif algorithm == "RSA":
        return base64.b64encode(bytes(random.getrandbits(8) for _ in range(128))).decode()
    elif algorithm == "ECC":
        return base64.b64encode(bytes(random.getrandbits(8) for _ in range(64))).decode()
    else:
        return ''.join(random.choices(string.ascii_letters + string.digits, k=random.randint(10, 100)))

# Function to extract features from a ciphertext
def extract_features(ciphertext):
    return [
        len(ciphertext),                 # Length of ciphertext
        calculate_entropy(ciphertext),   # Entropy
        sum(c.isdigit() for c in ciphertext),   # Number of digits
        sum(c.isalpha() for c in ciphertext),   # Number of letters
        sum(c in string.punctuation for c in ciphertext)  # Number of special characters
    ]

# Generate dataset
algorithms = ["AES", "DES", "RSA", "ECC"]
X = []
y = []

for _ in range(1000):  # Generating 1000 samples
    algo = random.choice(algorithms)
    ciphertext = generate_encrypted_text(algo)
    X.append(extract_features(ciphertext))
    y.append(algo)

# Convert to NumPy arrays
X = np.array(X)
y = np.array(y)

# Split dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate model accuracy
y_pred = model.predict(X_test)
print(f"Model Accuracy: {accuracy_score(y_test, y_pred) * 100:.2f}%")

# Function to predict the cryptographic algorithm from a new ciphertext
def identify_algorithm(ciphertext):
    features = np.array(extract_features(ciphertext)).reshape(1, -1)
    prediction = model.predict(features)[0]
    return prediction

# Example: Predicting for a new ciphertext
new_cipher = generate_encrypted_text("AES")
predicted_algo = identify_algorithm(new_cipher)
print(f"Predicted Algorithm for '{new_cipher}': {predicted_algo}")
