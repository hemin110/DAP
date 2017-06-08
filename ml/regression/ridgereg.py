# -*- coding: utf-8 -*-
"""
Created on Thu May 25 19:59:10 2017

@author: APAC
"""

from sklearn import linear_model
from ml.regression.base import Regression


class RidgeRgression(Regression):

    def __init__(self):
        Regression.__init__(self)
        self._name = "SVR"
        self._model = linear_model.Ridge(alpha = 0.5)