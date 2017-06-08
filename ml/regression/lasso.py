# -*- coding: utf-8 -*-
"""
Created on Thu May 25 20:10:55 2017

@author: APAC
"""

from  sklearn import linear_model
from ml.regression.base import Regression

class LassoRegression(Regression):
    
    def __init__(self):
        Regression.__init__(self)
        self._name = "Lasso"
        self._model = linear_model.Lasso(alpha = 0.1)