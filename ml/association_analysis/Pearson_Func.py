# -*- coding: utf-8 -*-
"""
Created on Wed May 31 21:34:05 2017

@author: APAC
"""

import numpy as np

class Pearson():
    def __init__(self , mathod = "pierxun"):
        self.mathod = "pierxun"
    
    @staticmethod
    def fit(self , x , y):
        
        yn = y.shape
        y = y.reshape((yn[0] , 1))
        all_data = np.hstack((y,x))
        cof = np.corrcoef(all_data.T)
        
        return cof