# -*- coding: utf-8 -*-
"""
Created on Thu May 25 15:14:31 2017

@author: APAC
"""
from sklearn import svm
from ml.regression.base import Regression


class SVRrgression(Regression):

    def __init__(self):
        Regression.__init__(self)
        self._name = "SVR"
        self._model = svm.SVR()
