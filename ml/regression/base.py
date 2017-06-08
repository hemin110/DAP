from ml.base import BaseModel
import numpy as np


class Regression(BaseModel):

    def __init__(self):
        BaseModel.__init__(self)
        self._features = None
        self._target = None

    # train the model with given data set
    def train(self, data):
        self._features = data["train"]
        self._target = data["target"]
        self._model.fit(self._features, self._target)

    # train the model with given data set
    def getParameterDef(self):
        pass

    def setParameter(self, parameter):
        pass

    # predict the model with given dataset
    def predict(self, data):
        return self._model.predict(data)
    


    def predictViz(self, scale):
         

        result = dict()
        result["predict"] = list()
        result["data"] = list()

        for i in xrange(0, len(self._features)):
            item = dict()
            item["x"] = i
            item["y"] = self._target[i]
            result["data"].append(item)

        range = dict()
        range["xmin"] = self._features[0][0]
        range["xmax"] = self._features[0][0]

        for item in self._features:
            if item[0] > range["xmax"]:
                range["xmax"] = item[0]
            if item[0] < range["xmin"]:
                range["xmin"] = item[0]

        #xstep = (float(range["xmax"]) - float(range["xmin"])) / scale
        pre_data = self.predict(self._features)
        rmse = np.sqrt(np.mean((pre_data-self._target)**2))
        for x in xrange(0, len(self._features)):
            onepredict = self.predict(self._features[x,:])
            record = dict()
            record["x"] = x
            record["y"] = onepredict[0]
            result["predict"].append(record)
        result['rmse'] = rmse
        return result                  


        '''
        # Predict Viz only available for one dimensional dataset
        if len(self._features[0]) != 1:
            return None

        result = dict()
        result["predict"] = list()
        result["data"] = list()

        for i in xrange(0, len(self._features)):
            item = dict()
            item["x"] = self._features[i][0]
            item["y"] = self._target[i]
            result["data"].append(item)

        range = dict()
        range["xmin"] = self._features[0][0]
        range["xmax"] = self._features[0][0]

        for item in self._features:
            if item[0] > range["xmax"]:
                range["xmax"] = item[0]
            if item[0] < range["xmin"]:
                range["xmin"] = item[0]

        xstep = (float(range["xmax"]) - float(range["xmin"])) / scale

        for x in xrange(0, scale):
            dx = range["xmin"] + x * xstep

            onePredict = self.predict([[dx]])
            record = dict()
            record["x"] = dx
            record["y"] = onePredict[0]
            result["predict"].append(record)

        return result
        '''
