# -*- coding: utf-8 -*-
"""
Created on Fri May 26 09:14:57 2017

@author: APAC
"""

from sklearn.gaussian_process import GaussianProcessRegressor
from ml.regression.base import Regression

class GPRegression(Regression):
    
    def __init__(self):
        Regression.__init__(self)
        self._name = "GPR"
        self._model = GaussianProcessRegressor()