# -*- coding: utf-8 -*-
"""
Created on Thu May 25 19:44:51 2017

@author: APAC
"""

from sklearn.ensemble import RandomForestRegressor
from ml.regression.base import Regression

class RandomForestRegression(Regression):
    def __init__(self ):
        Regression.__init__(self)
        self._name = "RandomForestRegression"
        self._model = RandomForestRegressor()