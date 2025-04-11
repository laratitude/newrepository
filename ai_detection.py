import pymongo
import pandas as pd
from sklearn.ensemble import IsolationForest

# MongoDB connection
client = pymongo.MongoClient("mongodb://localhost:27017")
db = client["login-tracker"]
collection = db["activitylogs"]

# Fetch activity logs from MongoDB
logs = collection.find({})
df = pd.DataFrame(list(logs))

# Feature engineering
df['hour_of_day'] = pd.to_datetime(df['timestamp']).dt.hour
df['failed_attempts'] = df['status'].apply(lambda x: 1 if x == 'failed' else 0)

# Train AI model
features = df[['failed_attempts', 'hour_of_day']].fillna(0)
model = IsolationForest(contamination=0.05)
model.fit(features)

# Predict anomalies
df['anomaly'] = model.predict(features)
anomalies = df[df['anomaly'] == 1]  # 1 = Anomaly

# Return anomalies
return anomalies[['username', 'timestamp', 'status', 'anomaly']].to_dict(orient='records')

# Example usage
if __name__ == "__main__":
    print(run_detection())
