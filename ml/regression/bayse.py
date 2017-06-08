# -*- coding: utf-8 -*-
"""
Created on Thu May 25 20:28:44 2017

@author: APAC
"""

from sklearn import linear_model
from ml.regression.base import Regression

class BayseRegress(Regression):
    
    def __init__(self):
        Regression.__init__(self)
        self._name = "Bayse"
        self._model = linear_model.BayesianRidge()
        