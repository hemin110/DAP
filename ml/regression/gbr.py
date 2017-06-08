# -*- coding: utf-8 -*-
"""
Created on Fri May 26 10:16:33 2017

@author: APAC
"""

from sklearn.ensemble import BaggingRegressor , GradientBoostingRegressor
from ml.regression.base import Regression

class GbRegression(Regression):
    
    def __init__(self):
        Regression.__init__(self)
        self._name = "GradientBoostingRegressor"
        self._model = GradientBoostingRegressor()