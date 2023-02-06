import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense

# Load the stock price data
data = pd.read_csv('stock_data.csv')

# Plot the stock price
plt.plot(data['Close'])
plt.xlabel('Time')
plt.ylabel('Close Price')
plt.show()

# Preprocess the data
scaler = MinMaxScaler(feature_range=(0, 1))
data_scaled = scaler.fit_transform(np.array(data['Close']).reshape(-1, 1))

# Split the data into training and test sets
training_data = data_scaled[:int(data_scaled.shape[0]*0.8), :]
test_data = data_scaled[int(data_scaled.shape[0]*0.8):, :]

# Create the training and test sets
X_train = []
y_train = []

for i in range(60, training_data.shape[0]):
    X_train.append(training_data[i-60:
