# -*- coding: utf-8 -*-
"""
Created on Fri May 26 09:29:23 2017

@author: APAC
"""

from sklearn import tree
from ml.regression.base import Regression

class DtRegression(Regression):
    
    def __init__(self):
        Regression.__init__(self)
        self._name = "Decision Trees"
        self._model = tree.DecisionTreeRegressor()
