# -*- coding: utf-8 -*-
"""
Created on Thu May 25 20:58:34 2017

@author: APAC
"""

from sklearn.linear_model import SGDRegressor
from ml.regression.base import Regression

class SGDRegression(Regression):
    
    def __init__(self):
        Regression.__init__(self)
        self._name = "SGDRegression"
        self._model = SGDRegressor()
        