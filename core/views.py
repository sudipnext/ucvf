from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from sklearn.linear_model import LinearRegression
import pandas as pd
import matplotlib.pyplot as plt
import io
import urllib
import base64
from sklearn.model_selection import train_test_split
from django.http import JsonResponse
import numpy as np
from sklearn.metrics import mean_squared_error, r2_score


class LinearRegressionVisualizerViewsets(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def visualize(self, request):
        try:
            # Validate and get X and Y columns from request
            x = request.data.get('x')
            y = request.data.get('y')
            if x is None or y is None:
                raise ValidationError("Both 'x' and 'y' fields are required.")
            x = np.array(x).reshape(-1, 1)
            y = np.array(y)
            # Validate and get test_size and random_state
            test_size = request.data.get('test_size')
            if test_size is None:
                raise ValidationError("'test_size' field is required.")
            test_size = float(test_size)
            random_state = int(request.data.get('random_state', 42))

            # Splitting the data
            X_train, X_test, y_train, y_test = train_test_split(
                x, y, test_size=test_size, random_state=random_state)

            # Creating and Training the model
            model = LinearRegression()
            model.fit(X_train, y_train)

            # Predicting the model
            y_pred = model.predict(X_test)

            # Calculating the metrics
            mse = mean_squared_error(y_test, y_pred)
            r2 = r2_score(y_test, y_pred)


            # Give the regression equation directly to the client requesting this endpoint and it will be displayed on the frontend
            m = model.coef_[0]
            b = model.intercept_
            regression_equation = f'y = {m}x + {b}'
            return JsonResponse({
                'regression_equation': regression_equation,
                'mse': mse,
                'r2': r2,
            })

        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'An unexpected error occurred: ' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
