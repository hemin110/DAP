# -*- coding: utf-8 -*-
"""
Created on Fri May 26 10:08:12 2017

@author: APAC
"""

from sklearn.ensemble import BaggingRegressor
from ml.regression.base import Regression

class BgRegression(Regression):
    
    def __init__(self):
        Regression.__init__(self)
        self._name = "Bagging"
        self._model = BaggingRegressor()