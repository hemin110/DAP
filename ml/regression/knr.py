# -*- coding: utf-8 -*-
"""
Created on Fri May 26 09:01:03 2017

@author: APAC
"""

from sklearn.neighbors import KNeighborsRegressor
from ml.regression.base import Regression

class KnnRegression(Regression):
    
    def __init__(self):
        Regression.__init__(self)
        self._name = "KNR"
        self._model = KNeighborsRegressor(n_neighbors=2)
