# -*- coding: utf-8 -*-
"""
Created on Fri May 26 11:54:28 2017

@author: APAC
"""

from sklearn.neural_network import MLPRegressor
from ml.regression.base import Regression

class MlpRegression(Regression):
    
    def __init__(self):
        Regression.__init__(self)
        self._name = "MLPRegressor"
        self._model = MLPRegressor()
