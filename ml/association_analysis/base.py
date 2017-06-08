from ml.base import BaseModel


class Aso_ana(BaseModel):

    def __init__(self):
        BaseModel.__init__(self)
        self._label = None
        self._features = None

    # train the model with given data set
    def train(self, data):
        self._features = data["train"]
        self._label = data["target"]
        self._model.fit("asd",self._features, self._label)

        
    def predict(self , data):
        pass

    def predictViz(self, scale):
        # Predict Viz only available for two dimensional dataset
        #only reaturn a mitrx
        mitrx = self._model.fit("asd",self._features, self._label)
        [m,n] = mitrx.shape
        pre = ""
        for i in range(m):
            pre = pre+""#[
            for j in range(n):
                a=mitrx[i][j]
                if a<0:
                    a = 0-a
                if j == n-1 and i == n-1:
                    pre = pre+str(int(a*100))
                elif j == n-1 and i != n-1:
                    pre = pre+str(int(a*100))+"#"
                else:
                    pre = pre+str(int(a*100))+","
            '''
            if i == m-1:
                pre = pre+"]"
            else:
                pre = pre+"],"
            '''
        result = dict()
        result["predict"] = pre
        result["data"] = list()
        '''
        # TODO leverage pandas to do this?
        range = dict()
        range["xmin"] = self._features[0][0]
        range["xmax"] = self._features[0][0]

        range["ymin"] = self._features[0][1]
        range["ymax"] = self._features[0][1]

        for item in self._features:
            if item[0] > range["xmax"]:
                range["xmax"] = item[0]
            if item[0] < range["xmin"]:
                range["xmin"] = item[0]
            if item[1] > range["ymax"]:
                range["ymax"] = item[1]
            if item[1] < range["ymin"]:
                range["ymin"] = item[1]

        xstep = (float(range["xmax"]) - float(range["xmin"])) / scale
        ystep = (float(range["ymax"]) - float(range["ymin"])) / scale

        for x in xrange(0, scale):
            dx = range["xmin"] + x * xstep
            dy = range["ymin"]
            for y in xrange(0, scale):
                dy = dy + ystep
                onePredict = self.predict([[dx, dy]])
                record = dict()
                record["x"] = dx
                record["y"] = dy
                record["label"] = onePredict[0]
                result["predict"].append(record)

        for i in xrange(0, len(self._label) - 1):
            record = dict()
            record["x"] = self._features[i][0]
            record["y"] = self._features[i][1]
            record["label"] = self._label[i]
            result["data"].append(record)
        result["rmse"] = 0.00001
        ''' 
        return result
