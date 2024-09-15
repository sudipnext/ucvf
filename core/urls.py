from django.urls import path
from .views import LinearRegressionVisualizerViewsets

urlpatterns = [
    path('linear-regression-visualizer/', LinearRegressionVisualizerViewsets.as_view({'post': 'visualize'}), name='linear-regression-visualizer'),
]